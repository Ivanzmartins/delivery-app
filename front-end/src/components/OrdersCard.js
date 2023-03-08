import React from 'react';
import PropTypes from 'prop-types';
import { FOUR, FIVE, SEVEN, EIGHT, TEN } from '../util/magicNumbers';

export default function OrdersCard({ id, status, date, price, actor }) {
  const getDate = `${date.slice(EIGHT, TEN)}/${date
    .slice(FIVE, SEVEN)}/${date.slice(0, FOUR)}`;

  const setActor = actor === 'customer' ? 'customer_orders' : 'seller_orders';

  return (
    <>
      <div data-testid={ `${setActor}__element-order-id-${id}` }>
        {`Pedido ${id}`}
      </div>
      <div data-testid={ `${setActor}__element-delivery-status-${id}` }>
        {status}
      </div>
      <div data-testid={ `${setActor}__element-order-date-${id}` }>
        {getDate}
      </div>
      <div data-testid={ `${setActor}__element-card-price-${id}` }>
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
  actor: PropTypes.string.isRequired,
};
