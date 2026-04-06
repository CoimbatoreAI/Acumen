const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String }, // Path to the uploaded product image
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, // Links to Category
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }, // Link to SubCategory
    id: { type: String }, // Optional unique ID for products
});

module.exports = mongoose.model('Product', ProductSchema);
