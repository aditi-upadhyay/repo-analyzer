import React from 'react';

const HeroSection: React.FC = () => {
    return (
        <div className="flex-1 bg-landing-bg p-8 flex flex-col justify-center h-full overflow-hidden">
            <div className="max-w-xl mx-auto md:mx-0">
                <h1 className="text-5xl font-extrabold text-landing-text leading-tight mb-4">
                    Paste a repo.<br />
                    Get instant docs.<span className="text-landing-accent">|</span>
                </h1>
                <p className="text-base text-landing-subtext mb-6 max-w-lg leading-relaxed">
                    No setup. No config. Just drop a GitHub URL and we'll generate full documentation, extract every function, and map your entire project structure.
                </p>

                {/* Try It Box */}
                <div className="bg-white border-2 border-landing-accent/30 rounded-2xl p-4 mb-4 shadow-sm">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-landing-subtext mb-2">
                        TRY IT — PASTE ANY PUBLIC REPO
                    </p>
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 font-mono text-sm text-landing-text flex items-center gap-2">
                        <span className="text-gray-400">github.com/facebook/react</span>
                    </div>
                </div>

                {/* What You Get Box */}
                <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-2xl p-6 mb-4 shadow-sm">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-landing-accent mb-3">
                        WHAT YOU GET
                    </p>
                    <ul className="space-y-2">
                        {[
                            "Full PROJECT_DOCUMENTATION.md",
                            "Every function extracted + described",
                            "Language breakdown and complexity score",
                            "Project structure map"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs font-medium text-landing-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-landing-accent" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {['AJ', 'KL', 'MR'].map((initials, i) => (
                            <div
                                key={i}
                                className={`w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white
                  ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-blue-400' : 'bg-purple-400'}`}
                            >
                                {initials}
                            </div>
                        ))}
                    </div>
                    <p className="text-sm text-landing-subtext">
                        Joined by <span className="font-bold text-landing-text">2,400+</span> engineering teams
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
