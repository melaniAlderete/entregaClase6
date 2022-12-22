import fs from "fs";

class ProductManager {
  constructor(fileName) {
    this.path = fileName;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      if (
        title != "" ||
        description != "" ||
        price != null ||
        thumbnail != "" ||
        code != ""
      ) {
        let product = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        let products = await this.getProducts();
        let codeValues = products.find((product) => product["code"] === code);
        if (!codeValues) {
          if (products.length === 0) {
            product["id"] = 1;
          } else {
            product["id"] = products[products.length - 1]["id"] + 1;
          }
          products.push(product);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(products, null, "\t")
          );
          return products;
        } else {
          console.log("El producto ya es parte de la lista");
        }
      } else {
        console.log("Falta información para añadir el producto");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        let products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product.id === id);
      if (myProduct != null) {
        return myProduct;
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product["id"] === id);
      if (myProduct != null) {
        myProduct.title = title;
        myProduct.description = description;
        myProduct.price = price;
        myProduct.thumbnail = thumbnail;
        myProduct.code = code;
        myProduct.stock = stock;
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      let myProduct = products.find((product) => product["id"] === id);
      if (myProduct != null) {
        products.splice(products.indexOf(myProduct), 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, "\t")
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}

//Testing

let fileName = "./src/Products.JSON";
let productos = new ProductManager(fileName);
const manager = new ProductManager("./src/Products.json");

// manager.addProduct("kit-kat","chocolate",250,"Sin imagen","abc001",30)
// manager.addProduct("kinder","chocolate",300,"Sin imagen","abc002",30)
// manager.addProduct("block","chocolate",170,"Sin imagen","abc003",30)
// manager.addProduct("shot","chocolate",200,"Sin imagen","abc004",30)
// manager.addProduct("milka","chocolate",230,"Sin imagen","abc005",30)
// manager.addProduct("cadbury","chocolate",250,"Sin imagen","abc006",30)
// manager.addProduct("hersheys","chocolate",325,"Sin imagen","abc007",30)
// manager.addProduct("vizzio","chocolate",370,"Sin imagen","abc008",30)
// manager.addProduct("milka leger","chocolate",200,"Sin imagen","abc009",30)
// manager.addProduct("arcor","chocolate",120,"Sin imagen","abc010",30)

export default new ProductManager("./src/Products.json");
