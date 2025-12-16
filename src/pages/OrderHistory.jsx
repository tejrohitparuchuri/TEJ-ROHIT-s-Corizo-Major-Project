import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen, FaCalendarAlt, FaMoneyBillWave, FaArrowLeft, FaReceipt } from 'react-icons/fa';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/signin');
            return;
        }

        const fetchOrders = async () => {
            try {
                // Query orders where userId matches current user
                // Note: Requires composite index if using 'orderBy' with 'where' on different fields.
                // For now, let's just filter by user and sort client-side or use simple query.
                // Simple query: where userId == user.uid
                const q = query(
                    collection(db, 'orders'),
                    where('userId', '==', user.uid)
                );

                const querySnapshot = await getDocs(q);
                const fetchedOrders = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Sort by date descending (newest first)
                fetchedOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

                setOrders(fetchedOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate]);

    if (loading) {
        return (
            <div style={{ paddingTop: '100px', textAlign: 'center' }}>
                <p>Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '60px', minHeight: '100vh' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <FaBoxOpen style={{ color: 'var(--primary-color)' }} /> Order History
                </h2>
                <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaArrowLeft /> Back to Shop
                </Link>
            </div>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', background: 'var(--surface-color)', borderRadius: '20px' }}>
                    <FaBoxOpen size={50} style={{ color: 'var(--text-color)', opacity: 0.3, marginBottom: '20px' }} />
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-color)', opacity: 0.7 }}>You haven't placed any orders yet.</p>
                    <Link to="/" style={{ marginTop: '20px', display: 'inline-block', fontWeight: 'bold', color: 'var(--primary-color)' }}>Start Shopping</Link>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'var(--surface-color)',
                                padding: '25px',
                                borderRadius: '15px',
                                boxShadow: 'var(--shadow-sm)',
                                border: '1px solid var(--border-color)'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.7, marginBottom: '5px' }}>Order ID</p>
                                    <p style={{ fontWeight: 'bold' }}>#{order.orderId}</p>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.7, marginBottom: '5px' }}>Date Placed</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <FaCalendarAlt size={12} />
                                        <span>{new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                                <div>
                                    <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.7, marginBottom: '5px' }}>Total Amount</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                        <FaMoneyBillWave size={14} />
                                        <span>${order.total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <FaReceipt size={14} /> Items Purchased
                                </h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {order.items.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg-color)', borderRadius: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                                <div style={{ width: '50px', height: '50px', background: 'white', borderRadius: '8px', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '500' }}>{item.name}</p>
                                                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Quantity: {item.quantity}</p>
                                                </div>
                                            </div>
                                            <p style={{ fontWeight: 'bold' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
