import React, { useEffect, useState } from 'react';
import { getLocalStorageItem, localStorageSaveItem } from '../services/localStorage';

export default function CheckoutTable() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState('');

  const tableHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  const getTotal = () => {
    const treatPorducts = cart
      .map((e) => ({ ...e, subTotal: e.subTotal.replace(',', '.') }));
    const value = treatPorducts
      .reduce((acc, curr) => acc + parseFloat(curr.subTotal), 0);
    const treatValue = value.toFixed(2).replace('.', ',');
    setTotal(treatValue);
  };

  useEffect(() => {
    const getCart = () => {
      const ct = getLocalStorageItem('carrinho');
      setCart(ct);
    };
    getCart();
    getTotal();
  }, []);

  const removeItem = (name) => {
    const newCart = cart.filter((i) => i.name !== name);
    localStorageSaveItem('carrinho', newCart);
  };

  return (
    <>
      <h2>Finalizar Pedido</h2>
      <div>
        <table>
          <thead>
            <tr>
              {tableHead.map((element, index) => (
                <th key={ index }>{element}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cart.map((e, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {e.index + 1}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {e.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {e.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {e.unitPrice}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {e.subTotal}
                </td>
                <button
                  type="button"
                  onClick={ () => removeItem(e.name) }
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                >
                  Remover
                </button>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          {`Total: R$ ${total}`}
        </p>
      </div>
    </>
  );
}
