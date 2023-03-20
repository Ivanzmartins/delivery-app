import React from 'react';
import PropTypes from 'prop-types';
import { FOUR, FIVE, SEVEN, EIGHT, TEN } from '../util/magicNumbers';

export default function OrdersCard({ id, status, date, price, actor }) {
  const getDate = `${date.slice(EIGHT, TEN)}/${date
    .slice(FIVE, SEVEN)}/${date.slice(0, FOUR)}`;

  const getPrice = price.replace(/\./, ',');

  const setActor = actor === 'customer' ? 'customer_orders' : 'seller_orders';

  const transito = 'order-transito';

  return (
    <div className="order-card">
      <div className="order-id">
        <p
          data-testid={ `${setActor}__element-order-id-${id}` }
        >
          {`Pedido ${id}`}
        </p>
      </div>
      <div
        className={ status === 'Em Trânsito' ? transito : `order-${status}` }
      >
        <p
          data-testid={ `${setActor}__element-delivery-status-${id}` }
        >
          {status}
        </p>
      </div>
      <div className="date-and-price">
        <p data-testid={ `${setActor}__element-order-date-${id}` }>
          {getDate}
        </p>
        <p data-testid={ `${setActor}__element-card-price-${id}` }>
          R$
          {' '}
          { getPrice }
        </p>
      </div>
    </div>
  );
}

OrdersCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  actor: PropTypes.string.isRequired,
};
