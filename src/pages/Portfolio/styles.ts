import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-5.37rem);
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
      margin-left: 29rem;
      color: var(--color-arrow-left);
      animation: ${appearFromLeft} 1s;
    }

    a svg {
      margin-right: 0.86rem;
    }
  }
`;

export const Content = styled.div`
  background: var(--color-box-base);
  width: 100%;
  max-width: 120rem;
  border-radius: 0.8rem;
  padding-top: 4.3rem;
  margin: 1rem auto 0;
  padding-bottom: 1.3rem;

  animation: ${appearFromLeft} 1s;

  @media (min-width: 700px) {
    margin: 3.2rem auto 0.2rem;

    padding-top: 0.3rem;
  }
`;

export const Title = styled.div`
  font-size: 1.72rem;
  border: 0;
  padding: 0 2.4rem;

  font-weight: 700;
  color: var(--color-text-title);

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding-bottom: 1.6rem;
  border-bottom: 1px solid #fff;

  h1 {
    font-size: 3.87rem;

    font-weight: 700;
    color: var(--color-text-title);
  }

  a {
    label {
      display: none;
    }

    div {
      box-sizing: 2.15rem;
      background: var(--color-form);
      border-radius: 1.07rem;
      border-radius: 0.86rem 0.86rem 0.86rem 0.86rem;
      transition: all 0.2s;

      padding: 0.72rem;
      width: 100%;

      display: flex;
      align-items: center;

      svg {
        color: var(--color-box-base);
      }
    }

    @media (min-width: 700px) {
      width: 31%;
      height: 5.6rem;

      background: var(--color-form);
      color: #fff;

      border-radius: 1.07rem;
      border: 0;
      padding: 0 1.72rem;
      font-weight: 600;
      margin-top: 1.72rem;
      transition: background-color 0.2s;
      margin-bottom: 2.58rem;
      display: flex;
      align-items: center;
      justify-content: center;

      text-decoration: none;

      &:hover {
        background: ${shade(0.2, '#ff69b4')};
      }

      svg {
        display: none;
      }

      label {
        display: inline;
      }

      div {
        display: none;
      }
    }
  }
`;

export const Subtitle = styled.div`
  border: 0;
  padding: 0 2.4rem;
  width: 100%;
  display: flex;
  margin-bottom: 1.72rem;

  label {
    font-size: 2.58rem;
    font-weight: 300;
  }

  label + label {
    margin-left: 2.58rem;
  }

  @media (min-width: 700px) {
    margin-top: -2rem;
  }
`;

export const Card = styled.div`
  background-color: var(--color-portfolio);
  /* height: 51.61rem; */
  padding: 0 2.4rem;
  margin-left: 2.4rem;
  margin-bottom: 1.72rem;
  width: 88%;

  border-radius: 0.8rem;
  color: var(--color-box-base);

  display: block;
  align-items: flex-start;
  justify-content: center;
  padding-bottom: 1.72rem;

  h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 100; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  h4 {
    margin-top: 0.86rem;
    font-size: 2.15rem;
    font-weight: 600;
  }

  p {
    margin-top: 0.86rem;
    font-size: 2.15rem;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 100; /* number of lines to show */
    -webkit-box-orient: vertical;
  }

  @media (min-width: 700px) {
    width: 96%;
  }
`;

export const PortfolioTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    padding-top: 1.72rem;
    font-size: 2.58rem;
    font-weight: 600;
  }
`;

export const PortfolioIcons = styled.div`
  padding-top: 1.72rem;

  button {
    border: none;
    background: transparent;
    color: var(--color-box-base);
    margin-right: 0.86rem;
  }

  a {
    text-decoration: none;
    color: var(--color-box-base);
  }
`;

export const Files = styled.div`
  margin-top: 0.86rem;

  display: block;
  align-items: center;
  justify-content: center;

  img {
    width: 19.35rem;
    height: 19.35rem;
  }

  @media (min-width: 700px) {
    margin-top: 0.86rem;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.72rem;
    list-style: none;

    img {
      width: 19.35rem;
      height: 19.35rem;
    }
  }
`;
