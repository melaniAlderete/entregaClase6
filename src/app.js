import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenido");
});

app.get("/products", async (req, res) => {
  try {
    let limit = req.query.limit;
    if (limit != null || limit > 0) {
      const products = await ProductManager.getProducts();
      const productsLimit = products.slice(0, limit);
      res.json(productsLimit);
    } else {
      const products = await ProductManager.getProducts();
      res.json(products);
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    let { pid } = req.params;
    console.log(pid);
    const product = await ProductManager.getProductById(parseInt(pid));
    res.json(product);
  } catch (err) {
    res.send(err);
  }
});

app.get("*", (req, res) => {
  res.send("Error");
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
