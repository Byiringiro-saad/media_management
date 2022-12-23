import styled from "styled-components";
import { FC, PropsWithChildren } from "react";

//files
import logo from "../assets/logo.jpg";

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      {children}
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .logo {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export default AuthLayout;
