const Category = require("../models/category.model");
const Product = require("../models/product.model");

// Create a new product
async function createProduct(reqData) {
  const category = await Category.findById(reqData.category);
  if (!category) throw new Error("Invalid category");

  const product = new Product({
    title: reqData.title,
    description: reqData.description,
    price: reqData.price,
    discountedPrice: reqData.discountedPrice,
    discountPersent: reqData.discountPersent,
    brand: reqData.brand,
    colors: reqData.colors,
    imageUrl: reqData.imageUrl,
    category: category._id,
  });

  const savedProduct = await product.save();
  return savedProduct;
}

// Delete a product by ID
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  if (!product) {
    throw new Error("Product not found with id: " + productId);
  }

  await Product.findByIdAndDelete(productId);

  return "Product deleted successfully";
}

// Update a product by ID
async function updateProduct(productId, reqData) {
  const updatedProduct = await Product.findByIdAndUpdate(productId, reqData, { new: true });
  return updatedProduct;
}

// Find a product by ID
async function findProductById(id) {
  const product = await Product.findById(id).populate("category").exec();

  if (!product) {
    throw new Error("Product not found with id: " + id);
  }
  return product;
}

// Get all products with filtering and pagination
async function getAllProducts(reqQuery) {
  const { category, color, size, minPrice, maxPrice, sort } = reqQuery;

  let query = Product.find().populate("category");

  if (category) {
    const categoryDoc = await Category.findById(category);

    if (categoryDoc) {
      query = query.where("category").equals(categoryDoc._id);
    }
  }

  if (color) {
    query = query.where("colors.name").equals(color);
  }

  if (size) {
    query = query.where("colors.sizes.size").equals(size);
  }

  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }

  if (sort) {
    query = query.sort({ price: sort === "price_high" ? -1 : 1 });
  }

  const products = await query.exec();
  return products;
}

async function createMultipleProduct(products) {
  for (let product of products) {
    await createProduct(product);
  }
}

async function deleteAllProducts() {
  await Product.deleteMany();
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
  deleteAllProducts
};
