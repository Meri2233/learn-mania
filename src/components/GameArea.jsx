import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../apiConfig';
import socket from '../service/socket';
import { setQuizQuestion } from '../slices/QuizQuestions';
import { addScore } from '../slices/ScoreSlice';
import Options from './Options';

let interval;

export default function GameArea() {
    let navigate = useNavigate();

    let { id } = useParams();
    let _id = id.substring(1);
    let array = _id.split('-');

    let dispatch = useDispatch();

    let room = useSelector(state => state.room.number);
    let quizQuestions = useSelector(state => state.quizquestion.quizQuestions);
    
    let [student, setStudent] = useState(null);
    let [currquestion, setcurrquestion] = useState(0);
    let [selectedOption, setSelectedOption] = useState(null);
    let [width, setWidth] = useState(100);
    let [questionNo, setQuestionNo] = useState(1);

    useEffect(() => {
        if (!_id.includes('-')) {
            axiosClient.get('/template/myquestions/:' + _id).then(resp => {
                let questions = resp.data;
                socket.emit('send-question', questions, room)
            });
        }
        else {
            setStudent(array[1]);
        }
        socket.on('questions', (questions) => {
            dispatch(setQuizQuestion(questions));
        })
    }, [])

    useEffect(() => {
        interval = setInterval(() => {
            setWidth((prevwidth) => prevwidth - 2)
        }, 100);
    }, [currquestion])


    socket.on('next-question', () => {
        if (currquestion < quizQuestions.length - 1) {
            let copy = currquestion;
            copy++;
            let copy1 = questionNo;
            copy1++;
            setcurrquestion(copy);
            clearInterval(interval);
            setWidth(100);
            setSelectedOption(null);
            setQuestionNo(copy1);
        }
    })

    socket.on('score', (choiceno, questionno, student, value) => {
        if (room !== null) {
            let obj = {
                student: student,
                choice: choiceno,
                question: questionno,
                value: value
            }
            dispatch(addScore(obj));
        }
    })

    socket.on('see-status', () => {
        navigate(`/status/${id}`);
    })

    function changeQuestion() {
        if (currquestion < quizQuestions.length - 1) {
            socket.emit('change-question', room)
        }
        else {
            socket.emit('status-page', room)
        }
    }

    function highlight(questionindex, choiceindex, event) {
        setSelectedOption(choiceindex);
        if (quizQuestions[questionindex].choices[choiceindex].isCorrect) {
            socket.emit('send-score', parseInt(array[0]), choiceindex, questionindex, student, event.target.innerText)
        }
    }

    return (
        <div className='gamearea'>
            {room !== null ?
                <div className="teacherscreen">
                    <div className="tsection">
                        <h3>Question {questionNo}</h3>
                        {quizQuestions.length !== 0 ?
                            <div className='quizquestion'>
                                <p>{quizQuestions[currquestion].question}</p>
                                {quizQuestions[currquestion].choices.length === 4 ?
                                    <div className="choices">
                                        <div className='choice'><p className='choicenumber'>A</p><p>{quizQuestions[currquestion].choices[0].choice}</p></div>
                                        <div className='choice'><p className='choicenumber'>B</p><p>{quizQuestions[currquestion].choices[1].choice}</p></div>
                                        <div className='choice'><p className='choicenumber'>C</p><p>{quizQuestions[currquestion].choices[2].choice}</p></div>
                                        <div className='choice'><p className='choicenumber'>C</p><p>{quizQuestions[currquestion].choices[3].choice}</p></div>
                                    </div> :
                                    <div className="choices">
                                        <div className='choice'><p className='choicenumber'>A</p><p>{quizQuestions[currquestion].choices[0].choice}</p></div>
                                        <div className='choice'><p className='choicenumber'>B</p><p>{quizQuestions[currquestion].choices[1].choice}</p></div>
                                    </div>
                                }
                            </div> : ""}
                        <button onClick={() => changeQuestion()}>Next</button>
                    </div>
                    <div className="timebox"><div style={{ width: `${width}%` }} className="timebar"></div></div>
                </div> :
                <div className="studentscreen">
                    <div className="ssection">
                        <h3>Question {questionNo}</h3>
                        <p>Choices</p>
                        {quizQuestions.length !== 0 ?
                            <div className='quizquestion'>
                                {quizQuestions[currquestion].choices.length === 4 ?
                                    <div className="choices">
                                        <Options changeColor={highlight} idx={0} value={"A"} currquestion={currquestion} color={selectedOption === 0 ? (quizQuestions[currquestion].choices[0].isCorrect ? "green" : "red") : null} />
                                        <Options changeColor={highlight} idx={1} value={"B"} currquestion={currquestion} color={selectedOption === 1 ? (quizQuestions[currquestion].choices[1].isCorrect ? "green" : "red") : null} />
                                        <Options changeColor={highlight} idx={2} value={"C"} currquestion={currquestion} color={selectedOption === 2 ? (quizQuestions[currquestion].choices[2].isCorrect ? "green" : "red") : null} />
                                        <Options changeColor={highlight} idx={3} value={"D"} currquestion={currquestion} color={selectedOption === 3 ? (quizQuestions[currquestion].choices[3].isCorrect ? "green" : "red") : null} />
                                    </div> :
                                    <div className="choices">
                                        <Options changeColor={highlight} idx={0} value={"A"} currquestion={currquestion} color={selectedOption === 0 ? (quizQuestions[currquestion].choices[0].isCorrect ? "green" : "red") : null} />
                                        <Options changeColor={highlight} idx={1} value={"B"} currquestion={currquestion} color={selectedOption === 1 ? (quizQuestions[currquestion].choices[0].isCorrect ? "green" : "red") : null} />
                                    </div>
                                }
                            </div> : ""
                        }
                    </div>
                    <div className="timebox"><div style={{ width: `${width}%` }} className="timebar"></div></div>
                </div>
            }
        </div>
    )
}
