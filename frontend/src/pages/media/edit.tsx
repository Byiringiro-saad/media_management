import { FC, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";

//components
import Nav from "../../components/nav";
import axiosInstance from "../../features/axios";

//files
import loader from "../../assets/loader.svg";

const Update: FC = () => {
  //config
  const params: any = useParams();

  //local data
  const [loading, setLoading] = useState(false);

  //fetch media
  const { data } = useQuery("update", () => {
    return axiosInstance
      .get(`/medias/${params.id}`, {})
      .then((res) => res.data.media);
  });

  //set default values
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title,
      status: data?.status,
    },
  });

  //delete media
  const deleteMedia = () => {
    setLoading(true);
    axiosInstance
      .delete(`/medias/${params.id}`, {
        headers: {
          Authorization: sessionStorage.getItem("token"),
        },
      })
      .then((res) => {
        setLoading(false);
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

  //on submit
  const onSubmit = (datas: any) => {
    setLoading(true);

    console.log(datas);

    axiosInstance
      .put(
        `/medias/${params.id}`,
        {
          title: datas.title,
          status: datas.status,
        },
        {
          headers: {
            Authorization: sessionStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setLoading(false);
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
    <Container>
      <Nav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="image">
          <img src={`${data?.url}`} alt="media" />
        </div>
        <input
          type="text"
          {...register("title", {
            required: true,
            minLength: 3,
            maxLength: 150,
          })}
        />
        {errors.title?.type === "required" && (
          <p className="error">Title is required</p>
        )}
        {errors.title?.type === "minLength" ||
          (errors.title?.type === "maxLength" && (
            <p className="error">Title must be between 3 and 150 characters</p>
          ))}
        <select
          {...register("status", {
            required: true,
          })}
        >
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        {errors.status?.type === "required" && (
          <p className="error">Status is required</p>
        )}
        <button type="submit">
          {loading ? <img src={loader} alt="loading" /> : "Update"}
        </button>
        <button type="button" className="delete" onClick={deleteMedia}>
          Delete
        </button>
      </form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .error {
    width: 100%;
    height: 40px;
    text-align: center;
    color: var(--red);
    font-size: 1em;
  }

  form {
    padding: 20px 170px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .image {
      width: 100%;
      height: 400px;
      background: var(--dark);
      border-radius: 10px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        width: 50%;
        height: 90%;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
      }

      p {
        color: var(--gray);
        font-size: 2em;
      }
    }

    input {
      width: 100%;
      height: 50px;
      border-radius: 10px;
      margin: 10px 0;
      padding: 0 20px;
      color: var(--white);
      background: var(--dark);
      border: none;
    }

    select {
      width: 100%;
      height: 50px;
      border-radius: 10px;
      margin: 10px 0;
      padding: 0 20px;
      color: var(--white);
      background: var(--dark);
      border: none;
    }

    button {
      width: 40%;
      height: 50px;
      border-radius: 10px;
      margin: 20px 0;
      padding: 0 20px;
      color: var(--white);
      background: var(--bright);
      border: none;

      img {
        width: 50px;
      }
    }

    .delete {
      background: var(--red);
    }
  }
`;

export default Update;
