import { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

//icons
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

//layouts
import AuthLayout from "../layouts/auth";

const Signup: FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <AuthLayout>
      <Container>
        <p className="header">You will love SaadMedius</p>
        <form>
          <div className="row">
            <input type="text" placeholder="Names" />
          </div>
          <div className="row">
            <input type="text" placeholder="Email" />
          </div>
          <div className="row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            {showPassword ? (
              <AiFillEyeInvisible
                onClick={handleShowPassword}
                className="icon"
              />
            ) : (
              <AiFillEye onClick={handleShowPassword} className="icon" />
            )}
          </div>
          <div className="row">
            <button type="submit">Signup</button>
          </div>
          <div className="row">
            <FcGoogle className="big" />
            <p>Signup with Google</p>
          </div>
        </form>
        <p className="signup">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Container>
    </AuthLayout>
  );
};

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  background: var(--dark);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  p.header {
    font-size: 1.2em;
    font-weight: 700;
    color: var(--white);
    line-height: 100px;
  }

  form {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .row {
      width: 350px;
      height: 45px;
      margin: 0 0 15px 0;
      border-radius: 5px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      position: relative;
      background: var(--background);

      p {
        color: var(--white);
      }

      .big {
        margin: 0 10px 0 0;
      }

      input {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        padding: 0 10px;
        color: var(--white);
        background: transparent;

        ::placeholder {
          color: var(--gray);
        }
      }

      button {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        color: var(--white);
        background: var(--bright);
      }

      .icon {
        padding: 5px;
        font-size: 2em;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        color: var(--gray);

        :hover {
          cursor: pointer;
          background: var(--dark);
        }
      }
    }
  }

  p.signup {
    color: var(--white);
    position: absolute;
    right: 20px;
    bottom: 20px;

    a {
      color: var(--bright);
      text-decoration: none;
    }
  }
`;

export default Signup;
