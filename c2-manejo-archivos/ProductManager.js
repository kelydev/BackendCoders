import crypto from "crypto";
import fs from "fs";
class ProductManager {

    constructor() {
        this.path = './Productos.json'
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const result = JSON.parse(data);
            return result;
        } else {
            return [];
        }
    }
    getProductById = async (id) => {
        const products = await this.getProducts();
        const productFound = products.findIndex(producto => producto.id === id);
        if (productFound == -1) {
            return 'Producto no encontrado';
        }
        return productFound;
    }

    addProduct = async (product) => {
        const productos = await this.getProducts();
        const newProduct =
        {
            ...product,
            id: crypto.randomBytes(16).toString("hex")  //Genera un ID aleatorio
        };

        productos = [...productos, newProduct];
        await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
        return product;
    };

    updateProduct = async (id, camposActualizados) => {
        const productos = await this.getProducts();
        let productFounds = await this.getProductById(id);

        if (productFounds !== -1) {
            productos[productFounds] = {
                ...productos[productFounds],
                ...camposActualizados
            };

            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
            return 'Producto actualizado';
        }
        return 'Error al actualizar el producto';
    }

    deleteProduct = async (id) => {
        let productos = await this.getProducts();
        const productFound = await this.getProductById(id);
        if (productFound.id === id) {
            productos = productos.filter(producto => producto.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(productos, null, "\t"));
            return 'Producto eliminado correctamente';
        }
        return 'Error al eliminar el producto';
    };
}

const products = new ProductManager();