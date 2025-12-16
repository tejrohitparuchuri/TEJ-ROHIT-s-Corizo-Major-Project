import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa';

const Settings = () => {
    const { isDark, toggleTheme } = useTheme();
    const { user, userData } = useAuth();

    return (
        <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '40px', maxWidth: '600px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>Settings</h2>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '15px', boxShadow: 'var(--shadow-sm)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <div>
                        <h3 style={{ fontSize: '1.1rem' }}>Dark Mode</h3>
                        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Toggle dark/light theme appearance</p>
                    </div>
                    <div
                        onClick={toggleTheme}
                        style={{
                            width: '50px',
                            height: '26px',
                            background: isDark ? 'var(--primary-color)' : '#cbd5e1',
                            borderRadius: '13px',
                            position: 'relative',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                        }}
                    >
                        <div style={{
                            width: '20px',
                            height: '20px',
                            background: 'white',
                            borderRadius: '50%',
                            position: 'absolute',
                            top: '3px',
                            left: isDark ? '27px' : '3px',
                            transition: 'left 0.3s'
                        }} />
                    </div>
                </div>

                <div style={{ padding: '20px 0' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Account Information</h3>
                    {user ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'var(--bg-color)', padding: '20px', borderRadius: '10px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                                <span style={{ opacity: 0.8 }}>Name</span>
                                <span style={{ fontWeight: '600' }}>{userData?.name || user.displayName || 'N/A'}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                                <span style={{ opacity: 0.8 }}>Email</span>
                                <span style={{ fontWeight: '600' }}>{user.email}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ opacity: 0.8 }}>Age</span>
                                <span style={{ fontWeight: '600' }}>{userData?.age || 'Not provided'}</span>
                            </div>
                        </div>
                    ) : (
                        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>Sign in to view and manage your account details.</p>
                    )}
                </div>

                {user && (
                    <div style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <Link to="/orders" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none', color: 'var(--text-color)', padding: '10px', background: 'var(--bg-color)', borderRadius: '10px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
                                <FaBoxOpen /> Order History
                            </span>
                            <span>&rarr;</span>
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Settings;
