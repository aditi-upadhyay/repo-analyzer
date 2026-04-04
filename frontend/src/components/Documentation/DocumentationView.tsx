import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";
import { useDocumentation } from "../../context/DocumentationContext";

interface NavItemProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const NavItem = ({ label, active, onClick }: NavItemProps) => (
    <div
        onClick={onClick}
        className={`px-4 py-2 text-sm font-semibold cursor-pointer transition-all border-l-2 ${active
            ? "text-blue-secondary border-blue-secondary bg-blue-50/30"
            : "text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50"
            }`}
    >
        {label}
    </div>
);

const DocumentationView: React.FC = () => {
    const { selectedRepo } = useDocumentation();
    const [markdown, setMarkdown] = useState<string>("");
    const [sections, setSections] = useState<{ id: string; label: string }[]>([]);
    const [activeSection, setActiveSection] = useState<string>("");
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchDoc = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/documentation");
                if (response.data.content) {
                    const content = response.data.content;
                    setMarkdown(content);

                    // Extract ## headers for sidebar
                    const lines = content.split('\n');
                    const headers = lines
                        .filter((line: string) => line.startsWith('## '))
                        .map((line: string) => {
                            const label = line.replace('## ', '').trim();
                            const id = label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            return { id, label };
                        });
                    setSections(headers);
                    if (headers.length > 0) setActiveSection(headers[0].id);
                }
            } catch (error) {
                console.error("Failed to fetch documentation:", error);
            }
        };
        fetchDoc();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const sectionElements = Array.from(container.querySelectorAll('section[id]'));

            // Find the section that is currently at the top of the viewport
            let current = sections[0]?.id;
            for (const el of sectionElements) {
                const rect = el.getBoundingClientRect();
                // If the top of the section is near the top of the container
                if (rect.top <= 200) {
                    current = el.id;
                } else {
                    break;
                }
            }

            if (current && current !== activeSection) {
                setActiveSection(current);
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll, { passive: true });
        }
        return () => {
            if (container) container.removeEventListener('scroll', handleScroll);
        };
    }, [markdown, sections, activeSection]);

    const scrollToSection = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex h-full w-full bg-white overflow-hidden">
            {/* Left Sidebar - Dynamic */}
            <div className="w-64 flex-shrink-0 border-r border-slate-100 flex flex-col p-6 gap-8 bg-slate-50/30">
                <div className="flex flex-col gap-4 mt-12">
                    {selectedRepo && (
                        <div className="px-4 mb-4">
                            <span className="text-[10px] font-bold text-blue-secondary uppercase tracking-widest">Selected Repo</span>
                            <h3 className="text-sm font-bold text-slate-900 truncate">{selectedRepo.name}</h3>
                        </div>
                    )}
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Contents</span>
                    <nav className="flex flex-col">
                        {sections.map((section) => (
                            <NavItem
                                key={section.id}
                                label={section.label}
                                active={activeSection === section.id}
                                onClick={() => scrollToSection(section.id)}
                            />
                        ))}
                    </nav>
                </div>

                {/* Need help? card */}
                <div className="mt-auto p-5 rounded-2xl bg-blue-light border border-blue-100 flex flex-col gap-3 shadow-sm">
                    <span className="text-sm font-bold text-slate-900">Need help?</span>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Join our community Discord for real-time support from the architect team.
                    </p>
                    <a
                        href="#"
                        className="text-xs font-bold text-blue-secondary flex items-center gap-1 hover:text-blue-primary transition-colors"
                    >
                        Open Discord
                        <span className="material-symbols-outlined text-sm font-bold">open_in_new</span>
                    </a>
                </div>
            </div>

            {/* Right Content - Scrollable */}
            <div ref={containerRef} className="flex-1 overflow-y-auto p-12 scroll-smooth">
                <div className="max-w-4xl mx-auto flex flex-col gap-6 ">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight border-b border-slate-100">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => {
                                const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, '-');
                                return (
                                    <section id={id} className=" first:pt-0 flex flex-col gap-6 scroll-mt-12">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-xl bg-blue-light text-blue-secondary flex items-center justify-center">
                                                <span className="material-symbols-outlined text-2xl font-bold">
                                                    {id.includes('overview') ? 'info' :
                                                        id.includes('feature') ? 'star' :
                                                            id.includes('tech') ? 'api' :
                                                                id.includes('structure') ? 'account_tree' :
                                                                    id.includes('component') ? 'extension' :
                                                                        id.includes('install') ? 'download' :
                                                                            id.includes('usage') ? 'settings_suggest' :
                                                                                id.includes('workflow') ? 'alt_route' :
                                                                                    'description'}
                                                </span>
                                            </div>
                                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{children}</h2>
                                        </div>
                                    </section>
                                );
                            },
                            h3: ({ children }) => (
                                <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">{children}</h3>
                            ),
                            p: ({ children }) => (
                                <div className="text-slate-600 leading-relaxed text-lg ">
                                    {children}
                                </div>
                            ),
                            ul: ({ children }) => (
                                <ul className="flex flex-col gap-3 list-none mb-6">
                                    {children}
                                </ul>
                            ),
                            li: ({ children }) => (
                                <li className="flex items-start gap-3 text-slate-600 text-lg">
                                    <span className="size-2 rounded-full bg-blue-secondary/30 mt-3 flex-shrink-0" />
                                    <span>{children}</span>
                                </li>
                            ),
                            code: ({ node, inline, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline ? (
                                    <div className="my-6 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden relative group">
                                        <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-secondary hover:border-blue-200 transition-all shadow-sm cursor-pointer">
                                                <span className="material-symbols-outlined text-lg">content_copy</span>
                                            </button>
                                        </div>
                                        <div className="px-4 py-2 bg-slate-100/50 border-b border-slate-200 flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                {match ? match[1] : 'code'}
                                            </span>
                                        </div>
                                        <pre className="p-8 text-sm font-mono leading-7 overflow-x-auto selection:bg-blue-100">
                                            <code className="text-slate-700 block whitespace-pre" {...props}>
                                                {String(children).replace(/\n$/, '')}
                                            </code>
                                        </pre>
                                    </div>
                                ) : (
                                    <code className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-mono text-sm font-bold" {...props}>
                                        {children}
                                    </code>
                                );
                            },
                            blockquote: ({ children }) => (
                                <div className="p-6 rounded-2xl bg-blue-50/30 border-l-4 border-blue-500 flex items-start gap-4 my-8">
                                    <span className="material-symbols-outlined text-blue-500 font-bold">info</span>
                                    <div className="text-blue-900 italic font-medium">
                                        {children}
                                    </div>
                                </div>
                            ),
                            table: ({ children }) => (
                                <div className="my-8 overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
                                    <table className="w-full border-collapse bg-white text-left text-sm text-slate-500">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead className="bg-slate-50">
                                    {children}
                                </thead>
                            ),
                            th: ({ children }) => (
                                <th className="px-6 py-4 font-bold text-slate-900">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="border-t border-slate-100 px-6 py-4">
                                    {children}
                                </td>
                            ),
                        }}
                    >
                        {markdown}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

export default DocumentationView;
