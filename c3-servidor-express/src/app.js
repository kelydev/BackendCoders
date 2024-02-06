import express from "express";
import { ProductManager } from "./config/ProductManager.js"
const app = express()
const PORT = 8080

const productManager = new ProductManager('./src/data/products.json')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Iniciando el servidor")
})

app.get('/products', async (req, res) => {
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
app.get('/products/:pid', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server on ${PORT}`);
})