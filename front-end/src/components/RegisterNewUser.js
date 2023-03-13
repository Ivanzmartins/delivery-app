import React, { useContext, useState, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import { adminPost } from '../services/requests';
import { getLocalStorageItem } from '../services/localStorage';

import '../styles/registerUserForm.css';

export default function RegisterNewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);

  const { setUsersOfDB } = useContext(DeliveryContext);

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

  const register = async (event) => {
    event.preventDefault();
    try {
      const registerInfos = {
        name,
        email,
        password,
        role,
      };

      const userLocalStorage = getLocalStorageItem('user');

      const response = await adminPost(
        '/admin/manage',
        registerInfos,
        userLocalStorage.token,
      );
      setUsersOfDB((prevState) => [...prevState, response]);
    } catch (error) {
      console.log(error); // error.response
      setIsError(true);
    }
  };

  return (
    <section className="new-user-form-container">
      <h3>Cadastrar novo usuário</h3>
      {isError && (
        <h4
          data-testid="admin_manage__element-invalid-register"
        >
          Erro ao registrar usuário.

        </h4>
      )}
      <form onSubmit={ (event) => register(event) }>
        <label
          className="label-register-form"
          htmlFor="name-toregister"
        >
          Nome
          <input
            type="text"
            data-testid="admin_manage__input-name"
            value={ name }
            placeholder="Nome e sobrenome"
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label
          className="label-register-form"
          htmlFor="email-toregister"
        >
          Email
          <input
            type="email"
            data-testid="admin_manage__input-email"
            placeholder="seuemail@site.com.br"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label
          className="label-register-form"
          htmlFor="password-toregister"
        >
          Senha
          <input
            type="password"
            data-testid="admin_manage__input-password"
            placeholder="******"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <label
          className="label-register-form"
          htmlFor="role-toregister"
        >
          Tipo
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Comprador</option>
          </select>
        </label>
        <button
          type="submit"
          className="register-form-button"
          data-testid="admin_manage__button-register"
          disabled={ isDisabled }
        >
          Cadastrar

        </button>
      </form>
    </section>
  );
}
