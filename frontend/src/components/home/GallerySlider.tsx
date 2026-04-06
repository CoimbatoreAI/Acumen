import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/config";

export default function GallerySlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/gallery`);
        const data = await resp.json();
        setImages(data);
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
    }
  };

  if (loading) return (
    <div className="py-20 flex justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Project Showcase</h2>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-accent transition-colors">
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 lg:px-8 pb-4 snap-x"
        style={{ scrollbarWidth: "none" }}
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[360px] snap-start"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer shadow-lg">
              <img
                src={img.src.startsWith('http') ? img.src : `${API_URL}/${img.src}`}
                alt={img.label}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/30 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-sm font-semibold text-background bg-primary/90 px-3 py-1.5 rounded-md">{img.label}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

