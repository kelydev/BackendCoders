import crypto from "crypto";
import fs from "fs";
class ProductManager {

    constructor() {
        this.path = './productos.json'
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
const products = new ProductManager();

/*const result01 = await products.getProducts();
console.log(result01);*/


/*const result02 = await products.addProduct(
    {
        title: "Laptop HP 14",
        description: "Esta laptop de tamaño compacto y liviano, ofrece una nueva dimensión a todo tu contenido digital.",
        price: 1568,
        thumbnail: "laptop.jpg",
        code: "P005",
        //stock: 10
    }
);
console.log(result02);*/


/*const result03 = await products.getProducts();
console.log(result03);*/


/*const result04 = await products.getProductById("2055f3bf12a27ce505ae11ba43d3827a");
console.log(result04)*/


/*const result05 = await products.updateProduct("b1d8d167064e77af553cb7f53ea5309a",
    {
        title: "Laptop Lenovo",
        description: "Compacto y liviano, ofrece una nueva dimensión a todo tu contenido digital.",
        price: 5000,
        thumbnail: "laptop.jpg",
        code: "P003",
        stock: 2
    }
);
console.log(result05);*/


/*const result06 = await products.deleteProduct("8709bf2ebfd0ddf60390d6f0290b2f88");
console.log(result06);*/