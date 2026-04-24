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
    documents: any[];
    setDocuments: (docs: any[]) => void;
    isLoading: boolean;
    fetchData: () => Promise<void>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const DocumentationContext = createContext<DocumentationContextType | undefined>(undefined);

export const DocumentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    const [view, setView] = useState<ViewMode>("table");
    const [activeTab, setActiveTab] = useState("All Repositories");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<any | null>(null);
    const [repositories, setRepositories] = useState<any[]>([]);
    const [documents, setDocuments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = useCallback(async () => {
        if (!user?._id) return;
        setIsLoading(true);
        try {
            const [reposRes, docsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/repositories/${user._id}`),
                axios.get(`${API_BASE_URL}/api/documents/${user._id}`)
            ]);

            setRepositories(reposRes?.data?.data || []);
            setDocuments(docsRes?.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [user?._id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
            documents,
            setDocuments,
            isLoading,
            fetchData,
            searchQuery,
            setSearchQuery
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
