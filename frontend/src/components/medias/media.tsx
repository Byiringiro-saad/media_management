import * as React from "react";
import styled from "styled-components";

//files
import { Media as MInterface } from "../../features/interfaces";

type Props = {
  media: MInterface;
};

const Media: React.FC<Props> = ({ media }) => {
  return (
    <Container>
      <div className="media">
        <div className="upvotes">
          <p>{media?.upvotes?.length} Upvotes</p>
        </div>
        <img src={media?.url} alt="media" />
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
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background: var(--dark);
    overflow: hidden;
    position: relative;

    .upvotes {
      width: 40%;
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
