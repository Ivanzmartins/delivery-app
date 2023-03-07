import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import OrdersCard from '../components/OrdersCard';
import { getLocalStorageItem } from '../services/localStorage';
import { apiGetAllWithEmail } from '../services/requests';

export default function Orders() {
  const [allOrders, setAllOrders] = useState([]);
  const [failedRequest, setFailedRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getOrders = async () => {
    try {
      const { email } = getLocalStorageItem('user');
      const orders = await apiGetAllWithEmail('/customer/orders/', { email });
      setAllOrders(orders);
    } catch (error) {
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
        <Link key={ order.id } to={ `/customer/orders/${order.id}` }>
          <div>
            <OrdersCard
              id={ order.id }
              status={ order.status }
              date={ order.saleDate }
              price={ order.totalPrice }
            />
          </div>
        </Link>)) : (<p>{errorMessage}</p>)}
    </main>
  );
}
