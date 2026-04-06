import { MapPin, Phone, Mail, Clock } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export default function ContactPreview() {
  return (
    <section className="section-padding section-alt-bg">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Get In Touch</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Contact Information</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: MapPin, title: "Our Office", text: "No:13/5,Purushothaman Garden, 1st St, Jai Nagar, Arumbakkam, Chennai, Tamil Nadu 600106" },
              { icon: MapPin, title: "Sales Office", text: "No:1,1st Floor, Balavinayagar Street, Muragesan Nagar, Arumbakkam, Chennai, Tamil Nadu 600106" },
              { icon: Phone, title: "Call Us", text: "+91 81220 04245", link: "tel:+918122004245" },
              { icon: WhatsAppIcon, title: "Chat with Us", text: "+91 81220 04245", link: "https://wa.me/918122004245" },
              { icon: Mail, title: "Email Us", text: "acumensecurity@gmail.com", link: "mailto:acumensecurity@gmail.com" },
              { icon: Clock, title: "Working Hours", text: "Mon - Sat: 9:00 AM - 6:00 PM" },
            ].map((item) => {
              const Content = (
                <div className="bg-card border border-border rounded-xl p-5 flex gap-4 h-full">
                  <div className="w-11 h-11 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              );

              return item.link ? (
                <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" className="block hover:scale-[1.02] transition-transform">
                  {Content}
                </a>
              ) : (
                <div key={item.title} className="block">
                  {Content}
                </div>
              );
            })}
          </div>
          <div className="rounded-xl overflow-hidden h-[300px] lg:h-auto border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 300 }}
              loading="lazy"
              title="Office Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
