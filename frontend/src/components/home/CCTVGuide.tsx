import { motion } from "framer-motion";
import { Camera, Shield, Eye, Settings, Sun, Moon, Wifi, Cpu } from "lucide-react";

export default function CCTVGuide() {
    return (
        <section className="section-padding bg-background">
            <div className="container mx-auto">
                <div className="mb-14">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">CCTV Camera Dealers in Chennai</h2>
                    <p className="text-xl text-primary font-semibold"># Residential, Commercial & Industrial Projects</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                            <Shield className="text-primary w-7 h-7" /> Introduction
                        </h3>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Closed Circuit Television, a video surveillance is the method to monitor special places.
                                The evolution of CCTV cameras has been increasing more in this decade due to high risk
                                in smugglers, thiefs, anti-social elements & terrorists.
                            </p>
                            <p>
                                In earlier days shops, malls, theatres, hospitals, gateways were the major buyer of CCTV cameras.
                                But due to the threat, even small individual houses are using Video Surveillance systems today.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-accent/20 p-8 rounded-2xl border border-border"
                    >
                        <h3 className="text-2xl font-bold mb-6">Types of CCTV Camera</h3>
                        <p className="text-muted-foreground mb-6">
                            Choose the right brand and type of CCTV camera that suits your needs.
                            From Dome to Wireless, we have them all.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {["Dome", "Bullet", "C-Mount", "PTZ", "Day Night", "InfraRed", "IP Camera", "Wireless"].map(type => (
                                <span key={type} className="px-3 py-1 bg-background border border-border rounded-full text-sm font-medium">
                                    {type}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Detailed Types */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                        {
                            title: "Dome CCTV Camera",
                            icon: Camera,
                            desc: "Named for its shape, it creates an illusion making it hard to see where it's pointing. Ideal for 360-degree indoor/outdoor view. Commonly used in Shops, Malls, Houses, and Hospitals."
                        },
                        {
                            title: "Bullet CCTV Camera",
                            icon: Settings,
                            desc: "A tough, cylindrical machine built for outdoor use. Weather and heat resistant with a very high shootout range. Suitable for Industries, Roads, and Police Stations."
                        },
                        {
                            title: "C-Mount Camera",
                            icon: Shield,
                            desc: "Similar to Bullet but with swappable lenses. Can cover 40-50 feet. Highly visible and ideal for long-view shootout like Roads and Stadiums."
                        },
                        {
                            title: "PTZ (Pan Tilt Zoom)",
                            icon: Eye,
                            desc: "Totally dynamic control. Move right, left, up, and down with deep zoom capabilities. Features face detection and 360-degree view for Museums and Malls."
                        }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 border border-border rounded-xl hover:shadow-lg transition-all bg-card"
                        >
                            <item.icon className="w-10 h-10 text-primary mb-4" />
                            <h4 className="text-lg font-bold mb-3">{item.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                    <div className="lg:col-span-1 space-y-6">
                        <div className="p-6 bg-primary text-primary-foreground rounded-xl">
                            <h4 className="font-bold flex items-center gap-2 mb-2"><Sun className="w-5 h-5" /><Moon className="w-5 h-5" /> Day Night Camera</h4>
                            <p className="text-sm opacity-90">Great clarity regardless of temperature or light. Works clearly in both day and night conditions.</p>
                        </div>
                        <div className="p-6 bg-foreground text-background rounded-xl">
                            <h4 className="font-bold flex items-center gap-2 mb-2"><Eye className="w-5 h-5" /> Infrared Cameras</h4>
                            <p className="text-sm opacity-90">Can work in pitch black and rough fog conditions, ensuring security never stops.</p>
                        </div>
                        <div className="p-6 bg-accent border border-border rounded-xl">
                            <h4 className="font-bold flex items-center gap-2 mb-2 text-foreground"><Wifi className="w-5 h-5" /> Wireless Cameras</h4>
                            <p className="text-sm text-muted-foreground">Reduces installation cost significantly, especially for large areas (up to 2 lakh sq ft).</p>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <h3 className="text-3xl font-bold mb-8">Major CCTV Brands</h3>
                        <div className="space-y-6">
                            {[
                                { name: "Hikvision", share: "21%", desc: "World's biggest manufacturer. Highlights include Network Products, Turbo HD, Access Control, and Thermal CCTV." },
                                { name: "Bosch", share: "10%", desc: "Established in 1886. Targeted at high-end customers with astonishing technology like IP and Analog cameras." },
                                { name: "Dahua", share: "5.7%", desc: "Wide range including HDCVI, PTZ, Thermal, and Machine Vision software. Headquartered in China." },
                                { name: "Samsung", share: "6%", desc: "Security solutions leveraging mobile phone camera technology. Products include Dome, Full Body, and Fisheye." },
                                { name: "Panasonic", share: "Innovator", desc: "Japanese giant known for Artificial Intelligence products like iPro and Face Pro along with VMS solutions." }
                            ].map((brand) => (
                                <div key={brand.name} className="flex gap-4 p-5 border-l-4 border-primary bg-card">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center font-bold text-primary">
                                            {brand.share}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold">{brand.name} CCTV Camera Dealer</h4>
                                        <p className="text-sm text-muted-foreground">{brand.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-foreground text-background p-10 rounded-3xl">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-3xl font-bold mb-6">Conclusion</h3>
                        <p className="text-lg opacity-80 mb-8 leading-relaxed">
                            CCTV cameras will help you find the clue you need. We are one of the leading CCTV Camera Dealers in Chennai.
                            Join us & Protect yourself and your society.
                        </p>
                        <p className="text-xs opacity-50 italic">
                            Keywords: cheap and best cctv camera for home, Best CCTV camera dealers in chennai,
                            Best CCTV camera dealers in arumbakkam, anna nagar.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
