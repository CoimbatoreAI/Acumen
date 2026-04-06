import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL } from "@/lib/config";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const resp = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await resp.json();

            if (resp.ok) {
                localStorage.setItem("admin_token", data.token);
                toast.success("Login Successful");
                navigate("/admin-dashboard");
            } else {
                toast.error(data.msg || "Invalid Credentials");
            }
        } catch (err) {
            toast.error("Server Error Connecting to Backend");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Layout>
            <section className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border p-8 rounded-2xl w-full max-w-md shadow-lg"
                >
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Admin Portal</h1>
                        <p className="text-muted-foreground text-sm mt-1">Sign in to manage your website</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="example@gmail.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </button>
                    </form>
                </motion.div>
            </section>
        </Layout>
    );
};

export default AdminLogin;
