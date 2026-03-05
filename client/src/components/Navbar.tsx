import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PlaneTakeoff, User, LogOut, Menu, X, Sun, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Hotels', path: '/hotels' },
        { name: 'Vehicles', path: '/vehicles' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-5 ${scrolled ? 'py-4' : 'py-8'
            }`}>
            <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-[32px] px-8 py-4 flex justify-between items-center ${scrolled ? 'glass shadow-3xl' : 'bg-transparent'
                }`}>
                {/* Modern Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-3 text-3xl font-black text-blue-600 dark:text-blue-400 group overflow-hidden"
                    data-testid="navbar-logo"
                >
                    <div className="relative">
                        <PlaneTakeoff size={40} className="group-hover:translate-x-12 group-hover:-translate-y-12 transition-all duration-500 ease-in-out" />
                        <Sparkles size={20} className="absolute -bottom-1 -right-1 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-['Outfit'] tracking-tighter flex">
                        Smart<span className={`transition-colors duration-500 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>Travel</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-12">
                    <div className="flex gap-10 font-black uppercase text-[11px] tracking-[0.2em]">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`transition-all relative group ${location.pathname === link.path
                                        ? 'text-blue-600'
                                        : scrolled ? 'text-slate-500 hover:text-blue-600' : 'text-white/70 hover:text-white'
                                    }`}
                            >
                                {link.name}
                                <span className={`absolute -bottom-2 left-0 h-1 bg-blue-600 rounded-full transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                                    }`} />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-6 pl-10 border-l border-white/10">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleTheme}
                            className={`p-3 rounded-2xl transition-all ${scrolled ? 'glass hover:bg-slate-100 dark:hover:bg-slate-800' : 'bg-white/10 hover:bg-white/20'
                                }`}
                        >
                            {theme === 'light' ? <Moon size={22} className={scrolled ? 'text-slate-700' : 'text-white'} /> : <Sun size={22} className="text-amber-400" />}
                        </motion.button>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    to="/dashboard"
                                    className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black transition-all border ${scrolled
                                            ? 'bg-blue-600/5 text-blue-600 border-blue-600/20 hover:bg-blue-600/10'
                                            : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                        }`}
                                    data-testid="nav-dashboard"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white scale-110 shadow-lg">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span>{user.name.split(' ')[0]}</span>
                                </Link>
                                <motion.button
                                    whileHover={{ rotate: 180 }}
                                    onClick={handleLogout}
                                    className="p-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                                    data-testid="logout-button"
                                >
                                    <LogOut size={22} />
                                </motion.button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link
                                    to="/login"
                                    className={`px-8 py-3 font-black text-[12px] uppercase tracking-widest transition-all ${scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white hover:text-blue-200'
                                        }`}
                                    data-testid="login-nav-btn"
                                >
                                    Log In
                                </Link>
                                <Link to="/register" className="btn-primary shadow-2xl shadow-blue-600/20" data-testid="register-nav-btn">
                                    Join Elite
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden p-3 rounded-2xl glass text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden mt-4 mx-6 overflow-hidden glass rounded-[32px] shadow-4xl flex flex-col gap-2 p-8 border border-white/20"
                    >
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className="px-6 py-4 font-black uppercase tracking-widest text-slate-900 dark:text-white" onClick={() => setIsOpen(false)}>
                                {link.name}
                            </Link>
                        ))}
                        <div className="h-px bg-slate-200 dark:bg-slate-800 my-4" />
                        <div className="flex items-center justify-between px-6 py-2 mb-6">
                            <span className="font-black uppercase tracking-widest text-[10px] text-slate-500">Theme</span>
                            <button onClick={toggleTheme} className="p-4 glass rounded-2xl">
                                {theme === 'light' ? <Moon size={24} /> : <Sun size={24} className="text-amber-400" />}
                            </button>
                        </div>
                        {user ? (
                            <div className="flex flex-col gap-4">
                                <Link to="/dashboard" className="p-6 bg-blue-600/10 rounded-3xl flex items-center gap-4 font-black text-blue-600" onClick={() => setIsOpen(false)}>
                                    <User size={24} /> Dashboard
                                </Link>
                                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="p-6 text-center text-red-500 font-black uppercase tracking-widest text-sm border border-red-500/10 rounded-3xl">Logout</button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                <Link to="/login" className="w-full text-center py-6 rounded-3xl border border-slate-200 dark:border-slate-800 font-black uppercase tracking-widest text-sm" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link to="/register" className="w-full text-center py-6 rounded-3xl bg-blue-600 text-white font-black uppercase tracking-widest text-sm" onClick={() => setIsOpen(false)}>Get Started</Link>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
