import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getLocalStorageItem } from '../services/localStorage';
import { apiGetAll, updateOrder, setToken } from '../services/requests';
import { FOUR, FIVE, SEVEN, EIGHT, TEN } from '../util/magicNumbers';

export default function CustomerOrderDetailsTable() {
  const [order, setOrder] = useState({});
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const tableHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];

  useEffect(() => {
    const getOrder = async () => {
      setToken(getLocalStorageItem('user').token);
      try {
        const ordr = await apiGetAll(location.pathname);
        setOrder(ordr);
        setSale(ordr.sale);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getOrder();
  }, [location.pathname]);

  const confirmDelivery = async () => {
    const updatedOrder = await updateOrder(location.pathname);
    setOrder(updatedOrder);
  };

  const getSubTotal = (quantity, price) => {
    const subTotal = (quantity * price).toFixed(2);
    return subTotal.toString().replace('.', ',');
  };

  const getDate = (date) => `${date.slice(EIGHT, TEN)}/${date
    .slice(FIVE, SEVEN)}/${date.slice(0, FOUR)}`;

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  const { status } = order;

  return (
    <div>
      <h2>Detalhe do Pedido</h2>
      <div>
        <strong
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          {`PEDIDO ${order.id}`}
        </strong>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          {order.sellers.name}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          {getDate(order.saleDate)}
        </p>
        <p
          data-testid={
            `customer_order_details__element-order-details-label-delivery-status${status}`
          }
        >
          {order.status}
        </p>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ () => confirmDelivery() }
          disabled={ order.status !== 'Em Trânsito' }
        >
          Marcar como entregue
        </button>
      </div>
      <table>
        <thead>
          <tr>
            {tableHead.map((element, index) => (
              <th key={ index }>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { sale.map((e, index) => (
            <tr key={ index }>
              <td
                data-testid={ `customer_order_details__
                  element-order-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                data-testid={ `customer_order_details__
                  element-order-table-name-${index}` }
              >
                {e.name}
              </td>
              <td
                data-testid={ `customer_order_details__
                  element-order-table-quantity-${index}` }
              >
                {e.SalesProducts.quantity}
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-unit-price-${index}` }
              >
                {e.price.toString().replace('.', ',')}
              </td>
              <td
                data-testid={ `customer_order_details__
                  element-order-table-sub-total-${index}` }
              >
                {getSubTotal(e.SalesProducts.quantity, e.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p
        data-testid="customer_order_details__element-order-total-price"
      >
        {order.totalPrice.toString().replace('.', ',')}
      </p>
    </div>
  );
}
