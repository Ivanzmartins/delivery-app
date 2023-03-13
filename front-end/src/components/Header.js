import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLocalStorageItem } from '../services/localStorage';

import '../styles/header.css';

export default function Header() {
  const [name, setName] = useState('Nome da Pessoa.');
  const [productButton, setProductButton] = useState('products-orders-button');
  const [orderButton, setOrderButton] = useState('products-orders-button');
  const [actualPath, setActualPath] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getName = () => {
      const userInfo = getLocalStorageItem('user');
      setName(userInfo.name);
    };

    const getPathName = () => {
      const { pathname } = location;
      if (pathname.includes('products')) setProductButton('product-order-active');
      if (pathname.includes('order')) setOrderButton('product-order-active');
      setActualPath(pathname);
    };

    getName();
    getPathName();
  }, [location]);

  const goToProducts = () => {
    navigate('/customer/products');
  };

  const goToOrders = () => {
    const { role } = getLocalStorageItem('user');
    if (role === 'customer') navigate('/customer/orders');
    if (role === 'seller') navigate('/seller/orders');
  };

  const goToAdminPage = () => {
    navigate('/admin/manage');
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleHeaderRoutes = () => {
    if (actualPath.includes('customer')) {
      return (
        <>
          <li>
            <button
              type="button"
              onClick={ () => goToProducts() }
              className={ productButton }
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={ () => goToOrders() }
              className={ orderButton }
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </button>
          </li>
        </>
      );
    }
    if (actualPath.includes('seller')) {
      return (
        <li>
          <button
            type="button"
            onClick={ () => goToOrders() }
            className={ orderButton }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </button>
        </li>
      );
    }
    if (actualPath.includes('admin')) {
      return (
        <li>
          <button
            type="button"
            onClick={ () => goToAdminPage() }
            className="admin-users"
            data-testid="customer_products__element-navbar-link-orders"
          >
            Gerenciar Usuários
          </button>
        </li>
      );
    }
  };

  return (
    <header className="header-container">
      <nav className="nav-bar">
        <ul>
          {handleHeaderRoutes()}
        </ul>
        <ul>
          <li
            data-testid="customer_products__element-navbar-user-full-name"
            className="user-name-header"
          >
            {name}

          </li>
          <li>
            <button
              type="button"
              onClick={ () => logout() }
              className="logout-button"
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
