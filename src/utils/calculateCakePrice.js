import { Cake } from "../../DB/models/cake.model.js";
import { cakeCollection } from "../../DB/models/collection.model.js";
import { Flavor } from "../../DB/models/customization/flavor.model.js";
import { shapeModel } from "../../DB/models/customization/Shape.model.js";
import toppingsModel from "../../DB/models/customization/toppings.model.js";

export const calculateTotalPrice = async (cakeId) => {
    let price = 0;
    const cake = await Cake.findById(cakeId);
    if (!cake) return next(new AppError("Cake not found", 404));
    const shape = await shapeModel.findById(cake.shape)
    price += shape.price;

    const topping = await toppingsModel.findById(cake.topping);
    price += topping.price

    await Promise.all(
        cake.flavors.map(async flavor => {
            const checkFlavor = await Flavor.findById(flavor);
            price += checkFlavor.price;
        })
    )

    const checkCakeCollection = await cakeCollection.findById(cake.cakeCollection)
    if (!checkCakeCollection) return next(new AppError('Invalid cake collection', 400))

    let totalDiscount = cake.discount || 0;
    if (cake.discount < 10) {
        totalDiscount = cake.discount + checkCakeCollection.discount
    }

    let finalPrice = price - price * (totalDiscount / 100)
    finalPrice = Math.round(finalPrice)

    cake.price = price
    cake.finalPrice = finalPrice
    await cake.save()
}