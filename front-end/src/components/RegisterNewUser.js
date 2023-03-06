import React, { useContext, useState, useEffect } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import { apiPost } from '../services/requests';

export default function RegisterNewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);

  const { setUserOfDB } = useContext(DeliveryContext);

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

      const responde = await apiPost('/register', registerInfos);
      setUserOfDB((prevState) => [...prevState, responde]);
    } catch (error) {
      console.log(error); // error.response
      setIsError(true);
    }
  };

  return (
    <form onSubmit={ (event) => register(event) }>
      {isError && (
        <h4
          data-testid="admin_manage__element-invalid-register"
        >
          Erro ao registrar usuário;

        </h4>
      )}
      <fieldset>
        <label htmlFor="name-toregister">
          Nome
          <input
            type="text"
            data-testid="admin_manage__input-name"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
          />
        </label>
        <label htmlFor="email-toregister">
          Email
          <input
            type="email"
            data-testid="admin_manage__input-email"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
          />
        </label>
        <label htmlFor="password-toregister">
          Senha
          <input
            type="password"
            data-testid="admin_manage__input-password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
          />
        </label>
        <label htmlFor="role-toregister">
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
          data-testid="admin_manage__button-register"
          disabled={ isDisabled }
        >
          Cadastrar

        </button>
      </fieldset>
    </form>
  );
}
