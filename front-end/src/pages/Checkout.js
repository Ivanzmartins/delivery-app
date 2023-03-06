import React from 'react';
import AdressForm from '../components/AdressForm';
import CheckoutTable from '../components/CheckoutTable';
import Header from '../components/Header';

export default function Checkout() {
  return (
    <>
      <Header />
      <CheckoutTable />
      <AdressForm />
    </>
  );
}
