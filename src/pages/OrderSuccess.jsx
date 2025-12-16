import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaPrint, FaHome } from 'react-icons/fa';

const OrderSuccess = () => {
    const location = useLocation();
    const { orderDetails } = location.state || {};

    if (!orderDetails) {
        return <Navigate to="/" />;
    }

    const { items, total, date, orderId, user } = orderDetails;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '60px', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '20px',
                    boxShadow: 'var(--shadow-lg)',
                    maxWidth: '800px',
                    width: '100%',
                    color: '#333'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', damping: 10 }}
                    >
                        <FaCheckCircle style={{ fontSize: '5rem', color: '#10b981', marginBottom: '20px' }} />
                    </motion.div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#111' }}>Payment Successful!</h1>
                    <p style={{ fontSize: '1.2rem', color: '#666' }}>Thank you for your purchase.</p>
                </div>

                {/* Bill / Invoice */}
                <div id="invoice" style={{ border: '2px solid #eee', borderRadius: '15px', padding: '30px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '20px' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '5px' }}>PTR's Store</h2>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>Corizo Edutech</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontWeight: 'bold' }}>Order ID: #{orderId}</p>
                            <p style={{ color: '#666' }}>Date: {new Date(date).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '30px' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#111' }}>Bill To:</h3>
                        <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{user?.name || 'Valued Customer'}</p>
                        <p>{user?.email}</p>
                    </div>

                    <table style={{ width: '100%', marginBottom: '30px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
                                <th style={{ padding: '10px 0', color: '#666' }}>Item</th>
                                <th style={{ padding: '10px 0', textAlign: 'center', color: '#666' }}>Qty</th>
                                <th style={{ padding: '10px 0', textAlign: 'right', color: '#666' }}>Price</th>
                                <th style={{ padding: '10px 0', textAlign: 'right', color: '#666' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '15px 0', fontWeight: '500' }}>{item.name}</td>
                                    <td style={{ padding: '15px 0', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: '15px 0', textAlign: 'right' }}>${item.price}</td>
                                    <td style={{ padding: '15px 0', textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ width: '250px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '1.1rem' }}>
                                <span>Subtotal:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#10b981' }}>
                                <span>Discount:</span>
                                <span>-$0.00</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', paddingTop: '15px', borderTop: '2px solid #eee', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                <span>Total:</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <button
                        onClick={handlePrint}
                        style={{
                            padding: '12px 30px',
                            borderRadius: '25px',
                            border: '2px solid #eee',
                            background: 'transparent',
                            color: '#333',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                    >
                        <FaPrint /> Print Bill
                    </button>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button
                            style={{
                                padding: '12px 30px',
                                borderRadius: '25px',
                                border: 'none',
                                background: 'var(--primary-color)',
                                color: 'white',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <FaHome /> Continue Shopping
                        </button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default OrderSuccess;
