import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type ViewMode = "table" | "details";

interface DocumentationContextType {
    view: ViewMode;
    setView: (view: ViewMode) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    selectedRepo: any | null;
    setSelectedRepo: (repo: any | null) => void;
    repositories: any[];
    setRepositories: (repos: any[]) => void;
    isLoading: boolean;
    fetchRepositories: () => Promise<void>;
}

const DocumentationContext = createContext<DocumentationContextType | undefined>(undefined);

export const DocumentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [view, setView] = useState<ViewMode>("table");
    const [activeTab, setActiveTab] = useState("All Repositories");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
    const [repositories, setRepositories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRepositories = useCallback(async () => {
        if (!user?._id) return;
        setIsLoading(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/api/repositories/${user._id}`);
            const repos = response?.data?.data || [];
            setRepositories(repos);
        } catch (error) {
            console.error("Error fetching repositories:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user?._id]);

    useEffect(() => {
        fetchRepositories();
    }, [fetchRepositories]);

    return (
        <DocumentationContext.Provider value={{
            view,
            setView,
            activeTab,
            setActiveTab,
            isModalOpen,
            setIsModalOpen,
            selectedRepo,
            setSelectedRepo,
            repositories,
            setRepositories,
            isLoading,
            fetchRepositories
        }}>
            {children}
        </DocumentationContext.Provider>
    );
};

export const useDocumentation = () => {
    const context = useContext(DocumentationContext);
    if (context === undefined) {
        throw new Error('useDocumentation must be used within a DocumentationProvider');
    }
    return context;
};
