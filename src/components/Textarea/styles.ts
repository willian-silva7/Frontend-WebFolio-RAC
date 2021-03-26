import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: none;
  border-radius: 1.07rem;
  border: 0.32rem solid var(--color-form);
  color: var(--color-form);
  opacity: 0.55;
  transition: all 0.2s;

  padding: 1.72rem;
  width: 100%;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 0.86rem;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: var(--color-error);
    `}

  ${props =>
    props.isFocused &&
    css`
      opacity: 1;
      color: var(--color-onblur);
      border-color: var(--color-onblur);
      transform: scale(1.07);
    `}

  ${props =>
    props.isFilled &&
    css`
      opacity: 1;
    `}

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: var(--color-form);
    height: 16rem;
    resize: vertical;
    padding: 1.2rem 1.6rem;
    min-height: 8rem;
  }

  textarea:focus {
    color: var(--color-onblur);
  }

  svg {
    margin-bottom: 11.72rem;
  }
`;
