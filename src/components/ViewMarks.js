import React, { useEffect, useState } from "react";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { URL } from "../App";

const Wrapper = styled.div`
  background-color: #fff;
  width: 97%;
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem !important;
  font-size: 1.3rem;
  table {
    border-collapse: collapse;
    padding: 1rem;
    width: 100%;

    .table-head {
      background-color: #f7f7f7;
      th:nth-child(2) {
        text-align: end;
      }
    }

    th,
    td {
      padding: 1rem;
      text-align: start;
      border-radius: 0.5rem !important;
      border: 0.1rem solid #f1f1f1;
    }
    tr:hover {
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    overflow-x: auto;
    .container {
      max-width: 50rem;
      margin: 0 auto;
    }
  }
`;

export default function ViewMarks() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const callUSerInfo = async () => {
    let res = await fetch(`${URL}/getUserData`);
    res = await res.json();
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    const tomeOut = setTimeout(() => {
      callUSerInfo();
    }, 300);
    return () => clearTimeout(tomeOut);
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Wrapper className="container ">
        <table>
          <thead className="table-head">
            <tr>
              <th colSpan={5}>Seat Number: {data._id}</th>
              <th>Name: {data.name}</th>
            </tr>

            <tr>
              <th colSpan={6}>profession: {data.profession}</th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Time Taken</th>
              <th>Language</th>
              <th>Total Marks</th>
              <th>Obtained Marks</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data?.answers?.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        {new Date(user.date).toLocaleDateString() +
                          " " +
                          new Date(user.date).toLocaleTimeString()}
                      </td>
                      <td>{user.timeTaken}</td>
                      <td>{user.language}</td>
                      <td>{user.totalMarks}</td>
                      <td>{user.answer}</td>
                      <td>Finished</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </Wrapper>
    </>
  );
}
