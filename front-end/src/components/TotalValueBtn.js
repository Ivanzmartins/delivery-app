import React, { useContext, useEffect, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';
import { getLocalStorageItem } from '../services/localStorage';

export default function TotalValueBtn() {
  const [totalValue, setTotalValue] = useState('');
  const { cartProducts, setCartProducts } = useContext(DeliveryContext);

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
      } else if (cartItems.length === 1) {
        const value = cartItems[0].price;
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
      } else {
        const value = cartItems
          .reduce((acc, curr) => acc + Number(curr.price), 0);
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
      }
    };

    getValuesFromStorage();
  }, [cartProducts]);
  return (
    <div data-testid="customer_products__checkout-bottom-value">
      <button
        type="button"
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho: R$
        {' '}
        {totalValue}
      </button>
    </div>
  );
}
