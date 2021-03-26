import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

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

export const Container = styled.div`
  .arrow-left-icon {
    display: none;
  }

  @media (min-width: 700px) {
    .arrow-left-icon {
      display: flex;
      margin-top: 1rem;
      margin-bottom: -2rem;
      margin-left: 45rem;
      color: var(--color-arrow-left);
      animation: ${appearFromLeft} 1s;
    }

    a svg {
      margin-right: 0.86rem;
    }
  }
`;

export const AvatarInput = styled.div`
  /* margin-bottom: 3.44rem; */
  position: relative;
  width: 16rem;

  img {
    width: 16rem;
    height: 16rem;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 3.16rem;
    height: 3.16rem;
    background: var(--color-form);
    color: #fff;
    border-radius: 50%;
    border: none;
    right: 0;
    bottom: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 2rem;
      height: 2rem;
    }

    &:hover {
      background: ${shade(0.2, '#ff69b4')};
    }
  }

  @media (min-width: 700px) {
    width: 20rem;
    margin-top: -3.44rem;

    img {
      width: 20rem;
      height: 20rem;
    }

    label {
      width: 5.16rem;
      height: 5.16rem;

      svg {
        width: 3.15rem;
        height: 3.15rem;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem auto 0;

  width: 100vw;
  max-width: 700px;

  background: var(--color-box-base);
  width: 100%;
  max-width: 85rem;
  border-radius: 0.8rem;
  padding-top: 4.3rem;

  animation: ${appearFromLeft} 1s;

  form {
    margin: 4.3rem 0;
    width: 36.5rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    color: var(--color-title);

    h1 {
      margin-bottom: 0.86rem;
      font-weight: 600;
      font-size: 2.15rem;
      color: var(--color-title);
      text-align: center;
    }

    h2 {
      margin-top: 1.72rem;
      margin-bottom: 1.72rem;

      color: var(--color-title);
      font-weight: 600;
      font-size: 2.15rem;
      text-align: center;
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
  }

  @media (min-width: 700px) {
    margin: 3.2rem auto auto;

    form {
      margin-bottom: 0;

      h1 {
        margin-bottom: 2.58rem;
      }
    }
  }
`;
