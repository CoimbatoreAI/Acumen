import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Acumen Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-extrabold tracking-tight text-white leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  ACUMEN SECURITY SOLUTIONS
                </span>
                <span className="text-[10px] font-semibold text-[#8BC34A] tracking-widest uppercase mt-1.5" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  a perfect automation
                </span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Leading provider of advanced security solutions for homes and businesses. Trusted by 500+ clients across the region.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: WhatsAppIcon, href: "https://wa.me/917200552551" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-background/5 flex items-center justify-center hover:bg-primary transition-all duration-300 group"
                >
                  <s.icon className="w-5 h-5 text-background group-hover:text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {["Home", "About Us", "Products", "Blog", "Contact Us"].map((l) => (
                <li key={l}>
                  <Link
                    to={l === "Home" ? "/" : `/${l.toLowerCase().replace(/\s+/g, "")}`}
                    className="hover:text-primary transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Our Services</h4>
            <ul className="space-y-2.5 text-sm opacity-70">
              {[
                "CCTV Camera Dealer in Chennai",
                "CCTV Camera Installation",
                "CCTV Surveillance Systems",
                "Best Gate Automations",
                "Automatic Sliding Glass Doors",
                "Automatic Swing Doors",
              ].map((s) => (
                <li key={s}>
                  <Link to="/products" className="hover:text-primary transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://www.automaticslidingdoors.in" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                  Our Automation Partner
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-primary">Contact Info</h4>
            <div className="space-y-3 text-sm opacity-70">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                No:13/5, Purushothaman Garden, 1st St, Jai Nagar, Arumbakkam, Chennai - 600106
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                +91 81220 04245
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                acumensecurity@gmail.com
              </p>
              <p className="text-[10px] mt-4 opacity-50 tracking-wider">
                GSTIN: 33APHPB5989D1ZX
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between text-xs opacity-50">
          <p>&copy; {new Date().getFullYear()} ACUMEN SECURITY SOLUTIONS. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
