const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    id: { type: String, required: true, unique: true }, // Slug/ID used in frontend
    icon: { type: String }, // Icon name from lucide-react (string)
    image: { type: String }, // Path to the uploaded image
});

module.exports = mongoose.model('Category', CategorySchema);
