import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/AuthContext';
import userImg from '../../assets/user.jpg';

import { Container, HeaderContent, Profile } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <Link to="/dashboard">
          <img src={logoImg} alt="webfolio" />
        </Link>

        <Profile>
          {user.role === 'admin' && (
            <Link to="/admin">
              <span>Administrador</span>
            </Link>
          )}

          <Link to="/profile">
            <span>Perfil</span>
          </Link>

          <button type="button" onClick={signOut}>
            Sair
          </button>

          {user.avatar ? (
            <img
              src={`http://localhost:3333/files/${user.avatar}`}
              alt={user.name}
            />
          ) : (
            <img src={userImg} alt="https://br.freepik.com/vetores/negocio" />
          )}
        </Profile>
      </HeaderContent>
    </Container>
  );
};

export default Header;
