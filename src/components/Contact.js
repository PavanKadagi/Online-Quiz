import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaMobile, FaEnvelope, FaAddressBook } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";

const ContactDiv = styled.section`
  .contact {
    display: flex;
    justify-content: space-evenly;
    margin: 3rem 0 6rem 0;

    .width {
      box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
      border-radius: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30%;
      height: 8.5rem;
      gap: 2rem;
    }
    svg {
      /* color: ${({ theme }) => theme.colors.primaryColor}; */
      font-size: 2rem;
    }
    div {
      p:nth-child(1) {
        font-weight: 700;
        margin-bottom: 0.6rem;
      }
    }
  }

  .contect-info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column !important;

    .glassy {
      flex-direction: column !important;
    }
    .contect-center {
      display: flex;
      flex-direction: column;
    }

    .container {
      margin-top: 2.5rem;
      text-align: center;

      .contact-form {
        max-width: 50rem;
        margin: 0 auto;

        input,
        textarea {
          max-width: 50rem;
          font-size: 1.3rem;
          color: ${({ theme }) => theme.colors.textColor};
          padding: 1rem 2rem;
          border: 1px solid ${({ theme }) => theme.colors.primaryColor};
          box-shadow: ${({ theme }) => theme.colors.shadowSupport};
          resize: none;
          background: none;
        }

        .contact-input {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      max-width: 70rem;
      margin: 0 auto;
    }
    .contact {
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .width {
      display: flex;
      justify-content: flex-start;
      width: 70% !important;
      height: 5rem;
    }

    .length {
      font-size: 3rem;
    }
    p {
      font-size: 1.2rem;
    }

    input,
    textarea {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 70%;
    }
  }
`;

export default function Contact() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const navigate = useNavigate();

  const callContactPage = async () => {
    try {
      let res = await fetch(`${URL}/getUserData`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let data = await res.json();
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });
      if (!data.status === 200) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (error) {
      navigate("/signin");
      console.log(error);
    }
  };

  const sendMessage = async (e) => {
    try {
      e.preventDefault();
      const { name, email, phone, message } = userData;
      // console.log("contact", userData);

      let res = await fetch(`${URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      let data = await res.json();

      if (data.message) {
        console.log(data.message);
        toast.success(data.message);
        setUserData({ ...userData, message: "" });
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.log("contact page", error);
    }
  };

  useEffect(() => {
    callContactPage();
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ContactDiv className="container">
        <div className="contact">
          <div className=" width">
            <FaMobile className="length" icon="fa-solid fa-mobile" />
            <div>
              <p>Phone</p>
              <p>+91 9156260067</p>
            </div>
          </div>
          <div className=" width">
            <FaEnvelope className="length" icon="fa-solid fa-envelope" />

            <div>
              <p>Email</p>
              <p>pavankadagi@gmail.com</p>
            </div>
          </div>
          <div className="width">
            <FaAddressBook icon="fa-solid fa-mobile" />
            <div>
              <p>Address</p>
              <p>Pune, MH, India</p>
            </div>
          </div>
        </div>

        <div className="contect-info">
          <div className="glassy contect-center">
            <h2>Get in Touch</h2>
            <div className="container">
              <div className="contact-form">
                <form className="contact-input" method="POST">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    autoComplete="off"
                    readOnly={true}
                    defaultValue={userData.name}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="off"
                    readOnly={true}
                    defaultValue={userData.email}
                  />
                  <input
                    type="number"
                    autoComplete="off"
                    name="phone"
                    id="phone"
                    placeholder="Your Phone Number"
                    readOnly={true}
                    defaultValue={userData.phone}
                  />
                  <textarea
                    name="message"
                    row="6"
                    cols="30"
                    autoComplete="off"
                    required
                    value={userData.message}
                    onChange={(e) =>
                      setUserData({ ...userData, message: e.target.value })
                    }
                  ></textarea>
                  <button type="submit" onClick={sendMessage}>
                    Send message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </ContactDiv>
    </>
  );
}
