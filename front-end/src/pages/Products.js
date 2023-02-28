import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductsCard from '../components/ProductsCard';

import { apiGetAll } from '../services/requests';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);
  const [failedRequest, setFailedRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await apiGetAll('/products');
        const STATUS_OK = 200;
        if (products.status !== STATUS_OK) {
          setFailedRequest(true);
          setErrorMessage('Erro ao buscar todos os produtos');
        }
        setAllProducts(products.data);
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
      { failedRequest
        ? allProducts
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
    </main>
  );
}
