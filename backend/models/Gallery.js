const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
    src: { type: String, required: true }, // Image URL or path
    label: { type: String, required: true }, // Label for the showcase
});

module.exports = mongoose.model('Gallery', GallerySchema);
