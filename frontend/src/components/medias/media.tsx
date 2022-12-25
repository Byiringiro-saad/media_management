import * as React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useNavigate } from "react-router";

//icons
import { HiDownload } from "react-icons/hi";
import { BiChevronsUp } from "react-icons/bi";

//files
import { Media as MInterface } from "../../features/interfaces";
import axiosInstance from "../../features/axios";
import { toast } from "react-toastify";

type Props = {
  media: MInterface;
};

const Media: React.FC<Props> = ({ media }) => {
  //configs
  const navigate = useNavigate();

  //animations
  const hover = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const goToMedia = () => {
    navigate(`/home/${media?._id}`);
  };

  const upvote = () => {
    axiosInstance
      .put(
        `/medias/upvote/${media?._id}`,
        {},
        { headers: { Authorization: sessionStorage.getItem("token") } }
      )
      .then((res) => {
        toast(`${res.data.message}`, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "dark",
        });
      })
      .catch((err) => {
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
      <div className="media">
        <motion.div
          className="hover"
          variants={hover}
          initial="hidden"
          whileHover="visible"
        >
          <div className="one" onClick={upvote}>
            <BiChevronsUp className="icon" />
          </div>
          <div className="one">
            <HiDownload className="icon" />
          </div>
          <div className="background" onClick={goToMedia}></div>
        </motion.div>
        <div className="upvotes">
          <p>{media?.upvotes?.length} Upvotes</p>
        </div>
        <img src={media?.url} alt="media" onClick={goToMedia} />
      </div>
      <div className="title">
        <p>{media?.title}</p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .media {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background: var(--dark);
    overflow: hidden;
    position: relative;

    .hover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .background {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        cursor: pointer;
        z-index: -10;
        background: #070b1087;
      }

      .one {
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0;
        border-radius: 50%;
        background: var(--dark);
        cursor: pointer;

        :hover {
          background: var(--gray);
        }

        .icon {
          font-size: 1.5em;
          color: var(--white);
        }
      }
    }

    .upvotes {
      width: 50%;
      height: 30px;
      background: var(--dark);
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      border-radius: 0 0 10px 10px;

      p {
        color: var(--white);
      }
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .title {
    margin: 0 0 0 5px;
    line-height: 30px;
    color: var(--white);

    p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
    }
  }
`;

export default Media;
