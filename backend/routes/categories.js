const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Create/Update category (Admin Only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { title, id, icon, _id } = req.body;
    const image = req.file ? req.file.path : undefined;

    try {
        let category;
        if (_id) {
            category = await Category.findById(_id);
        } else {
            category = await Category.findOne({ id });
        }

        if (category) {
            // Update
            category.title = title || category.title;
            category.icon = icon || category.icon;
            if (id) category.id = id;
            if (image) category.image = image;
            await category.save();
            return res.json(category);
        }

        // Create New
        category = new Category({
            title,
            id,
            icon,
            image,
        });

        await category.save();
        res.json(category);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete category
router.delete('/:id', auth, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Category removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
