/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useCallback, useState } from 'react';
import { FiArrowLeft, FiBook, FiBookOpen, FiInfo } from 'react-icons/fi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Dropzone from '../../components/Dropzone';
import Header from '../../components/Header';
import Input from '../../components/Input';
// import Select from '../../components/Select';
import Textarea from '../../components/Textarea';
import api from '../../services/api';
// import Textarea from '../../components/Textarea';
import { useToast } from '../../hooks/ToastContext';
import { Container, Content } from './styles';

interface PortfolioParams {
  portfolio: string;
}

const CreateObservation: React.FC = () => {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>();

  const { params } = useRouteMatch<PortfolioParams>();

  const { addToast } = useToast();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = new FormData();

      data.append('title', title);
      data.append('dateDay', dateDay);
      data.append('notes', notes);
      data.append('description', description);

      if (selectedFiles) {
        selectedFiles.forEach(file => {
          data.append('files', file);
        });
      }

      await api.post(`/portfolio/${params.portfolio}/observation`, data);

      history.push(`/portfolio/${params.portfolio}`);

      addToast({
        type: 'success',
        title: 'Observação criada com sucesso',
        description:
          'Agora está observação já pode ser vista no Portfolio da criança',
      });
    },
    [
      title,
      notes,
      description,
      selectedFiles,
      history,
      addToast,
      params.portfolio,
      dateDay,
    ],
  );

  return (
    <>
      <Container>
        <Header />
        <Link to={`/portfolio/${params.portfolio}`} className="arrow-left-icon">
          <p>
            <FiArrowLeft />
            Voltar
          </p>
        </Link>
        <Content>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>Cadastrar Nova Observação</legend>

              <label htmlFor="title" className="firstlabel">
                Título da Observação
              </label>
              <Input
                name="title"
                placeholder="Digite aqui o título da observação"
                icon={FiBook}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />

              <label htmlFor="description" className="label">
                Descrição da Observação
              </label>
              <Textarea
                name="description"
                placeholder="Digite aqui a descrição da observação"
                icon={FiInfo}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />

              <label htmlFor="notes" className="label">
                Notas/Avaliação
              </label>
              <Textarea
                name="notes"
                placeholder="Digite aqui uma nota específica sobre a criança"
                icon={FiBookOpen}
                onChange={e => {
                  setNotes(e.target.value);
                }}
              />

              <label htmlFor="dateDay" className="label">
                Data da Observação
              </label>
              <Input
                name="dateDay"
                type="date"
                icon={FiBook}
                onChange={e => {
                  setDateDay(e.target.value);
                }}
              />

              <label htmlFor="files" className="label">
                Arquivos
              </label>
              <Dropzone onFileUpload={setSelectedFiles} />

              <button type="submit">Cadastrar Portfólio</button>
            </fieldset>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default CreateObservation;
