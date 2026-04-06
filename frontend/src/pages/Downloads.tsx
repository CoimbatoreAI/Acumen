import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { FileDown, BookOpen, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/config";

const Downloads = () => {
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const resp = await fetch(`${API_URL}/api/downloads`);
        const data = await resp.json();
        setDownloads(data);
      } catch (err) {
        console.error("Failed to fetch downloads", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-20 px-4 bg-foreground">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Resources</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-background mb-4">Downloads</h1>
            <p className="text-background/60 max-w-2xl mx-auto">Access our product catalogues and resources.</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding" id="catalogue">
        <div className="container mx-auto max-w-2xl space-y-8">
          {downloads.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-8 md:p-12 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                  <p className="text-sm text-muted-foreground">{item.edition} • {item.fileType} • {item.fileSize}</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {item.description}
              </p>
              <a
                href={item.fileUrl.startsWith('http') ? item.fileUrl : `${API_URL}/${item.fileUrl}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary-dark transition-colors"
              >
                <FileDown className="w-5 h-5" />
                Download Catalogue
              </a>
            </motion.div>
          ))}
          {downloads.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No downloads available at the moment.</p>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Downloads;
