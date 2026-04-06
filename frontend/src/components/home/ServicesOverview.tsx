import { motion } from "framer-motion";
import { Camera, Fingerprint, Cpu, Flame } from "lucide-react";

const services = [
  { icon: Camera, title: "CCTV Surveillance", desc: "HD and IP camera systems with remote monitoring, motion detection, and cloud storage capabilities." },
  { icon: Fingerprint, title: "Access Control Systems", desc: "Biometric, card-based, and smart access solutions for offices, buildings, and restricted areas." },
  { icon: Cpu, title: "Automation Solutions", desc: "Automatic doors, gate motors, boom barriers, and emergency lighting for seamless facility management." },
  { icon: Flame, title: "Fire Safety Systems", desc: "Advanced fire detection, wired and wireless alarm systems for commercial and residential properties." },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Core Services</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-7 hover-lift cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                <s.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
