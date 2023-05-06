import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext, UserData } from "../../context/ContextAPI";
import avatar from "../../assets/profile.png";
import { FaUser, FaMarker, FaArrowRight } from "react-icons/fa";

const NavbarLink = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  .nav-link {
    font-weight: 600;
    font-size: 1.5rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.mainTextColor};
    position: relative;
    transition: border 3s ease-in;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.8rem;

    &:hover {
      color: ${({ theme }) => theme.colors.blue} !important;
      text-shadow: 0 0.2rem 0.3rem rgba(188, 143, 143, 0.5) !important;
    }
  }

  .active {
    border-bottom: 2px solid #f1f1f1;
    color: ${({ theme }) => theme.colors.blue}!important;
    text-shadow: 0 0.2rem 0.3rem rgba(188, 143, 143, 0.5);
  }

  li {
    padding: 0 2.5rem;
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 4rem;
      height: 4rem;
      background-color: ${({ theme }) => theme.colors.primaryColor};
      border-radius: 100%;
      cursor: pointer;
    }
    .profileInfo {
      display: ${({ profileInfo }) => (profileInfo ? "flex" : "none")};
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      position: absolute;
      z-index: 999;
      top: 6rem;
      background-color: #fff;
      right: 4rem;
      border-radius: 0.4rem;
      width: 15rem;
      box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
      padding: 1rem;

      .borderBottom {
        border: 0.1rem solid #f1f1f1;
        width: 100%;
        margin: 0.7rem 0;
      }
    }
    a {
      padding-bottom: 0.3rem;
      font-family: "Lora", serif;
    }
  }

  ul {
    display: flex;
  }

  @media (max-width: 768px) {
    ul {
      transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
      flex-flow: column nowrap;
      background-color: ${({ theme }) => theme.colors.blueLight};
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 50%;
      padding-top: 4rem;
      transition: transform 0.3 ease-in-out;
      border-top-left-radius: 10rem;
      border-left: 0.1rem solid white;
      border-top: 0.1rem solid white;
    }
    .active {
      padding: none;
    }
    li {
      padding: 1.5rem 1rem;
      border-bottom: 0.1rem solid #fff;
      color: white !important;

      .profileInfo {
        top: 26rem;
      }
    }
    
  }
`;

export default function Rightnav({ open }) {
  // const {state} = useContext(UserContext);

  const [profileInfo, setPofileInfo] = useState(false);

  const profileInfoCard = async () => {
    setPofileInfo(!profileInfo);
  };
  const data = useContext(UserData);
  // console.log("data ---", document.cookie);
  return (
    <NavbarLink className="navbar-space" open={open} profileInfo={profileInfo}>
      <ul className="navbar-nav">
        <li className="nav-item " style={{ textDecoratione: "none" }}>
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link " to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " to="/contact">
            Contact
          </NavLink>
        </li>
        {localStorage.getItem("userLogin") ? (
          <>
            <li className="nav-item">
              <img src={avatar} alt="profile" onClick={profileInfoCard} />
              <div className="profileInfo">
                <NavLink
                  className="nav-link "
                  to="/about"
                  onClick={profileInfoCard}
                >
                  <FaUser icon="fa-solid fa-user" />
                  Profile
                </NavLink>

                <div className="borderBottom"></div>
                <NavLink
                  className="nav-link "
                  to="/viewmarks"
                  onClick={profileInfoCard}
                >
                  <FaMarker icon="fa-solid fa-marker" />
                  View Marks
                </NavLink>

                <div className="borderBottom"></div>

                <NavLink
                  className="nav-link "
                  to="/logout"
                  onClick={profileInfoCard}
                >
                  <FaArrowRight icon="fa-solid fa-right-from-bracket" />
                  Logout
                </NavLink>
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item">
              <NavLink className="nav-link " to="/signup">
                Sign Up
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/signin">
                Log In
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </NavbarLink>
  );
}
