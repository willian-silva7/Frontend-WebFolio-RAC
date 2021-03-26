/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiBook } from 'react-icons/fi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';
import { Container, Content } from './styles';

interface PortfolioParams {
  portfolio: string;
}

interface PortfolioProps {
  _id: string;
  nameChildren: string;
}

const InviteParent: React.FC = () => {
  const [email, setEmail] = useState('');
  const [portfolioinfo, setPortfolioInfo] = useState<PortfolioProps>();

  const { params } = useRouteMatch<PortfolioParams>();

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    api.get(`portfolio/${params.portfolio}`).then(response => {
      setPortfolioInfo(response.data);
    });
  }, [params.portfolio]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      await api.put(`portfolio/${params.portfolio}/permission`, { email });

      history.push(`/dashboard`);

      addToast({
        type: 'success',
        title: 'Observação criada com sucesso',
        description:
          'Agora está observação já pode ser vista no Portfolio da criança',
      });
    },
    [email, history, addToast, params.portfolio],
  );

  return (
    <>
      <Container>
        <Header />
        <Link to="/dashboard" className="arrow-left-icon">
          <p>
            <FiArrowLeft />
            Voltar
          </p>
        </Link>
        <Content>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Convidar Visualizador</legend>

              <span>
                {`Convide uma pessoa para visualizar o Portifólio de `}
                <strong>{portfolioinfo?.nameChildren}</strong>
              </span>

              <label htmlFor="email" className="firstlabel">
                Email
              </label>
              <Input
                name="email"
                placeholder="Digite aqui o E-mail do convidado"
                icon={FiBook}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />

              <button type="submit">Convidar</button>
            </fieldset>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default InviteParent;
