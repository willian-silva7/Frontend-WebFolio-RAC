/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiEdit, FiEye, FiHome, FiPlus, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import {
  Container,
  Content,
  Title,
  Search,
  TableContainer,
  SubTitle,
} from './styles';

interface PortfoliosProps {
  _id: string;
  nameChildren: string;
  classRoom: string;
  age: number;
}

const Dashboard: React.FC = () => {
  const [portfolios, setPortifolios] = useState<PortfoliosProps[]>([]);
  const [searchPortfolio, setSearchPortfolio] = useState('');

  useEffect(() => {
    api.get('/portfolio').then(response => {
      setPortifolios(response.data);
    });
  }, []);

  const results = !searchPortfolio
    ? portfolios
    : portfolios.filter(portfolio =>
        portfolio.nameChildren
          .toLowerCase()
          .includes(searchPortfolio.toLocaleLowerCase()),
      );

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchPortfolio(event.target.value);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Title>
          <h1>Portifólios</h1>

          <Link to="/createportfolio">
            <div>
              <FiPlus size={20} />
            </div>
            <label>Criar Novo Portfólio</label>
          </Link>
        </Title>

        {portfolios.length > 1 && (
          <SubTitle>
            <Link to="/createobservationtoclass">
              <div>
                <FiPlus size={20} />
                <FiHome size={20} />
              </div>

              <label>Criar Observação para Sala</label>
            </Link>
          </SubTitle>
        )}

        <Search>
          <label htmlFor="name">Buscar Portfólios:</label>
          <input
            type="text"
            name="name"
            placeholder="Digite aqui para pesquisar portifólio"
            onChange={handleChange}
            defaultValue={searchPortfolio}
          />
        </Search>

        <TableContainer>
          <table>
            <thead>
              <th>Nome</th>
              <th>Turma</th>
              <th>Idade</th>
              <th className="last-column">Opções</th>
            </thead>

            <tbody>
              {results.map(portfolio => (
                <tr key={portfolio._id}>
                  <td className="name">
                    <Link to={`/portfolio/${portfolio._id}`}>
                      {portfolio.nameChildren}
                    </Link>
                  </td>

                  <td className="classroom">{portfolio.classRoom}</td>
                  <td className="age">{portfolio.age}</td>
                  <td className="last-column">
                    <Link to={`/updateportfolio/${portfolio._id}`}>
                      <FiEdit className="first-icon" />
                    </Link>
                    <Link to={`/portfolio/${portfolio._id}`}>
                      <FiEye />
                    </Link>
                    <Link to={`/inviteparent/${portfolio._id}`}>
                      <FiUserPlus className="last-icon" />
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

export default Dashboard;
