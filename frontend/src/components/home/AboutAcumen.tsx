import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function AboutAcumen() {
    return (
        <section className="section-padding bg-card">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Founder</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Acumen</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                            <p>
                                Our founder, Engineer have achieved greater heights by empowering Technicians to Entrepreneur level.
                                He Founded Acumen to Protect the Society by Installing High Security cameras.
                                Our Products are recognised by corporates, temples, schools and colleges.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                <div className="p-4 rounded-lg bg-accent/30 border border-border">
                                    <h4 className="font-bold text-primary mb-1 text-sm uppercase">Fastest Service</h4>
                                    <p className="text-xs">Fastest CCTV Installation process than industry standards.</p>
                                </div>
                                <div className="p-4 rounded-lg bg-accent/30 border border-border">
                                    <h4 className="font-bold text-primary mb-1 text-sm uppercase">Go Green</h4>
                                    <p className="text-xs">Choose an Eco Friendly Product to save environmental Problems.</p>
                                </div>
                                <div className="p-4 rounded-lg bg-accent/30 border border-border">
                                    <h4 className="font-bold text-primary mb-1 text-sm uppercase">Indepth Process</h4>
                                    <p className="text-xs">We go deep into the Process to find out loop holes and sort out the issue.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Award className="w-6 h-6" />
                            </div>
                            <p className="font-semibold text-foreground">A Decade of Excellence in Security</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1557597774-9d2739f85a76?auto=format&fit=crop&q=80&w=1200"
                                alt="Acumen Security Solutions"
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-8 rounded-xl shadow-xl hidden md:block">
                            <p className="text-4xl font-bold mb-1">10+</p>
                            <p className="text-sm font-medium opacity-90 uppercase tracking-wider">Years of Experience</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
