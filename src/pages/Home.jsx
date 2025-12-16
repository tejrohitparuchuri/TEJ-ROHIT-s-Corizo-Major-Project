import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { FaStar, FaPlus } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
    const { products, loading } = useProducts();
    const { addToCart } = useCart();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';

    const filteredProducts = useMemo(() => {
        if (!searchQuery) return products;
        const lowerQuery = searchQuery.toLowerCase();
        return products.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        );
    }, [searchQuery]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading products...</div>;

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div style={{ paddingTop: 'var(--header-height)' }}>
            {/* Hero Section */}
            {!searchQuery && (
                <section style={{
                    position: 'relative',
                    height: '500px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--bg-color) 0%, var(--surface-color) 100%)',
                    overflow: 'hidden',
                    marginBottom: '40px'
                }}>
                    <div className="container" style={{ textAlign: 'center', zIndex: 1 }}>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                                fontSize: '4rem',
                                fontWeight: 800,
                                background: 'linear-gradient(to right, var(--primary-color), var(--secondary-color))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                marginBottom: '20px'
                            }}
                        >
                            PTR's Store
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            style={{ fontSize: '1.5rem', color: 'var(--text-color)', marginBottom: '40px' }}
                        >
                            Premium Shopping by Corizo Edutech
                        </motion.p>
                        <motion.button
                            onClick={() => {
                                document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth' });
                            }}
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '15px 50px',
                                fontSize: '1.2rem',
                                borderRadius: '30px',
                                border: 'none',
                                background: 'var(--primary-color)',
                                color: 'white',
                                boxShadow: 'var(--shadow-lg)',
                                cursor: 'pointer'
                            }}
                        >
                            Shop Now
                        </motion.button>
                    </div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            top: '-20%',
                            left: '-10%',
                            width: '600px',
                            height: '600px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, var(--accent-color) 0%, transparent 70%)',
                            opacity: 0.1,
                            zIndex: 0
                        }}
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: 'absolute',
                            bottom: '-20%',
                            right: '-10%',
                            width: '500px',
                            height: '500px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)',
                            opacity: 0.1,
                            zIndex: 0
                        }}
                    />
                </section>
            )}

            {/* Product Grid */}
            <section id="product-grid" className="container" style={{ padding: '0 20px 60px 20px' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '30px', borderLeft: '5px solid var(--primary-color)', paddingLeft: '15px' }}>
                    {searchQuery ? `Results for "${searchQuery}"` : 'Featured Products'}
                </h2>

                <motion.div
                    layout
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '30px'
                    }}
                >
                    <AnimatePresence>
                        {(filteredProducts.length > 0 ? filteredProducts : products).map(product => (
                            <motion.div
                                layout
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ y: -10, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    background: 'var(--surface-color)',
                                    borderRadius: '15px',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-md)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'box-shadow 0.3s ease'
                                }}
                            >
                                <div style={{ height: '220px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    <motion.img
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                        src={product.image}
                                        alt={product.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '5px' }}>{product.category}</span>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', lineHeight: '1.4' }}>{product.name}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                        <FaStar style={{ color: '#fbbf24', marginRight: '5px' }} />
                                        <span style={{ fontWeight: '500' }}>{product.rating}</span>
                                    </div>
                                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price}</span>
                                        <motion.button
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => addToCart(product)}
                                            style={{
                                                background: 'var(--primary-color)',
                                                color: 'white',
                                                border: 'none',
                                                width: '45px',
                                                height: '45px',
                                                borderRadius: '50%',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                cursor: 'pointer',
                                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <FaPlus />
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>
        </div>
    );
};

export default Home;
