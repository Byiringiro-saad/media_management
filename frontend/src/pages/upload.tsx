import { FC, useCallback } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";

//components
import Nav from "../components/nav";

const Upload: FC = () => {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Container>
      <Nav />
      <form>
        <div className="image" {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop here..</p> : <p>Click or drag and drop</p>}
        </div>
        <input type="text" placeholder="What is this" />
        <select>
          <option value="private">Private</option>
          <option value="public">Public</option>
        </select>
        <button type="submit">Upload</button>
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

  form {
    padding: 20px 70px;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .image {
      width: 100%;
      height: 500px;
      background: var(--dark);
      border-radius: 10px;
      margin: 10px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

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
    }
  }
`;

export default Upload;
