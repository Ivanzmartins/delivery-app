import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  addLocalStorageCartItem,
  rmLocalStorageCartItem,
} from '../services/localStorage';

export default function ProductsCard({ id, name, price, urlImage }) {
  const [count, setCount] = useState(0);

  const item = {
    id,
    name,
    price,
    urlImage,
  };

  const addItem = () => {
    const counter = count + 1;
    setCount(counter);
    addLocalStorageCartItem(item);
  };

  const rmItem = () => {
    const counter = count - 1;
    if (counter < 0) {
      setCount(0);
    } else {
      setCount(counter);
      rmLocalStorageCartItem(item);
    }
  };

  return (
    <div>
      <p datatest-id={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>
      <p datatest-id={ `customer_products__element-card-price-${id}` }>
        {price}
      </p>
      <img
        datatest-id={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        datatest-id={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => rmItem() }
      >
        -
      </button>
      <input
        type="text"
        datatest-id={ `customer_products__input-card-quantity-${id}` }
        value={ count }
      />
      <button
        datatest-id={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ () => addItem() }
      >
        +
      </button>
    </div>

  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
