import { useState, type FormEvent } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Welcome to Elite Services. I'm your SmartTravel AI concierge. Which corner of the globe shall we explore today?", isBot: true }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        // Mock bot response
        setTimeout(() => {
            const botMessage = {
                id: Date.now() + 1,
                text: "Exquisite choice. Our luxury properties in that region are currently at peak availability. I've highlighted the top-rated villas on your portal.",
                isBot: true
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1200);
    };

    return (
        <>
            <div className="fixed bottom-10 right-10 z-[150]">
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-20 h-20 bg-blue-600 text-white rounded-[32px] flex items-center justify-center shadow-[0_20px_50px_rgba(59,130,246,0.5)] relative overflow-hidden group border-4 border-white dark:border-slate-800"
                    data-testid="chat-toggle"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div key="close" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                <X size={32} strokeWidth={3} />
                            </motion.div>
                        ) : (
                            <motion.div key="chat" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                <MessageSquare size={32} strokeWidth={3} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white dark:border-slate-800 rounded-full animate-pulse" />
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8, rotateX: -20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="fixed bottom-36 right-10 z-[150] w-[420px] h-[650px] glass bg-white/80 dark:bg-slate-900/90 rounded-[48px] shadow-4xl overflow-hidden flex flex-col border border-white/40 dark:border-slate-800"
                        data-testid="chat-window"
                    >
                        {/* Header */}
                        <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Bot size={120} />
                            </div>
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
                                    <Bot size={32} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="font-black text-2xl flex items-center gap-2">
                                        CONCIERGE <Sparkles size={20} className="text-amber-300" />
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs font-black text-blue-100 uppercase tracking-widest">
                                        <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                                        AI System v4.0
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.isBot ? -20 : 20, y: 10 }}
                                    animate={{ opacity: 1, x: 0, y: 0 }}
                                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`flex gap-3 max-w-[85%] ${msg.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                                        <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center shadow-xl ${msg.isBot ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 dark:text-white'
                                            }`}>
                                            {msg.isBot ? <Bot size={20} /> : <User size={20} />}
                                        </div>
                                        <div className={`p-5 rounded-[28px] text-sm font-medium leading-relaxed shadow-xl ${msg.isBot
                                            ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700'
                                            : 'bg-blue-600 text-white rounded-tr-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="px-8 pb-4 flex gap-2 overflow-x-auto scrollbar-hide">
                            {['Best Hotels', 'Luxury Cars', 'Support'].map(action => (
                                <button key={action} className="px-5 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all whitespace-nowrap">
                                    {action}
                                </button>
                            ))}
                        </div>

                        {/* Input Overlay */}
                        <form onSubmit={handleSend} className="p-8 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Ask for recommendations..."
                                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-3xl py-5 pl-6 pr-16 text-sm font-bold focus:ring-4 focus:ring-blue-500/10 shadow-inner transition-all block dark:text-white"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 group-hover:scale-105"
                                >
                                    <Send size={22} />
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatAssistant;
