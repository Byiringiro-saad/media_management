import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { FC, useCallback, useState } from "react";

//components
import Nav from "../../components/nav";
import axiosInstance from "../../features/axios";

//files
import loader from "../../assets/loader.svg";
import { toast } from "react-toastify";

//functions
const isEmptyObject = (obj: any) => {
  return JSON.stringify(obj) === "{}";
};

const Upload: FC = () => {
  //config
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //local data
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>(new File([], ""));

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //on submit
  const onSubmit = (data: any) => {
    if (isEmptyObject(file)) {
      toast("Please select a file", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("status", data.status);
      formData.append("type", file.type);
      formData.append("file", file);
      axiosInstance
        .post("/medias/create", formData, {
          headers: {
            Authorization: sessionStorage.getItem("token"),
            "Content-type": "multipart/form-data",
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
    }
  };

  return (
    <Container>
      <Nav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="image" {...getRootProps()}>
          {!isEmptyObject(file) ? (
            <img src={URL.createObjectURL(file)} alt="media" />
          ) : (
            <>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop here..</p>
              ) : (
                <p>Click or drag and drop</p>
              )}
            </>
          )}
        </div>
        <input
          type="text"
          placeholder="What is this"
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
          {loading ? <img src={loader} alt="loading" /> : "Upload"}
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
  }
`;

export default Upload;
