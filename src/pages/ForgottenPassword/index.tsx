import React, { FormEvent, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { useToast } from '../../hooks/ToastContext';
import logoImg from '../../assets/logo.svg';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Background, Content } from './styles';
import Input from '../../components/Input';
import api from '../../services/api';

const ForgottenPassword: React.FC = () => {
  const { addToast } = useToast();

  const [email, setEmail] = useState('');

  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = {
        email,
      };

      try {
        const Schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um email válido'),
          password: Yup.string().min(6, 'precisa ter no mínimo 6 digitos'),
        });

        await Schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/forgot', {
          email,
        });

        addToast({
          type: 'success',
          title: 'Redefinição de senha enviada!',
          description: `Cheque o seu E-mail para redefinir senha`,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (errors) {
            if (errors.email) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.email}`,
              });
            }
          }

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resgatar Email',
          description: 'Ocorreu um erro verifique se email está correto',
        });
      }
    },
    [email, addToast, history],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logoImg} alt="WebFolio" />

          <form onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input
              name="email"
              placeholder="E-mail"
              icon={FiMail}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit">Recuperar Senha</button>
          </form>

          <Link to="/">
            <FiLogIn />
            Voltar ao Login
          </Link>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default ForgottenPassword;
