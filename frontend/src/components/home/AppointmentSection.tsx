import { motion } from "framer-motion";
import { Send, Phone, MapPin, User, FileText } from "lucide-react";

export default function AppointmentSection() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd handle form submission here
        alert("Appointment request sent! We will contact you soon.");
    };

    return (
        <section className="section-padding bg-muted/30" id="appointment">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-card border border-border p-8 rounded-2xl shadow-xl"
                    >
                        <h2 className="text-3xl font-bold text-foreground mb-8">Make an Appointment</h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-foreground ml-1">Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Your Full Name"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="mobile" className="text-sm font-medium text-foreground ml-1">Mobile Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        id="mobile"
                                        type="tel"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="requirement" className="text-sm font-medium text-foreground ml-1">Requirement</label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                                    <textarea
                                        id="requirement"
                                        required
                                        rows={4}
                                        className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                                        placeholder="Describe your security needs..."
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="location" className="text-sm font-medium text-foreground ml-1">Which Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        id="location"
                                        type="text"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                        placeholder="Area, Street or City"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group"
                            >
                                <span>Send</span>
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Ready to Secure?</p>
                            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Why wait? Let's get started.</h2>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Contact Acumen for a free consultation and evaluation of your security needs.
                            Our expert engineers are ready to design and install the perfect surveillance
                            system tailored for your property.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">Fast Support</p>
                                    <p className="text-xl font-bold text-foreground">+91 81220 04245</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
