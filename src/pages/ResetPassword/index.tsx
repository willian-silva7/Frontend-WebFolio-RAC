import React, { FormEvent, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useHistory, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import { useToast } from '../../hooks/ToastContext';
import Input from '../../components/Input';
import api from '../../services/api';

const ResetPassword: React.FC = () => {
  const { addToast } = useToast();

  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = {
        password,
        passwordConfirmation,
      };

      try {
        const Schema = Yup.object().shape({
          password: Yup.string().min(6, 'precisa ter no mínimo 6 digitos'),
          passwordConfirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Corfirmação de Senha Incorreta',
          ),
        });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await Schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/reset', {
          password,
          password_confirmation: passwordConfirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'Senha Redefinida com sucesso',
          description: `Agora você já pode logar-se no sistema`,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (errors) {
            if (errors.passwordConfirmation) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.passwordConfirmation}`,
              });
            }
            if (errors.password) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.password}`,
              });
            }
          }
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao Resetar a Senha',
            description: 'Ocorreu um erro, tente novamente ',
          });
        }
      }
    },
    [passwordConfirmation, password, addToast, history, location.search],
  );

  return (
    <>
      <Container>
        <Background />

        <Content>
          <img src={logoImg} alt="WebFolio" />

          <form onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>
            <Input
              name="password"
              type="password"
              placeholder="Nova Senha"
              icon={FiLock}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <Input
              name="passwordConfirmation"
              type="password"
              placeholder="Confirmação da Senha"
              icon={FiLock}
              onChange={e => {
                setPasswordConfirmation(e.target.value);
              }}
            />
            <button type="submit">Alterar Senha</button>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default ResetPassword;
