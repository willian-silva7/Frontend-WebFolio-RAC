/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiBook, FiBookOpen, FiInfo } from 'react-icons/fi';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Dropzone from '../../components/Dropzone';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';
import { Container, Content } from './styles';

interface ObservationParams {
  observation: string;
  portfolio: string;
}

interface Observation {
  _id: string;
  title: string;
  description: string;
  notes: string;
  dateDay: string;
  files: Array<{
    _id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

const UpdateObservation: React.FC = () => {
  const [observation, setObservation] = useState<Observation>();
  const { params } = useRouteMatch<ObservationParams>();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [description, setDescription] = useState('');
  const [dateDay, setDateDay] = useState('');

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    api.get<Observation>(`observation/${params.observation}`).then(response => {
      setObservation(response.data);
      setTitle(`${observation?.title}`);
      setNotes(`${observation?.notes}`);
      setDescription(`${observation?.description}`);
      setDateDay(`${observation?.dateDay}`);
    });
  }, [
    params.observation,
    observation?.title,
    observation?.notes,
    observation?.description,
    observation?.dateDay,
  ]);

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

      await api.put(
        `/observation/${params.portfolio}/${params.observation}`,
        data,
      );

      history.push(`/portfolio/${params.portfolio}`);

      addToast({
        type: 'success',
        title: 'Observa????o criada com sucesso',
        description:
          'Agora est?? observa????o j?? pode ser vista no observation da crian??a',
      });
    },
    [
      title,
      notes,
      description,
      selectedFiles,
      history,
      addToast,
      params,
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
              <legend>Alterar Observa????o</legend>

              <label htmlFor="title" className="firstlabel">
                T??tulo da Observa????o
              </label>
              <Input
                name="title"
                placeholder="Digite aqui o t??tulo da observa????o"
                defaultValue={observation?.title}
                icon={FiBook}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />

              <label htmlFor="dateDay" className="label">
                Data da Observa????o
              </label>
              <Input
                name="dateDay"
                type="date"
                defaultValue={observation?.dateDay}
                icon={FiBook}
                onChange={e => {
                  setDateDay(e.target.value);
                }}
              />

              <label htmlFor="description" className="label">
                Descri????o da Observa????o
              </label>
              <Textarea
                name="description"
                placeholder="Digite aqui a descri????o da observa????o"
                defaultValue={observation?.description}
                icon={FiInfo}
                onChange={e => {
                  setDescription(e.target.value);
                }}
              />

              <label htmlFor="notes" className="label">
                Notas/Avalia????o
              </label>
              <Textarea
                name="notes"
                placeholder="Digite aqui uma nota espec??fica sobre a crian??a"
                defaultValue={observation?.notes}
                icon={FiBookOpen}
                onChange={e => {
                  setNotes(e.target.value);
                }}
              />

              <label htmlFor="files" className="label">
                Arquivos
              </label>
              <Dropzone onFileUpload={setSelectedFiles} />

              <button type="submit">Confirmar Altera????es</button>
            </fieldset>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default UpdateObservation;
