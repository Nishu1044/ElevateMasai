const products = require("../data/products");
const { readProducts, writeProducts } = require("../utils/fileOperations");
const sendJson = require("../utils/sendjson");



function getProducts(req, res, query) {
  const products = readProducts();

    let result = products;
    const { name, category, minPrice, maxPrice } = query;

    if (name) {
        result = result.filter(item => 
            item.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (category) {
        result = result.filter(item => 
            item.category?.toLowerCase() === category.toLowerCase()
        );
    }

    if (minPrice) {
        result = result.filter(item => item.price >= Number(minPrice));
    }

    if (maxPrice) {
        result = result.filter(item => item.price <= Number(maxPrice));
    }

    sendJson(res, 200, result);
}

function addProducts(req, res) {
      const products = readProducts();
    let body = ""

    req.on("data", chunk => {
        body += chunk.toString();
    });

    // when body is fully received
    req.on("end", () => {
        try {
            const { name, price, quantity, category } = JSON.parse(body);

            // validation 
            if (!name || !price || !quantity) {
                return sendJson(res, 400, { message: "All fields (name, price, quantity) are required" })
            }

            const newProducts = {
                id: Date.now().toString(), // simple id
                name,
                price: +price,
                quantity: +quantity,
                category: category || "General",
            }
            products.push(newProducts)
            writeProducts(products);
            sendJson(res, 201, { message: "Product added", product: newProducts })

        } catch (error) {
            sendJson(res, 400, { message: "Invalid JSON" });
        }
    })
}


// ✅ PUT - Update product

function updateProduct(req, res, id) {
  let body = "";

  req.on("data", chunk => {
    body += chunk.toString();
  });

  req.on("end", () => {
     const products = readProducts();
    try {
      const updatedData = JSON.parse(body);
      const index = products.findIndex(p => p.id.toString() === id.toString());


      if (index === -1) {
        return sendJson(res, 404, { message: "Product not found" });
      }

      const { name, price, quantity } = updatedData;
      if (!name || !price || !quantity) {
        return sendJson(res, 400, { message: "All fields are required" });
      }

      // Update the product
     products[index] = { id, name, price: +price, quantity: +quantity };

      writeProducts(products);
      return sendJson(res, 200, { message: "Product updated", product: products[index] });

    } catch (error) {
      return sendJson(res, 400, { message: "Invalid JSON" });
    }
  });
}

// DELETE - Remove product
function deleteProduct(req, res, id) {
     let products = readProducts();
    const index = products.findIndex(p => p.id.toString() === id.toString());

    if (index === -1) return sendJson(res, 404, { message: "Product not found" });

    const deleted = products.splice(index, 1);
    writeProducts(products);
    sendJson(res, 200, { message: "Product deleted", product: deleted[0] });
}

module.exports = { getProducts, addProducts, updateProduct, deleteProduct }