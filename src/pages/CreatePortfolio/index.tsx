/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useCallback, useState } from 'react';
import { FiArrowLeft, FiHome, FiInfo, FiUser } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { useToast } from '../../hooks/ToastContext';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content } from './styles';

const CreatePortfolio: React.FC = () => {
  const [nameChildren, setNameChildren] = useState('');
  const [classRoom, setClassRoom] = useState('');
  const [age, setAge] = useState('');

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = {
        nameChildren,
        classRoom,
        age,
      };

      try {
        const Schema = Yup.object().shape({
          nameChildren: Yup.string().required('Nome é obrigatório'),
          classRoom: Yup.string().required('Nome da turma é obrigatório'),
          age: Yup.string().required('Idade é obrigatória'),
        });

        await Schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/portfolio', {
          nameChildren,
          age: parseInt(age, 10),
          classRoom,
        });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Portfólio criado com sucesso',
          description: 'Agora você já pode criar uma observação',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          if (errors) {
            if (errors.nameChildren) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.nameChildren}`,
              });
            }
            if (errors.classRoom) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.classRoom}`,
              });
            }
            if (errors.age) {
              addToast({
                title: 'Preenchimento de campo obrigatório',
                description: `${errors.age}`,
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
    [nameChildren, classRoom, age, addToast, history],
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
              <legend>Cadastrar Novo Portifólio</legend>

              <label htmlFor="name" className="firstlabel">
                Nome da Criança
              </label>
              <Input
                name="name"
                placeholder="Digite aqui o nome da criança"
                icon={FiUser}
                onChange={e => {
                  setNameChildren(e.target.value);
                }}
              />

              <label htmlFor="age" className="label">
                Idade
              </label>
              <Input
                name="age"
                placeholder="Digite aqui a idade da criança"
                icon={FiInfo}
                onChange={e => {
                  setAge(e.target.value);
                }}
              />

              <label htmlFor="classroom" className="label">
                Turma/Classe
              </label>
              <Input
                name="classroom"
                placeholder="Digite aqui a Turma ou Classe da criança, exemplo recomendado: 2A/2020-02"
                icon={FiHome}
                onChange={e => {
                  setClassRoom(e.target.value);
                }}
              />

              <button type="submit">Cadastrar Portfólio</button>
            </fieldset>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default CreatePortfolio;
