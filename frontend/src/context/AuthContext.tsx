import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface User {
    _id: string;
    username: string;
    email: string;
    fullName?: string;
    avatarUrl?: string;
    role: string;
    status: string;
    googleId?: string;
    lastLogin?: string;
    color?: string;
}

interface Document {
    _id: string;
    user_id: string;
    repository_id: string;
    created_at: string;
    updated_at: string;
    status: string;
    content?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    loading: boolean;
    documents: Document[] | []
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState<any[]>([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (user?._id) {
            fetchDocuments();
        }
    }, [user]);
    
    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const fetchDocuments = async () => {
        if (!user?._id) return;
      
        try {
          const response = await axios.get(`${API_BASE_URL}/api/documents/${user._id}`);
          const doc = response?.data || [];
          setDocuments(doc);
        } catch (error) {
          console.error(error);
        }
      };
    return (
        <AuthContext.Provider value={{ user, login, logout, loading, documents }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
