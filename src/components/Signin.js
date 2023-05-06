import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { UserContext } from "../context/ContextAPI";
import toast, { Toaster } from "react-hot-toast";
// import { theme } from "../styles/Theme";
import { useEffect } from "react";
import { URL } from "../App";

const SigninDiv = styled.section`
  .signin {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  h2 {
    text-align: center;
  }
  .signin p {
    margin: 1rem 0 3rem 0;
    font-size: 1.3rem;
  }
  .signin .form {
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
    opacity: 0.9;
    padding: 0.8rem 1.5rem;
    color: ${({ theme }) => theme.colors.textColor};
    border: 0.1rem solid ${({ theme }) => theme.colors.blue};
  }

  .form-control input:focus {
    border: 0.1rem solid ${({ theme }) => theme.colors.mainTextColor};
  }

  .form .form-control {
    margin: 1rem 0 0 0;
    display: flex;
    flex-direction: column;
  }

  .form-control label {
    margin-bottom: 0.7rem;
    font-size: 1.3rem;
    opacity: 0.8;
  }

  .form .remember {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    margin: 0.8rem 0 2rem 0;
  }

  .remember label {
    margin-left: 0.5rem;
    font-size: 1.3rem;
  }
  .remember a {
    font-size: 1.3rem;

    color: ${({ theme }) => theme.colors.blue};
  }

  .signin span {
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
    .form {
      max-width: 90%;
      margin: 0 auto;

      button {
        max-width: 95%;
      }
    }
  }
`;

export default function Signin() {
  // const {state,dispatch} = useContext(UserContext);
  // console.log('dispatch',state,dispatch);
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const login = async (e) => {
    try {
      e.preventDefault();
    const { email, password } = userLogin;
    // console.log(email, password);
    let res = await fetch(`${URL}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "true",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    let data = await res.json();

    if (data.message) {
      // localStorage.setItem("userLogin", true);
      console.log(data)
      document.cookie = `user=${data.token};expires=${new Date(Date.now() + 258900000)};path=/;`
      localStorage.setItem('userLogin',data.token)
      navigate("/");
      let timeOut = setTimeout(() => {
        toast.success(data.message);
        alert(data.message);
      }, 1000);
      return () => clearTimeout(timeOut);
    }
    if (data.error || !data) {
      toast.error(data.error);
      console.log(data.error);
    }
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SigninDiv className="container">
        <div className="container2">
          <div className="glassy signin">
            <div className="signin-content">
              <h2>Login</h2>
              <p>Welcome Back Please Login To Your Account</p>

              <form className="form" method="POST" onSubmit={login}>
                <div className="form-control">
                  <label>Email</label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email"
                    value={userLogin.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-control">
                  <label>Password</label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    value={userLogin.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="remember">
                  <NavLink to="/verification">Verification?</NavLink>
                  <NavLink to="/forget">Forget Password?</NavLink>
                </div>
                <button name="signin" id="signin" type="submit">
                  Login
                </button>
              </form>
              <span>
                Don't have an account? <NavLink to="/signup">signup</NavLink>
              </span>
            </div>
          </div>
        </div>
      </SigninDiv>
    </>
  );
}
