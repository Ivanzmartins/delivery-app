import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
// import { localStorageSaveItem } from '../services/localStorage';

export default function Header() {
  const { userInfos } = useContext(DeliveryContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
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
          <li>
            <NavLink to="/customer/orders">
              Meus Pedidos
            </NavLink>
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
              onClick={ () => logout() }
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
