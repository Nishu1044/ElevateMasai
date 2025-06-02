const { getProducts, addProducts, updateProduct, deleteProduct } = require("../controllers/productController");


function productRoutes(req,res){
    const url = new URL(req.url, `http://${req.headers.host}`)
    const path = url.pathname
    const method = req.method
    const query = Object.fromEntries(url.searchParams.entries());


    // Routes for get request

    if(path === '/products' && method === "GET"){
        return getProducts(req,res,query)
    }

      // POST - Add product
    if (path === '/Addproducts' && method === "POST") {
        return addProducts(req, res);
    }


     //Update a product by ID
     if(path.startsWith("/products/") && method === 'PUT'){
        const id = path.split("/")[2];
        return updateProduct(req,res,id);
     }

     // DELETE - Delete a product by ID
  if (path.startsWith("/products/") && method === "DELETE") {
    const id = path.split("/")[2]; // extract ID from /products/:id
    return deleteProduct(req, res, id);
  }


    //  if no products matches:
    res.writeHead(404, {"Content-Type": "application/json"})
    res.end(JSON.stringify({message:"Route not found"}))
}

module.exports = productRoutes;