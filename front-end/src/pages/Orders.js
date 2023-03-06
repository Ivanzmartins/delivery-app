import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OrdersCard from '../components/OrdersCard';
import { apiGetAll } from '../services/requests';

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [failedRequest, setFailedRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getOrders = async () => {
    try {
      const orders = await apiGetAll('/customer/orders');
      setAllOrders(orders);
    } catch (error) {
      console.log(error);
      setFailedRequest(true);
      setErrorMessage('Não foi possível encontrar pedidos');
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <main>
      <Header />
      {!failedRequest ? allOrders.map((order) => (
        <div key={ order.id }>
          <OrdersCard
            id={ order.id }
            status={ order.status }
            date={ order.date }
            price={ order.price }
          />
        </div>)) : (<p>{errorMessage}</p>)}
    </main>
  );
}
