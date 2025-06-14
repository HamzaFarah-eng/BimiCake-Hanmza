import { Cart } from "../../../DB/models/cart.model.js";
import { Cake } from "../../../DB/models/cake.model.js";
import { AppError } from "../../utils/AppError.js";
import { paginate} from '../../utils/pagination.js'
import mongoose from "mongoose";

export const addToCart = async (req, res, next) => {
    const {cakeId,quantity,userId}= req.body;
    
    const cakeData = await Cake.findById(cakeId);
    if (!cakeData) {
      return next(new AppError("Cake not found", 404));
    }
  
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [], 
        totalPrice: 0,
      });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.cake.toString() === cakeData._id.toString()
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += Number(quantity);
    } else {
      cart.items.push({
        cake: cakeData._id,
        name: cakeData.name,
        flavor: { name: cakeData.flavor?.name || "Unknown" }, 
        topping: { name: cakeData.topping?.name || "Unknown" }, 
        price: cakeData.finalPrice,
        quantity,
        image: cakeData.image.secure_url,
      });
    }

    
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json({ message: "Item added to cart" });
  
};

export const removeFromCart = async (req, res, next) => {
    const { cakeId, userId } = req.body; 

    const cart = await Cart.findOne({ user: userId });
    
    if (!cart || cart.items.length === 0) {
      return next(new AppError("Cart not found or is empty", 404));
    }

    const updatedCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { cake:new mongoose.Types.ObjectId(cakeId) } } },
      { new: true } 
    );
    
    if (!updatedCart) {
      return next(new AppError("Failed to update cart", 500));
    }

    updatedCart.totalPrice = updatedCart.items.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );

    await updatedCart.save();

    res.status(200).json({ 
      status: "success",
      message: "Item removed from cart",
      
    });
};

export const getCart = async (req, res) => {
    const { page = 1, limit = 10 } = req.query; 
    const { userId} = req.body;

    const { skip, limit: paginationLimit, page: Page } = paginate(page, limit);

      const cart = await Cart.findOne(
          { user: userId },
          {
            items: { $slice: [skip, skip + limit] },
          }
      );
    
    const totalItems = cart.items.length;

   

  res.status(200).json({
    message: "Cart retrieved successfully",
    cart: {
      items: cart.items,
      totalPrice: cart.totalPrice,
    },
    pagination: {
      Page,
      totalItems,
      itemsPerPage: paginationLimit,
    },
  });
};

export const clearCart = async (req, res, next) => {
  const {userId} = req.body;

  const cart = await Cart.findOneAndUpdate({ user: userId },{$set: {items:[], totalPrice:0 }}, {new:true});
  
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  res.status(200).json({ message: "Cart cleared successfully" });
};