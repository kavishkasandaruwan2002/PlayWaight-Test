import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import type { ReactNode } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Vehicles from './pages/Vehicles';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ChatAssistant from './components/ChatAssistant';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeProvider';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-sans selection:bg-blue-600/20 selection:text-blue-600 transition-colors duration-300">
            <Toaster
              position="bottom-right"
              toastOptions={{
                className: 'glass rounded-3xl shadow-3xl border-white/20 dark:border-slate-800 border bg-white/70 dark:bg-slate-900/70 text-slate-900 dark:text-white',
                style: {
                  backdropFilter: 'blur(16px)',
                }
              }}
            />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/login" element={<AuthPage type="login" />} />
                <Route path="/register" element={<AuthPage type="register" />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <ChatAssistant />

            <footer className="py-24 px-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-24">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2 space-y-6">
                  <span className="text-3xl font-black text-blue-600 tracking-tighter">SmartTravel</span>
                  <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                    Setting the standard for modern travel booking. Plan, book, and explore the world's most luxurious destinations with our AI-powered platform.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black uppercase tracking-widest text-xs">Explore</h4>
                  <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Destinations</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Hotels</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Car Rentals</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Flight Deals</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-black uppercase tracking-widest text-xs">Company</h4>
                  <ul className="space-y-2 text-slate-500 dark:text-slate-400">
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Support Center</li>
                    <li className="hover:text-blue-600 transition-colors cursor-pointer">Careers</li>
                  </ul>
                </div>
              </div>
              <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm text-slate-400">
                <p>© 2026 SmartTravel Inc. All rights reserved.</p>
                <div className="flex gap-6">
                  <span>Twitter</span>
                  <span>Instagram</span>
                  <span>LinkedIn</span>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
