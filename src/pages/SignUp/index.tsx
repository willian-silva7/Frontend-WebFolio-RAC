import React, { FormEvent, useCallback, useState } from 'react';
import { FiLock, FiMail, FiHome, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import getValidationsErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import { useToast } from '../../hooks/ToastContext';

import { Background, Container, Content } from './styles';
import api from '../../services/api';

const SignIn: React.FC = () => {
  const [name, setName] = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = {
        name,
        password,
        institution,
        email,
      };

      try {
        const Schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'precisa ter no mínimo 6 digitos'),
          institution: Yup.string().required(),
        });

        await Schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', {
          name,
          email,
          password,
          institution,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro Realizado com sucesso',
          description: 'Agora você já pode logar-se no sistema',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationsErrors(err);

          if (errors) {
            if (errors.email) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.email}`,
              });
            }
            if (errors.password) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.password}`,
              });
            }
            if (errors.name) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.name}`,
              });
            }
          }
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description: 'Ocorreu um erro cheque suas credenciais ',
          });
        }
      }
    },
    [email, institution, name, password, addToast, history],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logoImg} alt="WebFolio" />

          <form onSubmit={handleSubmit}>
            <h1>Faça o Seu Cadastro</h1>
            <Input
              name="name"
              placeholder="Nome"
              icon={FiUser}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <Input
              name="institution"
              placeholder="Instituição"
              icon={FiHome}
              onChange={e => {
                setInstitution(e.target.value);
              }}
            />
            <Input
              name="email"
              placeholder="E-mail"
              icon={FiMail}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit">Cadastrar</button>
            Já possui Conta?
            <Link to="/"> Voltar para Login</Link>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default SignIn;
