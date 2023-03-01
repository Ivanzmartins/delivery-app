import React, { useEffect, useState } from 'react';
import { getLocalStorageItem } from '../services/localStorage';

export default function TotalValueBtn() {
  const [totalValue, setTotalValue] = useState('');

  useEffect(() => {
    const getValuesFromStorage = () => {
      const cartItems = getLocalStorageItem('carrinho');
      if (cartItems) {
        const value = cartItems
          .reduce((acc, curr) => Number(acc.price) + Number(curr.price));
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
      } else {
        setTotalValue('0,00');
      }
    };

    getValuesFromStorage();
  }, []);
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
