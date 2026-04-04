import React, { createContext, useContext, useState } from 'react';

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
}

const DocumentationContext = createContext<DocumentationContextType | undefined>(undefined);

export const DocumentationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [view, setView] = useState<ViewMode>("table");
    const [activeTab, setActiveTab] = useState("All Repositories");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRepo, setSelectedRepo] = useState<any | null>(null);

    return (
        <DocumentationContext.Provider value={{
            view,
            setView,
            activeTab,
            setActiveTab,
            isModalOpen,
            setIsModalOpen,
            selectedRepo,
            setSelectedRepo
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
