import { FC, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

//icons
import { FcGoogle } from "react-icons/fc";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

//layouts
import AuthLayout from "../layouts/auth";

//files
import loader from "../assets/loader.svg";
import axiosInstance from "../features/axios";

const Signup: FC = () => {
  //configs
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //local data
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  //handle show password
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //submit
  const onSubmit = (data: any) => {
    setLoading(true);
    axiosInstance
      .post("/users/signup", {
        name: data.name,
        usedGoogle: false,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoading(false);
        sessionStorage.setItem("token", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
        toast(`${err.response.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      });
  };

  return (
    <AuthLayout>
      <Container>
        <p className="header">You will love SaadMedius</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <input
              type="text"
              placeholder="Names"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 255,
              })}
            />
          </div>
          {
            //errors
            errors.name?.type === "required" && (
              <p className="error">Name is required</p>
            )
          }
          {
            //errors
            errors.name?.type === "minLength" && (
              <p className="error">Name must be at least 3 characters</p>
            )
          }
          {
            //errors
            errors.name?.type === "maxLength" && (
              <p className="error">Name must be at most 255 characters</p>
            )
          }
          <div className="row">
            <input
              type="text"
              placeholder="Email"
              {...register("email", {
                required: true,
                minLength: 10,
                maxLength: 255,
              })}
            />
          </div>
          {
            //errors
            errors.email?.type === "required" && (
              <p className="error">Email is required</p>
            )
          }
          {
            //errors
            errors.email?.type === "minLength" && (
              <p className="error">Email must be at least 10 characters</p>
            )
          }
          {
            //errors
            errors.email?.type === "maxLength" && (
              <p className="error">Email must be at most 255 characters</p>
            )
          }
          <div className="row">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 255,
              })}
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
          {
            //errors
            errors.password?.type === "required" && (
              <p className="error">Password is required</p>
            )
          }
          {
            //errors
            errors.password?.type === "minLength" && (
              <p className="error">Password must be at least 6 characters</p>
            )
          }
          {
            //errors
            errors.password?.type === "maxLength" && (
              <p className="error">Password must be at most 255 characters</p>
            )
          }
          <div className="row">
            <button type="submit">
              {loading ? <img src={loader} alt="loader" /> : "Signup"}
            </button>
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
      margin: 0 0 10px 0;
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

        img {
          width: 50px;
        }
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

    p.error {
      margin: 5px 0 15px 0;
      color: var(--red);
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
