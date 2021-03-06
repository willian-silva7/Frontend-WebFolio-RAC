/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowLeft, FiEdit, FiPlus, FiX } from 'react-icons/fi';
import { Link, useRouteMatch } from 'react-router-dom';
import AudioPlayer from 'react-audio-player';
import VideoPlayer from 'react-player';
import Header from '../../components/Header';
import api from '../../services/api';
import {
  Container,
  Title,
  Content,
  Subtitle,
  Card,
  PortfolioTitle,
  PortfolioIcons,
  Files,
  Tutorial,
} from './styles';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

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

interface PortfolioProps {
  _id: string;
  nameChildren: string;
  age: number;
  classRoom: string;
  observations: Observation;
  educator: string;
  educator_name: string;
}

interface PortfolioParams {
  portfolio: string;
}

const Portfolio: React.FC = () => {
  const [portfolioinfo, setPortfolioInfo] = useState<PortfolioProps>();
  const [observations, setObservations] = useState<Observation[]>([]);
  const { params } = useRouteMatch<PortfolioParams>();
  const { user } = useAuth();
  const { addToast } = useToast();

  useEffect(() => {
    api.get(`portfolio/${params.portfolio}`).then(response => {
      setPortfolioInfo(response.data);
      setObservations(response.data.observations);
    });
  }, [params.portfolio]);

  const handleDelete = useCallback(
    async (id: string) => {
      await api.delete(`portfolio/${params.portfolio}/observation/${id}`);

      const newObservations = observations.filter(item => item._id !== id);
      setObservations(newObservations);

      addToast({
        type: 'success',
        title: 'Observação removida com sucesso',
        description: 'A observação foi excluída do portfólio',
      });
    },
    [params.portfolio, observations, addToast],
  );

  return (
    <Container>
      <Header />
      <script src="path/to/lightbox.js" />
      <Link to="/dashboard" className="arrow-left-icon">
        <p>
          <FiArrowLeft />
          Voltar
        </p>
      </Link>
      <Container>
        <Content>
          <Title>
            <h1>
              Portifólio de
              {` ${portfolioinfo?.nameChildren}`}
            </h1>
            {/* {user._id === portfolioinfo?.educator && (
              <Link to={`/createobservation/${params.portfolio}`}>
                <div>
                  <FiPlus size={20} />
                </div>
                <label>Criar Nova Observação</label>
              </Link>
            )} */}

            {user.role === 'manager' && (
              <Link to={`/createobservation/${params.portfolio}`}>
                <div>
                  <FiPlus size={20} />
                </div>
                <label>Criar Nova Observação</label>
              </Link>
            )}
            {user.role === 'admin' && (
              <Link to={`/createobservation/${params.portfolio}`}>
                <div>
                  <FiPlus size={20} />
                </div>
                <label>Criar Nova Observação</label>
              </Link>
            )}
            {user.role === 'teacher' && (
              <Link to={`/createobservation/${params.portfolio}`}>
                <div>
                  <FiPlus size={20} />
                </div>
                <label>Criar Nova Observação</label>
              </Link>
            )}
          </Title>

          <Tutorial>
            <table>
              <tbody>
                <tr>
                  <td>
                    <span>Opções:</span>
                  </td>
                  <td className="icon">
                    <FiEdit />
                  </td>
                  <td>
                    <span>- Editar Observação</span>
                  </td>

                  <td className="icon">
                    <FiX />
                  </td>
                  <td>
                    <span>- Remover Observação</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Tutorial>

          <Subtitle>
            <label htmlFor="name">Educador (a): </label>
            <label htmlFor="name">{portfolioinfo?.educator_name}</label>
          </Subtitle>

          {observations.map(observation => (
            // eslint-disable-next-line no-underscore-dangle
            <Card key={observation._id}>
              <PortfolioTitle>
                <h3>{observation.title}</h3>
                {user.role === 'admin' && (
                  <PortfolioIcons>
                    <Link
                      to={`/updateobservation/${params.portfolio}/${observation._id}`}
                    >
                      <FiEdit size={20} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(observation._id)}
                    >
                      <FiX size={20} />
                    </button>
                  </PortfolioIcons>
                )}
                {user.role === 'teacher' && (
                  <PortfolioIcons>
                    <Link
                      to={`/updateobservation/${params.portfolio}/${observation._id}`}
                    >
                      <FiEdit size={20} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(observation._id)}
                    >
                      <FiX size={20} />
                    </button>
                  </PortfolioIcons>
                )}
                {user.role === 'manager' && (
                  <PortfolioIcons>
                    <Link
                      to={`/updateobservation/${params.portfolio}/${observation._id}`}
                    >
                      <FiEdit size={20} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(observation._id)}
                    >
                      <FiX size={20} />
                    </button>
                  </PortfolioIcons>
                )}
              </PortfolioTitle>
              {observation.description && <h4>Descrição da observação:</h4>}
              <p>{observation.description}</p>
              {observation.notes && <h4>Notas/Avaliação:</h4>}
              <p>{observation.notes}</p>
              {observation.dateDay && <h4>Data da observação:</h4>}
              <p>{observation.dateDay}</p>

              <Files>
                {observation.files.map(file => {
                  if (file.type === 'image') {
                    return (
                      <a
                        key={file._id}
                        href={file.url}
                        data-lightbox="image-1"
                        data-title={file.name}
                      >
                        <img
                          src={file.url}
                          alt={file.name}
                          className="items-grid"
                        />
                      </a>
                    );
                  }
                  if (file.type === 'video') {
                    if (file.name.indexOf('ogg') > -1) {
                      return (
                        <AudioPlayer
                          key={file._id}
                          src={file.url}
                          controls
                          className="items-grid"
                        />
                      );
                    }
                    return (
                      <VideoPlayer
                        key={file._id}
                        url={file.url}
                        controls
                        width={180}
                        height={180}
                        className="items-grid"
                      />
                    );
                  }
                  return <AudioPlayer key={file._id} src={file.url} controls />;
                })}
              </Files>
            </Card>
          ))}
        </Content>
      </Container>
    </Container>
  );
};

export default Portfolio;
