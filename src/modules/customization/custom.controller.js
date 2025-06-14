import mongoose from "mongoose";
import { colorModel } from "../../../DB/models/customization/color.model.js";
import { Flavor } from "../../../DB/models/customization/flavor.model.js";
import { shapeModel } from "../../../DB/models/customization/Shape.model.js";
import toppingsModel from "../../../DB/models/customization/toppings.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import { paginate } from "../../utils/pagination.js";

const models = {
  shape: shapeModel,
  flavor: Flavor,
  color: colorModel,
  topping: toppingsModel,
};

export const addItem = async (req, res, next) => {
  const { name } = req.body;
  const { type } = req.params;
  const model = models[type];
  if (!model) return next(new AppError("Invalid customization type", 404));
  const check = await model.findOne({ name });
  if (check) return next(new AppError(`${type}: ${name} already exists`, 400));
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file.path
    );
    req.body.image = { secure_url, public_id };
  }
  const item = await model.create(req.body);
  res.status(201).json({ message: "success", item });
};

export const getAllItems = async (req, res, next) => {
  const { type } = req.params;
  const model = models[type];
  if (!model) return next(new AppError("Invalid customization type", 404));
  const items = await model.find({});
  res.status(200).json({ message: "success", count: items.length, items });
};

export const getToppingsByCollection = async (req, res, next) => {
  const { page, limit } = req.query;
  const {
    skip,
    limit: pageLimit,
    page: Page,
  } = paginate(parseInt(page), parseInt(limit));
  const { cakeCollection } = req.params;
  const count = await toppingsModel.countDocuments({
    cakeCollection: new mongoose.Types.ObjectId(cakeCollection),
  });
  const toppings = await toppingsModel
    .find({ cakeCollection: new mongoose.Types.ObjectId(cakeCollection) })
    .skip(skip)
    .limit(pageLimit);

  return res.status(200).json({
    message: "success",
    count,
    page: Page,
    limit: pageLimit,
    toppings,
  });
};

export const getItemsForCustom = async (req, res, next) => {
  const { type } = req.params;
  const model = models[type];
  if (!model) return next(new AppError("Invalid customization type", 404));
  const items = await model.find({});
  if (!items) return next(new AppError(`${type} not found`, 404));
  res.status(200).json({ message: `${type} options`, items });
};

export const deleteItem = async (req, res, next) => {
  const { type, id } = req.params;
  const model = models[type];
  if (!model) return next(new AppError("Invalid customization type", 404));
  const item = await model.findOne({ _id: id });
  if (!item) return next(new AppError(`${type} not found`, 404));
  await cloudinary.uploader.destroy(item.image.public_id);
  await model.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "success", delete: `${item.name} deleted successfully` });
};

export const getShapesWithOptions = async (req, res, next) => {
  const shapes = await shapeModel
    .find({})
    .populate("flavors")
    .populate("toppings");

  res.status(200).json({
    message: "success",
    shapes,
  });
};

export const addFlavorsAndToppingsToShape = async (req, res, next) => {
  const { shapeId } = req.params;
  const { flavorIds, toppingIds } = req.body;

  const shape = await shapeModel.findById(shapeId);
  if (!shape) return next(new AppError("Shape not found", 404));

  const validFlavors = await Flavor.find({ _id: { $in: flavorIds } });
  const validToppings = await toppingsModel.find({ _id: { $in: toppingIds } });

  shape.flavors = validFlavors.map((f) => f._id);
  shape.toppings = validToppings.map((t) => t._id);

  await shape.save();

  res.status(200).json({
    message: "Flavors and toppings linked successfully to shape",
    shape,
  });
};
