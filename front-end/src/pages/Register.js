import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { localStorageSaveItem } from '../services/localStorage';
import { apiPost } from '../services/requests';

import '../styles/register.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [failedRegister, setFailedRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Erro ao cadastrar usuário.');
  const [isDisabled, setIsDisabled] = useState(true);
  const navigate = useNavigate();

  const register = async (event) => {
    event.preventDefault();
    const registerInfos = {
      name,
      email,
      password,
    };

    try {
      const response = await apiPost('/register', registerInfos);

      const userDTO = {
        name: response.name,
        email: response.email,
        role: response.role,
        token: response.token,
      };

      localStorageSaveItem('user', userDTO);
      navigate('/customer/products');
    } catch (error) {
      console.log(error); // error.response
      setFailedRegister(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const validateInputs = () => {
      const NAME_MIN_LENGTH = 12;
      const PASS_MIN_LENGTH = 6;
      const checkName = name.length >= NAME_MIN_LENGTH;
      const checkPassword = password.length >= PASS_MIN_LENGTH;
      const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
      const checkEmail = pattern.test(email);
      const finalCheck = checkName && checkEmail && checkPassword;
      setIsDisabled(!finalCheck);
    };
    validateInputs();
  }, [name, email, password]);

  return (
    <main className="register-container">
      <h1>Cadastro</h1>
      <form className="register-form" onSubmit={ (event) => register(event) }>
        <label htmlFor="name-input">
          <p>Nome</p>
          <input
            type="text"
            name="name"
            value={ name }
            data-testid="common_register__input-name"
            placeholder="Seu nome"
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label htmlFor="email-input">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={ email }
            data-testid="common_register__input-email"
            placeholder="seu-email@site.com.br"
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="password-input">
          <p>Senha</p>
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="common_register__input-password"
            placeholder="**********"
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <button
          type="submit"
          disabled={ isDisabled }
          data-testid="common_register__button-register"
          className="register-screen-button"
        >
          CADASTRAR

        </button>
      </form>
      {failedRegister && (
        <p
          data-testid="common_register__element-invalid_register"
          className="register-error"
        >
          {errorMessage}

        </p>)}
    </main>

  );
}
