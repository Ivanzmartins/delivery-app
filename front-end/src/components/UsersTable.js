import React, { useContext, useEffect, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';

import '../styles/table.css';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const { usersOfDB } = useContext(DeliveryContext);

  const tableColumns = ['Item', 'Nome', 'E-mail', 'Tipo', 'Excluir'];

  useEffect(() => {
    const getUsers = () => {
      setUsers(usersOfDB);
    };
    getUsers();
  }, [usersOfDB]);

  return (
    <section className="table-container">
      <h3>Lista de usuários</h3>
      <table>
        <thead>
          <tr>
            {tableColumns.map((category, index) => (
              <th key={ index }>
                {category}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((e, index) => (
            <tr key={ index }>
              <td
                className="table-index"
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {index}

              </td>
              <td
                className="table-user-name"
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {e.name}

              </td>
              <td
                className="table-user-email"
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {e.email}

              </td>
              <td
                className="table-user-role"
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {e.role}

              </td>
              <td className="table-delete-button">
                <button
                  type="button"
                  data-testid={ `admin_manage__element-user-table-remove-${index}` }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
