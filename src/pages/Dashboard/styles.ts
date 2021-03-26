import { shade } from 'polished';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div``;

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
  background: var(--color-box-base);
  width: 100%;
  max-width: 120rem;
  border-radius: 0.8rem;
  padding-top: 4.3rem;
  margin: 1rem auto 0;

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

export const Search = styled.div`
  border: 0;
  padding: 0 2.4rem;
  width: 100%;
  display: flex;

  label {
    font-size: 2.58rem;
    font-weight: 400;
  }

  input {
    width: 100%;
    background: var(--color-background);
    border: 0;

    padding-left: 1.72rem;
    color: var(--color-text-in-input);

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
  }

  @media (min-width: 700px) {
    margin-top: -2rem;

    input {
      width: 80.8%;
      margin-left: 1.07rem;
      font-size: 1.93rem;
    }
  }
`;

export const TableContainer = styled.div`
  table {
    margin-top: 0.43rem;
    padding: 0 1.4rem;
    border-spacing: 0 0.86rem;

    th {
      color: #969cb3;
      font-weight: 600;
      padding: 2.15rem 1.44rem;
      text-align: left;
      font-size: 1.8rem;
      line-height: 2.58rem;
    }

    td {
      a {
        color: var(--color-box-base);
      }
      background-color: var(--color-portfolio);
      padding: 2.15rem 1.44rem;
      font-weight: 600;

      color: var(--color-box-base);
      text-align: left;
      border: 0;

      font-size: 1.72rem;
    }

    a {
      text-decoration: none;
      margin-right: 0.9rem;
    }

    svg {
      width: 2rem;
      height: 2rem;
      margin-left: 1.5rem;
      display: block;
      color: var(--color-box-base);
    }

    svg + svg {
      margin-top: 0.9rem;
    }

    td:first-child {
      border-radius: 0.86rem 0 0 0.86rem;
    }

    td:last-child {
      border-radius: 0 0.86rem 0.86rem 0;
    }
  }

  @media (min-width: 700px) {
    table {
      width: 100%;
      padding: 0 2.4rem;

      th {
        padding: 2.15rem 3.44rem;
      }

      td {
        padding: 2.15rem 3.44rem;

        font-size: 1.72rem;
      }

      .last-column {
        text-align: end;
      }

      .last-icon {
        margin-right: -1.5rem;
        cursor: pointer;
      }

      a {
        text-decoration: none;
        margin-right: 0.9rem;
      }

      svg {
        width: 1.8rem;
        height: 1.8rem;
        display: inline;
        margin-left: 0;
        color: var(--color-box-base);
      }

      svg + svg {
        margin-left: 0.9rem;
        margin-top: 0;
      }
    }
  }
`;

export const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -5.9rem;
  margin-left: 24rem;
  margin-bottom: 2.58rem;

  div {
    box-sizing: 1rem;
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

  label {
    display: none;
  }

  @media (min-width: 700px) {
    font-size: 1.72rem;
    border: 0;
    padding: 0 2.4rem;

    font-weight: 700;
    color: var(--color-text-title);

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    margin-top: -9.8rem;
    margin-left: 0;
    margin-bottom: 0;

    padding-bottom: 1.6rem;
    border-bottom: 1px solid #fff;

    a {
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
  }
`;
