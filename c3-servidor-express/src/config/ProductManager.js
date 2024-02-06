import crypto from "crypto";
import fs from "fs";
export class ProductManager {

    constructor(path) {
        this.path = path
    }
    getProducts = async () => {
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([], null, "\t"));
            return [];
        }
        const data = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(data);
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        const product = products.find(product => product.id === id);
        if (!product) {
            return { error: 'Producto no encontrado' };
        }
        return product;
    };

    addProduct = async (product) => {
        let products = await this.getProducts();
        //validaciones
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock"];
        const missingField = requiredFields.find(field => !product[field]);
        if (missingField) {
            return `El campo '${missingField}' es requerido`;
        }

        if (products.find(prod => prod.code === product.code)) {
            return `El producto con código ${product.code} ya existe`;
        }

        const newProduct =
        {
            ...product,
            id: crypto.randomBytes(16).toString("hex")
        };

        products = [...products, newProduct];
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        return 'Producto agregado correctamente';
    };

    updateProduct = async (id, updatedFields) => {
        let products = await this.getProducts();
        const productFound = await this.getProductById(id);

        if (productFound.error) {
            return productFound.error;
        }

        if (updatedFields.code) {
            const codeExists = products.some(product => product.id !== id && product.code === updatedFields.code);
            if (codeExists) {
                return `El código ${updatedFields.code} ya está en uso por otro producto`;
            }
        }

        const productIndex = products.findIndex(product => product.id === id);
        products[productIndex] = {
            ...productFound,
            ...updatedFields
        };

        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        return 'Producto actualizado';
    };

    deleteProduct = async (id) => {
        let products = await this.getProducts();
        const productFound = await this.getProductById(id);

        if (productFound.error) {
            return productFound.error;
        }

        products = products.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, "\t"));
        return 'Producto eliminado correctamente';
    };
}