import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-20 px-4 bg-primary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Need a Reliable Security Solution?
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
          Let our experts design a custom security system tailored to your needs. Get in touch today for a free consultation.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="px-7 py-3.5 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="tel:+15551234567"
            className="px-7 py-3.5 border-2 border-primary-foreground/30 text-primary-foreground rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </div>
      </motion.div>
    </section>
  );
}
