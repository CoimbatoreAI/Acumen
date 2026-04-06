const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    image: { type: String }, // Path for blog post image
    date: { type: Date, default: Date.now },
    category: { type: String, required: true }, // Simple string category for blogs
});

module.exports = mongoose.model('Blog', BlogSchema);
