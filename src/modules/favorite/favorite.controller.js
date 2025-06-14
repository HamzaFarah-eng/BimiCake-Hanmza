import { Favorite } from "../../../DB/models/favorite.model.js";
import { Cake } from "../../../DB/models/cake.model.js";
import { AppError } from "../../utils/AppError.js";
import { paginate} from '../../utils/pagination.js'


export const addToFavorites = async (req, res, next) => {
  const { cakeId ,userId} = req.body; 

  const cake = await Cake.findById(cakeId);
  if (!cake) {
    return next(new AppError("Cake not found", 404));
  }

  let favorite = await Favorite.findOne({ user: userId });

  if (!favorite) {
    favorite = new Favorite({
      user: userId,
      cakes: [],
    });
  }

  if (favorite.cakes.includes(cakeId)) {
    return next(new AppError("Cake already in favorites", 400));
  }

  favorite.cakes.push(cakeId);
  await favorite.save();

  res.status(200).json({ message: "Cake added to favorites" });
};

export const removeFromFavorites = async (req, res, next) => {
  const { cakeId,userId } = req.body; 

  const updatedFavorite = await Favorite.findOneAndUpdate(
    { user: userId }, 
    { $pull: { cakes: cakeId } }, 
    { new: true } 
  );

  if (!updatedFavorite) {
    return next(new AppError("Favorite list not found", 404));
  }

  res.status(200).json({ message: "Cake removed from favorites"});
};

export const getFavorites = async (req, res, next) => {
    const {userId} = req.body;
    const { page = 1, limit = 10 } = req.query; 

    const { skip, limit: paginationLimit, page: Page } = paginate(page, limit);

    const favorite = await Favorite.findOne({ user: userId })
      .populate({
        path: "cakes",
        options: {
          skip: skip,
          limit: paginationLimit
        }
      });

    if (!favorite) {
      return next(new AppError("Favorite list not found", 404));
    }

    const paginationInfo = {
      page:Page,
      skip:skip,
      limit: paginationLimit,
    };

    res.status(200).json({ 
      message: "Favorites retrieved successfully", 
      favorite,
      pagination: paginationInfo 
    });
};