import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSave, FaUsers, FaShoppingCart, FaBox, FaClipboardList } from 'react-icons/fa';
import { db } from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const Admin = () => {
    const { user } = useAuth();
    const { products, addProduct, updateProduct, deleteProduct } = useProducts();
    const navigate = useNavigate();

    const [usersCount, setUsersCount] = useState(0);
    const [stats, setStats] = useState({ users: 0, products: 0, activeCarts: 0, completedOrders: 0 });
    const [usersList, setUsersList] = useState([]);

    const [isEditing, setIsEditing] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: '',
        description: '',
        rating: 4.5
    });

    // Fetch Stats
    useEffect(() => {
        if (!user || user.email !== 'admin@gmail.com') return;

        // Real-time listener for users
        const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
            setUsersCount(snapshot.size);
            setStats(prev => ({ ...prev, users: snapshot.size }));
            setUsersList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        // Update product count
        setStats(prev => ({ ...prev, products: products.length }));

        // Active Carts Count
        const unsubscribeCarts = onSnapshot(collection(db, "carts"), (snapshot) => {
            setStats(prev => ({ ...prev, activeCarts: snapshot.size }));
        });

        // Completed Orders Count
        const unsubscribeOrders = onSnapshot(collection(db, "orders"), (snapshot) => {
            setStats(prev => ({ ...prev, completedOrders: snapshot.size }));
        });

        return () => {
            unsubscribeUsers();
            unsubscribeCarts();
            unsubscribeOrders();
        };
    }, [user, products]);

    // ... (rest of the code)

    // Redirect if not admin
    useEffect(() => {
        if (!user || user.email !== 'admin@gmail.com') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.email !== 'admin@gmail.com') return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateProduct(isEditing, {
                    ...formData,
                    price: Number(formData.price),
                    rating: Number(formData.rating)
                });
                setIsEditing(null);
            } else {
                await addProduct({
                    ...formData,
                    price: Number(formData.price),
                    rating: Number(formData.rating)
                });
                setShowAddForm(false);
            }
            resetForm();
        } catch (err) {
            alert("Error saving product: " + err.message);
        }
    };

    const startEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            description: product.description || '',
            rating: product.rating
        });
        setIsEditing(product.id);
        setShowAddForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            await deleteProduct(id);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            category: '',
            image: '',
            description: '',
            rating: 4.5
        });
        setIsEditing(null);
    };

    return (
        <div className="container" style={{ paddingTop: 'calc(var(--header-height) + 40px)', paddingBottom: '60px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Admin Dashboard</h1>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                <StatCard icon={<FaUsers />} title="Total Users" value={stats.users} color="#3b82f6" />
                <StatCard icon={<FaBox />} title="Total Products" value={stats.products} color="#10b981" />
                <StatCard icon={<FaShoppingCart />} title="Active Carts" value={stats.activeCarts} color="#f59e0b" />
                <StatCard icon={<FaClipboardList />} title="Total Orders" value={stats.completedOrders} color="#8b5cf6" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h2 style={{ fontSize: '1.8rem' }}>Product Management</h2>
                <button
                    onClick={() => { resetForm(); setShowAddForm(!showAddForm); }}
                    style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {showAddForm && !isEditing ? <FaTimes /> : <FaPlus />}
                    {showAddForm && !isEditing ? 'Cancel' : 'Add New Product'}
                </button>
            </div>

            <AnimatePresence>
                {showAddForm && (
                    <motion.form
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        onSubmit={handleSubmit}
                        style={{
                            background: 'var(--surface-color)',
                            padding: '30px',
                            borderRadius: '20px',
                            marginBottom: '40px',
                            boxShadow: 'var(--shadow-lg)',
                            overflow: 'hidden'
                        }}
                    >
                        <h3 style={{ marginBottom: '20px' }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleInputChange} required style={inputStyle} />
                            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required style={inputStyle} />
                            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} required style={inputStyle} />
                            <input type="number" step="0.1" name="rating" placeholder="Rating (0-5)" value={formData.rating} onChange={handleInputChange} style={inputStyle} />
                            <input type="url" name="image" placeholder="Image URL (Unsplash/Direct Link)" value={formData.image} onChange={handleInputChange} required style={{ ...inputStyle, gridColumn: '1/-1' }} />
                            <textarea name="description" placeholder="Product Description" value={formData.description} onChange={handleInputChange} required style={{ ...inputStyle, gridColumn: '1/-1', minHeight: '100px', resize: 'vertical' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                            <button type="submit" style={btnPrimaryStyle}>
                                <FaSave /> {isEditing ? 'Update Product' : 'Save Product'}
                            </button>
                            {isEditing && (
                                <button type="button" onClick={() => { setShowAddForm(false); setIsEditing(null); }} style={btnSecondaryStyle}>
                                    Cancel
                                </button>
                            )}
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>

            {/* Product List */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                {products.map(product => (
                    <motion.div
                        layout
                        key={product.id}
                        style={{
                            background: 'var(--surface-color)',
                            borderRadius: '15px',
                            padding: '15px',
                            display: 'flex',
                            gap: '15px',
                            boxShadow: 'var(--shadow-sm)',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ margin: '0 0 5px 0' }}>{product.name}</h4>
                            <p style={{ margin: 0, color: 'var(--primary-color)', fontWeight: 'bold' }}>${product.price}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button onClick={() => startEdit(product)} style={actionBtnStyle} title="Edit"><FaEdit /></button>
                            <button onClick={() => handleDelete(product.id)} style={{ ...actionBtnStyle, color: '#ef4444' }} title="Delete"><FaTrash /></button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* User List Table */}
            <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Registered Users</h2>
            <div style={{ background: 'var(--surface-color)', borderRadius: '15px', padding: '20px', boxShadow: 'var(--shadow-md)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-color)' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border-color)' }}>
                            <th style={{ padding: '15px' }}>Name</th>
                            <th style={{ padding: '15px' }}>Email</th>
                            <th style={{ padding: '15px' }}>Age</th>
                            <th style={{ padding: '15px' }}>User ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map(u => (
                            <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '15px' }}>{u.name}</td>
                                <td style={{ padding: '15px' }}>{u.email}</td>
                                <td style={{ padding: '15px' }}>{u.age}</td>
                                <td style={{ padding: '15px', fontSize: '0.8rem', opacity: 0.7 }}>{u.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

const StatCard = ({ icon, title, value, color }) => (
    <div style={{
        background: 'var(--surface-color)',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
    }}>
        <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `${color}20`, // 20% opacity
            color: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem'
        }}>
            {icon}
        </div>
        <div>
            <span style={{ display: 'block', fontSize: '1rem', opacity: 0.7 }}>{title}</span>
            <span style={{ display: 'block', fontSize: '2rem', fontWeight: 'bold' }}>{value}</span>
        </div>
    </div>
);

const inputStyle = {
    padding: '12px',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
    background: 'var(--input-bg)',
    color: 'var(--text-color)',
    outline: 'none',
    fontSize: '1rem'
};

const btnPrimaryStyle = {
    background: 'var(--primary-color)',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
};

const btnSecondaryStyle = {
    background: 'transparent',
    color: 'var(--text-color)',
    border: '1px solid var(--border-color)',
    padding: '12px 30px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const actionBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'var(--text-color)',
    padding: '5px'
};

export default Admin;
