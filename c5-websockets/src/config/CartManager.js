import crypto from "crypto";
import fs from "fs";
export class CartManager {

    constructor(path) {
        this.path = path
    }
    getCarts = async () => {
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, "\t"));
            return [];
        }
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    addCart = async () => {
        const carts = await this.getCarts();

        const newCart = {
            id: crypto.randomBytes(16).toString("hex"),
            products: []
        }
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));
        return 'Carrito creado';
    };

    getCartById = async (id) => {
        const carts = await this.getCarts();
        const cart = carts.find(cart => cart.id === id);
        if (!cart) {
            return { error: 'Producto no encontrado' };
        }
        return cart;
    };

    addCartProduct = async (cid, product) => {

        const carts = await this.getCarts();
        const indice = carts.findIndex(cart => cart.code === cid);
    };
}