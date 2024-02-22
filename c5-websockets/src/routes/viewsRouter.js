import { Router } from "express";
import  {ProductManager}  from "../config/ProductManager.js"

const productManager = new ProductManager('./src/data/products.json')
const router = Router();

router.get("/", async(req, res) => {
  let allProduct = await productManager.getProducts();
  res.render("home", {allProduct});
});

router.get("/realtimeproducts", async(req, res) => {
  res.render("realTimeProducts");
});

export default router;