import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { URL } from "../App";

const AdminDiv = styled.section`
  nav {
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 5rem;

    a {
      font-size: 1.3rem;
    }
  }

  table {
    background-color: #fff;
    width: 97%;
    box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem !important;
    border-collapse: collapse;
    padding: 1rem;
    font-size: 1.3rem;
    margin: 3rem auto;

    .table-head {
      background-color: #f7f7f7;
      th:nth-child(2) {
        text-align: end;
      }
    }

    th,
    td {
      padding: 1rem !important;
      text-align: start;
      border-radius: 0.5rem !important;
      border: 0.1rem solid #f1f1f1;
    }
    tr:hover {
      box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 840px) {
    div {
      overflow-x: auto;
    }
    nav {
      padding: 1rem 2rem;
    }
    table {
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
  }
`;

export default function AdminHome() {
  const [data, setData] = useState([]);
  const callAllUserData = async () => {
    let res = await fetch(`${URL}/admin/home`);
    res = await res.json();
    setData(res);
  };
  useEffect(() => {
    callAllUserData();
  }, []);
  console.log(data);
  return (
    <AdminDiv>
      <nav>
        <h1>Admin</h1>
        <NavLink to="/admin/logout">Logout</NavLink>
      </nav>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Dob</th>
              <th>Verified</th>
              <th>Test Taken</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.dob}</td>
                  <td>{user.is_verified ? "Verified" : "Not Verified"}</td>
                  <td>
                    <table>
                      <thead>
                        <tr>
                          <th>Time Taken</th>
                          <th>Language</th>
                          <th>Total Marks</th>
                          <th>Obtained Marks</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user?.answers?.map((list) => {
                          return (
                            <tr key={list._id}>
                              <td>{list.timeTaken}</td>
                              <td>{list.language}</td>
                              <td>10</td>
                              <td>{list.answer}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminDiv>
  );
}
