import React from 'react';
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const LoginForm: React.FC = () => {

    const handleSuccess = async (credentialResponse: any) => {
        console.log("Google token:", credentialResponse.credential);

        try {
            const response = await axios.post(`${apiBaseUrl}/auth/google`, {
                token: credentialResponse.credential,
            });

            console.log("Backend response:", response.data);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white h-full overflow-hidden">
            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-bold text-landing-text mb-1">Welcome back</h2>
                <p className="text-xs text-landing-subtext mb-6">Login to your account to continue.</p>

                <div className="mb-4">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.log("Google Login Failed")}
                    />
                </div>

                <button className="w-full flex items-center justify-center gap-2 py-2 px-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mb-6">
                    <img src="https://github.com/favicon.ico" alt="GitHub" className="w-4 h-4" />
                    <span className="text-xs font-semibold text-landing-text">GitHub</span>
                </button>

                {/* Separator */}
                <div className="relative mb-6 flex items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-3 text-[9px] font-bold tracking-widest text-gray-400 uppercase">OR WITH EMAIL</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;