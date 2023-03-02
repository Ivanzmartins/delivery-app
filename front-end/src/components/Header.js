import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import { localStorageSaveItem } from '../services/localStorage';

export default function Header() {
  const { userInfos } = useContext(DeliveryContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorageSaveItem('user', {});
    navigate('/login');
  };

  return (
    <section>
      <nav>
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
            {userInfos.name}

          </li>
          <li>
            <button
              type="button"
              onClick={ logout }
              data-testid="customer_products__element-navbar-link-logout"
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </section>
  );
}
