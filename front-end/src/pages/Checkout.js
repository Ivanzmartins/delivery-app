import React from 'react';
import AddressForm from '../components/AddressForm';
import CheckoutTable from '../components/CheckoutTable';
import Header from '../components/Header';

export default function Checkout() {
  return (
    <>
      <Header />
      <CheckoutTable />
      <AddressForm />
    </>
  );
}
