import styled from "styled-components";
import { FC, PropsWithChildren } from "react";

//files
import Nav from "../components/nav";
import Header from "../components/profile/header";

interface Props extends PropsWithChildren<any> {
  user: any;
}

const ProfileLayout: FC<Props> = ({ children, user }) => {
  return (
    <Container>
      <Nav />
      <Header user={user} />
      {children}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default ProfileLayout;
