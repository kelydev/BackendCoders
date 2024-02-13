import {Router} from "express";
import  {ProductManager}  from "../config/ProductManager.js"
import { CartManager } from "../config/CartManager.js";

const productManager = new ProductManager('./src/data/products.json')
const cartManager = new CartManager('./src/data/cart.json')

const router = Router();

router.post("/", async (req, res) => {
    await cartManager.addCart();
    return res.status(201).send({ status: "Succes", message: "Cart added"});
});

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    let cart = await cartManager.getCartById(cid);
    if(cart.error)
    {
        return res.status(404).send({status: "Error", error: "cart not found"})
    }
    return res.send({status:"Succes", payload: cart});
});

export default router;