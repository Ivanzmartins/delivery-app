import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  addLocalStorageCartItem,
  rmLocalStorageCartItem,
} from '../services/localStorage';
import DeliveryContext from '../context/DeliveryContext';

export default function ProductsCard({ id, name, price, urlImage }) {
  const [count, setCount] = useState(0);
  const { cartProducts, setCartProducts } = useContext(DeliveryContext);

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
    setCartProducts([...cartProducts, item]);
  };

  const rmContextItem = () => {
    const itemIndex = cartProducts.findIndex((e) => e.id === item.id);
    delete cartProducts[itemIndex];
    const newItems = cartProducts.filter((e) => e !== null);
    setCartProducts(newItems);
  };

  const rmItem = () => {
    const counter = count - 1;
    if (counter < 0) {
      setCount(0);
      rmLocalStorageCartItem(item);
      rmContextItem();
    } else {
      setCount(counter);
      rmLocalStorageCartItem(item);
      rmContextItem();
    }
  };

  const handleChange = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <p data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </p>
      <p data-testid={ `customer_products__element-card-price-${id}` }>
        {price}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ () => rmItem() }
      >
        -
      </button>
      <input
        type="text"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ count }
        onChange={ (event) => handleChange(event) }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
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
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
};
