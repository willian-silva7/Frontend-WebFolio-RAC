/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiEye, FiX, FiEyeOff } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';
import { Container, Content, Title, Search, TableContainer } from './styles';

// adicionar rota para linkar usuário ao portfólio

interface UserParams {
  user: string;
}

interface PortfoliosProps {
  _id: string;
  nameChildren: string;
  classRoom: string;
  age: number;
}

const Dashboard: React.FC = () => {
  const [portfolios, setPortifolios] = useState<PortfoliosProps[]>([]);
  const [searchPortfolio, setSearchPortfolio] = useState('');

  const { params } = useRouteMatch<UserParams>();
  const { addToast } = useToast();

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

  const handleDelete = useCallback(
    async (id: string) => {
      await api.delete(`portfolio/${id}`);
      const portfolioIndex = portfolios.findIndex(item => item._id === id);
      portfolios.splice(portfolioIndex, 1);
      setPortifolios([...portfolios]);
    },
    [portfolios],
  );

  const handleAdd = useCallback(
    async (id: string) => {
      await api.put(`managers/${id}/permission/${params.user}`);

      addToast({
        type: 'success',
        title: 'Permissão atualizada com sucesso',
        description: 'Esta pessoa agora pode acessar o portfólio',
      });
    },
    [params.user, addToast],
  );

  const handleRemove = useCallback(
    async (id: string) => {
      await api.put(`managers/${id}/permissiondelete/${params.user}`);

      addToast({
        type: 'success',
        title: 'Permissão atualizada com sucesso',
        description: 'Esta pessoa agora não pode acessar o portfólio',
      });
    },
    [params.user, addToast],
  );

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
          <h1>Portifólios da Instituição</h1>
          <label>Adicione ou retire permissão do utilizador ao Portfólio</label>
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
                    <button
                      type="button"
                      onClick={() => handleAdd(portfolio._id)}
                    >
                      <FiEye className="first-icon" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(portfolio._id)}
                    >
                      <FiEyeOff />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(portfolio._id)}
                    >
                      <FiX className="last-icon" />
                    </button>
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
