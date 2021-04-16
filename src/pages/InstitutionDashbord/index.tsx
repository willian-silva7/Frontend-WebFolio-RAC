/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import { Container, Content, Title, Search, TableContainer } from './styles';

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
    api.get('/institution').then(response => {
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
      <Link to="/admindashboard" className="arrow-left-icon">
        <p>
          <FiArrowLeft />
          Voltar
        </p>
      </Link>

      <Content>
        <Title>
          <h1>Portifólios</h1>
          <label>Adicione permissão do usuário ao Portfólio</label>
        </Title>

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
