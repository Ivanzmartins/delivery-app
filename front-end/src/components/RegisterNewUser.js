import React, { useState } from 'react';
import { apiPost } from '../services/requests';

export default function RegisterNewUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

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
      };

      await apiPost('/register', registerInfos);
    } catch (error) {
      console.log(error); // error.response
    }
  };

  return (
    <from onSubmit={ (event) => register(event) }>
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
            <option selected value="seller">Vendedor</option>
            <option value="customer">Comprador</option>
          </select>
        </label>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
        >
          Cadastrar

        </button>
      </fieldset>
    </from>
  );
}
