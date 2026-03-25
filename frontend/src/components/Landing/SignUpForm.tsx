import React from 'react';
import { Link } from 'react-router-dom';

const SignUpForm: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white h-full overflow-hidden">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-bold text-landing-text mb-1">Create your account</h2>
                <p className="text-xs text-landing-subtext mb-6">Sign up to see your full analysis results.</p>

                {/* Social Buttons */}
                <div className="flex gap-3 mb-6">
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                        <span className="text-xs font-semibold text-landing-text">Google</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                        <img src="https://github.com/favicon.ico" alt="GitHub" className="w-4 h-4" />
                        <span className="text-xs font-semibold text-landing-text">GitHub</span>
                    </button>
                </div>

                {/* Separator */}
                <div className="relative mb-6 flex items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-3 text-[9px] font-bold tracking-widest text-gray-400 uppercase">OR WITH EMAIL</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

                {/* Form Fields */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-[10px] font-bold text-landing-text uppercase tracking-wider mb-1.5">Full Name</label>
                        <input
                            type="text"
                            placeholder="Alex Rivera"
                            className="w-full bg-landing-input-bg text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-landing-accent/50 transition-all text-sm placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-landing-text uppercase tracking-wider mb-1.5">Work Email</label>
                        <input
                            type="email"
                            placeholder="alex@company.com"
                            className="w-full bg-landing-input-bg text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-landing-accent/50 transition-all text-sm placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-bold text-landing-text uppercase tracking-wider mb-1.5">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-landing-input-bg text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-landing-accent/50 transition-all text-sm placeholder-gray-500"
                        />
                        <p className="text-[9px] text-gray-400 mt-1.5">Must be at least 8 characters with one number.</p>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-gray-50 text-gray-300 font-bold rounded-xl cursor-not-allowed border border-gray-100 transition-all"
                        disabled
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center mt-6 text-xs text-landing-subtext">
                    Already have an account? <Link to="/login" className="text-landing-accent font-bold hover:underline">Login</Link>
                </p>

                <div className="mt-6 text-center">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-loose">
                        PROTECTED BY RECAPTCHA · SUBJECT TO TERMS
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
