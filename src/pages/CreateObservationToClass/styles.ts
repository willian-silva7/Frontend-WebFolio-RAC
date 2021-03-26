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
  width: 100vw;
  height: 100vh;

  overflow-x: hidden;

  .arrow-left-icon {
    display: none;
  }

  @media (min-width: 700px) {
    .arrow-left-icon {
      display: flex;
      margin-top: 1rem;
      margin-bottom: -2rem;
      margin-left: 51rem;
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
  max-width: 74rem;
  border-radius: 0.8rem;
  padding-top: 4.3rem;

  animation: ${appearFromLeft} 1s;

  fieldset {
    border: 0;
    padding: 0 2.4rem;

    legend {
      font-size: 3rem;

      font-weight: 700;
      color: var(--color-text-title);

      display: flex;
      align-items: center;
      justify-content: space-between;

      width: 100%;
      padding-bottom: 1.6rem;
      border-bottom: 1px solid #fff;
    }

    label {
      font-size: 1.93rem;
      color: var(--color-title);
      margin-bottom: 0.86rem;
    }

    .firstlabel {
      display: block;
      margin-top: 2.4rem;
    }

    .label {
      display: block;
      margin-top: 2.4rem;
    }
  }

  button {
    width: 100%;
    height: 5.6rem;

    background: var(--color-form);
    color: #fff;

    border-radius: 1.07rem;
    border: 0;
    padding: 0 1.72rem;
    font-weight: 500;
    margin-top: 1.72rem;
    transition: background-color 0.2s;
    margin-bottom: 2.58rem;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#ff69b4')};
    }
  }

  @media (min-width: 700px) {
    margin: 3.2rem auto 3.2rem;

    fieldset {
      padding: 0 6.4rem;

      legend {
        font-size: 3.87rem;
      }
    }
  }
`;

export const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .items-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.72rem;
    list-style: none;
  }

  .items-grid li {
    background: var(--color-background);
    border: 0.21rem solid var(--color-background);
    height: 19.35rem;
    border-radius: 0.86rem;
    padding: 3.44rem 2.58rem 1.72rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    text-align: center;

    cursor: pointer;
  }

  .items-grid li span {
    flex: 1;
    margin-top: 1.29rem;
    padding-bottom: 3.9rem;

    display: flex;
    align-items: center;
    color: var(--title-color);
  }

  .items-grid li.selected {
    background: #e1faec;
    border: 0.21rem solid #34cb79;
  }

  @media (min-width: 700px) {
    .items-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.72rem;
      list-style: none;
    }
  }
`;
