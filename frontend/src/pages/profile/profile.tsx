import { FC, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useNavigate } from "react-router";

//components
import ProfileLayout from "../../layouts/profile";

//files
import axiosInstance from "../../features/axios";
import ProfileMediasContainer from "../../components/profile/container";
import { toast } from "react-toastify";

const Profile: FC = () => {
  //config
  const navigate = useNavigate();

  //local data
  let decoded: any = "";

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      toast("Please login", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "dark",
      });
      navigate("/login");
    } else {
      decoded = jwt_decode(sessionStorage?.getItem("token")!);
    }
  }, []);

  const { data } = useQuery("profile", async () => {
    return axiosInstance.get(`/users/${decoded?.id}`).then((res) => res.data);
  });

  return (
    <ProfileLayout user={data?.user}>
      <Container>
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
