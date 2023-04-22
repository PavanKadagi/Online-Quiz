import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import LoadingPage from "./LoadingPage";
import toast, { Toaster } from "react-hot-toast";
import { URL } from "../App";

const Wrapper = styled.section`
  box-shadow: 0 0.1rem 0.2rem rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  padding: 2rem;
  font-size: 1.3rem;
  width: 95%;
  margin: 2rem auto !important;
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .header-left {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      p {
        font-size: 1.3rem;
        font-weight: 500;
        b {
          margin-left: 1rem;
        }
      }
    }

    .header-middle {
      display: flex;
      justify-content: center;
      align-items: center;
      .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        svg {
          /* object-fit: contain; */
          height: 3rem;
          width: 3rem;
          cursor: pointer;
          opacity: 0.7;
          color: ${({ theme }) => theme.colors.blue};
          /* padding: 1rem; */
          /* border: .1rem solid black; */
          /* border-radius: 50%; */
        }
        span {
          /* display: block !important; */
          /* background-color: ${({ theme }) => theme.colors.blue}; */
          cursor: pointer;
          /* float: left; */
          /* margin-left: 2rem; */
          /* padding: 1rem; */
          text-align: center;
          padding: 0.4rem 0.8rem;
          border: 0.1rem solid black;
          border-radius: 50%;
        }
      }
    }
    .header-last {
      font-size: 2rem;
      font-weight: 600;
    }
  }
  .line {
    margin-top: 2rem;
    opacity: 0.7;
    border: 0.1rem solid ${({ theme }) => theme.colors.blue};
  }

  .que {
    /* color: black; */
    /* opacity: .3; */
    padding: 0.7rem;
    /* margin: .1rem 0 1rem 0; */
    margin-bottom: 1rem;
    background-color: ${({ theme }) => theme.colors.blueLight};
  }
  .quiz {
    display: grid;
    grid-template-columns: 60% 40%;
    gap: 2rem;
    p {
      font-size: 1.3rem;
      font-weight: 500;
      opacity: 1;
    }

    aside {
      p {
        margin: 1rem 0;
      }
      .quiz-options {
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        gap: 2rem;
        height: 25rem;
        border-bottom: 0.6rem solid #f1f1f1;

        .quiz-options-row {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 1rem;

          label {
            cursor: pointer;
            font-size: 1.3rem;
          }
          /*  */
          input[type="radio"] {
            cursor: pointer;

            font: inherit;
            background-color: ${({ theme }) => theme.colors.blue};
            color: ${({ theme }) => theme.colors.blue};
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
          }

          input[type="radio"]:focus {
            /* outline: max(2px, 0.15rem) solid white; */
            /* outline-offset: max(2px, 0.15rem); */
          }
        }
      }

      .align-btn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;

        .align-btn-left {
        }
        .align-btn-rigth {
        }
        .align-btn-submit {
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    padding: 1rem;
    .container {
      margin: 0 auto;
      max-width: 70rem;
    }

    header {
      .header-left {
        b {
          margin-left: none !important;
        }
      }
      .header-middle {
        display: block !important;
        .pagination {
          display: flex !important;
          gap: 1rem;
          svg {
            height: 2.2rem;
            width: 2.2rem;
          }
          span {
            padding: 0.25rem 0.5rem;
          }
        }
      }
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 1rem !important;
    html {
      font-size: 50% !important;
    }
    .container {
      margin: 0 auto;
      max-width: 50rem;
    }
    header {
      flex-direction: column;
      gap: 0.7rem;

      .header-middle {
        display: block !important;
        .pagination {
          display: flex !important;
          gap: 1rem;
          svg {
            height: 2rem;
            width: 2rem;
          }
          span {
            padding: 0.1rem 0.3rem;
          }
        }
      }
    }
    .quiz {
      grid-template-columns: auto;
      gap: 1rem;
    }
    aside {
      .quiz-options {
        gap: 1.5rem !important;
      }
    }
  }
`;

export default function QuizQues() {
  const { language } = useParams();
  // console.log(language)
  const [data, setData] = useState([]);
  const [selectAns, setSelectAns] = useState("");
  let [ans, setAns] = useState(new Array(10));
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  let [seconds, setSeconds] = useState(0);
  let [minutes, setMinutes] = useState(0);

  let timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);

      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(timer);
  });

  let page = searchParam.get("page") || 1;
  const limit = searchParam.get("limit") || 1;

  const callTestPage = async () => {
    try {
      let res = await fetch(`${URL}/test/${language}page=${page}&limit=${limit}`, {
        method: "GET",
      });
      res = await res.json();
      console.log(res.data);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      navigate("/signin");
      console.log("error", error);
    }
  };

  useEffect(() => {
    // debouncing
    let timeOut = setTimeout(() => {
      callTestPage();
    }, 100);
    return () => clearTimeout(timeOut);
  }, [searchParam]);

  const handleInput = (e) => {
    setSelectAns(e.target.value);
    if (data[0]?.answer === e.target.value) {
      ans.splice(page - 1, 1, true);
    } else {
      ans.splice(page - 1, 1, false);
    }
    console.log(ans);
    setAns(ans);
    let span = document.getElementsByTagName("span");
    span[page - 1].style.background = "rgba(0,255,0,0.4)";
  };

  const next = () => {
    if (page == 10) {
      page = 0;
    }
    setSearchParam({ page: Number(page) + 1, limit: 1 });
    console.log("page", page);
  };

  const prev = () => {
    if (page > 1) {
      setSearchParam({ page: Number(page) - 1, limit: 1 });
    }
  };

  const pagination = (e) => {
    setSearchParam({ page: e.target.innerText, limit: 1 });
  };

  const Submit = async (e) => {
    let timeTaken = `${minutes}m : ${seconds}s`;
    let text = "Are you want to submit the test?";
    if (window.confirm(text)) {
      let answer = ans.filter((item) => item === true).length;
      let data = await fetch(`${URL}/answer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          answer,
          language,
          timeTaken,
        }),
      });
      data = await data.json();
      if (data.message) {
        toast(data.message);
        navigate("/viewmarks");
      }
      console.log("submit", data);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loading ? (
        <LoadingPage />
      ) : (
        <Wrapper className="container ">
          <div>
            <header>
              <div className="header-left">
                <p>
                  Section <strong>1</strong> of 1 | <b>{language}</b>
                </p>
              </div>
              <div className="header-middle">
                <div className="pagination">
                  <svg
                    onClick={prev}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                    />
                  </svg>
                  <span onClick={pagination}>1</span>
                  <span onClick={pagination}>2</span>
                  <span onClick={pagination}>3</span>
                  <span onClick={pagination}>4</span>
                  <span onClick={pagination}>5</span>
                  <span onClick={pagination}>6</span>
                  <span onClick={pagination}>7</span>
                  <span onClick={pagination}>8</span>
                  <span onClick={pagination}>9</span>
                  <span onClick={pagination}>10</span>
                  <svg
                    onClick={next}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right-circle"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="header-last">
                {minutes < 10 ? "0" + minutes : minutes} :{" "}
                {seconds < 10 ? "0" + seconds : seconds}
              </h4>
            </header>
            <div className="line"></div>
            {
              data ?
              data.map((ques, index) => (
              <div key={index} className="quiz">
                <div>
                  <p className="que">Question: {page + " of " + 10}</p>
                  <article>
                    <p>{ques.question}</p>
                  </article>
                </div>

                <aside>
                  <p>Choose the correct option</p>
                  <div className="quiz-options">
                    <div className="quiz-options-row">
                      <input
                        type="radio"
                        checked={selectAns === ques.option1}
                        value={ques.option1}
                        id="option1"
                        name="options"
                        onChange={handleInput}
                      />
                      <label htmlFor="option1">{ques.option1}</label>
                    </div>
                    {/* second row  */}
                    <div className="quiz-options-row">
                      <input
                        type="radio"
                        checked={selectAns === ques.option2}
                        value={ques.option2}
                        id="option2"
                        name="options"
                        onChange={handleInput}
                      />
                      <label htmlFor="option2">{ques.option2}</label>
                    </div>

                    {/* second row */}

                    <div className="quiz-options-row">
                      <input
                        type="radio"
                        checked={selectAns === ques.option3}
                        value={ques.option3}
                        id="option3"
                        name="options"
                        onChange={handleInput}
                      />
                      <label htmlFor="option3">{ques.option3}</label>
                    </div>
                    {/* 2 */}
                    <div className="quiz-options-row">
                      <input
                        type="radio"
                        checked={selectAns === ques.option4}
                        id="option4"
                        value={ques.option4}
                        name="options"
                        onChange={handleInput}
                      />
                      <label htmlFor="option4">{ques.option4}</label>
                    </div>
                  </div>

                  <div className="align-btn">
                    {page > 1 ? (
                      <button className="align-btn-left" onClick={prev}>
                        Prev
                      </button>
                    ) : null}
                    {Number(page) === 10 ? (
                      <button className="align-btn-submit" onClick={Submit}>
                        Submit
                      </button>
                    ) : (
                      <button className="align-btn-rigth" onClick={next}>
                        Next
                      </button>
                    )}
                  </div>
                </aside>
              </div>
            ))
            : <h2>No data</h2>
            }
          </div>
        </Wrapper>
      )}
    </>
  );
}
