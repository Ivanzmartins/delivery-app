import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLocalStorageItem } from '../services/localStorage';

import '../styles/header.css';

export default function Header() {
  const [name, setName] = useState('Nome da Pessoa.');
  const navigate = useNavigate();

  useEffect(() => {
    const getName = () => {
      const userInfo = getLocalStorageItem('user');
      setName(userInfo.name);
    };
    getName();
  }, []);

  const goToProducts = () => {
    navigate('/customer/products');
  };

  const goToOrders = () => {
    navigate('/customer/orders');
  };

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header-container">
      <nav className="nav-bar">
        <ul>
          <li>
            <button
              type="button"
              onClick={ () => goToProducts() }
              className="products-button"
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={ () => goToOrders() }
              className="orders-button"
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </button>

          </li>
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
