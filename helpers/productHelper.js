const ProductModel = require("../models/Products");

module.exports = {
  addProduct: async (product) => {
    const newProduct = ProductModel(product);
    //const savedProduct =
    await newProduct.save()
    //console.log(savedProduct)
  },
};
