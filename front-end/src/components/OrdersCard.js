import React from 'react';
import PropTypes from 'prop-types';
import { FOUR, FIVE, SEVEN, EIGHT, TEN } from '../util/magicNumbers';

export default function OrdersCard({ id, status, date, price }) {
  const getDate = `${date.slice(EIGHT, TEN)}/${date
    .slice(FIVE, SEVEN)}/${date.slice(0, FOUR)}`;

  return (
    <>
      <div data-testid={ `customer_orders__element-order-id-${id}` }>
        {`Pedido ${id}`}
      </div>
      <div data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </div>
      <div data-testid={ `customer_orders__element-order-date-${id}` }>
        {getDate}
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
