import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import avatar from "../assets/profile.png";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
  width: 97%;
  border-radius: 1rem;
  padding: 1rem;
  .about-page {
    display: flex;
    flex-direction: column;

    .form {
      display: grid;
      grid-template-columns: auto auto auto;
      gap: 2.5rem;

      .form-first {
        input[type="file"] {
          display: none;
        }
        img {
          width: 10rem;
          height: 10rem;
          background-color: ${({ theme }) => theme.colors.primaryColor};
          border-radius: 100%;
          margin-bottom: 1.5rem;
          cursor: pointer;
        }
        div {
          border: 0.1rem solid ${({ theme }) => theme.colors.textColor};
          padding: 2rem;
          border-radius: 1rem;
          h6 {
            font-size: 1.7rem !important;
            margin-bottom: 1rem;
          }
          p {
            margin-bottom: 0.6rem !important;
          }
        }
      }

      /*----------------------- second column  ------------------------------  */

      .form-second {
        margin-bottom: 1.8rem;

        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        align-items: center;

        div {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          position: relative;
          h5,
          h6 {
            font-size: 1.8rem !important;
          }
          h6 {
            font-size: 1.4rem !important;
          }
          p {
            margin: 1.3rem 0 3rem 0;
            span {
              font-weight: bolder;
            }
          }
        }

        .user-details {
          border: 0.1rem solid ${({ theme }) => theme.colors.textColor};
          padding: 2rem;
          border-radius: 1rem;
          margin-top: 1.8rem;

          h6 {
            font-size: 1.7rem !important;
            margin-bottom: 1rem;
            text-align: start !important;
          }
          .form-group {
            display: grid;
            grid-template-columns: 15rem 21rem;
            margin-top: 1rem;

            label {
              display: flex;
              justify-self: flex-start;
              align-self: flex-start;
            }
            input {
              border: none;
              outline: none;
              background: none;
              color: ${({ theme }) => theme.colors.textColor};
            }
          }
        }
      }

      /*----------------------- third column  ------------------------------  */

      .form-third {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7rem;
        button {
          border-radius: 2rem;
        }
        .login-activity {
          border: 0.1rem solid ${({ theme }) => theme.colors.textColor};
          padding: 2rem;
          border-radius: 1rem;
          h6 {
            font-size: 1.7rem !important;
            margin-bottom: 1rem;
          }
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
      margin: 0 auto;
      max-width: 80rem;
    }
    .about-page {
      .form {
        grid-template-columns: 1fr;
        gap: 1rem !important;
        .form-first {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .form-second {
          div {
            p {
              margin: 1rem 0;
            }
          }
          .user-details {
            margin: 0;
          }
        }
        .form-third {
          gap: none;
          button {
            position: absolute;
            top: 15%;
            right: 5%;
          }
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      margin: 0 auto;
      max-width: 50rem;
    }
    .about-page {
      .form {
        grid-template-columns: 1fr;
        gap: 1rem !important;
        .form-first {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .form-second {
          .user-details {
            margin: 0;
            .form-group {
              grid-template-columns: 9rem 18rem;
            }
          }
        }
        .form-third {
          gap: none;
          button {
            padding: 1rem;
            position: absolute;
            top: 15%;
            right: 5%;
          }
        }
      }
    }
  }
`;

export default function About() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [myFile, setMyFile] = useState();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      let data = await res.json();
      setUserData(data);
      if (!data.status === 200) {
        const error = new Error(data.error);
        throw error;
      }
    } catch (err) {
      navigate("/signin");
      console.error(err);
    }
  };

  useEffect(() => {
    // let timeOut = setTimeout(()=>{
    callAboutPage();
    // },200)
    // return ()=>clearTimeout(timeOut)
  }, []);

  const updateUserData = async () => {
    try {
      const { _id, name, phone, profession, dob, address } = userData;
      let res = await fetch("/about", {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id,
          name,
          phone,
          profession,
          dob,
          address,
          myFile,
        }),
      });

      let data = await res.json();
      console.log("PATCH", data);
      if (data.status === 400 || !data) {
        toast.error(data.error);
        console.log(data.error);
      } else {
        toast.success(data.message);
        console.log(data.message);
        // navigate('/signin')
        // window.location.reload(true)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setShow(!show);
    if (show) {
      e.target.innerHTML = "Edit Profile";
      updateUserData();
    } else {
      e.target.innerHTML = "Save Profile";
    }
  };

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log("---", value);
    setUserData({ ...userData, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setMyFile(base64);
  };

  // console.log("About page ------------------------------", userData, myFile);

  return (
    <Wrapper className="container container2 about">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className=" about-page">
        <form className="form" method="GET">
          {/* first */}
          <div className="form-first">
            <label htmlFor={show ? "file-upload" : ""}>
              <img src={userData.myFile || avatar} alt="profile" />
            </label>
            <input
              type="file"
              label="Image"
              name="myFile"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              onChange={handleFileUpload}
            />

            <div>
              <h6>Course details</h6>
              <p>Web Developer</p>
              <p>Front End Developer</p>
              <p>Back Developer</p>
              <p>Full Stack Developer</p>
            </div>
          </div>

          {/* second */}
          <div className="form-second">
            <div>
              <h5>{userData.name}</h5>
              <h6>{userData.profession}</h6>
              <p>
                RANKINGS : <span>1/10</span>
              </p>
            </div>

            <div className="user-details">
              <h6>User details</h6>
              <div className="form-group">
                <label htmlFor="id">User Id</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="id"
                  id="id"
                  defaultValue={userData._id}
                  readOnly={true}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="name"
                  id="name"
                  defaultValue={userData.name}
                  readOnly={show ? false : true}
                  onChange={handleInput}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  defaultValue={userData.email}
                  readOnly={true}
                />
              </div>

              {/* date  */}
              <div className="form-group">
                <label htmlFor="dob">DOB</label>
                <input
                  type={show ? "date" : "text"}
                  autoComplete="off"
                  name="dob"
                  id="dob"
                  defaultValue={userData.dob}
                  readOnly={show ? false : true}
                  onChange={handleInput}
                />
              </div>

              {/*  */}
              <div className="form-group">
                <label htmlFor="number">Phone</label>
                <input
                  type="number"
                  autoComplete="off"
                  name="phone"
                  id="phone"
                  defaultValue={userData.phone}
                  readOnly={show ? false : true}
                  onChange={handleInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="profession">Profession</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="profession"
                  id="profession"
                  defaultValue={userData.profession}
                  readOnly={show ? false : true}
                  onChange={handleInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  autoComplete="off"
                  name="address"
                  id="address"
                  defaultValue={userData.address}
                  readOnly={show ? false : true}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          {/* third */}
          <div className="form-third">
            <button type="submit" name="btnAddMore" onClick={handleEdit}>
              Edit Profile
            </button>
            <div>
              <div className="login-activity">
                <h6>Login activity</h6>
                <h6>First access to site</h6>
                <p>
                  {new Date(userData.date).toLocaleDateString() +
                    " " +
                    new Date(userData.date).toLocaleTimeString()}
                </p>

                <br />
                <hr />
                <br />
                <h6>Last access to site</h6>
                <p>
                  {new Date(userData.updatedAt).toLocaleDateString() +
                    " " +
                    new Date(userData.updatedAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
