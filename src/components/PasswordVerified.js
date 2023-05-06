import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../App";

const RecoveryDiv = styled.section`
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
    margin-bottom: 2rem;
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

export default function PasswordVerified() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useSearchParams("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [id, setId] = useState("");
  const token = userToken.get("token");

  const verifyPassword = async () => {
    try {
      let res = await fetch(`${URL}/forget-password`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });
      // let res = await fetch('/verify',{method:"GET"});
      res = await res.json();
      if (res.error) {
        navigate("/");
        alert(res.error);
      }
      setId(res.userId);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    verifyPassword();
  }, []);

  const recovery = async (e) => {
    try {
      e.preventDefault();
      if (!password === cpassword) {
        toast.error("Password Not Match...!");
      } else {
        let res = await fetch(`${URL}/forget-password`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
            id,
          }),
        });
        res = await res.json();
        if (res.message) {
          navigate("/signin");
          alert(res.message);
        }
        if (res.error) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RecoveryDiv className="container">
        <div className="container2">
          <div className="glassy recovery">
            <div className="recovery-content">
              <h2>Recovery</h2>
              <p>Forget Password</p>

              <form className="form" method="POST" onSubmit={recovery}>
                <div className="form-control">
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                  />
                  <input
                    type="password"
                    autoComplete="off"
                    name="cpassword"
                    id="cpassword"
                    placeholder="Enter Your Repeat Password"
                    value={cpassword}
                    onChange={(e) => setCpassword(e.target.value)}
                    required={true}
                  />
                  <input type="hidden" name="userId" value={id} />
                </div>
                <button name="recovery" id="recovery" type="submit">
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </RecoveryDiv>
    </>
  );
}
