import { Cake } from "../../../DB/models/cake.model.js";
import { Flavor } from "../../../DB/models/customization/flavor.model.js";
import { shapeModel } from "../../../DB/models/customization/Shape.model.js";
import toppingsModel from "../../../DB/models/customization/toppings.model.js";
import cloudinary from "../../utils/cloudinary.js";
import { AppError } from "../../utils/AppError.js";
import { paginate } from "../../utils/pagination.js";


export const changeCakeStatus = async (req, res, next) => {
  const { cakeId } = req.params;
  const { status } = req.body;

  const updatedCake = await Cake.findByIdAndUpdate(
    cakeId,
    { status },
    { new: true },
    { runValidators: true }
  );

  if (!updatedCake) {
    return next(new AppError("Cake not found", 404));
  }

  res.status(200).json({ message: "Cake status updated successfully" });
};

export const customCakeUpdate = async (req, res, next) => {
  const { id } = req.params;

  const cake = await Cake.findById(id);
  if (!cake) return next(new AppError("Cake not found", 404));

  let {
    shape: shapeId,
    flavor: flavorId,
    topping: toppingId,
    color,
    cakeMessage,
    instructions,
    type,
  } = req.body;

  let price = 0;

  const shape = await shapeModel.findById(shapeId);
  if (!shape) return next(new AppError("Shape not found", 404));
  cake.shape = shape;
  price += shape.price;

  const flavor = await Flavor.findById(flavorId);
  if (!flavor) return next(new AppError("Flavor not found", 404));
  if (!shape.flavors.includes(flavorId)) {
    return next(new AppError("Flavor does not belong to this shape", 400));
  }
  cake.flavor = flavor;
  price += flavor.price;

  const topping = await toppingsModel.findById(toppingId);
  if (!topping) return next(new AppError("Topping not found", 404));
  if (!shape.toppings.includes(toppingId)) {
    return next(new AppError("Topping does not belong to this shape", 400));
  }
  cake.topping = topping;
  cake.cakeCollection = topping.cakeCollection;
  price += topping.price;

  if (req.file) {
    if (cake.file?.public_id) {
      await cloudinary.uploader.destroy(cake.file.public_id);
    }
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path
    );
    cake.file = { secure_url, public_id };
  }

  if (color !== undefined) cake.color = color;
  if (cakeMessage !== undefined) cake.cakeMessage = cakeMessage;
  if (instructions !== undefined) cake.instructions = instructions;

  cake.price = price;
  cake.type = type;

  await cake.save();

  res.status(200).json({
    message: "Custom cake updated successfully",
    cake: cake._id,
  });
};

export const customCake = async (req, res, next) => {
  const {
    shape: shapeId,
    flavor: flavorId,
    topping: toppingId,
    color,
    cakeMessage,
    instructions,
  } = req.body;

  const shape = await shapeModel.findById(shapeId);
  if (!shape) return next(new AppError("Shape not found", 404));

  const flavor = await Flavor.findById(flavorId);
  if (!flavor) return next(new AppError("Flavor not found", 404));

  const topping = await toppingsModel.findById(toppingId);
  if (!topping) return next(new AppError("Topping not found", 404));

  let file = null;
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path
    );
    file = { secure_url, public_id };
  }

  const totalPrice = shape.price + flavor.price + topping.price;

  const customCake = await Cake.create({
    shape,
    flavor,
    topping,
    color,
    cakeMessage,
    instructions,
    file,
    price: totalPrice,
    cakeCollection: topping.cakeCollection,
  });

  res.status(201).json({
    message: "Custom cake created successfully",
    cake: customCake._id,
  });
};

export const deleteCustom = async (req, res, next) => {
  const { cakeId } = req.params;
  const cake = await Cake.findByIdAndDelete(cakeId);
  if (!cake) {
    return next(new AppError("Cake not found", 404));
  }

  res.status(200).json({ message: "Cake deleted successfully" });
};

export const getCake = async (req, res, next) => {
  const { cakeId } = req.params;

  const cake = await Cake.findById(cakeId)
    .populate({
      path: "shape",
      select: "-__v",
    })
    .populate({
      path: "flavor",
      select: "-__v",
    })
    .populate({
      path: "topping",
      select: "-__v",
    });

  if (!cake) return next(new AppError("Cake not found", 404));

  res.status(200).json({
    cake,
  });
};
