import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Search, MapPin, Calendar, Users, Star, ArrowRight,
    Zap, Globe, Heart, Compass, Sparkles,
    Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api/api';
import type { Hotel } from '../types';

const Home = () => {
    const [featuredHotels, setFeaturedHotels] = useState<Hotel[]>([]);
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 250]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        api.get('/hotels').then(res => setFeaturedHotels(res.data.slice(0, 3))).catch(err => console.error(err));
    }, []);

    return (
        <div className="flex flex-col min-h-screen relative dark:bg-slate-950 overflow-x-hidden luxury-mesh">
            {/* Dynamic Cinematic Hero */}
            <section className="relative h-[95vh] flex items-center justify-center px-6 overflow-hidden">
                <motion.div
                    style={{ y: heroY }}
                    className="absolute inset-0 z-0"
                >
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2400&auto=format&fit=crop')] bg-cover bg-center" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900 dark:to-slate-950" />
                </motion.div>

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        style={{ opacity: heroOpacity }}
                        className="space-y-12 text-center"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 dark:bg-white/5 text-white font-black border border-white/20 backdrop-blur-xl mb-4 shadow-2xl"
                        >
                            <Sparkles size={20} className="text-blue-400" />
                            <span className="tracking-widest uppercase text-xs">Reimagined Travel 2026</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-[140px] font-black text-white leading-[0.85] tracking-tighter drop-shadow-2xl italic" data-testid="hero-title">
                            TRAVEL <br /><span className="text-blue-500 outline-text">SMART</span>ER
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.9 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="text-xl md:text-2xl text-slate-100 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg"
                        >
                            The world's first AI-integrated luxury booking ecosystem. <br />
                            Where technology meets breathtaking destinations.
                        </motion.p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
                            <Link to="/hotels" className="btn-primary px-12 py-6 text-xl rounded-[28px] shadow-3xl shadow-blue-600/40 font-black group transition-all hover:pr-14">
                                <Compass size={28} className="animate-spin-slow" />
                                EXPLORE NOW
                                <ArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 transition-all" />
                            </Link>
                            <button className="px-12 py-6 text-xl rounded-[28px] glass text-white font-black flex items-center gap-3 border-white/20 hover:bg-white/15 transition-all shadow-2xl">
                                <Globe size={28} /> VIRTUAL CONCIERGE
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 flex flex-col items-center gap-3 text-white/50"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black">Scroll</span>
                    <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
                </motion.div>
            </section>

            {/* Floating Filter Engine */}
            <section className="relative z-20 -mt-24 px-6 mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="max-w-6xl mx-auto glass p-3 rounded-[36px] shadow-4xl border border-white/10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {[
                            { icon: MapPin, label: "Destination", placeholder: "Where to?", testid: "search-location-input" },
                            { icon: Calendar, label: "Timeline", placeholder: "Check-in Date" },
                            { icon: Users, label: "Travelers", placeholder: "Number of guests" }
                        ].map((item, i) => (
                            <div key={i} className="p-8 rounded-[28px] hover:bg-white/5 dark:hover:bg-slate-800/50 transition-all group relative">
                                <div className="flex items-center gap-3 mb-2 text-blue-500/60 font-black">
                                    <item.icon size={18} />
                                    <span className="text-[10px] uppercase tracking-widest">{item.label}</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder={item.placeholder}
                                    className="bg-transparent border-none outline-none w-full font-black text-xl text-slate-900 dark:text-white placeholder-slate-400"
                                    data-testid={item.testid}
                                />
                                <div className="absolute bottom-4 left-8 right-8 h-px bg-slate-200 dark:bg-slate-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </div>
                        ))}
                        <div className="p-2">
                            <button className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white rounded-[28px] flex items-center justify-center gap-4 text-xl font-black shadow-2xl shadow-blue-600/20 group transition-all active:scale-95" data-testid="search-hero-btn">
                                <Search size={28} className="group-hover:rotate-12 transition-transform" /> SEARCH
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Trust Metrics Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
                        {[
                            { val: "25k+", label: "Elite Members", icon: Heart, color: "text-rose-500", bg: "bg-rose-500/5" },
                            { val: "1.2k+", label: "Verified Hotels", icon: Star, color: "text-amber-500", bg: "bg-amber-500/5" },
                            { val: "150+", label: "Prime Cities", icon: Globe, color: "text-blue-500", bg: "bg-blue-500/5" },
                            { val: "24/7", label: "AI Concierge", icon: Zap, color: "text-green-500", bg: "bg-green-500/5" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center space-y-6"
                            >
                                <div className={`w-24 h-24 rounded-[32px] ${stat.bg} flex items-center justify-center shadow-inner relative group`}>
                                    <stat.icon size={40} className={`${stat.color} group-hover:scale-110 transition-transform duration-500`} />
                                    <div className="absolute inset-0 rounded-[32px] border border-slate-200 dark:border-slate-800 opacity-50" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-5xl font-black tracking-tighter">{stat.val}</h4>
                                    <p className="text-slate-500 dark:text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Destinations Showcase */}
            <section className="py-40 px-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: 80 }}
                            className="h-[6px] bg-blue-600 rounded-full"
                        />
                        <h2 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter">
                            BEYOND <br />EXPECTATIONS
                        </h2>
                    </div>
                    <Link to="/hotels" className="p-6 px-12 border-2 border-slate-200 dark:border-slate-800 rounded-[28px] font-black hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-500 flex items-center gap-4 text-lg">
                        VIEW ALL <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16" data-testid="featured-hotel-list">
                    {featuredHotels.map((hotel, index) => (
                        <motion.div
                            key={hotel._id}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            className="group cursor-pointer"
                            data-testid={`hotel-card-${index}`}
                        >
                            <div className="aspect-[3/4] rounded-[50px] overflow-hidden shadow-4xl relative luxury-card">
                                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80" />

                                {/* Score Badge */}
                                <div className="absolute top-8 right-8 p-3 px-6 glass rounded-[20px] flex items-center gap-3 font-black text-white text-sm shadow-2xl border-white/20">
                                    <Star size={18} className="text-amber-400 fill-amber-400" /> {hotel.rating}
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-12 space-y-6 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-700">
                                    <div className="flex items-center gap-3 text-blue-400 font-black text-xs tracking-[0.3em] uppercase">
                                        <MapPin size={16} /> {hotel.location}
                                    </div>
                                    <h3 className="text-4xl font-black text-white leading-tight tracking-tighter">{hotel.name}</h3>
                                    <div className="flex justify-between items-center pt-8 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200">
                                        <div className="text-4xl font-black text-white">${hotel.price}<span className="text-sm font-medium opacity-50">/NT</span></div>
                                        <Link to={`/hotels`} className="p-5 px-10 bg-white text-slate-900 rounded-[20px] font-black transition-all hover:scale-110 active:scale-90" data-testid={`book-btn-${index}`}>
                                            BOOK
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Feature Grid: Why SmartTravel */}
            <section className="py-40 px-6 bg-slate-900 text-white relative">
                <div className="absolute inset-0 bg-blue-600/[0.03] luxury-mesh opacity-20" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-24 space-y-6">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">THE FUTURE OF BOOKING</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">We've combined artificial intelligence with five-star hospitality to create an experience that anticipates your every need.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "AI CONCIERGE", desc: "Our neural network analyzes 2M+ data points to suggest only what fits you.", icon: Bot },
                            { title: "INSTANT TRUST", desc: "Every hotel and vehicle is physically verified by our global audit team.", icon: Award },
                            { title: "DYNAMIC PRICING", desc: "Proprietary algorithms ensure you never pay a penny more than market value.", icon: Zap }
                        ].map((feat, i) => (
                            <div key={i} className="p-12 glass rounded-[40px] border-white/5 space-y-8 group hover:bg-white/5 transition-all">
                                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/20">
                                    <feat.icon size={32} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-black tracking-tight">{feat.title}</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium">{feat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

// Simple Bot icon since it might be missing
interface BotProps {
    size: number;
    className?: string;
}
const Bot = ({ size, className }: BotProps) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
);

export default Home;
