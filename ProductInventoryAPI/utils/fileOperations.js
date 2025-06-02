const fs = require('fs');
const path = './data/products.json'; 

function readProducts() {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
}

function writeProducts(products) {
  fs.writeFileSync(path, JSON.stringify(products, null, 2));
}

module.exports = { readProducts, writeProducts };
