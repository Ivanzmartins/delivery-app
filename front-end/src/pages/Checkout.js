import React from 'react';
import AddressForm from '../components/AddressForm';
import CheckoutTable from '../components/CheckoutTable';
import Header from '../components/Header';

import '../styles/checkout.css';

export default function Checkout() {
  return (
    <>
      <Header />
      <main className="finalizar-pedido">
        <CheckoutTable />
        <AddressForm />
      </main>
    </>
  );
}
