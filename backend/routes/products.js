const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().populate('category').populate('subCategory');
        res.json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Create/Update product (Admin Only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { name, desc, categoryId, subCategoryId, id, _id } = req.body;
    const image = req.file ? req.file.path : undefined;

    try {
        const category = await Category.findOne({ id: categoryId });
        if (!category) {
            return res.status(400).json({ msg: 'Category not found' });
        }

        const subCategory = await SubCategory.findOne({ id: subCategoryId });

        let product;
        if (_id) {
            product = await Product.findById(_id);
        } else {
            product = await Product.findOne({ id, category: category._id });
        }

        if (product) {
            // Update
            product.name = name || product.name;
            product.desc = desc || product.desc;
            product.category = category._id;
            if (subCategory) product.subCategory = subCategory._id;
            if (image) product.image = image;
            await product.save();
            return res.json(product);
        }

        // Create New
        product = new Product({
            name,
            desc,
            id,
            category: category._id,
            subCategory: subCategory ? subCategory._id : undefined,
            image,
        });

        await product.save();
        res.json(product);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete product
router.delete('/:id', auth, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Product removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
