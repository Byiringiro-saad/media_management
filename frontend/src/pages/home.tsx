import { FC } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

//files
import Nav from "../components/nav";
import axiosInstance from "../features/axios";
import { addMedias } from "../store/slices/medias";
import MediasContainer from "../components/medias/container";

const Home: FC = () => {
  //configs
  const dispatch = useDispatch();

  //fetching medias
  const { isLoading, data } = useQuery("home", () => {
    return axiosInstance.get("http://localhost:8080/medias/").then((res) => {
      dispatch(addMedias(res?.data?.medias));
      return res?.data?.medias;
    });
  });

  return (
    <Container>
      <Nav />
      <div className="medias">
        <MediasContainer data={data} />
      </div>
    </Container>
  );
};

const Container = styled.div``;

export default Home;
