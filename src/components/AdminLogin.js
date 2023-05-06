import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { theme } from "../styles/Theme";

const SigninDiv = styled.section`
  .signin {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    padding: 2rem;
    border-radius: 1rem;
    margin-top: 2rem;
  }

  h2 {
    text-align: center;
  }
  .signin p {
    margin: 1rem 0 3rem 0;
    font-size: 1.3rem;
    text-align: center;
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
    margin-bottom: 0.5rem;
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
    width: 90%;
    .signin {
      padding: 1rem;
    }
    .container {
      max-width: 50rem;
      margin: 0 auto;
    }
    .form-control input {
    }
    .form {
      margin: 0 auto;
      .form-control input {
      }

      button {
      }
    }
  }
`;

export default function AdminLogin() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserLogin({ ...userLogin, [name]: value });
  };

  const login = async (e) => {
   try {
    e.preventDefault();
    // console.log(userLogin);
    const { email, password } = userLogin;
    let res = await fetch("/admin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    res = await res.json();
    if (res.message) {
      navigate("/admin/home");
      localStorage.setItem("adminLogin", true);
      let timeOut = setTimeout(() => {
        toast.success(res.message);
      }, 500);
      return () => clearTimeout(timeOut);
    }
    if (res.error || !res) {
      toast.error(res.error);
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
          <div className=" signin">
            <div className="signin-content">
              <h2>Login</h2>
              <p>Admin Login To Your Account</p>

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
                <button name="signin" id="signin" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </SigninDiv>
    </>
  );
}
