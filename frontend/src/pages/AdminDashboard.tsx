import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";
import {
    Camera,
    Trash2,
    Plus,
    Search,
    LayoutDashboard,
    Image,
    Package,
    FileText,
    Download,
    LogOut,
    Upload,
    Loader2,
    FileDown,
    BookOpen,
    Edit2
} from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/config";

interface AdminDashboardProps { }

type TabType = "gallery" | "products" | "categories" | "subcategories" | "blogs" | "downloads";

const AdminDashboard = (props: AdminDashboardProps) => {
    const [activeTab, setActiveTab] = useState<TabType>("gallery");
    const [data, setData] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [subCategories, setSubCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
    const navigate = useNavigate();

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!token) {
            navigate("/admin");
        } else {
            fetchData();
            if (activeTab === 'products' || activeTab === 'subcategories') {
                fetchCategories();
            }
            if (activeTab === 'products') {
                fetchSubCategories();
            }
        }
    }, [activeTab, token]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = `${API_URL}/api/${activeTab}`;
            const resp = await fetch(endpoint);
            const items = await resp.json();
            setData(Array.isArray(items) ? items : []);
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const resp = await fetch(`${API_URL}/api/categories`);
            const cats = await resp.json();
            setCategories(cats);
        } catch (err) { }
    }

    const fetchSubCategories = async () => {
        try {
            const resp = await fetch(`${API_URL}/api/subcategories`);
            const subs = await resp.json();
            setSubCategories(subs);
        } catch (err) { }
    }

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        setToken(null);
        navigate("/admin");
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const resp = await fetch(`${API_URL}/api/${activeTab}/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (resp.ok) {
                toast.success("Item deleted successfully");
                fetchData();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setFormData({
            ...item,
            categoryId: item.category?.id || item.category,
            subCategoryId: item.subCategory?.id || item.subCategory
        });
        setShowModal(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData();

        Object.entries(formData).forEach(([key, value]: [string, any]) => {
            if (value !== null && value !== undefined) {
                form.append(key, value);
            }
        });

        if (editingItem) {
            form.append('_id', editingItem._id);
        }

        if (file) {
            form.append(activeTab === 'downloads' ? 'file' : 'image', file);
        }

        try {
            const resp = await fetch(`${API_URL}/api/${activeTab}`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: form,
            });

            if (resp.ok) {
                toast.success(editingItem ? "Item updated successfully" : "Item created successfully");
                setShowModal(false);
                setEditingItem(null);
                setFormData({});
                setFile(null);
                fetchData();
            } else {
                const errData = await resp.json();
                toast.error(errData.msg || "Save failed");
            }
        } catch (err) {
            toast.error("Error saving data");
        } finally {
            setLoading(false);
        }
    };


    const tabs = [
        { id: "gallery", label: "Gallery", icon: Image },
        { id: "products", label: "Products", icon: Package },
        { id: "categories", label: "Categories", icon: LayoutDashboard },
        { id: "subcategories", label: "Subcategories", icon: Search },
        { id: "blogs", label: "Blogs", icon: FileText },
        { id: "downloads", label: "Downloads", icon: Download },
    ];

    return (
        <Layout>
            <div className="min-h-screen pt-28 pb-10 px-4 bg-muted/20">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                            <p className="text-muted-foreground">Manage your website content with precision</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-5 py-2.5 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-white transition-all font-semibold"
                        >
                            <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Tabs */}
                        <div className="lg:col-span-1 space-y-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                        ? "bg-primary text-primary-foreground shadow-md"
                                        : "bg-card hover:bg-muted text-muted-foreground border border-border"
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-foreground capitalize">{activeTab}</h2>
                                <button
                                    onClick={() => {
                                        setFormData({});
                                        setEditingItem(null);
                                        setFile(null);
                                        setShowModal(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:scale-105 transition-transform"
                                >
                                    <Plus className="w-5 h-5" /> Add {activeTab === 'categories' ? 'Category' : activeTab === 'subcategories' ? 'Subcategory' : activeTab.slice(0, -1)}
                                </button>
                            </div>

                            {/* Data Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <AnimatePresence mode="popLayout">
                                    {loading ? (
                                        <div className="col-span-full py-20 flex justify-center">
                                            <Loader2 className="w-10 h-10 animate-spin text-primary" />
                                        </div>
                                    ) : data.length > 0 ? (
                                        data.map((item) => (
                                            <motion.div
                                                key={item._id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="bg-card border border-border rounded-xl p-5 group relative overflow-hidden"
                                            >
                                                <div className="flex gap-4">
                                                    {item.src || item.image || item.fileUrl ? (
                                                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                                            <img
                                                                src={item.src || item.image ? `${API_URL}/${item.src || item.image}` : "https://placehold.co/100x100?text=File"}
                                                                className="w-full h-full object-cover"
                                                                onError={(e: any) => e.target.src = "https://placehold.co/100x100?text=File"}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                                                            <Package className="w-8 h-8 text-primary" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0 pr-12">
                                                        <h3 className="font-bold text-foreground truncate">{item.title || item.name || item.label}</h3>
                                                        <p className="text-xs text-primary font-semibold mb-1">
                                                            {item.category?.title || item.category || ""} {item.subCategory ? `> ${item.subCategory.title || item.subCategory}` : ""}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.desc || item.excerpt || item.description || item.id}</p>
                                                    </div>
                                                </div>
                                                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-2 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive hover:text-white transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-20 text-center text-muted-foreground bg-card border border-dashed rounded-2xl">
                                            No items found. Create something new!
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-card border border-border w-full max-w-lg rounded-2xl p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
                    >
                        <h2 className="text-2xl font-bold mb-6">{editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {activeTab === 'gallery' && (
                                <>
                                    <input type="text" placeholder="Label" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.label || ""} onChange={e => setFormData({ ...formData, label: e.target.value })} />
                                </>
                            )}
                            {activeTab === 'products' && (
                                <>
                                    <input type="text" placeholder="Product Name" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.name || ""} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    <textarea placeholder="Description" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.desc || ""} onChange={e => setFormData({ ...formData, desc: e.target.value })} />
                                    <input type="text" placeholder="unique-id" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.id || ""} onChange={e => setFormData({ ...formData, id: e.target.value })} />
                                    <select className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.categoryId || ""} onChange={e => setFormData({ ...formData, categoryId: e.target.value })}>
                                        <option value="">Select Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                    <select className="w-full p-3 bg-muted rounded-lg outline-none" value={formData.subCategoryId || ""} onChange={e => setFormData({ ...formData, subCategoryId: e.target.value })}>
                                        <option value="">Select Subcategory (Optional)</option>
                                        {subCategories.filter(s => s.category?.id === formData.categoryId || s.category === formData.categoryId).map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                                    </select>
                                </>
                            )}
                            {activeTab === 'categories' && (
                                <>
                                    <input type="text" placeholder="Category Title" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <input type="text" placeholder="id (slug)" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.id || ""} onChange={e => setFormData({ ...formData, id: e.target.value })} />
                                    <input type="text" placeholder="Icon Name (Camera, Fingerprint, Cpu, Flame)" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.icon || ""} onChange={e => setFormData({ ...formData, icon: e.target.value })} />
                                </>
                            )}
                            {activeTab === 'subcategories' && (
                                <>
                                    <input type="text" placeholder="Subcategory Title" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <input type="text" placeholder="id (slug)" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.id || ""} onChange={e => setFormData({ ...formData, id: e.target.value })} />
                                    <select className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.categoryId || ""} onChange={e => setFormData({ ...formData, categoryId: e.target.value })}>
                                        <option value="">Select Parent Category</option>
                                        {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                    </select>
                                </>
                            )}
                            {activeTab === 'blogs' && (
                                <>
                                    <input type="text" placeholder="Blog Title" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <textarea placeholder="Excerpt" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.excerpt || ""} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} />
                                    <input type="text" placeholder="Category" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.category || ""} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                </>
                            )}
                            {activeTab === 'downloads' && (
                                <>
                                    <input type="text" placeholder="Catalogue Title" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                    <textarea placeholder="Description" className="w-full p-3 bg-muted rounded-lg outline-none" required value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    <input type="text" placeholder="Edition (e.g. 2024 Edition)" className="w-full p-3 bg-muted rounded-lg outline-none" value={formData.edition || ""} onChange={e => setFormData({ ...formData, edition: e.target.value })} />
                                    <input type="text" placeholder="File Size (e.g. 12 MB)" className="w-full p-3 bg-muted rounded-lg outline-none" value={formData.fileSize || ""} onChange={e => setFormData({ ...formData, fileSize: e.target.value })} />
                                </>
                            )}

                            <div className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:bg-muted/50 transition-all">
                                <input type="file" className="hidden" id="file-upload" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} />
                                <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                                    <Upload className="w-8 h-8 text-primary mb-2" />
                                    <span className="text-sm font-semibold">{file ? file.name : editingItem ? "Change file/image (optional)" : "Click to upload file/image"}</span>
                                </label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 border border-border rounded-lg font-bold hover:bg-muted">Cancel</button>
                                <button type="submit" disabled={loading} className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg font-bold flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : editingItem ? "Update Changes" : "Save Item"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </Layout>
    );
};

export default AdminDashboard;
