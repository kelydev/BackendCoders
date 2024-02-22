import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import { Server } from "socket.io";
import viewsRouter from "./routes/viewsRouter.js";
import  {ProductManager}  from "./config/ProductManager.js"

const productManager = new ProductManager('./src/data/products.json')


const app = express();
const port = 8080;

const httpServer = app.listen(port, () => {
  console.log("Listening on port 8080");
});

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use("/", viewsRouter);

io.on("connection", async(socket) => {
  
  console.log(`Cliente conectado: ${socket.id}`);

  const productos = await productManager.getProducts();
  socket.emit("productos", productos);

  socket.on("crearProducto", async (product) => {
    await productManager.addProduct(product);
    io.emit("productos", productos);
  });

  socket.on("eliminarProducto", async (id) => {
    await productManager.deleteProduct(id);
    io.emit("productos", productos);
  });
});