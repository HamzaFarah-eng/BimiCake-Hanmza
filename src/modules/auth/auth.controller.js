import { userModel } from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { customAlphabet } from "nanoid";
import { sendEmail } from "../../utils/SendEmail.js";
import { emailTemplate } from "../../utils/Templetes/email.js";
import { PasswordResetTemplate } from "../../utils/Templetes/sendCode.js";

export const register = async (req, res, next) => {
  const { email, phone, password } = req.body;
  const emailExists = await userModel.findOne({ email });
  if (emailExists) {
    return next(new AppError("Email or phone already exists", 409));
  }

  const phoneExists = await userModel.findOne({ phone });
  if (phoneExists) {
    return next(new AppError("Email or phone already exists", 409));
  }

  const SaltRounds = parseInt(process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, SaltRounds);
  req.body.password = hashedPassword;
  const user = await userModel.create(req.body);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  sendEmail({
    to: email,
    subject: "confirm email",
    html: emailTemplate(req.body.username, token),
  });
  res.status(201).json({
    message: "success",
    user,
  });
};

export const login = async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await userModel.findOne({ phone });
  if (!user) {
    return next(new AppError("Invalid phone or password", 401));
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return next(new AppError("Invalid phone or password", 401));
  }

  if (user.status === "inactive") {
    return next(new AppError("Account is not active", 403));
  }

  if (!user.confirmEmail) {
    return next(new AppError("please confirm your email to continue", 400));
  }
  const token = jwt.sign(
    { role: user.role, id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
  res.status(200).json({
    message: "success",
    token,
  });
};

export const confirmEmail = async (req, res, next) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new AppError("Invalid token", 400));
  }

  if (user.confirmEmail) {
    return res.status(200).json({ message: "Email already confirmed" });
  }

  // way 1
  user.confirmEmail = true;
  await user.save();

  //way 2
  /* 
  const updateuser = await userModel.findByIdAndUpdate(user.id,{
     confirmEmail: true,
  });
  */

  res.status(200).json({ message: "Email confirmed successfully" });
};

export const sendCode = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return next(new AppError("User not found", 404));
  }
  const code = customAlphabet("1234567890abcdf", 4)();
  user.code = code;
  user.expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  await user.save();
  sendEmail({
    to: email,
    subject: "Reset Password",
    html: PasswordResetTemplate(code),
  });
  res.status(200).json({ message: "Verification code sent successfully" });
};

export const forgotPassword = async (req, res, next) => {
  const { code, password } = req.body;
  const user = await userModel.findOne({
    code,
    expiryDate: { $gt: new Date() },
    _id: req.user._id,
  });
  if (!user) {
    return next(new AppError("Invalid code or expired", 401));
  }
  const SaltRounds = parseInt(process.env.SALT);
  const hashedPassword = await bcrypt.hash(password, SaltRounds);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
};

export const updateProfile = async (req, res) => {
  const { username, birthdate } = req.body;
  const userId = req.user._id;

  if (!username && !birthdate) {
    return res.status(400).json({ message: "No updates provided" });
  }

  const updates = {};
  if (username) updates.username = username;
  if (birthdate) {
    const birthDateObj = new Date(birthdate);
    if (isNaN(birthDateObj.getTime()) || birthDateObj >= new Date()) {
      return res.status(400).json({ message: "Invalid birthdate" });
    }
    updates.birthdate = birthDateObj;
  }

  const updatedUser = await userModel.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  res.json({ message: "Profile updated successfully", user: updatedUser });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user._id;

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Incorrect old password" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  res.json({ message: "Password changed successfully" });
};

export const getProfile = async (req, res, next) => {
  const userId = req.user._id;
  const user = await userModel
    .findById(userId)
    .select("-__v -code -expiryDate -confirmEmail -password");
  if (!user) {
    return next(new AppError("user not found", 404));
  }
  return res.status(200).json({
    message: "success",
    user,
  });
};