const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');
const Admin = require('../models/Admin');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const Product = require('../models/Product');
const Gallery = require('../models/Gallery');
const Blog = require('../models/Blog');
const Download = require('../models/Download');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const seedData = async () => {
    console.log('Starting Thorough Seeding Process...');
    try {
        console.log('Connecting to MongoDB: ', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected.');

        // Clear existing data
        await Admin.deleteMany({});
        await Category.deleteMany({});
        await SubCategory.deleteMany({});
        await Product.deleteMany({});
        await Gallery.deleteMany({});
        await Blog.deleteMany({});
        await Download.deleteMany({});
        console.log('Existing collections cleared.');

        // 1. Create Admin
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
        await Admin.create({
            email: process.env.ADMIN_EMAIL,
            password: adminPassword,
        });
        console.log(`Admin Created: ${process.env.ADMIN_EMAIL}`);

        // 2. Seed Categories
        const categoriesData = [
            { id: 'security', title: 'Security', icon: 'Camera', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800' },
            { id: 'access-control', title: 'Access Control', icon: 'Fingerprint', image: 'https://images.unsplash.com/photo-1590012314607-cda9d9b6a919?auto=format&fit=crop&q=80&w=800' },
            { id: 'automations', title: 'Automations', icon: 'Cpu', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800' },
            { id: 'fire', title: 'Fire Safety', icon: 'Flame', image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800' },
        ];
        const createdCategories = await Category.insertMany(categoriesData);
        console.log('Categories seeded.');

        // 3. Seed SubCategories
        const subCategoriesData = [
            { id: 'cctv-surveillance', title: 'Surveillance', categoryId: 'security' },
            { id: 'maintenance', title: 'Maintenance', categoryId: 'security' },
            { id: 'biometric-systems', title: 'Biometrics', categoryId: 'access-control' },
            { id: 'rfid-systems', title: 'RFID Systems', categoryId: 'access-control' },
            { id: 'door-operators', title: 'Door Operators', categoryId: 'automations' },
            { id: 'gate-automation', title: 'Gate Automation', categoryId: 'automations' },
            { id: 'barrier-systems', title: 'Barriers', categoryId: 'automations' },
            { id: 'emergency-lighting', title: 'Lighting', categoryId: 'automations' },
            { id: 'alarm-panels', title: 'Alarm Panels', categoryId: 'fire' },
            { id: 'wireless-solutions', title: 'Wireless Solutions', categoryId: 'fire' },
        ];
        const createdSubCategories = [];
        for (const s of subCategoriesData) {
            const cat = createdCategories.find(c => c.id === s.categoryId);
            const sub = await SubCategory.create({ ...s, category: cat._id });
            createdSubCategories.push(sub);
        }
        console.log('Subcategories seeded.');

        // 4. Seed Products
        const productsData = [
            // Security
            { name: "CCTV Surveillance", desc: "HD & IP cameras with remote viewing, night vision, and motion detection.", id: "cctv", categoryId: "security", subCategoryId: 'cctv-surveillance' },
            { name: "AMC (Annual Maintenance Contract)", desc: "Comprehensive maintenance packages to keep your systems running optimally.", id: "amc", categoryId: "security", subCategoryId: 'maintenance' },
            { name: "Best Solar CCTV Camera for Farms", desc: "Solar-powered cameras designed for remote farm surveillance with no wiring needed.", id: "solar-cctv", categoryId: "security", subCategoryId: 'cctv-surveillance' },

            // Access Control
            { name: "Biometric Access Systems", desc: "Fingerprint and facial recognition systems for secure entry management.", id: "biometric-access", categoryId: "access-control", subCategoryId: 'biometric-systems' },
            { name: "Card & RFID Readers", desc: "Proximity cards and RFID-based access control for offices and buildings.", id: "card-rfid", categoryId: "access-control", subCategoryId: 'rfid-systems' },

            // Automations
            { name: "Automatic Sliding Glass Door Operator", desc: "Smooth, sensor-activated sliding door systems for commercial entrances.", id: "sliding-door", categoryId: "automations", subCategoryId: 'door-operators' },
            { name: "Electric Gate Motors", desc: "Powerful motors for automatic gate operation with remote control.", id: "gate-motors", categoryId: "automations", subCategoryId: 'gate-automation' },
            { name: "Swing Door Operators", desc: "Automated swing door systems for hands-free entry.", id: "swing-door", categoryId: "automations", subCategoryId: 'door-operators' },
            { name: "Automatic Boom Barrier", desc: "Vehicle access control barriers for parking and secure areas.", id: "boom-barrier", categoryId: "automations", subCategoryId: 'barrier-systems' },
            { name: "Emergency Lighting", desc: "Reliable emergency and exit lighting systems for safety compliance.", id: "emergency-lights", categoryId: "automations", subCategoryId: 'emergency-lighting' },

            // Fire Safety
            { name: "Fire Alarm System", desc: "Conventional and addressable fire alarm panels with smoke and heat detectors.", id: "fire-alarm", categoryId: "fire", subCategoryId: 'alarm-panels' },
            { name: "Wireless Fire Alarm System", desc: "Easy-to-install wireless fire detection and notification systems.", id: "wireless-fire", categoryId: "fire", subCategoryId: 'wireless-solutions' },
        ];

        for (const p of productsData) {
            const cat = createdCategories.find(c => c.id === p.categoryId);
            const sub = createdSubCategories.find(s => s.id === p.subCategoryId);
            await Product.create({
                name: p.name,
                desc: p.desc,
                id: p.id,
                category: cat._id,
                subCategory: sub ? sub._id : undefined
            });
        }
        console.log('Products seeded.');

        // 5. Seed Gallery
        const galleryItems = [
            { label: 'CCTV Installations', src: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800' },
            { label: 'Control Rooms', src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=800' },
            { label: 'Boom Barriers', src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800' },
            { label: 'Outdoor Cameras', src: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800' },
            { label: 'Access Panels', src: 'https://images.unsplash.com/photo-1590012314607-cda9d9b6a919?auto=format&fit=crop&q=80&w=800' },
        ];
        await Gallery.insertMany(galleryItems);
        console.log('Gallery seeded.');

        // 6. Seed Blogs
        const blogs = [
            { title: 'Top 5 CCTV Systems for Small Businesses in 2024', excerpt: 'Discover the most reliable and cost-effective CCTV systems designed specifically for small business security needs.', category: 'Security' },
            { title: 'Why Every Building Needs a Fire Alarm System', excerpt: 'Understanding fire safety regulations and how modern fire alarm systems protect lives and property.', category: 'Fire Safety' },
            { title: 'The Future of Smart Building Automation', excerpt: 'How automation technology is transforming building management, energy efficiency, and security.', category: 'Automation' },
        ];
        await Blog.insertMany(blogs);
        console.log('Blogs seeded.');

        // 7. Seed Downloads
        const downloads = [
            {
                title: 'Product Catalogue',
                description: 'Download our comprehensive product catalogue featuring our complete range of security cameras, access control systems, automation products, and fire safety equipment with specifications and pricing.',
                edition: '2024 Edition',
                fileSize: '12.5 MB',
                fileUrl: '#'
            },
        ];
        await Download.insertMany(downloads);
        console.log('Downloads seeded.');

        console.log('Database seeded fully and properly.');
    } catch (err) {
        console.error('SEEDING ERROR:', err);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB Disconnected.');
    }
};

seedData();
