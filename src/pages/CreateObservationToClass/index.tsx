/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FiArrowLeft, FiBook, FiInfo } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import Dropzone from '../../components/Dropzone';
import Header from '../../components/Header';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import api from '../../services/api';
import { useToast } from '../../hooks/ToastContext';
import { Container, Content, ListItem } from './styles';
import Select from '../../components/Select';

interface PortfolioProps {
  _id: string;
  nameChildren: string;
  age: string;
  classRoom: string;
}

interface ClassRoomProps {
  name: string;
  _id: string;
}

const CreateObservationToClass: React.FC = () => {
  const [title, setTitle] = useState('');
  const [dateDay, setDateDay] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>();
  const [portfolios, setPortfolios] = useState<PortfolioProps[]>();
  const [selectedPortfolios, setSelectedPortfolios] = useState<
    PortfolioProps[]
  >([]);
  const [classRoom, setClassRoom] = useState<ClassRoomProps[]>();
  const [selectedClassroom, setSelectedClassroom] = useState('0');

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    api.get<ClassRoomProps[]>('classrooms').then(response => {
      setClassRoom(response.data);
    });
  }, []);

  useEffect(() => {
    if (selectedClassroom === '0') {
      return;
    }

    api
      .get(`classrooms/searchportfolios/${selectedClassroom}`)
      .then(response => {
        setPortfolios(response.data);
      });
  }, [selectedClassroom]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (selectedPortfolios.length === 0) {
        addToast({
          type: 'error',
          title: 'Seleção de Portifolio obrigatório',
          description: 'Obrigatório pelo menos um portfolio selecionado',
        });
        return;
      }

      const data = new FormData();

      data.append('title', title);
      data.append('dateDay', dateDay);
      data.append('description', description);
      data.append('portfolios', JSON.stringify(selectedPortfolios));

      if (selectedFiles) {
        selectedFiles.forEach(file => {
          data.append('files', file);
        });
      }

      await api.post('/observation', data);

      history.push(`/dashboard`);

      addToast({
        type: 'success',
        title: 'Observação criada com sucesso',
        description:
          'Agora está observação já pode ser vista no Portfolio da criança',
      });
    },
    [
      title,
      description,
      selectedFiles,
      history,
      addToast,
      selectedPortfolios,
      dateDay,
    ],
  );

  const handleselectclassroom = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const classroom = event.target.value;

      setSelectedClassroom(classroom);
    },
    [],
  );

  const handleselectedportfolio = useCallback(
    (portfolio: PortfolioProps) => {
      setSelectedPortfolios([...selectedPortfolios, portfolio]);

      const alreadySelected = selectedPortfolios.findIndex(
        item => item._id === portfolio._id,
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedPortfolios.filter(
          item => item._id !== portfolio._id,
        );
        setSelectedPortfolios(filteredItems);
      } else {
        setSelectedPortfolios([...selectedPortfolios, portfolio]);
      }
    },
    [selectedPortfolios],
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
              <legend>Cadastrar Observação Para Turma</legend>

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

              <label htmlFor="classroom" className="label">
                Turma/Classe
              </label>
              <Select
                name="classroom"
                placeholder="Escolha a turma aqui"
                icon={FiBook}
                onChange={handleselectclassroom}
                options={classRoom}
              />

              {selectedClassroom !== '0' && (
                <label htmlFor="classroom" className="label">
                  Clique para Selecionar as Crianças que Participaram da
                  Atividade
                </label>
              )}
              <ListItem>
                <ul className="items-grid">
                  {portfolios &&
                    portfolios.map(portfolio => (
                      <li
                        key={portfolio._id}
                        onClick={() => handleselectedportfolio(portfolio)}
                        className={
                          selectedPortfolios.includes(portfolio)
                            ? 'selected'
                            : ''
                        }
                      >
                        <span>{portfolio.nameChildren}</span>
                      </li>
                    ))}
                </ul>
              </ListItem>

              <button type="submit">Cadastrar Portfólio</button>
            </fieldset>
          </form>
        </Content>
      </Container>
    </>
  );
};

export default CreateObservationToClass;
