import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';

const LoginPage: React.FC = () => {
    return (
        <div className="h-screen bg-white flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-col md:flex-row h-full overflow-hidden">
                <HeroSection />
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
