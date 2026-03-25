import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
    const location = useLocation();
    const isLogin = location.pathname === '/login';
    const isSignup = location.pathname === '/signup';

    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <Link to="/signup" className="text-xl font-bold text-landing-text hover:opacity-80 transition-opacity">Repo Analyzer</Link>
            </div>
            <div className="flex items-center gap-6">
                <Link
                    to="/login"
                    className={`text-sm font-semibold transition-colors ${isLogin ? 'text-landing-accent underline underline-offset-8' : 'text-landing-subtext hover:text-landing-text'}`}
                >
                    Login
                </Link>
                <Link
                    to="/signup"
                    className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all shadow-sm ${isSignup ? 'bg-landing-accent text-white hover:bg-opacity-90' : 'text-landing-subtext hover:text-landing-text border border-gray-100'}`}
                >
                    Sign Up
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
