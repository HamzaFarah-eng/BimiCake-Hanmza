import { categoryModel } from "../../../DB/models/category.model.js";
import { productModel } from "../../../DB/models/product.model.js";
import { AppError } from "../../utils/AppError.js";
import cloudinary from '../../utils/cloudinary.js';
import { paginate } from "../../utils/pagination.js";



export const createProduct = async (req, res, next) => {
    const { name, category } = req.body;
    const checkCategory = await categoryModel.findById(category);
    if (!checkCategory) {
        return next(new AppError("Invalid category", 404));
    }

    const checkName = await productModel.findOne({ name });
    if (checkName) {
        return next(new AppError("Product with this name already exists", 400));
    }

    if (req.file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);
        req.body.image = { secure_url, public_id };
    }

    const product = await productModel.create(req.body);
    res.status(201).json({ message: "Product created successfully", product });

}


export const getProduct = async (req, res, next) => {
    const { id } = req.params
    const product = await productModel.findById(id).populate({
        path: 'category',
        select: 'name'
    });
    if (!product) {
        return next(new AppError("Product not found", 404));
    }

    const formatedProduct = {
        _id: product._id,
        name: product.name,
        description: product?.description,
        image: product.image.secure_url,
        category: product.category.name
    }
    res.status(200).json({ message: "success", product: formatedProduct });
}


export const getProductList = async (req, res, next) => {
    const { page, limit } = req.query;
    const { skip, limit: pageLimit, page: Page } = paginate(parseInt(page), parseInt(limit));
    const count = await productModel.countDocuments()
    const products = await productModel.find({})
    .skip(skip).limit(pageLimit)
    return res.status(200).json({ message: "success",count,page:Page,limit:pageLimit, products })
}