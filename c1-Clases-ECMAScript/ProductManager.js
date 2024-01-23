import crypto from "crypto";
class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(product) {

        // Validar que no se ID no se repita"
        if (this.products.find(p => p.id === product.id)) {
            return console.log(`El producto con id ${product.id} ya existe`);
        }

        // Validar que no se repita el campo "code"
        if (this.products.find(p => p.code === product.code)) {
            return console.log(`El producto con código ${product.code} ya existe`);
        }

        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.log("Todos los campos son requeridos");
        }

        const newProduct =
        {
            ...product,
            id: crypto.randomBytes(16).toString("hex")  //Genera un ID aleatorio
        };

        this.products = [...this.products, newProduct];
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            return 'Producto no encontrado';
        }
        return product;
    }

}

const products = new ProductManager();

//------- 01. Listar Productos -------
console.log(products.getProducts());

//------- 02. Validacion para ingresar todos los campos ----------
/*const product1 = {
    title: "Laptop HP 14",
    description: "Esta laptop de tamaño compacto y liviano, ofrece una nueva dimensión a todo tu contenido digital.",
    price: 1568,
    thumbnail: "laptop.jpg",
    //code: "P001",
    stock: 10
};

products.addProduct(product1);
console.log(products.getProducts()); */

//-------------- 03. Validacion del campo Code -------------------
/*const product1 = {
    title: "Laptop HP 14",
    description: "Esta laptop de tamaño compacto y liviano, ofrece una nueva dimensión a todo tu contenido digital.",
    price: 1568,
    thumbnail: "laptop.jpg",
    code: "P001",
    stock: 10
};

const product2 = {
    title: "Celular Xiaomi Redmi Note 12",
    description: "El modelo Redmi Note 12 Pro+ 5G tiene 256GB de memoria interna y 8GB de memoria RAM",
    price: 1618,
    thumbnail: "celular.jpg",
    code: "P001",  //Codigo repetido
    stock: 20
};
products.addProduct(product1);
products.addProduct(product2);
console.log(products.getProducts());*/

// --------------------- 04. Buscar un producto por el ID ------------------
/*const product1 = {
    title: "Laptop HP 14",
    description: "Esta laptop de tamaño compacto y liviano, ofrece una nueva dimensión a todo tu contenido digital.",
    price: 1568,
    thumbnail: "laptop.jpg",
    code: "P002",
    stock: 10
};

const product2 = {
    title: "Celular Xiaomi Redmi Note 12",
    description: "El modelo Redmi Note 12 Pro+ 5G tiene 256GB de memoria interna y 8GB de memoria RAM",
    price: 1618,
    thumbnail: "celular.jpg",
    code: "P003",
    stock: 20
};

products.addProduct(product1);
products.addProduct(product2);

console.log(products.getProductById('e48cf98244cb1174e6920b80b9a1033a'));*/