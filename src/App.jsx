import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useTheme } from './context/ThemeContext';

import Home from './pages/Home';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Admin from './pages/Admin';
import Settings from './pages/Settings';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';

function App() {
  const { isDark } = useTheme();

  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
