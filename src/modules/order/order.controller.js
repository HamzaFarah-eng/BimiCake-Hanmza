import { Order } from "../../../DB/models/order.model.js";
import { Cake } from "../../../DB/models/cake.model.js";
import { AppError } from "../../utils/AppError.js";
import { paginate} from '../../utils/pagination.js'
import { Cart } from "../../../DB/models/cart.model.js";

export const createOrder = async (req, res, next) => {
  const {userId} = req.body;

  const cart = await Cart.findOne({ user: userId });
    
  const items = cart?.items || [];

  let totalPrice = 0;
  for (const item of items) {
    const cake = await Cake.findById(item.cake);
    if (!cake) {
      return next(new AppError(`Cake with ID ${item.cake} not found`, 404));
    }
    totalPrice += cake.finalPrice * item.quantity;
  }

  const order = new Order({
    user: userId,
    items,
    totalPrice,
    status: "pending",
  });

  await order.save();

  res.status(201).json({ message: "Order created successfully" });
};

export const updateOrderStatus = async (req, res, next) => {
  const { orderId, status } = req.body;

  const allowedTransitions = {
    pending: ['accepted', 'cancelled', 'rejected'],
    accepted: ['shipped'],
    shipped: ['delivered'],
    delivered: [], 
    cancelled: [], 
    rejected: []   
  };

  const order = await Order.findById(orderId);
  if (!order) {
    return next(new AppError("Order not found", 404));
  }

  const currentStatus = order.status;

  if (!allowedTransitions[currentStatus]?.includes(status)) {
    return next(new AppError(`Invalid status transition from '${currentStatus}' to '${status}'`, 400));
  }

  order.status = status;
  order.updatedAt = Date.now();
  await order.save();

  res.status(200).json({ message: "Order status updated successfully" });
};

export const getUserOrders = async (req, res, next) => {
  const {userId , status} = req.body;
    const { page = 1, limit = 10 } = req.query; 
    

    const query = { "user": userId };
    if (status) {
      query.status = status; 
    }

    const { skip, limit: paginationLimit, page: Page } = paginate(page, limit);

    const orders = await Order.find(query)
      .populate("items.cake")
      .skip(skip)
      .limit(paginationLimit);

//////////////////////////////////////////////////////with error or display empty array ?
    if (!orders.length) {
      return next(new AppError("No orders found for this user", 404));
    }

    const totalOrders = await Order.countDocuments(query);
    const totalPages = Math.ceil(totalOrders / paginationLimit);

    const paginationInfo = {
      page:Page,
      skip:skip,
      limit: paginationLimit,
    };

    res.status(200).json({
      message: "Orders retrieved successfully",
      orders,
      pagination: paginationInfo,
    });
};

export const getAllOrders = async (req, res, next) => {
    const { page = 1, limit = 10 } = req.query; 
    const status  = req.body.status;
    
    const query = {};
    if (status) {
      query.status = status; 
    }

    const { skip, limit: paginationLimit, page: currentPage } = paginate(page, limit);

    const orders = await Order.find(query)
      .populate("items.cake")
      .skip(skip)
      .limit(paginationLimit);
////////////////////////////////////////////////////////with error or display empty array ?
    if (!orders.length) {
      return next(new AppError("No orders found", 404));
    }

    const totalOrders = await Order.countDocuments(query);

    const totalPages = Math.ceil(totalOrders / paginationLimit);

    const paginationInfo = {
      currentPage,
      totalPages,
      totalOrders,
      ordersPerPage: paginationLimit,
    };

    res.status(200).json({
      message: "All orders retrieved successfully",
      orders,
      pagination: paginationInfo,
    });
};

export const cancelOrder = async (req, res, next) => {
    const { orderId } = req.body;

    const order = await Order.findOne({ _id: orderId});
    if (!order) {
      return next(new AppError("Order not found", 404));
    }

      if (["cancelled", "delivered"].includes(order.status)) {
    return next(new AppError("Cannot cancel an already cancelled or delivered order", 400));
  }
    const currentTime = Date.now();
    const orderCreationTime = new Date(order.createdAt).getTime(); 
    const timeDifferenceInHours = (currentTime - orderCreationTime) / (1000 * 60 * 60); 
    if (timeDifferenceInHours > 24) {
      return next(new AppError("Order cannot be cancelled after 24 hours", 400));
    }

    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });     
  
};