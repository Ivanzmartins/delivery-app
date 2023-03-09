import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AdminMenu from './pages/AdminMenu';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Products from './pages/Products';
import Register from './pages/Register';
import CustomerOrders from './pages/CustomerOrders';
import SellerOrders from './pages/SellerOrders';

function App() {
  return (
    <Routes>
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/customer/products" element={ <Products /> } />
      <Route path="/customer/checkout" element={ <Checkout /> } />
      <Route path="/customer/orders" element={ <CustomerOrders /> } />
      <Route path="/seller/orders" element={ <SellerOrders /> } />
      <Route path="/admin/manage" element={ <AdminMenu /> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
    </Routes>
  );
}

export default App;
