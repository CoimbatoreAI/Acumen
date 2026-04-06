import { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you! We will get back to you shortly.");
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <Layout>
      <section className="py-20 px-4 bg-foreground">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Reach Out</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-background mb-4">Contact Us</h1>
            <p className="text-background/60 max-w-2xl mx-auto">Have a question or need a quote? We'd love to hear from you.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Business Details</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: MapPin, title: "Address", text: "13/2, Purushothaman garden, Jai nagar 1st street Arumbakkam, chennai, tamil nadu - 600106" },
                  { icon: Phone, title: "Phone", text: "+91 72005 52551", link: "tel:+917200552551" },
                  { icon: WhatsAppIcon, title: "WhatsApp Chat", text: "+91 72005 52551", link: "https://wa.me/917200552551" },
                  { icon: Mail, title: "Email", text: "acumensecurity@gmail.com", link: "mailto:acumensecurity@gmail.com" },
                  { icon: ShieldCheck, title: "GSTIN", text: "33APHPB5989D1ZX" },
                  { icon: Clock, title: "Hours", text: "Mon - Sat: 9:00 AM - 6:00 PM" },
                ].map((item) => {
                  const Content = (
                    <div className="flex gap-4">
                      <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.text}</p>
                      </div>
                    </div>
                  );

                  return item.link ? (
                    <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                      {Content}
                    </a>
                  ) : (
                    <div key={item.title} className="block">
                      {Content}
                    </div>
                  );
                })}
              </div>
              <div className="rounded-xl overflow-hidden h-[300px] border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Office Location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
