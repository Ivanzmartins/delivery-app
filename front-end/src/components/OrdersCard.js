import React from 'react';
import PropTypes from 'prop-types';

export default function OrdersCard({ id, status, date, price }) {
  return (
    <>
      <div data-testid={ `customer_orders__element-order-id-${id}` }>
        {`Pedido ${id}`}
      </div>
      <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </div>
      <div data-testid={ `customer_orders__element-order-date-${id}` }>
        {date}
      </div>
      <div data-testid={ `customer_orders__element-card-price-${id}` }>
        {`R$ ${price}`}
      </div>
    </>
  );
}

OrdersCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};
