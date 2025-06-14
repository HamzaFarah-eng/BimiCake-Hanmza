import { categoryModel } from "../../../DB/models/category.model.js"
import { paginate } from "../../utils/pagination.js"

export const createCategory = async (req, res, next) => {
    const { name } = req.body
    const category = new categoryModel({ name })
    await category.save()
    res.status(201).json({ message: "success", category })
}


export const getCategory = async (req, res, next) => {
    const { id } = req.params
    const category = await categoryModel.findById(id);
    if (!category) return next(new Error("Category not found", 404))
    return res.status(200).json({ message: "success", category })
}

export const getAllCategories = async (req, res, next) => {
    const { page, limit } = req.query;
    const { skip, limit: pageLimit, page:Page} = paginate(parseInt(page), parseInt(limit));
    const count = await categoryModel.countDocuments();
    const categories = await categoryModel.find({})
    .skip(skip)
    .limit(pageLimit)
    res.status(200).json({ message: "success", page:parseInt(Page) || 1,pageLimit,count, categories })
}


export const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const category = await categoryModel.findByIdAndUpdate(id, { name }, { new: true })
    if (!category) return next(new Error("Category not found", 404))
    return res.status(200).json({ message: "success", category })
}


export const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    await categoryModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Category deleted successfully" })
}