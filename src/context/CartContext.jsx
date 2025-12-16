import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Depend on Auth
import { db } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    // Sync with Firestore when user logs in/out
    useEffect(() => {
        if (!user) {
            setItems([]); // Clear cart or load from generic localStorage if desired
            setLoading(false);
            return;
        }

        const cartRef = doc(db, 'carts', user.uid);

        // Listen to real-time updates
        const unsubscribe = onSnapshot(cartRef, (docSnap) => {
            if (docSnap.exists()) {
                setItems(docSnap.data().items || []);
            } else {
                setItems([]);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    // Save cart to Firestore whenever it changes
    const saveCartToFirestore = async (newItems) => {
        if (!user) return;
        const cartRef = doc(db, 'carts', user.uid);
        await setDoc(cartRef, { items: newItems }, { merge: true });
    };

    const addToCart = async (product) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            let newItems;
            if (existing) {
                newItems = current.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                newItems = [...current, { ...product, quantity: 1 }];
            }
            saveCartToFirestore(newItems); // Sync to DB
            return newItems;
        });
    };

    const removeFromCart = async (id) => {
        setItems(current => {
            const newItems = current.filter(item => item.id !== id);
            saveCartToFirestore(newItems); // Sync to DB
            return newItems;
        });
    };

    const updateQuantity = async (id, delta) => {
        setItems(current => {
            const newItems = current.map(item => {
                if (item.id === id) {
                    const newQuantity = Math.max(0, item.quantity + delta);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            }).filter(item => item.quantity > 0);
            saveCartToFirestore(newItems); // Sync to DB
            return newItems;
        });
    };

    const clearCart = async () => {
        setItems([]);
        saveCartToFirestore([]);
    };

    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
