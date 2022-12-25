import { FC, useState } from "react";
import styled from "styled-components";

//icons
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Paginate: FC = () => {
  const [active, setActive] = useState(1);

  const goDown = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const goUp = () => {
    if (active < 4) {
      setActive(active + 1);
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="one" onClick={goDown}>
          <HiChevronLeft className="icon" />
        </div>
        <div className="nums">
          <div className={active === 1 ? "num active" : "num"}>
            <p>1</p>
          </div>
          <div className={active === 2 ? "num active" : "num"}>
            <p>2</p>
          </div>
          <div className={active === 3 ? "num active" : "num"}>
            <p>3</p>
          </div>
          <div className={active === 4 ? "num active" : "num"}>
            <p>4</p>
          </div>
        </div>
        <div className="one" onClick={goUp}>
          <HiChevronRight className="icon" />
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  .container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .nums {
      width: auto;
      height: auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 0 10px;

      .num {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--white);
      }

      .active {
        background: var(--bright);
      }
    }

    .one {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      border-radius: 50%;
      background: var(--dark);
      cursor: pointer;

      p {
        font-size: 1.5em;
        color: var(--white);
      }

      :hover {
        background: var(--gray);
      }

      .icon {
        font-size: 1.5em;
        color: var(--white);
      }
    }
  }
`;

export default Paginate;
