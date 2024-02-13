import {Router} from "express";
import  {ProductManager}  from "../config/ProductManager.js"

const productManager = new ProductManager('./src/data/products.json')
const router = Router();

function validateProduct({ title, description, code, price, stock, category}) {
    return title && description && code && price != null && stock != null && category;
}

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const prods = await productManager.getProducts()
        let limite = parseInt(limit)
        if (!limite)
            limite = prods.length
        console.log(limite)
        const prodsLimit = prods.slice(0, limite)
        res.status(200).send(prodsLimit)

    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar productos: ${error}`)
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const idProducto = req.params.pid
        const prod = await productManager.getProductById(idProducto)
        if (prod)
            res.status(200).send(prod)
        else
            res.status(404).send("Producto no existe")
    } catch (error) {
        res.status(500).send(`Error interno del servidor al consultar producto: ${error}`)
    }
})

router.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail} = req.body;
        if (!validateProduct({ title, description, code, price, stock, category })) {
            return res.status(400).json({ status: 'Error', error: 'Incomplete or invalid values'});
        }
        await productManager.addProduct({ title, description, code, price, status, stock, category, thumbnail});
        res.status(201).json({ status: 'Success', message: 'Product added successfully.' });
    } catch (error) {
        res.status(500).json({ status: 'Error', error: `Internal server error: ${error.message}` });
    }
});

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid
    let body = req.body;
    let productFound = await productManager.getProductById(pid);
    
    if(productFound.error)
    {
        return res.status(404).send({ status: "Error", message: "Product does not exist" });
    }

    await productManager.updateProduct(pid, body);
    return res.status(201).send({ status: "Succes", message: "Updated product"});
});

router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    console.log(pid)
    let product = await productManager.getProductById(pid);
    if(productFound.error)
    {
        return res.status(404).send({ status: "Error", message: "Product does not exist" });
    } 
    await productManager.deleteProduct(pid);
    return res.status(200).send({ status: "Sucess", message: "Product succesfully deleted" });
});

export default router;