import styled from "styled-components";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
  }

  @media screen and (max-width: 450px) {
    width: 280px;
  }

  @media screen and (max-width: 800px) {
    margin-bottom: 30px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 450px) {
    flex-direction: column;
  }
`;
