import { FC, useState } from "react";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

//files
import loader from "../../assets/loader.svg";
import axiosInstance from "../../features/axios";

//components
import ProfileLayout from "../../layouts/profile";

const Settings: FC = () => {
  //local data
  const [loading, setLoading] = useState(false);
  const decoded: any = jwt_decode(sessionStorage.getItem("token")!);

  const { data } = useQuery("profile", async () => {
    return axiosInstance.get(`/users/${decoded.id}`).then((res) => res.data);
  });

  //config
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: data?.user?.name,
      email: data?.user?.email,
      password: "",
    },
  });

  //submit
  const onSubmit = (data: any) => {
    setLoading(true);
    axiosInstance
      .put(`/users/${decoded.id}`, {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        setLoading(false);
        console.log(res);

        toast(`${res.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
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

  //delete profile
  const handleDeleteProfile = () => {
    setLoading(true);
    axiosInstance
      .delete(`/users/${decoded.id}`)
      .then((res) => {
        setLoading(false);
        sessionStorage.removeItem("token");
        navigate("/");
        toast(`${res.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
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
    <ProfileLayout user={data?.user}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("name", { required: true })} />
          <input type="text" {...register("email", { required: true })} />
          <input
            type="password"
            {...register("password", { required: false })}
          />
          <button>
            {loading ? <img src={loader} alt="loader" /> : "Update"}
          </button>
        </form>
        <button type="button">Delete account</button>
      </Container>
    </ProfileLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  form {
    width: 60%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 5px;
      padding: 0 10px;
      background: var(--dark);
      color: var(--white);
    }

    button {
      width: 100%;

      img {
        width: 50px;
      }
    }

    .submit {
      background: var(--bright);
      color: var(--white);
    }
  }

  button {
    width: 60%;
    height: 40px;
    border: none;
    border-radius: 5px;
    background: var(--red);
    color: var(--white);
  }
`;

export default Settings;
