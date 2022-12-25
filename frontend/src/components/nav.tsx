import { FC } from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";

//icons
import { AiOutlineLogin } from "react-icons/ai";

const Nav: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <Link
        to="/home"
        className={location?.pathname?.includes("home") ? "active" : " "}
      >
        Home
      </Link>
      <Link
        to="/upload"
        className={location?.pathname?.includes("upload") ? "active" : " "}
      >
        Upload
      </Link>
      <Link
        to="/profile"
        className={location?.pathname?.includes("profile") ? "active" : " "}
      >
        Profile
      </Link>
      <div className="logout" onClick={handleLogout}>
        <AiOutlineLogin className="icon" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  background: var(--dark);

  a {
    text-decoration: none;
    color: var(--white);
    margin: 0 30px;
  }

  .active {
    color: var(--bright);
  }

  .logout {
    position: absolute;
    right: 35px;

    .icon {
      font-size: 1.3em;
      color: var(--white);
    }
  }
`;

export default Nav;
