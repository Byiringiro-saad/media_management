import { FC, ConsumerProps } from "react";
import styled from "styled-components";

//files
import { Media as MInterface } from "../../features/interfaces";

//components
import Media from "./media";

type Props = {
  data: MInterface[];
};

const MediasContainer: FC<Props> = ({ data }) => {
  const medias = data?.sort((a, b) => b.upvotes.length - a.upvotes.length);

  return (
    <Container>
      {medias?.map((media: MInterface, index) => {
        return <Media key={index} media={media} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
`;

export default MediasContainer;
