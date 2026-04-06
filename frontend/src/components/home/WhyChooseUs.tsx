import { motion } from "framer-motion";
import { ShieldCheck, Clock, GraduationCap, Zap, Leaf, Search } from "lucide-react";

const reasons = [
  { icon: Clock, title: "Experience", desc: "Started a decade ago, our ultimate goal is to re innovate the concept of CCTV Camera Installation & Security Service Chennai" },
  { icon: ShieldCheck, title: "Material Quality", desc: "All the Electronics we use are from ISO Grade. We never compromise on the quality of work we do & we are transparent as well" },
  { icon: GraduationCap, title: "Trained Engineers", desc: "Every staff in our organization are trained well, from Electronic Engineers to Labours are trained regularly." },
  { icon: Zap, title: "Fastest Service", desc: "Fastest CCTV Installation Process than Industry standards." },
  { icon: Leaf, title: "Go Green", desc: "Choose Eco Friendly Product and save Environment. Our Products are certified" },
  { icon: Search, title: "Indepth Process", desc: "We go deep into the process to find out the loop holes & sort out the issue" },
];

export default function WhyChooseUs() {
  return (
    <section className="section-padding section-alt-bg">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Advantages</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why to Choose us?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-7"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-5">
                <r.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
