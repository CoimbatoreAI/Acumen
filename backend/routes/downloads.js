const express = require('express');
const router = express.Router();
const Download = require('../models/Download');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all downloads
router.get('/', async (req, res) => {
    try {
        const downloads = await Download.find();
        res.json(downloads);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Create/Update download (Admin Only)
router.post('/', [auth, upload.single('file')], async (req, res) => {
    const { title, description, edition, fileSize, _id } = req.body;
    const fileUrl = req.file ? req.file.path : undefined;

    try {
        let download;
        if (_id) {
            download = await Download.findById(_id);
        }

        if (download) {
            // Update
            if (title) download.title = title;
            if (description) download.description = description;
            if (edition) download.edition = edition;
            if (fileSize) download.fileSize = fileSize;
            if (fileUrl) download.fileUrl = fileUrl;
            await download.save();
            return res.json(download);
        }

        // Create New
        download = new Download({
            title,
            description,
            edition,
            fileSize,
            fileUrl,
        });

        await download.save();
        res.json(download);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete download
router.delete('/:id', auth, async (req, res) => {
    try {
        await Download.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Download removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
