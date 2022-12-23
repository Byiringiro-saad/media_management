import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//files
import logo from "../assets/logo.jpg";

const Index: React.FC = () => {
  return (
    <Container>
      <p className="header">Welcome to SaadMedius</p>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  p.header {
    font-size: 1.3em;
    color: var(--white);
    font-weight: 800;
  }

  .logo {
    width: 300px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
    }
  }

  .buttons {
    width: 400px;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    a {
      width: 140px;
      height: 40px;
      text-decoration: none;
      color: var(--white);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      background: var(--dark);
    }
  }
`;

export default Index;
