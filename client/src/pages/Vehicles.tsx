import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Search, Calendar, X, CreditCard, Zap, Shield, Fuel, Users } from 'lucide-react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
    const [bookingDate, setBookingDate] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const { user } = useAuth();

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const { data } = await api.get('/vehicles');
            setVehicles(data);
        } catch (error) {
            toast.error('Failed to load vehicles');
        } finally {
            setLoading(false);
        }
    };

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleBook = async () => {
        if (!user) {
            toast.error('You must login to book');
            return;
        }
        if (!bookingDate) {
            toast.error('Please select a date');
            return;
        }

        setIsBooking(true);
        try {
            const { data } = await api.post('/vehicles/book', { vehicleId: selectedVehicle._id, date: bookingDate });
            toast.success(data.message);
            setSelectedVehicle(null);
            setBookingDate('');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Booking failed');
        } finally {
            setIsBooking(false);
        }
    };

    return (
        <div className="min-h-screen py-32 px-6 max-w-7xl mx-auto w-full dark:bg-slate-950 luxury-mesh">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-12">
                <div className="space-y-4">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 60 }}
                        className="h-1.5 bg-blue-600 rounded-full"
                    />
                    <h1 className="text-6xl font-black text-slate-950 dark:text-white tracking-tighter" data-testid="vehicle-page-title">
                        ELITE FLEET
                    </h1>
                    <p className="text-slate-500 font-medium max-w-md">Precision engineering meet five-star comfort. Experience the road differently.</p>
                </div>
                <div className="flex glass rounded-3xl p-2 w-full md:w-[450px] group border-white/20 shadow-4xl focus-within:scale-105 transition-all">
                    <Search className="text-slate-400 m-4 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for your next drive..."
                        className="flex-1 bg-transparent border-none outline-none py-4 font-black transition-all dark:text-white placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        data-testid="vehicle-search-input"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-8" data-testid="vehicle-loading-spinner">
                    <div className="w-20 h-20 border-[8px] border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                    <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs animate-pulse">Scanning Inventory...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" data-testid="vehicle-grid">
                    {filteredVehicles.map((vehicle, index) => (
                        <motion.div
                            key={vehicle._id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white dark:bg-slate-900 rounded-[40px] overflow-hidden shadow-4xl border border-slate-100 dark:border-slate-800 group h-full flex flex-col luxury-card shine-effect"
                            data-testid={`vehicle-card-${vehicle._id}`}
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                                <div className="absolute top-6 left-6 glass px-4 py-2 rounded-2xl flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white shadow-2xl border-white/20">
                                    <Zap size={14} className="text-blue-400 fill-blue-400" />
                                    {vehicle.type}
                                </div>
                            </div>
                            <div className="p-10 flex flex-col flex-1 space-y-8">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-slate-950 dark:text-white truncate group-hover:text-blue-600 transition-colors tracking-tight" data-testid={`vehicle-name-${index}`}>
                                        {vehicle.name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <Users size={12} /> 4 SEATS
                                        </span>
                                        <span className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                                            <Fuel size={12} /> AUTO
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-auto flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-8">
                                    <div>
                                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block mb-1">Total Daily</span>
                                        <span className="text-3xl font-black text-slate-950 dark:text-white">${vehicle.price_per_day}</span>
                                    </div>
                                    <button
                                        onClick={() => setSelectedVehicle(vehicle)}
                                        className="btn-primary px-8"
                                        data-testid={`book-vehicle-btn-${index}`}
                                    >
                                        RESERVE
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Premium Reservation Modal */}
            <AnimatePresence>
                {selectedVehicle && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6" data-testid="vehicle-booking-modal">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedVehicle(null)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 100 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 100 }}
                            className="w-full max-w-xl glass bg-white dark:bg-slate-900 rounded-[50px] p-12 relative z-10 shadow-[0_0_100px_rgba(59,130,246,0.3)] border border-white/20"
                        >
                            <button
                                onClick={() => setSelectedVehicle(null)}
                                className="absolute top-8 right-8 p-3 glass rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all text-slate-400"
                            >
                                <X size={28} />
                            </button>

                            <div className="text-center mb-12 space-y-2">
                                <h2 className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">SECURE RENTAL</h2>
                                <p className="text-slate-500 font-medium italic">Premium reservation for {selectedVehicle.name}</p>
                            </div>

                            <div className="space-y-10">
                                <div className="flex gap-8 p-8 bg-slate-50 dark:bg-slate-950 rounded-[40px] border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Car size={80} />
                                    </div>
                                    <img src={selectedVehicle.image} alt={selectedVehicle.name} className="w-32 h-32 rounded-3xl object-cover shadow-2xl relative z-10" />
                                    <div className="flex flex-col justify-center relative z-10">
                                        <p className="font-black text-2xl text-slate-950 dark:text-white tracking-tight">{selectedVehicle.name}</p>
                                        <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.3em] mt-2">{selectedVehicle.type}</p>
                                        <p className="text-3xl font-black mt-4">${selectedVehicle.price_per_day} <span className="text-sm font-medium text-slate-400">/ DAY</span></p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Pickup Timeline</label>
                                        <div className="relative group">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={24} />
                                            <input
                                                type="date"
                                                required
                                                className="input-field pl-16 py-5 text-lg"
                                                value={bookingDate}
                                                onChange={(e) => setBookingDate(e.target.value)}
                                                data-testid="vehicle-booking-date-input"
                                            />
                                        </div>
                                    </div>

                                    <div className="p-6 bg-blue-600/5 rounded-3xl border border-blue-600/10 flex items-center gap-4">
                                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                                            <Shield size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-slate-800 dark:text-slate-200">FULLY INSURED</p>
                                            <p className="text-[10px] text-slate-500 font-medium">Platform-wide premium coverage included.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBook}
                                    className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-xl font-black shadow-3xl shadow-blue-600/30"
                                    disabled={isBooking}
                                    data-testid="confirm-vehicle-booking-btn"
                                >
                                    {isBooking ? (
                                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            <CreditCard size={28} />
                                            <span>COMPLETE RENTAL</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Vehicles;
