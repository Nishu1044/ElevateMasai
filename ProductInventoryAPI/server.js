const http = require('http');
const productRoutes = require('./routes/productRoutes');


const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // res.write("hello")
    // res.end()
    productRoutes(req,res) // delegate routing logic
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 