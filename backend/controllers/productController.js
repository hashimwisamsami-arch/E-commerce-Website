import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    //Validation
    switch (true) {
      case !name:
        return res.json({ error: "Name is requaired" });
      case !description:
        return res.json({ error: "description is requaired" });
      case !price:
        return res.json({ error: "price is requaired" });
      case !category:
        return res.json({ error: "category is requaired" });
      case !quantity:
        return res.json({ error: "quantity is requaired" });
      case !brand:
        return res.json({ error: "brand is requaired" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});
export { addProduct };
