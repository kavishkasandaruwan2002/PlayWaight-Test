import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Hotel, Car, CheckCircle2, User as UserIcon, Mail, Award, TrendingUp, Compass, Clock } from 'lucide-react';
import api from '../api/api';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import type { Profile, Booking } from '../types';

const Dashboard = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data } = await api.get('/user/profile');
            setProfile(data);
        } catch {
            toast.error('Failed to load dashboard');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen dark:bg-slate-950 gap-6" data-testid="dashboard-loading">
                <div className="w-16 h-16 border-[6px] border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="font-black text-[10px] tracking-[0.3em] text-slate-500 uppercase">Synchronizing Portal...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-32 px-6 max-w-7xl mx-auto w-full dark:bg-slate-950 luxury-mesh" data-testid="login-success-view">
            <div className="mb-16 space-y-4">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    className="h-1.5 bg-blue-600 rounded-full"
                />
                <h1 className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter">USER PORTAL</h1>
                <p className="text-slate-500 font-medium max-w-md">Manage your elite reservations and platform status.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-4 gap-12"
            >
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="luxury-card p-10 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                            <UserIcon size={160} />
                        </div>
                        <div className="relative group inline-block mb-8">
                            <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-[40px] flex items-center justify-center text-5xl font-black mx-auto shadow-3xl transform group-hover:rotate-12 transition-transform">
                                {profile?.name?.charAt(0)}
                            </div>
                            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-amber-400 rounded-2xl flex items-center justify-center text-slate-900 border-4 border-white dark:border-slate-900 shadow-xl">
                                <Award size={20} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight" data-testid="user-profile-name">{profile?.name}</h2>
                            <p className="text-slate-500 font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2">
                                <Mail size={12} /> {profile?.email}
                            </p>
                        </div>

                        <div className="mt-12 pt-12 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 gap-4">
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group/item hover:bg-blue-600 transition-all">
                                <span className="text-xs font-black uppercase tracking-widest group-hover/item:text-white">Tier</span>
                                <span className="text-xl font-black text-amber-500 group-hover/item:text-white">GOLD</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex justify-between items-center group/item hover:bg-blue-600 transition-all">
                                <span className="text-xs font-black uppercase tracking-widest group-hover/item:text-white">Points</span>
                                <span className="text-xl font-black text-blue-600 group-hover/item:text-white">4,250</span>
                            </div>
                        </div>
                    </div>

                    <button className="btn-secondary w-full py-5 text-sm uppercase tracking-widest font-black">
                        EDIT PREFERENCES
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-12">
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {[
                            { label: "Active Stays", val: profile?.bookings?.filter((b: Booking) => b.hotel).length || 0, icon: Hotel },
                            { label: "Fleet Rentals", val: profile?.bookings?.filter((b: Booking) => b.vehicle).length || 0, icon: Car },
                            { label: "Elite Credits", val: "$240", icon: TrendingUp }
                        ].map((item, i) => (
                            <div key={i} className="luxury-card p-8 flex items-center gap-6 group hover:border-blue-500/30 transition-all">
                                <div className="w-16 h-16 rounded-[24px] bg-blue-600/5 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <item.icon size={28} />
                                </div>
                                <div>
                                    <p className="text-3xl font-black tracking-tight">{item.val}</p>
                                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="luxury-card bg-transparent border-none shadow-none space-y-8">
                        <div className="flex justify-between items-center px-4">
                            <h3 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-4">
                                <Clock className="text-blue-600" /> RECENT ACTIVITY
                            </h3>
                            <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors py-2 border-b-2 border-transparent hover:border-blue-600">FULL HISTORY</button>
                        </div>

                        <div className="space-y-6" data-testid="dashboard-bookings-list">
                            {(profile?.bookings?.length || 0) > 0 ? (
                                profile!.bookings.map((booking: Booking, index: number) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05 }}
                                        className="luxury-card p-8 flex flex-col md:flex-row justify-between items-center gap-8 group hover:bg-slate-50 dark:hover:bg-slate-900/50"
                                        data-testid={`booking-item-${index}`}
                                    >
                                        <div className="flex items-center gap-8 w-full md:w-auto">
                                            <div className={`w-20 h-20 rounded-[28px] flex items-center justify-center shadow-inner relative overflow-hidden ${booking.hotel ? 'bg-blue-600/5 text-blue-600' : 'bg-emerald-600/5 text-emerald-600'
                                                }`}>
                                                {booking.hotel ? <Hotel size={32} /> : <Car size={32} />}
                                                <div className="absolute inset-0 border border-current opacity-10 rounded-[28px]" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-black text-2xl text-slate-950 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                                                    {booking.hotel || booking.vehicle}
                                                </h4>
                                                <div className="flex items-center gap-6">
                                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <Calendar size={12} className="text-slate-400" /> {new Date(booking.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                                        <MapPin size={12} className="text-slate-400" /> Verified Stay
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 bg-emerald-600/10 text-emerald-600 dark:bg-emerald-500/5 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-inner border border-emerald-500/10 whitespace-nowrap">
                                            <CheckCircle2 size={16} />
                                            <span>Confirmed</span>
                                        </div>
                                    </motion.div>
                                )).reverse()
                            ) : (
                                <div className="flex flex-col items-center justify-center py-32 luxury-card border-dashed bg-slate-50/20 dark:bg-slate-900/10">
                                    <div className="w-24 h-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-300 mb-8">
                                        <Compass size={48} className="animate-spin-slow" />
                                    </div>
                                    <p className="text-slate-500 font-bold italic text-lg">Your itinerary reflects your ambition. Start exploring luxury today.</p>
                                    <Link to="/hotels" className="mt-8 btn-primary">Find a Destination</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
