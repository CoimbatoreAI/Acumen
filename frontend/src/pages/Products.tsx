import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Camera, Fingerprint, Cpu, Flame, ChevronRight, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/config";

const IconMap: any = {
  Camera,
  Fingerprint,
  Cpu,
  Flame,
};

const Products = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsResp, prodsResp] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/products`),
        ]);
        const cats = await catsResp.json();
        const prods = await prodsResp.json();
        setCategories(cats);
        setProducts(prods);
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 px-4 bg-foreground">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Products</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-background mb-4">Security Solutions</h1>
            <p className="text-background/60 max-w-2xl mx-auto">Explore our comprehensive range of security, automation, and fire safety products.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto space-y-20">
          {categories.map((cat, ci) => {
            const catProducts = products.filter((p) => p.category?._id === cat._id || p.category?.id === cat.id);
            const Icon = IconMap[cat.icon] || Camera;

            return (
              <motion.div
                key={cat.id}
                id={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="sticky top-28">
                      <div className="rounded-xl overflow-hidden aspect-[4/3] mb-5 bg-muted">
                        <img
                          src={cat.image ? `${API_URL}/${cat.image}` : `https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800`}
                          alt={cat.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground">{cat.title}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-4">
                    {catProducts.map((product) => (
                      <div
                        key={product._id}
                        id={product.id}
                        className="bg-card border border-border rounded-xl p-6 hover-lift group cursor-pointer"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex gap-4">
                            {product.image && (
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                <img src={`${API_URL}/${product.image}`} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                              <p className="text-sm text-muted-foreground leading-relaxed">{product.desc}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 flex-shrink-0" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {ci < categories.length - 1 && <div className="border-t border-border mt-16" />}
              </motion.div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Products;

