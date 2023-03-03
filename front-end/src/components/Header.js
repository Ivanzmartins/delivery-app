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

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="header-container">
      <nav className="nav-bar">
        <ul>
          <li
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos

          </li>
          <li
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos

          </li>
        </ul>
        <ul>
          <li
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {name}

          </li>
          <li>
            <button
              type="button"
              onClick={ () => logout() }
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
