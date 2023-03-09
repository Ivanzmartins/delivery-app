import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import { getLocalStorageItem, localStorageSaveItem } from '../services/localStorage';
import { requestLogin, setToken } from '../services/requests';

import '../styles/login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedToLogin, setFailedToLogin] = useState(false);
  const navigate = useNavigate();
  const { setUserInfos } = useContext(DeliveryContext);

  const navigateTo = (responseRole) => {
    if (responseRole === 'administrator') navigate('/admin/manage');
    if (responseRole === 'seller') navigate('/seller/orders');
    if (responseRole === 'customer') navigate('/customer/products');
  };

  const login = async (event) => {
    event.preventDefault();

    try {
      const response = await requestLogin('/login', { email, password });
      setToken(response.token);

      const userDTO = {
        name: response.name,
        email: response.email,
        role: response.role,
        token: response.token,
      };

      localStorageSaveItem('user', userDTO);
      setUserInfos(userDTO);
      navigateTo(response.role);
    } catch (error) {
      setFailedToLogin(true);
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    const userInfo = getLocalStorageItem('user');
    if (userInfo && userInfo.token !== '') {
      if (userInfo.role === 'administrator') navigate('/admin/manage');
      if (userInfo.role === 'customer') navigate('/customers/orders');
      if (userInfo.role === 'seller') navigate('/seller/orders');
    }
  }, [navigate]);

  const handleEmail = (em) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(em);
  };

  const handlePassword = (senha) => {
    const minLength = 6;
    return senha.length >= minLength;
  };

  return (
    <main className="login-container">
      <form className="login-form">
        <label htmlFor="email">
          <p>Login</p>
          <input
            data-testid="common_login__input-email"
            type="email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            placeholder="email@trybeer.com"
          />
        </label>
        <label htmlFor="senha">
          <p>Senha</p>
          <input
            data-testid="common_login__input-password"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            placeholder="********"
          />
        </label>
        <button
          data-testid="common_login__button-login"
          className="login-button"
          type="button"
          disabled={ !(handleEmail(email) && handlePassword(password)) }
          onClick={ (event) => login(event) }
        >
          LOGIN
        </button>
        <button
          data-testid="common_login__button-register"
          onClick={ () => navigate('/register') }
          className="register-button"
          type="button"
        >
          Ainda não tenho conta
        </button>
      </form>
      {
        failedToLogin ? (
          <p
            data-testid="common_login__element-invalid-email"
            className="login-error"
          >
            Email ou senha inválido

          </p>
        ) : null
      }
    </main>
  );
}
