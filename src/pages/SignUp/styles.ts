import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackgroundImage from '../../assets/signup-background.svg';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(5.37rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100vw;
  max-width: 700px;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 4.3rem 0;
    width: 36.5rem;
    text-align: center;
    color: var(--color-title);

    h1 {
      margin-bottom: 5.58rem;
      font-weight: 600;
      color: var(--color-title);
    }

    button {
      background: var(--color-form);
      height: 6.02rem;
      border-radius: 1.07rem;
      border: 0;
      padding: 0 1.72rem;
      color: #fff;
      width: 100%;
      font-weight: 500;
      margin-top: 1.72rem;
      transition: background-color 0.2s;
      margin-bottom: 2.58rem;

      &:hover {
        background: ${shade(0.2, '#ff69b4')};
      }
    }

    a {
      color: var(--color-form);
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#ff69b4')};
      }

      & + a {
        color: var(--color-form);
        display: block;
        margin-top: 2.58rem;
        text-decoration: none;
      }
    }
  }

  > a {
    color: var(--color-form);
    display: block;
    margin-top: 2.58rem;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 1.72rem;
    }

    &:hover {
      color: ${shade(0.2, '#ff69b4')};
    }
  }

  @media (min-width: 700px) {
    form {
      margin: 8.3rem 0;

      h1 {
        margin-bottom: 2.58rem;
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImage}) no-repeat center;
  background-size: cover;
`;
