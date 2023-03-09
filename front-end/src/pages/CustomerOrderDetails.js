import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import { apiGetAll, apiPost } from '../services/requests';

function CustomerOrderDetails() {
  const [order, setOrder] = useState([]);
  const location = useLocation();

  const tableHead = ['Item', 'Descrição', 'Quantidade',
    'Valor Unitário', 'Sub-total'];

  const getOrder = async () => {
    const ordr = await apiGetAll(location.pathname);
    setOrder(ordr);
  };

  const confirmDelivery = async () => {
    const status = { status: 'Entregue' };
    const updatedOrder = await apiPost(location.pathname, status);
    setOrder(updatedOrder);
  };

  const getSubTotal = (quantity, price) => {
    const subTotal = (quantity * price).toFixed(2);
    return subTotal.toString().replace('.', ',');
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <Header />
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
            {order.seller}
          </p>
          <p
            data-testid="Group customer_order_details__
            element-order-details-label-order-date"
          >
            {order.date}
          </p>
          <p
            data-testid={ `customer_order_details__
            element-order-details-label-delivery-status${order.status}` }
          >
            {order.status}
          </p>
          <button
            type="button"
            data-testid="customer_order_details__button-delivery-check"
            onClick={ () => confirmDelivery() }
            disabled={ order.status === 'Entregue' }
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
            {order.sale.map((e, index) => (
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
    </>
  );
}

export default CustomerOrderDetails;
