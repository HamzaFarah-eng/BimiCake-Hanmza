import { userModel } from "../../../DB/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
import { paginate } from "../../utils/pagination.js"

export const getUsers = async (req, res, next) => {
  const { page, limit } = req.query;
  const { skip, limit: pageLimit, page: Page } = paginate(parseInt(page), parseInt(limit));
  const count = await userModel.countDocuments()
  const users = await userModel.find({}).select('username email role phone birthdate status')
  .skip(skip).limit(pageLimit)
  res.status(200).json({ message: "success", count, page:Page, limit:pageLimit, users });
}

export const getUser = async (req, res, next) => {
  const user = await userModel.findById(req.params.id)
  if (!user) return next(new AppError('user not found', 404))
  res.status(200).json({ message: "success", user })
}


export const disactiveUser = async (req, res, next) => {
  const user = await userModel.findByIdAndUpdate(req.params.id, { status: "inactive" }, { new: true })
  if (!user) return next(new AppError('user not found', 404))
  res.status(200).json({ message: "User disabled successfully", user })
}