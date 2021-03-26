import styled from 'styled-components';

export const Container = styled.div`
  .dropzone {
    height: 21.5rem;
    background: none;
    border-radius: 1.07rem;
    border: 0.43rem dashed var(--color-form);
    opacity: 0.55;

    display: flex;
    justify-content: center;
    align-items: center;
    outline: 0;
  }

  .dropzone img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .dropzone p {
    width: calc(100% - 6.45rem);
    height: calc(100% - 6.45rem);
    border-radius: 1.07rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: var(--color-title);
  }

  .dropzone p svg {
    color: var(--color-title);
    width: 2.58rem;
    height: 2.58rem;
    margin-bottom: 0.86rem;
  }
`;
