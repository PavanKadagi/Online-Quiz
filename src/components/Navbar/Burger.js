import React, { useState } from "react";
import styled from "styled-components";
import Rigthnav from "./Rigthnav";

const BurgerStyled = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  position: absolute;
  z-index: 20;
  display: none;

  .burger-div {
    width: 3.6rem;
    height: 0.6rem;
    background-color: #333;
    border-radius: 1rem;
    background-color: ${({ open, theme }) =>
      open ? "#ccc" : theme.colors.blue};
    transform-origin: 1px;
    transition: all 0.3s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }

  @media (max-width: 768px) {
    left: 87%;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    left: 82%;
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
`;

export default function Burger() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BurgerStyled open={open} onClick={() => setOpen(!open)}>
        <div className="burger-div" />
        <div className="burger-div" />
        <div className="burger-div" />
      </BurgerStyled>
      <Rigthnav open={open} />
    </>
  );
}
