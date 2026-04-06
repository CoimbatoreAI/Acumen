const mongoose = require('mongoose');

const DownloadSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    edition: { type: String }, // e.g., "2024 Edition"
    fileType: { type: String, default: "PDF" },
    fileSize: { type: String }, // e.g., "12.5 MB"
    fileUrl: { type: String, required: true }, // Path to the downloadable file
});

module.exports = mongoose.model('Download', DownloadSchema);
