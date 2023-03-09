import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';

import DeliveryContext from './DeliveryContext';
import { apiGetAll } from '../services/requests';

export default function DeliveryProvider({ children }) {
  const INITIAL_STATE = {
    name: 'Nome Da Pessoa Usuária',
    email: 'email@dominio.com',
    role: '',
    token: '',
  };
  const [userInfos, setUserInfos] = useState(INITIAL_STATE);
  const [cartProducts, setCartProducts] = useState([]);
  const [usersOfDB, setUsersOfDB] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const users = await apiGetAll('/user');
      const removeAdmin = users.filter((e) => e.role !== 'administrator');
      setUsersOfDB(removeAdmin);
    };
    getUsers();
  }, []);

  const contextValue = useMemo(() => ({
    userInfos,
    setUserInfos,
    cartProducts,
    setCartProducts,
    usersOfDB,
    setUsersOfDB,
  }), [userInfos, cartProducts, usersOfDB]);

  return (
    <DeliveryContext.Provider value={ contextValue }>
      {children}
    </DeliveryContext.Provider>
  );
}

DeliveryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
