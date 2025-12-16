import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { products as initialProducts } from '../data/products'; // Import static data for seeding

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from Firestore
    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const prods = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            if (prods.length === 0) {
                // Seed initial data if DB is empty
                await seedProducts();
            } else {
                setProducts(prods);
            }
        } catch (error) {
            console.error("CRITICAL Error fetching products:", error);
            console.log("Falling back to local data due to error.");
            // Fallback to local data if DB fails
            setProducts(initialProducts);
        }
        setLoading(false);
    };

    const seedProducts = async () => {
        const seeded = [];
        for (const p of initialProducts) {
            // Add description to initial data
            const pWithDesc = { ...p, description: "Experience premium quality with our " + p.name + ". Designed for comfort and durability." };
            // Remove the ID from the data payload as Firestore generates its own (or we can use the existing ID as doc key)
            const { id, ...data } = pWithDesc;
            const docRef = await addDoc(collection(db, 'products'), data);
            seeded.push({ id: docRef.id, ...data });
        }
        setProducts(seeded);
    };

    // CRUD Operations
    const addProduct = async (productData) => {
        const docRef = await addDoc(collection(db, 'products'), productData);
        setProducts(prev => [...prev, { id: docRef.id, ...productData }]);
        return docRef;
    };

    const updateProduct = async (id, updates) => {
        await updateDoc(doc(db, 'products', id), updates);
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const deleteProduct = async (id) => {
        await deleteDoc(doc(db, 'products', id));
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
