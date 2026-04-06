const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true, unique: true }, // Slug/ID
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
});

module.exports = mongoose.model('SubCategory', SubCategorySchema);
