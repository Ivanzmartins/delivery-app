import React from 'react';
import Header from '../components/Header';
import RegisterNewUser from '../components/RegisterNewUser';
import UsersTable from '../components/UsersTable';

export default function AdminMenu() {
  return (
    <div>
      <Header />
      <RegisterNewUser />
      <UsersTable />
    </div>
  );
}
