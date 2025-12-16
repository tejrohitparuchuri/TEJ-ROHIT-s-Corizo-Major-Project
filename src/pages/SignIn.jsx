import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to sign in. ' + err.message);
        }
        setLoading(false);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'var(--header-height)'
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                    background: 'var(--surface-color)',
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: 'var(--shadow-lg)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Welcome Back</h2>
                {error && <div style={{ color: '#ef4444', marginBottom: '15px', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '5px' }}>{error}</div>}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--input-bg)',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--input-bg)',
                            color: 'var(--text-color)',
                            outline: 'none'
                        }}
                        required
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: '12px',
                            borderRadius: '25px',
                            border: 'none',
                            background: 'var(--primary-color)',
                            color: 'white',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            marginTop: '10px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.7 }}>
                    Don't have an account? <Link to="/signup" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Sign Up</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default SignIn;
