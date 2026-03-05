import { createContext, useContext } from 'react';
import type { User } from '../types';

export interface AuthContextType {
    user: User | null;
    login: (userData: User, token: string) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
