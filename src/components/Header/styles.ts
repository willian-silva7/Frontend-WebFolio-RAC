import styled from 'styled-components';

export const Container = styled.header`
  /* padding: 1.44rem 0; */
  background: var(--color-header);
`;

export const HeaderContent = styled.div`
  max-width: 120.43rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    height: 8.6rem;
  }

  @media (max-width: 699px) {
    margin-left: 0.43rem;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8.6rem;

  img {
    width: 6.02rem;
    height: 6.02rem;
    border-radius: 50%;
  }

  button {
    display: flex;
    margin-right: 1.72rem;
    line-height: 2.58rem;
    font-size: 1.72rem;
    border: none;
    background: transparent;
    color: #000;
  }

  span {
    margin-right: 1.72rem;
    line-height: 2.58rem;
    font-size: 1.72rem;
    color: #000;
  }

  a {
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 699px) {
    margin-right: 0.86rem;
  }
`;
