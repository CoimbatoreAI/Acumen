import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Activity, Wifi, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [stage, setStage] = useState(0);

    const stages = [
        "INITIALIZING_SECURITY_PROTOCOLS",
        "ENCRYPTING_DATA_STREAMS",
        "ESTABLISHING_SECURE_LINK",
        "SYSTEM_READY"
    ];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 4000);
        const stageInterval = setInterval(() => {
            setStage((s) => (s < stages.length - 1 ? s + 1 : s));
        }, 900);

        return () => {
            clearTimeout(timer);
            clearInterval(stageInterval);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05080a] overflow-hidden"
                >
                    {/* Background Grid Layer */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(#38A149 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

                    {/* Central Logo & Tech Rings */}
                    <div className="relative mb-20 scale-110 md:scale-125">
                        {/* Outer Rotating Ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-[#38A149]/10 flex items-center justify-center"
                        >
                            {/* Inner Dashed Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-40 h-40 md:w-48 md:h-48 rounded-full border-t-2 border-l-2 border-[#38A149]/30 border-dashed"
                            />
                        </motion.div>

                        {/* Logo in the center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.img
                                src="/logo.png"
                                alt="Acumen"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="w-20 h-20 md:w-24 md:h-24 object-contain brightness-110 contrast-125 drop-shadow-[0_0_15px_rgba(56,161,73,0.4)]"
                            />
                        </div>

                        {/* Glowing Pulse Effect */}
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute inset-0 bg-[#38A149]/10 rounded-full blur-3xl -z-10"
                        />
                    </div>

                    {/* Progress Section */}
                    <div className="max-w-xs w-full px-8 space-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between font-mono">
                                <motion.span
                                    className="text-[10px] text-[#38A149] tracking-[0.2em] font-medium"
                                    key={stage}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    {stages[stage]}
                                </motion.span>
                                <span className="text-[10px] text-[#38A149] font-bold opacity-60">
                                    {Math.min(Math.round((stage + 1) * 25), 100)}%
                                </span>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 overflow-hidden rounded-full">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(stage + 1) * 25}%` }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                    className="h-full bg-[#38A149] shadow-[0_0_15px_#38A149]"
                                />
                            </div>
                        </div>

                        {/* Micro-Interaction Grid */}
                        <div className="grid grid-cols-2 gap-3 pb-8">
                            {[
                                { icon: ShieldCheck, label: "PROTECT" },
                                { icon: Activity, label: "MONITOR" },
                                { icon: Wifi, label: "COMM_LINK" },
                                { icon: Terminal, label: "BOOT_SYS" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: stage >= i ? 1 : 0.15, y: 0 }}
                                    transition={{ delay: 1 + i * 0.2 }}
                                    className="flex items-center gap-2 border border-white/5 p-2 rounded-lg bg-white/[0.02]"
                                >
                                    <item.icon className={`w-3 h-3 ${stage >= i ? 'text-[#38A149]' : 'text-gray-400'}`} />
                                    <span className={`text-[8px] font-mono tracking-[2px] ${stage >= i ? 'text-white' : 'text-gray-400'}`}>{item.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Branding */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-16 flex flex-col items-center gap-3"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#38A149]/30" />
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#38A149] animate-pulse" />
                                <span className="text-[9px] text-[#38A149] font-bold tracking-[0.4em] font-sans">
                                    ACUMEN SAFETY HUB
                                </span>
                            </div>
                            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#38A149]/30" />
                        </div>
                    </motion.div>

                    {/* Tech Noise / HUD lines */}
                    <div className="absolute inset-0 border-[20px] border-[#38A149]/5 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-[#38A149]/10 animate-scan pointer-events-none" />
                </motion.div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes scan {
          0% { transform: translateY(0vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
      `}} />
        </AnimatePresence>
    );
}
