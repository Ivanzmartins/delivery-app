import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ProductsCard from '../components/ProductsCard';

// import { apiGetAll } from '../services/requests';

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  const bebidas = [
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: 2.20,
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
    {
      id: 1,
      name: 'Skol Lata 250ml',
      price: 2.20,
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    },
  ];

  useEffect(() => {
    const getProducts = async () => {
      // const products = await apiGetAll('/products');
      setAllProducts(bebidas);
    };
    getProducts();
  }, []);

  return (
    <main>
      <Header />
      {
        allProducts
          .map(({ id, name, price, urlImage }) => (
            <ProductsCard
              key={ id }
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />))
      }
    </main>
  );
}
