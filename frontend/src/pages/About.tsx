import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Target, Eye, Award, Users, CheckCircle } from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";

const About = () => (
  <Layout>
    {/* Hero */}
    <section className="py-20 px-4 bg-foreground">
      <div className="container mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">About Us</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-background mb-4">Who We Are</h1>
          <p className="text-background/60 max-w-2xl mx-auto">Pioneering advanced security solutions for over a decade, protecting homes and businesses with cutting-edge technology.</p>
        </motion.div>
      </div>
    </section>

    {/* Overview */}
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src={aboutTeam} alt="Our team" loading="lazy" width={1200} height={800} className="rounded-xl shadow-lg w-full" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Story</p>
            <h2 className="text-3xl font-bold text-foreground mb-4">A Decade of Trusted Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded in 2014, SecureGuard has grown from a small security consultancy to one of the region's leading providers of comprehensive security solutions. Our journey has been defined by innovation, quality, and an unwavering commitment to client safety.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We specialize in CCTV surveillance, access control systems, building automation, and fire safety — delivering end-to-end solutions from design and installation to maintenance and support.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Licensed & Certified", "24/7 Support", "Nationwide Coverage", "Premium Brands"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding section-alt-bg">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { icon: Target, title: "Our Mission", text: "To provide innovative, reliable, and affordable security solutions that protect what matters most to our clients. We strive to set new standards in the security industry through quality products and exceptional service." },
            { icon: Eye, title: "Our Vision", text: "To become the most trusted name in security solutions across the region, known for technological excellence, customer satisfaction, and our commitment to creating safer communities for everyone." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8"
            >
              <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Experience Highlights */}
    <section className="section-padding">
      <div className="container mx-auto text-center">
        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Experience</p>
        <h2 className="text-3xl font-bold text-foreground mb-12">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: Award, title: "Certified Experts", desc: "Our technicians hold industry certifications and undergo regular training." },
            { icon: Users, title: "Dedicated Support", desc: "A dedicated account manager for every client ensures personalized service." },
            { icon: Target, title: "Custom Solutions", desc: "Every project is tailored to the unique needs and budget of the client." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-6"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
