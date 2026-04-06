import { motion } from "framer-motion";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Live Projects" },
  { value: "200+", label: "Customers" },
  { value: "98%", label: "Satisfaction" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="text-center"
            >
              <p className="text-4xl md:text-5xl font-extrabold text-primary mb-2">{s.value}</p>
              <p className="text-sm text-background/60 font-medium">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
