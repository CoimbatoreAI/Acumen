const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all gallery items
router.get('/', async (req, res) => {
    try {
        const galleryItems = await Gallery.find();
        res.json(galleryItems);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Create/Update gallery item (Admin Only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { label, _id } = req.body;
    const src = req.file ? req.file.path : undefined;

    try {
        let galleryItem;
        if (_id) {
            galleryItem = await Gallery.findById(_id);
        }

        if (galleryItem) {
            galleryItem.label = label || galleryItem.label;
            if (src) galleryItem.src = src;
            await galleryItem.save();
            return res.json(galleryItem);
        }

        if (!src) {
            return res.status(400).json({ msg: 'Image is required for new item' });
        }

        galleryItem = new Gallery({ label, src });
        await galleryItem.save();
        res.json(galleryItem);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete gallery item
router.delete('/:id', auth, async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Gallery item removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
