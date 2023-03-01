import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  addLocalStorageCartItem,
  rmLocalStorageCartItem,
} from '../services/localStorage';
import DeliveryContext from '../context/DeliveryContext';

export default function ProductsCard({ id, name, price, urlImage }) {
  const [count, setCount] = useState(0);
  const [item, setItem] = useState({});
  const { cartProducts, setCartProducts } = useContext(DeliveryContext);

  useEffect(() => {
    const getItem = () => {
      const itemDTO = {
        productId: id,
        name,
        unitPrice: price,
        urlImage,
        quantity: 1,
        subTotal: price,
      };

      setItem(itemDTO);
    };
    getItem();
  }, []);

  const handleQuantity = (counter) => {
    if (!cartProducts.length) {
      addLocalStorageCartItem(item);
      setCartProducts([...cartProducts, item]);
    } else {
      const updateSubTotal = counter * parseFloat(price);
      const updateQuantity = {
        ...item, quantity: counter, subTotal: updateSubTotal.toFixed(2).replace('.', ','),
      };
      setItem(updateQuantity);
      addLocalStorageCartItem(updateQuantity);
      setCartProducts([...cartProducts, updateQuantity]);
    }
  };

  const addItem = () => {
    const counter = count + 1;
    setCount(counter);
    handleQuantity(counter);
  };

  const rmContextItem = () => {
    const removeItem = cartProducts.filter((e) => e.id !== item.productId);
    setCartProducts(removeItem);
  };

  const rmItem = () => {
    const counter = count - 1;
    if (counter <= 0) {
      setCount(0);
      rmLocalStorageCartItem(item);
      rmContextItem();
    } else {
      setCount(counter);
      handleQuantity(counter);
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
      <p>
        R$
        {' '}
        <span data-testid={ `customer_products__element-card-price-${id}` }>
          {price}
        </span>
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
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
