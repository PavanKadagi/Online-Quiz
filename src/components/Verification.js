import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";

const VerificationDiv = styled.section`
  padding: 2rem;
  .recovery {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  h2 {
    text-align: center;
  }
  .recovery p {
    margin: 1rem 0 2rem 0;
    font-size: 1.3rem;
    text-align: center;
  }
  .recovery .form {
    display: flex;
    flex-direction: column;
  }

  .form-control input {
    border-color: #fff;
    margin-top: 1rem 0;
    outline: none;
    border: none;
    background: none;
    width: 30rem;
    font-size: 1.3rem;
    opacity: 0.7;
    padding: 0.8rem 1.5rem;
    color: ${({ theme }) => theme.colors.textColor};
    border: 0.1rem solid ${({ theme }) => theme.colors.blue};
  }

  .form .form-control {
    margin: 1rem 0 0 0;
    display: flex;
    flex-direction: column;
  }

  .form-control label {
    font-size: 1rem;
    text-align: center;
  }
  .recovery span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    font-size: 1.3rem;

    a {
      color: ${({ theme }) => theme.colors.mainTextColor};
      margin-left: 0.5rem;
      font-size: 1.3rem;
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      max-width: 70rem;
      margin: 0 auto;
    }
    .form-control input {
      width: 25rem;
    }
  }
`;

export default function Verification() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const verification = async (e) => {
    try {
      e.preventDefault();
    let res = await fetch(`${URL}/verification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    res = await res.json();
    if (res.message) {
      toast.success(res.message);
    }
    if (res.error) {
      toast.error(res.error);
    }
    } catch (error) {
      console.log(error.message)
    }
  };



  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <VerificationDiv className="container">
        <div className="container2">
          <div className="glassy recovery">
            <div className="recovery-content">
              <h2>Verification</h2>
              <p>Enter email to Verification</p>

              <form className="form" method="POST" onSubmit={verification}>
                <div className="form-control">
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required={true}
                  />
                </div>
                <button name="recovery" id="recovery" type="submit">
                  Send Verification Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </VerificationDiv>
    </>
  );
}
