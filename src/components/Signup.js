import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhoneVolume,
  FaLock,
  FaCalendar,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../App";
// import { intialState, reducer, Usercontext } from "../context/ContextAPI";

const SignupDiv = styled.section`
  .signup-img {
    margin: 0 4rem;
  }

  .signup-content {
    margin: 0 4rem;
  }
  h2 {
    text-align: center;
  }
  .signup-img img {
    width: 25rem;
    height: 30rem;
  }

  .signup-content input {
    outline: none;
    font-family: "Lora", serif;
    border: none;
    background: none;
    width: 22rem;
    font-size: 1.5rem;
    font-weight: lighter;
    opacity: 0.9;
    padding: 0.5rem 1rem;
    color: ${({ theme }) => theme.colors.textColor};
  }

  .signup-content select {
    margin-left: 1rem;
    padding: 0.5rem;
  }

  .signup .signup-form-group {
    border-bottom: 0.1rem solid #fff;
    border-bottom: 0.1rem solid ${({ theme }) => theme.colors.mainTextColor};
    margin-bottom: 1.5rem;
  }

  .header {
    margin-bottom: 3rem;
  }

  .signup a {
    font-size: 1.3rem;
  }

  .signup-img a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.mainTextColor};
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .glassy {
      flex-direction: column-reverse !important;
    }
    .container {
      max-width: 70rem;
      margin: 0 auto;
    }
    .signup-img img {
      display: none;
    }
    .signup {
      flex-direction: column-reverse;
    }
    .signup-img a {
      -ms-flex-order: 2;
      margin-top: 2rem;
    }
    .signup-form {
      display: flex;
      flex-direction: column;
    }

    .signup-content {
      -ms-flex-order: 1;
      margin: 0 2rem;
    }
  }
`;

export default function Signup() {
  //  const {state,dispatch} =  useReducer(Usercontext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
    dob: "",
    address: "",
    password: "",
    confirmpassword: "",
  });

  const isEmail = (emailVal) => {
    let atSymbol = emailVal.indexOf("@");
    if (atSymbol < 1) return false;
    let dot = emailVal.lastIndexOf(".");
    //example1 = vi@gm.com for condition true , example2 = vi@.com for condition false
    if (dot <= atSymbol + 2) return false;
    // dot should  be last
    if (dot === emailVal.length - 1) return false;
    return true;
  };

  const setErrorMsg = (errorMsg)=>{
    toast.error(errorMsg);
  } 

  const register = async (e) => {
   try {
    e.preventDefault();
    // console.log(user);
    let { name, email, phone, password, dob, address, profession } = user;
    const nameVal = name.trim();
    const emailVal = email.trim();
    const phoneVal = phone.toString().trim();
    const passwordVal = password.trim();

    if(!name ||
      !email ||
      !phone ||
      !profession ||
      !address ||
      !dob ||
      !password){
        return setErrorMsg("Plz filled the field properly...!")
    }
    else if(nameVal.length <=2){
      return setErrorMsg("name min 3 char");
    }
    else if(!isEmail(emailVal)){
      return setErrorMsg('Not a valid Email');
    }
    else if(phoneVal.length !== 10){
      return setErrorMsg('Phone Number must be 10 digit')
    }
    else if(passwordVal.length < 3){
      return setErrorMsg('Minimum 3 char')
    }

    else if (user.confirmpassword !== user.password) {
      toast.error("Password not match...!");
    } else {
      // const { name, email, phone, profession, dob, address, password } = user;
      console.log(user);
      const res = await fetch(`${URL}/signup`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify({
          nameVal,
          emailVal,
          phoneVal,
          profession,
          dob,
          address,
          passwordVal,
        }),
      });

      const data = await res.json();
      console.log("-------", data);

      if (data.message) {
        navigate("/signin");
        console.log(data.message);
        let timeOut = setTimeout(() => {
          toast.success(data.message);
        }, 2000);
        return () => clearTimeout(timeOut);
      } else {
        toast.error(data.error);
        console.log(data.error);
      }
    }
   } catch (error) {
    console.log(error.message)
   }
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SignupDiv className="container">
        <div className="container2">
          <div className="glassy signup">
            <div className="signup-img">
              <figure>
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
                  alt="signup-img"
                />
              </figure>
              <NavLink to="/signin">I am already register</NavLink>
            </div>

            <div className="signup-content">
              <div className="header">
                <h2>Sign Up</h2>
              </div>
              <form method="POST" className="signup-form">
                <div className="signup-form-group">
                  <label htmlFor="name">
                    <FaUser icon="fa-solid fa-user" />
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={user.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="signup-form-group">
                  <label htmlFor="email">
                    <FaEnvelope icon="fa-solid fa-envelope" />
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="Your Email"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
                <div className="signup-form-group">
                  <label htmlFor="phone">
                    <FaPhoneVolume icon="fa-solid fa-phone-volume" />
                  </label>
                  <input
                    type="number"
                    autoComplete="off"
                    name="phone"
                    id="phone"
                    placeholder="Enter only 10 digit"
                    value={user.phone}
                    onChange={handleInput}
                  />
                </div>

                <div className="signup-form-group">
                  <label htmlFor="profession">
                    <span
                      style={{
                        fontSize: "1.3rem",
                        color: "rgb(142, 141, 138)",
                      }}
                      className="material-symbols-outlined"
                    >
                      work
                    </span>
                  </label>
                  <select
                    autoComplete="off"
                    name="profession"
                    id="profession"
                    value={user.profession}
                    onChange={handleInput}
                    required={true}
                  >
                    <option>Front end developer</option>
                    <option>Back end developer</option>
                    <option>Full stack Developer</option>
                    <option>Mern Developer</option>
                  </select>
                </div>

                <div className="signup-form-group">
                  <label htmlFor="dob">
                    <FaCalendar icon="fa-solid fa-phone-volume" />
                  </label>
                  <input
                    type="date"
                    autoComplete="off"
                    name="dob"
                    id="dob"
                    value={user.dob}
                    onChange={handleInput}
                  />
                </div>

                <div className="signup-form-group">
                  <label htmlFor="address">
                    <span
                      style={{
                        fontSize: "1.5rem",
                        color: "rgb(142, 141, 138)",
                        marginRight: ".2rem",
                      }}
                      className="material-symbols-outlined"
                    >
                      location_on
                    </span>
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="address"
                    id="address"
                    placeholder="Your Address"
                    value={user.address}
                    onChange={handleInput}
                  />
                </div>

                <div className="signup-form-group">
                  <label htmlFor="password">
                    <FaLock icon="fa-solid fa-lock" />
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <div className="signup-form-group">
                  <label htmlFor="confirmpassword">
                    <FaLock icon="fa-solid fa-lock" />
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="Confirm Your Password"
                    value={user.confirmpassword}
                    onChange={handleInput}
                  />
                </div>

                <button
                  type="submit"
                  onClick={register}
                  name="signup"
                  id="signup"
                >
                  register
                </button>
              </form>
            </div>
          </div>
        </div>
      </SignupDiv>
    </>
  );
}
