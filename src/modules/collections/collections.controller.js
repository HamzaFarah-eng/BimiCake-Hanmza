import { Cake } from "../../../DB/models/cake.model.js";
import { cakeCollection } from "../../../DB/models/collection.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from "../../utils/cloudinary.js";
import { paginate } from "../../utils/pagination.js";

export const addCollection = async (req, res, next) => {
    const { name } = req.body;
    const check = await cakeCollection.findOne({ name })
    if (check) return next(new AppError("Collection already exists", 400))
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);
    req.body.image = { secure_url, public_id };
    const collection = await cakeCollection.create(req.body);
    if (!collection) {
        await cloudinary.uploader.destroy(public_id);
    }
    res.status(200).json({ message: "success", collection });
}

export const getAllCollections = async (req, res, next) => {
    const { page, limit } = req.query;
    const { skip, limit: pageLimit, page: Page } = paginate(parseInt(page), parseInt(limit));
    const count = await cakeCollection.countDocuments()
    const collections = await cakeCollection.find().select('name image.secure_url')
    .skip(skip).limit(pageLimit)
    res.status(200).json({ message: "success", count,page:Page, limit:pageLimit, collections });
}

export const getById = async (req, res, next) => {
    const collection = await cakeCollection.findById(req.params.id).select('name image.secure_url status')
    if (!collection) return next(new AppError("Collection not found", 404))
    res.status(200).json({ message: "success", collection });
}

export const updateCollection = async (req, res, next) => {
    const { id } = req.params;
    const check = await cakeCollection.findById(id);
    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);
        req.body.image = { secure_url, public_id };
        await cloudinary.uploader.destroy(check.image.public_id);
    }
    const updatedCollection = await cakeCollection.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    res.status(200).json({ message: "Collection updated successfully", collection: updatedCollection });
}


export const deleteCollection = async (req, res, next) => {
    const { id } = req.params;
    const collection = await cakeCollection.findByIdAndDelete(id);
    if (!collection) return next(new AppError("Collection not found", 404))
    await cloudinary.uploader.destroy(collection.image.public_id);
    res.status(200).json({ message: "Collection deleted successfully", collection });
}


export const changeStatus = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    const collection = await cakeCollection.findByIdAndUpdate(id, { status }, { new: true });
    if (!collection) return next(new AppError("Collection not found", 404))
    res.status(200).json({ message: "Collection status updated successfully", collection });
}

export const addDiscount = async (req, res, next) => {
    const { id } = req.params;
    const { discount } = req.body;
    const collection = await cakeCollection.findById(id)
    if (!collection) return next(new AppError("Collection not found", 404))
    collection.discount = discount
    await collection.save();
    res.status(200).json({ message: "Discount added successfully", collection });
}

export const getCollections = async (req,res,next)=>{
    const collections = await cakeCollection.find().select('name');
    if(!collections){
        return next(new AppError("no collections found"));
    }
    return res.status(200).json({
        message:"success",
        collections
    })

}

export const getCollectionsWithCakes = async (req, res, next) => {
    const collections = await cakeCollection.find().limit(3);

    const results = await Promise.all(
      collections.map(async (collection) => {
        const cakes = await Cake.find({ cakeCollection: collection._id })
          .limit(5)
          .populate('shape', 'name')
          .populate('topping', 'name')
          .select('file price shape topping');

        const cakesData = cakes.map((cake) => ({
          cakeId: cake._id,
          cake_name: cake.topping.name,
          image: cake.file?.secure_url || 'no photo',
          price: cake.price,
          shape: cake.shape.name,
        }));

        return {
          collectionId: collection._id,
          collectionName: collection.name,
          cakes: cakesData,
        };
      })
    );

    res.status(200).json({ data: results });
};

export const getCakesByCollection = async (req, res, next) => {
  const { collectionId } = req.params;
  const { page, limit } = req.query;
  const { skip, limit: finalLimit } = paginate(page, limit);

  const cakes = await Cake.find({
    cakeCollection: collectionId,
    status: "active",
  })
    .skip(skip)
    .limit(finalLimit)
    .populate("shape", "name")
    .populate("topping", "name")
    .lean();

  const formattedCakes = cakes.map(cake => ({
    cakeId: cake._id,
    cake_name: cake.topping?.name || "No name",
    image: cake.file?.secure_url || "no photo",
    price: cake.price,
    shape: cake.shape?.name || "No shape",
  }));

  res.status(200).json({
    message: "Cakes fetched successfully",
    page: Number(page) || 1,
    count: formattedCakes.length,
    data: formattedCakes,
  });
};
