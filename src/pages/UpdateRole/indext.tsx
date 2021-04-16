/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';
import { Container, Content } from './styles';

interface UserParams {
  user: string;
}

interface UserProps {
  _id: string;
  role: string;
  name: string;
}

const UpdateUser: React.FC = () => {
  const [role, setRole] = useState('');
  const [userinfo, setuserInfo] = useState<UserProps>();

  const [selectedroles, setSelectedroles] = useState('0');

  const { params } = useRouteMatch<UserParams>();

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    api.get(`users/${params.user}`).then(response => {
      setuserInfo(response.data);
    });
  }, [params.user]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      await api.put(`users/${params.user}`, { role });

      history.push(`/admindashboard`);

      addToast({
        type: 'success',
        title: 'Cargo atualizado com sucesso',
        description: 'Esta pessoa agora possui novos privilégios',
      });
    },
    [role, history, addToast, params.user],
  );

  const handleselectroles = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const roles = event.target.value;

      setSelectedroles(roles);
      setRole(roles);
    },
    [],
  );

  return (
    <>
      <Container>
        <Header />
        <Link to="/admindashboard" className="arrow-left-icon">
          <p>
            <FiArrowLeft />
            Voltar
          </p>
        </Link>
        <Content>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Alterar Cargo</legend>

              <span>
                {` O Cargo atual de ${userinfo?.name} é de`}
                <strong>{userinfo?.role}</strong>
              </span>

              <label htmlFor="role" className="firstlabel">
                Selecione um cargo para alterar
              </label>

              <select name="role" id="role" onChange={handleselectroles}>
                <option value="" disabled selected hidden>
                  Selecione uma opção
                </option>
                <option value="admin">Administrador</option>
                <option value="teacher">Professor</option>
                <option value="parent">Parente</option>
                <option value="child">Criança</option>
                <option value="manager">Gerente</option>
                <option value="guest">Utilizador</option>
              </select>

              <button type="submit">Alterar</button>
            </fieldset>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default UpdateUser;
