import React, { useEffect, useState } from 'react';
import { getLocalStorageItem } from '../services/localStorage';

export default function TotalValueBtn() {
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const getValuesFromStorage = () => {
      const cartItems = getLocalStorageItem('carrinho');
      const value = cartItems.reduce((acc, curr) => acc.price + curr.price, 0);
      setTotalValue(value);
    };

    getValuesFromStorage();
  }, []);
  return (
    <div>{totalValue}</div>
  );
}
