const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// Create/Update blog post (Admin Only)
router.post('/', [auth, upload.single('image')], async (req, res) => {
    const { title, excerpt, category, _id } = req.body;
    const image = req.file ? req.file.path : undefined;

    try {
        let blog;
        if (_id) {
            blog = await Blog.findById(_id);
        }

        if (blog) {
            // Update
            blog.title = title || blog.title;
            blog.excerpt = excerpt || blog.excerpt;
            blog.category = category || blog.category;
            if (image) blog.image = image;
            await blog.save();
            return res.json(blog);
        }

        // Create New
        blog = new Blog({
            title,
            excerpt,
            category,
            image,
        });

        await blog.save();
        res.json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Delete blog post
router.delete('/:id', auth, async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Blog post removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
