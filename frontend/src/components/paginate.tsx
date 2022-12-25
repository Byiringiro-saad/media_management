import { FC, useState } from "react";
import styled from "styled-components";

//icons
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface Props {
  mediasPerPage: number;
  totalMedias: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Paginate: FC<Props> = ({
  mediasPerPage,
  totalMedias,
  currentPage,
  setCurrentPage,
}) => {
  //local data
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMedias / mediasPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (number: number) => {
    setCurrentPage(number);
  };

  const goDown = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goUp = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container>
      <div className="container">
        <div className="one" onClick={goDown}>
          <HiChevronLeft className="icon" />
        </div>
        <div className="nums">
          {pageNumbers.map((number) => (
            <div
              key={number}
              className={currentPage === number ? "num active" : "num"}
              onClick={() => paginate(number)}
            >
              <p>{number}</p>
            </div>
          ))}
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
