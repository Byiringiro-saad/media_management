import * as React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";

//icons
import { HiDownload } from "react-icons/hi";
import { BiChevronsUp } from "react-icons/bi";
import { IoMdArrowRoundBack } from "react-icons/io";

//components
import Nav from "../../components/nav";

//files
import axiosInstance from "../../features/axios";

const Media: React.FC = () => {
  //configs
  const params = useParams();

  //fetch media
  const { data } = useQuery("media", () => {
    return axiosInstance.get(`/medias/${params.id}`).then((res) => res.data);
  });

  //go back
  const goBack = () => {
    window.history.back();
  };

  return (
    <Container>
      <Nav />
      <div className="container">
        <div className="header">
          <div className="back" onClick={goBack}>
            <IoMdArrowRoundBack className="icon" />
          </div>
          <h2>{data?.media?.title}</h2>
        </div>
        <div className="media">
          {data?.media?.type?.includes("image") ? (
            <img src={data?.media?.url} alt="media" />
          ) : (
            <video src={data?.media?.url} autoPlay></video>
          )}
        </div>
        <div className="actions">
          <div className="one">
            <BiChevronsUp className="icon" />
          </div>
          <div className="one">
            <HiDownload className="icon" />
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .container {
    width: 80%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 70px;

    .header {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 20px;

      .back {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 10px 0 0;
        background: var(--dark);

        :hover {
          background: var(--gray);
        }

        .icon {
          font-size: 1.4em;
          color: var(--white);
        }
      }

      h2 {
        color: var(--white);
      }
    }

    .media {
      width: 100%;
      height: auto;
      border-radius: 20px;
      overflow: hidden;

      img {
        width: 100%;
      }
    }

    .actions {
      width: 100%;
      height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;

      .one {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
        border-radius: 50%;
        background: var(--dark);

        :hover {
          background: var(--gray);
        }

        .icon {
          font-size: 1.5em;
          color: var(--white);
        }
      }
    }
  }
`;

export default Media;
