const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  discountedPrice: { type: Number },
  discountPersent: { type: Number },
  brand: { type: String },
  colors: [
    {
      name: { type: String }, // Color name, e.g., Red, Blue
      sizes: [
        {
          size: { type: String }, // Size name, e.g., S, M, L
          quantity: { type: Number }, // Quantity for this size
        },
      ],
    },
  ],
  imageUrl: { type: String },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "ratings" }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "reviews" }],
  numRatings: { type: Number, default: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
