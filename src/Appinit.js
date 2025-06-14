import { connDB } from "../DB/connection.js";
import cors from 'cors';
import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js';
import customRouter from './modules/customization/custom.router.js';
import cakeRouter from './modules/cake/cake.router.js';
import collectionRouter from './modules/collections/collections.router.js';
import categoryRouter from './modules/category/category.router.js';
import productRouter from './modules/product/product.router.js';
import cartRouter from './modules/cart/cart.router.js';
import orderRouter from './modules/order/order.router.js';
import favoriteRouter from './modules/favorite/favorite.router.js';
import rateRouter from './modules/rate/rate.router.js';

export const Appinit = (express, app)=>{
  connDB();
  app.use(express.json());
  app.use(cors())

  //routes
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/custom', customRouter);
  app.use('/cake', cakeRouter);
  app.use('/collections', collectionRouter)
  app.use('/category', categoryRouter);
  app.use('/product', productRouter);
  app.use('/cart', cartRouter);
  app.use('/favorite', favoriteRouter);
  app.use('/order', orderRouter);
  app.use('/rate', rateRouter);


  app.get("/", (req, res) => {
    res.json({ message:"hi from our api"});
  });  

  app.get("*", (req, res) => {
    return res.status(404).json({ message: "page not found" });
  });

  app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({ message: err.message });
  });
}