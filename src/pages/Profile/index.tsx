import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import {
  FiArrowLeft,
  FiCamera,
  FiHome,
  FiLock,
  FiMail,
  FiUser,
} from 'react-icons/fi';

import Header from '../../components/Header';
import { useToast } from '../../hooks/ToastContext';
import { useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import userImg from '../../assets/user.jpg';
import { Container, Content, AvatarInput } from './styles';

const Profile: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(`${user.name}`);
  const [institution, setInstitution] = useState(`${user.institution}`);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(`${user.email}`);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = {
        name,
        oldPassword,
        institution,
        email,
        newPassword,
        confirmPassword,
      };

      try {
        const Schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um email válido'),
          oldPassword: Yup.string(),
          // newPassword: Yup.string()
          //   .when('oldPassword', {
          //     is: val => !!val.length,
          //     then: Yup.string().required('Campo Obrigatório'),
          //     otherwise: Yup.string(),
          //   })
          //   .min(6, 'precisa ter no mínimo 6 digitos'),

          // confirmPassword: Yup.string()
          //   .when('old_password', {
          //     is: val => !!val.length,
          //     then: Yup.string().required('Campo Obrigatório'),
          //     otherwise: Yup.string(),
          //   })
          //   .oneOf(
          //     [Yup.ref('password'), undefined],
          //     'Corfirmação de Senha Incorreta',
          //   ),
          institution: Yup.string(),
        });

        // console.log(Schema);

        await Schema.validate(data, {
          abortEarly: false,
        });

        if (oldPassword === '') {
          const response = await api.put('/profile', {
            name,
            email,
            institution,
          });
          updateUser(response.data);
        } else {
          const response = await api.put('/profile', {
            name,
            email,
            institution,
            old_password: oldPassword,
            password: newPassword,
            password_confirmation: confirmPassword,
          });
          updateUser(response.data);
        }

        history.push('/');
        addToast({
          type: 'success',
          title: 'Perfil atualizado com sucesso',
          description: 'Suas informações de perfil foram atualizadas',
        });
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
            if (errors.newPassword) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.newPassword}`,
              });
            }
            if (errors.confirmPassword) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.confirmPassword}`,
              });
            }
            if (errors.oldPassword) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.oldPassword}`,
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
            title: 'Erro ao atualizar Perfil',
            description: 'Ocorreu um erro, tente novamente',
          });
        }
      }
    },
    [
      email,
      institution,
      name,
      addToast,
      history,
      oldPassword,
      newPassword,
      confirmPassword,
      updateUser,
    ],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();

        data.append('avatar', e.target.files[0]);

        await api.patch('/users/avatar', data).then(response => {
          updateUser(response.data);

          addToast({
            type: 'success',
            title: 'Avatar atualizado!',
            description: 'Seu Perfil foi atualizado com sucesso',
          });
        });
      }
    },
    [addToast, updateUser],
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
          <AvatarInput>
            {user.avatar ? (
              <img
                src={`http://localhost:3333/files/${user.avatar}`}
                alt={user.name}
              />
            ) : (
              <img src={userImg} alt="https://br.freepik.com/vetores/negocio" />
            )}

            <label htmlFor="avatar">
              <FiCamera />

              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <form onSubmit={handleSubmit}>
            <h1>Meu Perfil</h1>
            <Input
              name="name"
              placeholder="Nome"
              defaultValue={user.name}
              icon={FiUser}
              onChange={e => {
                setName(e.target.value);
              }}
            />
            <Input
              name="email"
              placeholder="E-mail"
              defaultValue={user.email}
              icon={FiMail}
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
            {user.institution ? (
              <Input
                name="institution"
                placeholder="institution"
                defaultValue={user.institution}
                icon={FiHome}
                onChange={e => {
                  setInstitution(e.target.value);
                }}
              />
            ) : (
              <Input
                name="institution"
                placeholder="Instituição"
                icon={FiHome}
                onChange={e => {
                  setInstitution(e.target.value);
                }}
              />
            )}
            <h2>Alterar Senha</h2>
            <Input
              name="old_password"
              type="password"
              placeholder="Senha Atual"
              icon={FiLock}
              onChange={e => {
                setOldPassword(e.target.value);
              }}
            />
            <Input
              name="new_password"
              type="password"
              placeholder="Nova Senha"
              icon={FiLock}
              onChange={e => {
                setNewPassword(e.target.value);
              }}
            />
            <Input
              name="corfirm_password"
              type="password"
              placeholder="Confirmar Senha"
              icon={FiLock}
              onChange={e => {
                setConfirmPassword(e.target.value);
              }}
            />
            <button type="submit">Confirmar Mudanças</button>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default Profile;
