import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { URL } from "../App";

const VerifyPassword = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export default function EmailVerifyed() {
  const navigate = useNavigate();
  const [id, setId] = useSearchParams("");
  const newId = id.get("id");

  const verifyMail = async () => {
    try {
      let res = await fetch(`${URL}/verify?id=${newId}`,
      //  {
      //   method: "PATCH",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     id: newId,
      //   }),
      // }
      );
      //  res = await fetch('/verify');
      res = await res.json()
      if (res.error) {
        navigate("/");
      }
      if(res.message){
        alert(res.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    let timeOut = setTimeout(() => {
      verifyMail();
    }, 300);
    return () => clearTimeout(timeOut);
  }, []);
  return (
    <VerifyPassword>
      {/* <h1>Your email has been verified...!</h1> */}
      <button onClick={() => navigate("/signin")}>Go To Login</button>
    </VerifyPassword>
  );
}
