import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.section`
  box-shadow: 0 0.1rem 0.1rem rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 45%;
  height: 50%;

  .page-not-found {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      opacity: 0.5;
      width: 100%;
      margin-bottom: 1rem;
    }
    h2 {
      text-align: center;
    }
    p {
      font-size: 1.3rem;
      margin: 1rem 0;
      text-align: center;
    }
    button {
      border-radius: 2rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    h2 {
      font-size: 1.7rem;
    }
  }
`;

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <Wrapper className="container  ">
      <div className=" page-not-found">
        <img
          src="https://cdn.svgator.com/images/2022/01/404-page-animation-example.gif"
          alt="PageNotFound"
        />
        <h2>WE ARE SORRY, PAGE NOT FOUND!</h2>
        <p>
          THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN MOVED HAD ITS NAME
          CHANGED OR IS TEMPORARILY UNAVAILABLE
        </p>
        <button onClick={() => navigate("/")}>BACK TO HOMEPAGE</button>
      </div>
    </Wrapper>
  );
}
