import { FC } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

//components
import Nav from "../components/nav";
import Paginate from "../components/paginate";
import MediasContainer from "../components/medias/container";

//files
import axiosInstance from "../features/axios";
import { addMedias } from "../store/slices/medias";

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
      <div className="top">
        <div className="num">
          <p>{data?.length} Medias</p>
        </div>
        <div className="pagination">
          <Paginate />
        </div>
      </div>
      <div className="medias">
        <MediasContainer data={data} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;

  .top {
    width: 100%;
    height: 100px;
    padding: 40px 70px;
    display: flex;
    flex-direction: row;
    align-items: center;

    .pagination {
      width: 80%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      justify-self: center;
    }

    p {
      font-size: 1.2rem;
      color: var(--white);
    }
  }

  .medias {
    width: 100%;
    height: auto;
    padding: 0 50px;
  }
`;

export default Home;
