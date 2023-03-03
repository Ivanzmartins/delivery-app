import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductsCard from '../components/ProductsCard';
import TotalValueBtn from '../components/TotalValueBtn';

import { apiGetAll } from '../services/requests';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [failedRequest, setFailedRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Erro inesperado.');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await apiGetAll('/customer/products');
        setAllProducts(products);
      } catch (error) {
        console.log(error);
        setFailedRequest(true);
        setErrorMessage('Erro inesperado.');
      }
    };
    getProducts();
  }, []);

  return (
    <main>
      <Header />
      { !failedRequest ? allProducts
        .map(({ id, name, price, urlImage }) => (
          <div key={ id }>
            <ProductsCard
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          </div>
        ))
        : (<p>{errorMessage}</p>)}
      <TotalValueBtn />
    </main>
  );
}
