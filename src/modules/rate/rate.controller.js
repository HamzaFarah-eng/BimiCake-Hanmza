import { Review } from "../../../DB/models/rate.model.js";
import { Cake } from "../../../DB/models/cake.model.js";
import { AppError } from "../../utils/AppError.js";
import { paginate} from '../../utils/pagination.js';
import cloudinary from '../../utils/cloudinary.js';
import { userModel } from "../../../DB/models/user.model.js";


export const addReview = async (req, res, next) => {
  const { cakeId, rating, comment } = req.body;
  const userId = req.user._id;

  const cake = await Cake.findById(cakeId);
  if (!cake) {
    return next(new AppError("Cake not found", 404));
  }

  const existingReview = await Review.findOne({ user: userId, cake: cakeId });
  if (existingReview) {
    return next(new AppError("You have already reviewed this cake", 400));
  }

  let imageData = null;
  if (req.file) {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);
    imageData = { secure_url, public_id };
  }

  const review = new Review({
    user: userId,
    cake: cakeId,
    rating,
    comment,
    image: imageData, 
  });

  await review.save();

  res.status(201).json({ message: "Review added successfully" });
};

export const deleteReview = async (req, res, next) => {
  const { reviewId } = req.body;

  const review = await Review.findOneAndDelete({ 
    _id: reviewId,
  });

  if (!review) {
    return next(new AppError("Review not found or you are not authorized to delete it", 404));
  }

  res.status(200).json({ message: "Review deleted successfully" });
};

export const getCakeReviews = async (req, res, next) => {
    const { cakeId } = req.params;
    const { page = 1, limit = 10 } = req.query; 

    const cake = await Cake.findById(cakeId);
    
    if (!cake) {
      return next(new AppError("Cake not found", 404));
    }

    const { skip, limit: paginationLimit, page: Page } = paginate(page, limit);

    const reviews = await Review.find({ cake: cakeId })
      .skip(skip)
      .limit(paginationLimit)
      .populate("user"); 

    
    res.status(200).json({ 
      message: "Reviews retrieved successfully", 
      reviews,
      paginationInfo: {
        page:Page,
        skip:skip,
        limit: paginationLimit
      }
    });   
};

export const updateReview = async (req, res, next) => {    
    const { rating, comment, id } = req.body;
    
    const review = await Review.findOne({
      _id: id,
      isDeleted: false
    });

    if (!review) {
      return next(new AppError("Review not found or you're not authorized to update it", 404));
    }

    if (rating !== undefined) {
      review.rating = rating;
    }
    
    if (comment !== undefined) {
      review.comment = comment;
    }

    if (req.file) {
      if (review.image && review.image.public_id) {
        await cloudinary.uploader.destroy(review.image.public_id);
      }

      const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path);
      review.image = { secure_url, public_id };
    }

    await review.save();

    res.status(200).json({
      status: "success",
      message: "Review updated successfully",
    });
};
