import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import data from "../data/data.json";

const Wrapper = styled.section`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  width: 95%;
  /* background-color: ${({ theme }) => theme.colors.bg}; */

  .card {
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.5);
    border-radius: 0.5rem;
    figure {
      border-top-right-radius: 0.5rem;
      border-top-left-radius: 0.5rem;
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      overflow: hidden;
      transition: all 0.5s linear;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all 0.2s linear;
      }
      &:hover::after {
        width: 100%;
      }
      &:hover img {
        transform: scale(1.2);
      }
      img {
        max-width: 90%;
        margin-top: 1.5rem;
        height: 20rem;
        transition: all 0.2s linear;
      }
    }
    .card-data {
      padding: 0 2rem;

      h3 {
        margin: 1rem 0;
        font-weight: 600;
        opacity: 0.7;
        font-size: 2rem;
      }

      button {
        border: 0.1rem solid rgb(98 84 243);
        color: ${({ theme }) => theme.colors.blue};
        margin: 2rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 500;

        &:hover {
          background-color: ${({ theme }) => theme.colors.blue};
          color: #fff;
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    .container {
      max-width: 80rem;
      margin: 0 auto;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    .container {
      max-width: 50rem;
      margin: 0 auto;
    }
    button {
    }
  }
`;

export default function Home() {
  return (
    <Wrapper className="container">
      {data.map((data, key) => (
        <div key={key} className="card">
          <figure>
            <img src={data.img} alt={data.language} />
          </figure>
          <div className="card-data">
            <h3>{data.heading}</h3>
            <p>{data.description}</p>
            <NavLink to={"/quiz/" + data.language}>
              <button>{data.button}</button>
            </NavLink>
          </div>
        </div>
      ))}
    </Wrapper>
  );
}
