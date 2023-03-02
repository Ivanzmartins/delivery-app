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
        const value = parseFloat(cartItems[0].subTotal);
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
        setIsDisabled(false);
      } else {
        const value = cartItems
          .reduce((acc, curr) => acc + parseFloat(curr.subTotal.replace(',', '.')), 0);
        console.log(value);
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
        setIsDisabled(false);
      }
    };

    getValuesFromStorage();
  }, [cartProducts]);

  const checkOut = () => {
    navigate('/checkout');
  };

  return (
    <div>
      <button
        type="button"
        onClick={ () => checkOut() }
        disabled={ isDisabled }
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho: R$
        {' '}
        <span data-testid="customer_products__checkout-bottom-value">
          {totalValue}
        </span>
      </button>
    </div>
  );
}
