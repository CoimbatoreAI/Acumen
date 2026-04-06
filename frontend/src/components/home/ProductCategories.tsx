import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import categorySecurity from "@/assets/category-security.jpg";
import categoryAccess from "@/assets/category-access.jpg";
import categoryAutomation from "@/assets/category-automation.jpg";
import categoryFire from "@/assets/category-fire.jpg";

const categories = [
  { title: "Security", image: categorySecurity, href: "/products#security" },
  { title: "Access Control", image: categoryAccess, href: "/products#access-control" },
  { title: "Automations", image: categoryAutomation, href: "/products#automations" },
  { title: "Fire Safety", image: categoryFire, href: "/products#fire" },
];

export default function ProductCategories() {
  return (
    <section className="section-padding section-alt-bg">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Browse By Category</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Product Categories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to={cat.href}
                className="group relative block rounded-xl overflow-hidden aspect-[4/3] hover-lift"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-background">{cat.title}</h3>
                  <p className="text-sm text-background/70 mt-1">Explore products →</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
