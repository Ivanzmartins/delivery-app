import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../context/DeliveryContext';
import { getLocalStorageItem } from '../services/localStorage';

export default function TotalValueBtn() {
  const [totalValue, setTotalValue] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const { cartProducts, setCartProducts } = useContext(DeliveryContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getItemsFromStorage = () => {
      const getFromStorage = getLocalStorageItem('carrinho');
      if (getFromStorage) setCartProducts(getFromStorage);
    };

    getItemsFromStorage();
  }, []);

  useEffect(() => {
    const getValuesFromStorage = () => {
      const cartItems = cartProducts;
      if (!cartItems.length) {
        setTotalValue('0,00');
        setIsDisabled(true);
      } else if (cartItems.length === 1) {
        const value = cartItems[0].subTotal;
        setTotalValue(value);
        setIsDisabled(false);
      } else {
        const treatPorducts = cartItems
          .map((e) => ({ ...e, subTotal: e.subTotal.replace(',', '.') }));
        const value = treatPorducts
          .reduce((acc, curr) => acc + parseFloat(curr.subTotal), 0);
        console.log(value);
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
        setIsDisabled(false);
      }
    };

    getValuesFromStorage();
  }, [cartProducts]);

  const checkOut = () => {
    navigate('/customer/checkout');
  };

  return (
    <button
      type="button"
      onClick={ () => checkOut() }
      disabled={ isDisabled }
      className="total-button"
      data-testid="customer_products__button-cart"
    >
      Ver Carrinho: R$
      {' '}
      <span data-testid="customer_products__checkout-bottom-value">
        {totalValue}
      </span>
    </button>
  );
}
