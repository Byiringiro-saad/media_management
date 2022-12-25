import { FC } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";

//icons
import { IoSettingsSharp } from "react-icons/io5";
import { HiOutlineViewList } from "react-icons/hi";

interface Props {
  user: any;
}

const Header: FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = (path: string) => {
    navigate(path);
  };

  const upvotes = user?.medias?.reduce((acc: number, curr: any) => {
    return acc + curr.upvotes.length;
  }, 0);

  return (
    <Container>
      <div className="side">
        <div
          onClick={() => goTo("/profile")}
          className={location.pathname === "/profile" ? "one active" : "one"}
        >
          <HiOutlineViewList className="icon" />
        </div>
      </div>
      <div className="middle">
        <p className="name">{user?.name}</p>
        <p className="email">{user?.email}</p>
        <div className="stats">
          <p className="media">{user?.medias?.length} Medias</p>
          <p className="upvotes">{upvotes} Upvotes</p>
        </div>
      </div>
      <div className="side">
        <div
          onClick={() => goTo("/profile/settings")}
          className={
            location.pathname === "/profile/settings" ? "one active" : "one"
          }
        >
          <IoSettingsSharp className="icon" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  height: 200px;
  margin: 20px 70px;
  background: var(--dark);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .middle {
    width: 80%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    p {
      color: var(--white);
    }

    p.email {
      color: var(--gray);
    }

    .stats {
      width: 100%;
      height: 20%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      p {
        margin: 0 30px;
      }
    }
  }

  .side {
    width: 10%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .one {
      width: 50px;
      height: 50px;
      background: var(--background);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      .icon {
        font-size: 1.4em;
        color: var(--white);
      }
    }

    .active {
      background: var(--bright);
    }
  }
`;

export default Header;
