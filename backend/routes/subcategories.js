const express = require('express');
const router = express.Router();
const SubCategory = require('../models/SubCategory');
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Get all subcategories
router.get('/', async (req, res) => {
    try {
        const subCategories = await SubCategory.find().populate('category');
        res.json(subCategories);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Create/Update subcategory (Admin Only)
router.post('/', auth, async (req, res) => {
    const { title, id, categoryId, _id } = req.body;

    try {
        const category = await Category.findOne({ id: categoryId });
        if (!category) {
            return res.status(400).json({ msg: 'Category not found' });
        }

        let subCategory;
        if (_id) {
            subCategory = await SubCategory.findById(_id);
        } else {
            subCategory = await SubCategory.findOne({ id });
        }

        if (subCategory) {
            // Update
            subCategory.title = title || subCategory.title;
            subCategory.category = category._id;
            if (id) subCategory.id = id;
            await subCategory.save();
            return res.json(subCategory);
        }

        // Create New
        subCategory = new SubCategory({
            title,
            id,
            category: category._id,
        });

        await subCategory.save();
        res.json(subCategory);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete subcategory
router.delete('/:id', auth, async (req, res) => {
    try {
        await SubCategory.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Subcategory removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
