import { FC } from "react";
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import styled from "styled-components";

//components
import Paginate from "../../components/paginate";
import ProfileLayout from "../../layouts/profile";

//files
import axiosInstance from "../../features/axios";
import ProfileMediasContainer from "../../components/profile/container";

const Profile: FC = () => {
  const decoded: any = jwt_decode(sessionStorage.getItem("token")!);

  const { data } = useQuery("profile", async () => {
    return axiosInstance.get(`/users/${decoded.id}`).then((res) => res.data);
  });

  return (
    <ProfileLayout user={data?.user}>
      <Container>
        <Paginate />
        <ProfileMediasContainer data={data?.user?.medias} />
      </Container>
    </ProfileLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Profile;
