import React from 'react';
import RegisterNewUser from '../components/RegisterNewUser';
import UsersTable from '../components/UsersTable';

export default function AdminMenu() {
  return (
    <div>
      <RegisterNewUser />
      <UsersTable />
    </div>
  );
}
