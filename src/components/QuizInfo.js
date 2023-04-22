import React, {  } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import toast,{Toaster} from 'react-hot-toast';


const Wrapper = styled.section`
  margin-top: 2rem;
  padding: 1rem;
    div{
       margin-bottom: 1rem;

       &:last-child{
        padding: 1.3rem;
       }

        h2{
        font-size: 2.2rem;
        }
        p{
        margin: .7rem 0;
        }
        button{
        border-radius: 0% !important;
        text-transform: capitalize;
        display: flex ;
        justify-content: center;
        align-items: center;
        gap: .7rem;
        border: 0.1rem solid rgb(98 84 243);
    color: ${({theme})=>theme.colors.blue};
    font-weight: 500;

    &:hover {
      background-color: ${({theme})=>theme.colors.blue};
      color: #fff;
    }
        span{
            font-size: 2rem;
        }
    }
    }
`

export default function QuizInfo() {
    const {language} = useParams();
    const navigate = useNavigate();

    const checkAnswer = async()=>{
      try {
        let res = await fetch('/getAnswers',{
          method:"GET"
        });

        res = await res.json();
        
      let answer = res.some((ans)=> ans.language === language ? true : false)
         if(answer){
          navigate('/viewmarks');
         let timeOut = setTimeout(()=>{
          toast.success('I Have already taken the exam...!')
          },500);
          return ()=>clearTimeout(timeOut)
         }
         console.log('---',answer);
        if(res.language === language){
          navigate('/viewmarks')
        }
      } catch (error) {
        console.log(error)
      }
    }

  

  return (
    <>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
      <Wrapper className='container'>
      
        <div>
        <h2>The Test</h2>
        <p>The test contains 10 questions and there is no time limit.</p>
        <p>The test is not official, it's just a nice way to see how much you know, or don't know, about {language}</p>
        </div>
        <div>
            <h2>Count Your Score</h2>
            <p>You will get 1 point for each correct answer. At the end of the Quiz, your total score will be displayed. Maximum score is 10 points.</p>
        </div>
        <div>
            <h2>Start the Quiz</h2>
            <p>Good luck!</p>
            <NavLink to={`/test/${language}`} >
            <button onClick={checkAnswer}  >Start the {language} Quiz <span> &#8680;</span></button>
            </NavLink>
        </div>
    </Wrapper>
      
    </>
  
  )
}
