import React from "react";

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
    return (
        <div className="flex h-full w-full bg-white overflow-hidden">
            {/* Left Sidebar - Static */}
            <div className="w-64 flex-shrink-0 border-r border-slate-100 flex flex-col p-6 gap-8 bg-slate-50/30">
                <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Contents</span>
                    <nav className="flex flex-col">
                        <NavItem label="Introduction" active />
                        <NavItem label="API Reference" />
                        <NavItem label="Usage" />
                        <NavItem label="Examples" />
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
            <div className="flex-1 overflow-y-auto p-12 scroll-smooth">
                <div className="max-w-4xl mx-auto flex flex-col gap-12 pb-20">

                    {/* Introduction Section */}
                    <section id="introduction" className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-blue-light text-blue-secondary flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl font-bold">info</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Introduction</h2>
                        </div>
                        <div className="flex flex-col gap-4 text-slate-600 leading-relaxed text-lg">
                            <p>
                                The <strong className="text-slate-900 font-bold underline decoration-blue-200 decoration-2 underline-offset-2">Auth-Service</strong> serves as the backbone of our digital workspace security. It manages JWT-based session lifecycle, multi-tenant permission structures, and OAuth2 provider integrations.
                            </p>
                            <p>
                                As part of the Repo Analyzer ecosystem, this service ensures that repository metadata and analysis reports are only accessible to authorized personnel with the appropriate 'Digital Architect' clearance levels.
                            </p>
                        </div>
                    </section>

                    {/* API Reference Section */}
                    <section id="api-reference" className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl font-bold">api</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">API Reference</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* POST Endpoint Card */}
                            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-200 hover:shadow-lg transition-all group flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-secondary text-[10px] font-black rounded-md tracking-widest uppercase">Post</span>
                                        <code className="text-sm font-bold text-slate-800 font-mono">/v1/auth/token</code>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Auth Required: No</span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium">Generates a new JWT access token using client credentials or refresh tokens.</p>
                            </div>

                            {/* GET Endpoint Card */}
                            <div className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-indigo-200 hover:shadow-lg transition-all group flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 bg-indigo-50 text-indigo-500 text-[10px] font-black rounded-md tracking-widest uppercase">Get</span>
                                        <code className="text-sm font-bold text-slate-800 font-mono">/v1/user/profile</code>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Auth Required: Yes</span>
                                </div>
                                <p className="text-sm text-slate-500 font-medium">Retrieves detailed identity information and permission scopes for the current requester.</p>
                            </div>
                        </div>
                    </section>

                    {/* Usage Section */}
                    <section id="usage" className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-cyan-50 text-cyan-500 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl font-bold">settings_suggest</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Usage</h2>
                        </div>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            To begin analyzing repositories, you must first initialize the SDK with your architecture key. This key can be generated within the <em className="italic font-medium text-slate-800 underline decoration-slate-200 decoration-1 underline-offset-2">Settings &gt; API Keys</em> section of the dashboard.
                        </p>

                        {/* Security Note Alert */}
                        <div className="p-6 rounded-2xl bg-red-50/30 border-l-4 border-red-500 flex items-start gap-4">
                            <span className="material-symbols-outlined text-red-500 font-bold">warning</span>
                            <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-red-900">Security Note</span>
                                <p className="text-xs text-red-800 leading-relaxed font-medium">
                                    Never expose your secret keys in client-side code or public repositories. Use environment variables for all server-side implementations.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Example Usage Section */}
                    <section id="examples" className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className="size-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-2xl font-bold">code</span>
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Example Usage</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="text-sm font-bold text-slate-700 tracking-tight">Node.js Implementation</span>
                            <div className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden relative group">
                                <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-blue-secondary hover:border-blue-200 transition-all shadow-sm cursor-pointer">
                                        <span className="material-symbols-outlined text-lg">content_copy</span>
                                    </button>
                                </div>
                                <pre className="p-8 text-sm font-mono leading-7 overflow-x-auto selection:bg-blue-100">
                                    <code className="text-slate-700 block whitespace-pre">
                                        {`const analyzer = require('@repo-analyzer/sdk');

// Initialize with credentials
const client = new analyzer.Client({
  apiKey: 'your-api-key-here',
  region: 'us-east-1'
});

// Request analysis
async function startAnalysis() {
  const report = await client.analyze({
    repoId: 'auth-service',
    depth: 'high'
  });
  console.log(report);
}`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DocumentationView;
