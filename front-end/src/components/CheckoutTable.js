import React, { useState } from 'react';
import { getLocalStorageItem, localStorageSaveItem } from '../services/localStorage';

export default function CheckoutTable() {
  const [cart, setCart] = useState(() => getLocalStorageItem('carrinho'));

  const tableHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total', 'Remover Item'];

  const getTotal = () => {
    const sum = cart
      .reduce((acc, curr) => acc + (curr.unitPrice * curr.quantity), 0).toFixed(2);
    const text = sum.toString();
    return text.replace('.', ',');
  };

  const removeItem = (name) => {
    const newCart = cart.filter((i) => i.name !== name);
    localStorageSaveItem('carrinho', newCart);
    setCart(newCart);
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
                  {index + 1}
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
                  {e.unitPrice.toString().replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {e.subTotal}
                </td>
                <td>
                  <button
                    data-testid={
                      `customer_checkout__element-order-table-remove-${index}`
                    }
                    type="button"
                    onClick={ () => removeItem(e.name) }

                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          data-testid="customer_checkout__element-order-total-price"
        >
          {getTotal()}
        </p>
      </div>
    </>
  );
}
