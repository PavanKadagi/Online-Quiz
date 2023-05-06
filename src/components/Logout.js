import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../App";

export default function Logout() {
  const navigate = useNavigate();

  const callLogoutPage = async () => {
    try {
      let res = await fetch(`${URL}/logout`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      // dispatch({type:'USER',payload:false})
      // alert(data.message)
      if (data.message) {
        localStorage.clear();
        navigate("/signin");
        let timeOut = setTimeout(() => {
          toast.success(data.message);
        }, 500);
        return () => clearTimeout(timeOut);
      }
      if (data.error) {
        navigate("/");
      }
    } catch (error) {
      console.log("logout page", error);
    }
  };

  useEffect(() => {
    callLogoutPage();
  }, []);

  return <Toaster position="top-center" reverseOrder={false} />;
}
