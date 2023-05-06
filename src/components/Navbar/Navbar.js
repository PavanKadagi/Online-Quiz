import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Burger from "./Burger";

const Navigation = styled.nav`
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 9;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 100%;
  margin-bottom: 2rem;

  .navbar-brand {
    font-size: 3.7rem;
    text-decoration: none;
    font-family: "Montez", cursive;
    cursor: pointer;
    font-weight: bolder;
    margin-left: 1rem;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .navbar-brand {
      font-size: 2.5rem !important;
    }
  }
`;

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <>
      <Navigation className="navbar">
        <h1 className="navbar-brand" onClick={() => navigate("/")}>
          Online Quiz
        </h1>
        <Burger />
      </Navigation>
    </>
  );
}
