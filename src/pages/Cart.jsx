import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaCreditCard, FaSpinner } from 'react-icons/fa';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { user, userData } = useAuth();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleCheckout = () => {
        if (!user) {
            navigate('/signin');
            return;
        }

        setIsProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            const orderDetails = {
                items: [...items],
                total: cartTotal,
                date: new Date().toISOString(),
                orderId: Math.floor(Math.random() * 1000000),
                user: {
                    name: userData?.name || user.displayName || 'Customer',
                    email: user.email
                }
            };

            clearCart();
            setIsProcessing(false);
            navigate('/success', { state: { orderDetails } });
        }, 2000);
    };

    return (
        <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>Your Cart</h2>

            {items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <p style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-color)', opacity: 0.7 }}>Your cart is empty.</p>
                    <Link to="/" style={{
                        padding: '12px 25px',
                        background: 'var(--primary-color)',
                        color: 'white',
                        borderRadius: '25px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: 'var(--shadow-md)'
                    }}>
                        <FaArrowLeft /> Continue Shopping
                    </Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <AnimatePresence>
                        {items.map(item => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                layout
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    background: 'var(--surface-color)',
                                    padding: '15px',
                                    borderRadius: '15px',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '10px', marginRight: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h3>
                                    <p style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>${item.price}</p>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginRight: '30px' }}>
                                    <button
                                        onClick={() => updateQuantity(item.id, -1)}
                                        style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                        <FaMinus size={12} />
                                    </button>
                                    <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, 1)}
                                        style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '1.2rem', padding: '10px', cursor: 'pointer' }}
                                >
                                    <FaTrash />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    <div style={{
                        marginTop: '30px',
                        background: 'var(--surface-color)',
                        padding: '30px',
                        borderRadius: '15px',
                        boxShadow: 'var(--shadow-md)',
                        alignSelf: 'flex-end',
                        width: '100%',
                        maxWidth: '400px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                            <span>Total:</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            style={{
                                width: '100%',
                                padding: '15px',
                                borderRadius: '30px',
                                background: isProcessing ? '#ccc' : 'var(--primary-color)',
                                color: 'white',
                                border: 'none',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: 'var(--shadow-md)',
                                cursor: isProcessing ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px'
                            }}
                        >
                            {isProcessing ? (
                                <>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                    >
                                        <FaSpinner />
                                    </motion.div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaCreditCard /> Pay & Checkout
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
