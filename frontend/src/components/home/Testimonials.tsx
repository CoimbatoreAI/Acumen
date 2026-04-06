import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Rajesh Kumar", role: "Business Owner", text: "SecureGuard installed a complete CCTV system for our warehouse. The quality and service were exceptional. Highly recommend their team!" },
  { name: "Sarah Williams", role: "Property Manager", text: "We've been using their access control systems across 3 buildings. Reliable, modern, and their support team is always responsive." },
  { name: "Ahmed Hassan", role: "Factory Manager", text: "The fire alarm system they installed has given us peace of mind. Professional installation and great after-sales service." },
];

export default function Testimonials() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Client Reviews</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-7 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-5 right-5" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{t.text}"</p>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
