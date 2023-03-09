import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { apiGetAll, apiPost, setToken } from '../services/requests';
import { getLocalStorageItem } from '../services/localStorage';

function SellerOrderDetailsTable() {
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

  const getSubTotal = (quantity, price) => {
    const subTotal = (quantity * price).toFixed(2);
    return subTotal.toString().replace('.', ',');
  };

  const startOrder = async () => {
    const status = { status: 'Preparando' };
    const updatedOrder = await apiPost(location.pathname, status);
    setOrder(updatedOrder);
  };

  const startDelivery = async () => {
    const status = { status: 'Em Trânsito' };
    const updatedOrder = await apiPost(location.pathname, status);
    setOrder(updatedOrder);
  };

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <Header />
      <div>
        <h2>Detalhe do Pedido</h2>
        <div>
          <strong
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {`PEDIDO ${order.id}`}
          </strong>
          <p
            data-testid="Group seller_order_details__
              element-order-details-label-order-date"
          >
            {order.saleDate}
          </p>
          <p
            data-testid={ `seller_order_details__
              element-order-details-label-delivery-status${order.status}` }
          >
            {order.status}
          </p>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            onClick={ () => startOrder() }
            disabled={ order.status !== 'Pendente' }
          >
            PREPARAR PEDIDO
          </button>
          <button
            data-testid="seller_order_details__button"
            type="button"
            onClick={ () => startDelivery() }
            disabled={ order.status === 'Em Trânsito' }
          >
            SAIU PARA ENTREGA
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
            {sale.map((e, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `seller_order_details__
                    element-order-table-item-number-${index}` }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={ `seller_order_details__
                    element-order-table-name-${index}` }
                >
                  {e.name}
                </td>
                <td
                  data-testid={ `seller_order_details__
                    element-order-table-quantity-${index}` }
                >
                  {e.SalesProducts.quantity}
                </td>
                <td
                  data-testid={ `seller_order_details__
                  element-order-table-unit-price-${index}` }
                >
                  {e.price.toString().replace('.', ',')}
                </td>
                <td
                  data-testid={ `seller_order_details__
                    element-order-table-sub-total-${index}` }
                >
                  {getSubTotal(e.SalesProducts.quantity, e.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p
          data-testid="seller_order_details__element-order-total-price"
        >
          {order.totalPrice.toString().replace('.', ',')}
        </p>
      </div>
    </>
  );
}

export default SellerOrderDetailsTable;
