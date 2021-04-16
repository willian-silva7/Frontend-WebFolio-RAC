/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiEdit, FiEye } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import { Container, Content, Title, Search, TableContainer } from './styles';

interface UsersProps {
  _id: string;
  role: string;
  name: string;
  email: string;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<UsersProps[]>([]);
  const [searchUser, setUser] = useState('');

  useEffect(() => {
    api.get('/users').then(response => {
      setUsers(response.data);
    });
  }, []);

  const results = !searchUser
    ? users
    : users.filter(user =>
        user.name.toLowerCase().includes(searchUser.toLocaleLowerCase()),
      );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  }, []);

  return (
    <Container>
      <Header />
      <Link to="/dashboard" className="arrow-left-icon">
        <p>
          <FiArrowLeft />
          Voltar
        </p>
      </Link>

      <Content>
        <Title>
          <h1>Usuários</h1>
        </Title>

        <Search>
          <label htmlFor="name">Buscar Usuários:</label>
          <input
            type="text"
            name="name"
            placeholder="Digite aqui para pesquisar usuário"
            onChange={handleChange}
            defaultValue={searchUser}
          />
        </Search>

        <TableContainer>
          <table>
            <thead>
              <th>Nome</th>
              <th className="email">Email</th>
              <th>Cargo</th>
              <th className="last-column">Opções</th>
            </thead>

            <tbody>
              {results.map(user => (
                <tr key={user._id}>
                  <td className="name">
                    <Link to={`/user/${user._id}`}>{user.name}</Link>
                  </td>

                  <td className="email">{user.email}</td>
                  <td className="role">{user.role}</td>
                  <td className="last-column">
                    <Link to={`/user/${user._id}`}>
                      <FiEdit className="first-icon" />
                    </Link>
                    <Link to="/portfoliobyinstitution">
                      <FiEye className="last-icon" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default AdminDashboard;
