import React, { useContext, useEffect, useState } from 'react';
import DeliveryContext from '../context/DeliveryContext';

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

  // console.log(users);

  return (
    <div>
      Lista de usuários
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
          {users.map(({ id, name, email, role }, index) => (
            <tr key={ index }>
              <td
                data-testid={ `admin_manage__element-user-table-item-number-${index}` }
              >
                {id}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-name-${index}` }
              >
                {name}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-email-${index}` }
              >
                {email}

              </td>
              <td
                data-testid={ `admin_manage__element-user-table-role-${index}` }
              >
                {role}

              </td>
              <td>
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
    </div>
  );
}
