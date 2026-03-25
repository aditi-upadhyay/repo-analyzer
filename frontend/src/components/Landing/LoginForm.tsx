import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white h-full overflow-hidden">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-bold text-landing-text mb-1">Welcome back</h2>
                <p className="text-xs text-landing-subtext mb-6">Login to your account to continue.</p>

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
                        <label className="block text-[10px] font-bold text-landing-text uppercase tracking-wider mb-1.5">Work Email</label>
                        <input
                            type="email"
                            placeholder="alex@company.com"
                            className="w-full bg-landing-input-bg text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-landing-accent/50 transition-all text-sm placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1.5">
                            <label className="block text-[10px] font-bold text-landing-text uppercase tracking-wider">Password</label>
                            <Link to="/forgot-password" title="Forgot Password" className="text-[9px] font-bold text-landing-accent hover:underline">Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full bg-landing-input-bg text-white px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-landing-accent/50 transition-all text-sm placeholder-gray-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-landing-accent text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-sm"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center mt-6 text-xs text-landing-subtext">
                    Don't have an account? <Link to="/signup" className="text-landing-accent font-bold hover:underline">Sign up</Link>
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

export default LoginForm;
