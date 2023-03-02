import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  localStorageSaveItem,
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
    const updateSubTotal = counter * parseFloat(price);
    const updatedQuantity = {
      ...item, quantity: counter, subTotal: updateSubTotal.toFixed(2).replace('.', ','),
    };
    setItem(updatedQuantity);
    return cartProducts.map((e) => (e.productId === updatedQuantity.productId
      ? { ...e, quantity: updatedQuantity.quantity, subTotal: updatedQuantity.subTotal }
      : e));
  };

  const updateProducts = (counter) => {
    const isThereAnEqualProduct = cartProducts
      .some((e) => e.productId === item.productId);
    if (!cartProducts.length) {
      addLocalStorageCartItem(item);
      setCartProducts([item]);
    } else if (isThereAnEqualProduct) {
      const newItems = handleQuantity(counter);
      localStorageSaveItem('carrinho', newItems);
      setCartProducts(newItems);
    } else {
      setCartProducts([...cartProducts, item]);
      addLocalStorageCartItem(item);
    }
  };

  const addItem = () => {
    const counter = count + 1;
    setCount(counter);
    updateProducts(counter);
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
      updateProducts(counter);
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
          {price.replace('.', ',')}
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
