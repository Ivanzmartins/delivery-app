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
        const value = parseFloat(cartItems[0].subTotal);
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
      } else {
        const value = cartItems
          .reduce((acc, curr) => acc + parseFloat(curr.subTotal.replace(',', '.')), 0);
        console.log(value);
        const treatValue = value.toFixed(2).replace('.', ',');
        setTotalValue(treatValue);
      }
    };

    getValuesFromStorage();
  }, [cartProducts]);
  return (
    <div>
      <button
        type="button"
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
