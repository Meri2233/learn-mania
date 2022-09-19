import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import axiosClient from '../apiConfig';
import { addQuestion } from '../slices/QuestionSlice';

export default function Template() {
  let { id } = useParams();

  let dispatch = useDispatch();
  let [choice, setChoice] = useState(null)
  let questions = useSelector(state => state.question.questions)
  console.log(questions);

  useEffect(() => {
    axiosClient.get("/template/myquestions/" + id.substring(1)).then(resp => {
      let questions = resp.data;
      console.log(questions);
      for (let i = 0; i < questions.length; i++) {
        dispatch(addQuestion(questions[i]));
      }
    }).catch((err) => console.log(err));
  }, [])

  function addNewQuestion(e) {
    let data = new FormData(e.target);
    let addQuestionEl = document.querySelector(".newquestion");

    axiosClient({
      method: 'post',
      url: `/template/addquestion/${id}`,
      data: data
    }).then((response) => console.log(response))
      .catch((error) => console.log(error))

    addQuestionEl.style.display = "none";
  }

  function editTemplate(e) {
    let addQuestionEl = document.querySelector(".newquestion")
    console.log("Clicked")
    console.log(addQuestionEl);
    addQuestionEl.style.display = "flex";
  }
  return (
    <div className='questions'>
      <div className="listquestions">

      </div>
      <button onClick={(e) => editTemplate(e)}>Add Question</button>
      <div className="newquestion">
        <form className='form' onSubmit={(e) => {
          e.preventDefault();
          addNewQuestion(e)
        }}>
          <div className="formsectionquestion">
            <label htmlFor="questiontype">What is your question type?</label>
            <select onChange={(e) => {
              if (e.target.value === "multiple") {
                setChoice("multiple")
              }
              else {
                setChoice("true/false")
              }
            }} name="questiontype" id="questiontype">
              <option value="null"></option>
              <option value="multiple">Multiple Choice</option>
              <option value="true/false">True/False</option>
            </select>
          </div>

          {choice === "multiple" ?
            <div className='innersection'>
              <div className="formsectionquestion">
                <label htmlFor="question">Question</label><br />
                <input type="text" name="question" id="question" />
              </div>
              <div className="formsectionquestion">
                <label htmlFor="choice">Write down your options and choose correct one</label>
                <input type="checkbox" name='choice1' id='choice1' /><input type="text" name='value1' className='value1 value' /><input type="checkbox" name='choice2' id='choice2' /><input type="text" name='value2' className='value2 value' />
                <input type="checkbox" name='choice3' id='choice3' /><input type="text" name='value3' className='value3 value' /><input type="checkbox" name='choice4' id='choice4' /><input type="text" name='value4' className='value4 value' />
              </div>
            </div>
            : null
          }
          {choice === "true/false" ?
            <div className='innersection'>
              <div className="formsectionquestion">
                <label htmlFor="question">Question</label><br />
                <input type="text" name="question" id="question" />
              </div>
              <div className="formsectionquestion">
                <label htmlFor="choice">Choose the correct one</label>
                <input type="checkbox" name='choice1' id='choice11' value="true" /> <p>True</p>
                <input type="checkbox" name='choice2' id='choice22' value="false" /> <p>False</p>
              </div>
            </div>
            : null
          }
          <button type='submit' className='questionsubmit'>Add</button>
        </form>

      </div>
    </div>
  )
}
