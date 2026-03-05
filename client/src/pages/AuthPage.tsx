import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, Sparkles, Plane, Github, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface AuthPageProps {
    type: 'login' | 'register';
}

const AuthPage = ({ type }: AuthPageProps) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const endpoint = type === 'login' ? '/auth/login' : '/auth/register';
        console.log('Submitting:', type, email, endpoint);
        setIsLoading(true);
        const payload = type === 'login' ? { email, password } : { name, email, password };

        try {
            const { data } = await api.post(endpoint, payload);
            if (type === 'login') {
                login(data.user, data.token);
                toast.success(`Welcome back, ${data.user.name}!`);
                navigate('/dashboard');
            } else {
                toast.success('Account created! Please log in.');
                navigate('/login');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || 'Authentication failed');
            } else {
                toast.error('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 luxury-mesh">
            {/* Visual Side */}
            <div className="hidden lg:flex relative items-center justify-center p-20 overflow-hidden">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={type === 'login'
                            ? "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000"
                            : "https://images.unsplash.com/photo-1506012733851-00f747094504?q=80&w=2000"
                        }
                        className="w-full h-full object-cover grayscale-[0.3] brightness-75 transition-all duration-1000"
                        alt="Travel background"
                    />
                    <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
                </motion.div>

                <div className="relative z-10 w-full glass p-12 rounded-[48px] border-white/20 space-y-8">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center text-white shadow-3xl shadow-blue-600/30"
                    >
                        <Plane size={40} className="animate-pulse" />
                    </motion.div>
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="space-y-4"
                    >
                        <h1 className="text-5xl font-black text-white tracking-tighter leading-tight italic">
                            YOUR ELITE <br />PASS TO THE WORLD
                        </h1>
                        <p className="text-white/80 text-lg font-medium">Experience travel not as a tourist, but as a local legend. Book with AI-precision and human-warmth.</p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: "Elite Hotels", val: "1.2k+" },
                            { label: "Verified Reviews", val: "250k+" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white/10 rounded-3xl border border-white/10">
                                <p className="text-white/60 text-[10px] font-black uppercase tracking-widest">{item.label}</p>
                                <p className="text-white text-3xl font-black">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="flex items-center justify-center p-6 sm:p-20 relative overflow-hidden dark:bg-slate-950">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full max-w-[480px] space-y-12"
                >
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter" data-testid="auth-title">
                            {type === 'login' ? 'Welcome Back' : 'Join the Elite'}
                            <span className="text-blue-600">.</span>
                        </h2>
                        <p className="text-slate-500 font-medium">
                            {type === 'login'
                                ? 'Welcome back to your luxury travel hub.'
                                : 'Start your journey towards five-star experiences today.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <AnimatePresence mode="wait">
                            {type === 'register' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                        <input
                                            type="text"
                                            required
                                            placeholder="e.g. James Bond"
                                            className="input-field pl-14"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            data-testid="register-name-input"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Secure Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@company.com"
                                    className="input-field pl-14"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    data-testid="auth-email-input"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    placeholder="••••••••"
                                    className="input-field pl-14 pr-12"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    data-testid="auth-password-input"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary w-full py-5 text-lg font-black tracking-widest uppercase shadow-3xl shadow-blue-600/20"
                            data-testid="auth-submit-btn"
                        >
                            {isLoading ? (
                                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <div className="flex items-center gap-3">
                                    {type === 'login' ? 'Gain Access' : 'Begin Journey'}
                                    <Sparkles size={20} />
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-slate-400"><span className="bg-white dark:bg-slate-950 px-6">Or continue with</span></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-3 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                                <Chrome size={18} /> Google
                            </button>
                            <button className="flex items-center justify-center gap-3 py-4 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-sm hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                                <Github size={18} /> GitHub
                            </button>
                        </div>

                        <p className="text-center text-slate-500 font-medium">
                            {type === 'login' ? "New to SmartTravel? " : 'Already a member? '}
                            <Link
                                to={type === 'login' ? '/register' : '/login'}
                                className="text-blue-600 font-black hover:underline underline-offset-8"
                            >
                                {type === 'login' ? 'Unlock Membership' : 'Log In Here'}
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AuthPage;
