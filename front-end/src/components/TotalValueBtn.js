import React, { useContext, useEffect, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';

export default function TotalValueBtn() {
  const [totalValue, setTotalValue] = useState('');
  const { cartProducts } = useContext(DeliveryContext);

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
          .reduce((acc, curr) => Number(acc.price) + Number(curr.price));
        console.log(value);
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
