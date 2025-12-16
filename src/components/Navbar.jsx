import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaUser, FaCog, FaMoon, FaSun, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { isDark, toggleTheme } = useTheme();
    const { cartCount } = useCart();
    const { user, logout, userData } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
            setIsMenuOpen(false);
        } else {
            navigate('/');
            setIsMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signin');
        } catch {
            console.error("Failed to log out");
        }
    };

    return (
        <nav style={{
            height: 'var(--header-height)',
            background: 'var(--surface-color)',
            borderBottom: '1px solid var(--border-color)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            boxShadow: 'var(--shadow-sm)'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

                {/* Logo Section */}
                <Link to="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', minWidth: '150px' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="brand"
                        style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}
                    >
                        PTR's Store
                    </motion.div>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{ fontSize: '0.75rem', color: 'var(--text-color)', opacity: 0.8 }}
                    >
                        Corizo Edutech
                    </motion.span>
                </Link>

                {/* Desktop Search Bar */}
                <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '600px', margin: '0 40px', display: 'none' }} className="desktop-search">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'var(--input-bg)',
                        borderRadius: '25px',
                        padding: '4px',
                        border: '2px solid transparent',
                        transition: 'border-color 0.3s',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ padding: '0 12px', color: 'var(--text-color)', opacity: 0.6 }}>
                            <FaSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Search for products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1,
                                padding: '10px 5px',
                                border: 'none',
                                background: 'transparent',
                                color: 'var(--text-color)',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                        <button type="submit" style={{
                            padding: '8px 24px',
                            borderRadius: '20px',
                            border: 'none',
                            background: 'var(--primary-color)',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginLeft: '5px'
                        }}>
                            Search
                        </button>
                    </div>
                </form>

                {/* Desktop Actions */}
                <div className="desktop-actions" style={{ display: 'flex', alignItems: 'center', gap: '20px', minWidth: '200px', justifyContent: 'flex-end' }}>
                    <Link to="/" style={{ fontWeight: 500 }}>Home</Link>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {user.email === 'admin@gmail.com' && (
                                <Link to="/admin" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Admin</Link>
                            )}
                            <Link to="/orders" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '500' }}>
                                <FaHistory /> History
                            </Link>
                            <span style={{ fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                {userData?.name || user.displayName || 'User'}
                            </span>
                            <button
                                onClick={handleLogout}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-color)', fontSize: '1.2rem' }}
                                title="Sign Out"
                            >
                                <FaSignOutAlt />
                            </button>
                        </div>
                    ) : (
                        <Link to="/signin" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <FaUser /> <span className="label">Sign In</span>
                        </Link>
                    )}

                    <Link to="/settings" style={{ fontSize: '1.2rem' }}>
                        <FaCog />
                    </Link>

                    <Link to="/cart" style={{ position: 'relative', fontSize: '1.2rem' }}>
                        <FaShoppingCart />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    id="cart-badge"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        background: 'var(--secondary-color)',
                                        color: 'white',
                                        fontSize: '0.7rem',
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleTheme}
                        style={{ background: 'none', border: 'none', color: 'var(--text-color)', fontSize: '1.2rem', cursor: 'pointer' }}
                    >
                        {isDark ? <FaSun /> : <FaMoon />}
                    </motion.button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.5rem', color: 'var(--text-color)' }}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <style>{`
        @media (min-width: 768px) {
          .desktop-search { display: block !important; }
        }
        @media (max-width: 768px) {
          .desktop-actions { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'absolute',
                            top: 'var(--header-height)',
                            left: 0,
                            right: 0,
                            background: 'var(--surface-color)',
                            borderBottom: '1px solid var(--border-color)',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '15px',
                            boxShadow: 'var(--shadow-md)'
                        }}
                    >
                        <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border-color)',
                                    background: 'var(--input-bg)',
                                    color: 'var(--text-color)'
                                }}
                            />
                        </form>
                        <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        {user ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{userData?.name || 'User'}</span>
                                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
                                </div>
                                {user.email === 'admin@gmail.com' && (
                                    <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Admin Dashboard</Link>
                                )}
                                <Link to="/orders" onClick={() => setIsMenuOpen(false)}>Order History</Link>
                            </div>
                        ) : (
                            <Link to="/signin" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                        )}
                        <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</Link>
                        <Link to="/settings" onClick={() => setIsMenuOpen(false)}>Settings</Link>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>Theme</span>
                            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: 'var(--text-color)' }}>
                                {isDark ? <FaSun /> : <FaMoon />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
