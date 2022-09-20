import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../apiConfig';
import socket from '../service/socket';

export default function Status() {
  let { id } = useParams();
  let _id = id.substring(1);

  let [result, setResult] = useState([]);
  let [winner, setWinner] = useState(null);
  let [title, setTitle] = useState(null);

  let scores = useSelector(state => state.score.score);
  let student = useSelector(state => state.student.students)
  let room = useSelector(state => state.room.number);

  useEffect(() => {
    if (!_id.includes('-')) {
      axiosClient.get('/template/myquestions/:' + _id).then(resp => {
        let totalquestions = resp.data.length;
        let data = [];
        let winner;
        let p;

        for (let i = 0; i < student.length; i++) {
          let obj = {
            student: student[i],
            count: 0
          }
          for (let j = 0; j < scores.length; j++) {
            if (scores[j].student === student[i]) {
              obj.count++;
            }
          }

          let percent = (obj.count / totalquestions) * 100;
          obj.percent = percent;
          if (p === undefined) {
            p = percent;
            winner = obj.student;
          }
          else if (p < percent) {
            p = percent;
            winner = obj.student;
          }
          data.push(obj);

        }

        socket.emit('send-winner-details', room, data, winner)
      });

      axiosClient.get(`/template/detail/:${_id}`).then(resp => {
        let template = resp.data;
        setTitle(template.title);
      });

      axiosClient({
        method: 'post',
        url: '/report/add',
        data: {
          title: title,
          students: student,
          scores: scores,
          winner: winner
        }
      }).then((response) => {
        console.log(response)
      })
        .catch((error) => console.log(error))
    }
  }, [])

  socket.on('winner-details', (data, winner) => {
    setResult(data);
    setWinner(winner);
  })

  return (
    <div className='score'>
      {room !== null ?
        <div className='scorepageteacher'>
          <h3>{winner} won</h3>
          <div className="scorebar">
            <div className="barbox">
              {result.map(el =>
                <div className='bar' style={{ height: `${el.percent}px` }}>
                </div>
              )}
            </div>
            <div className="studentname">
              {result.map(el =>
                <p>{el.student}</p>
              )}
            </div>
          </div>
          <button className='goback'><Link style={{ textDecoration: 'none' }} to="/dashboard">Go Back</Link></button>
        </div> :
        <div className='scorepagestudent'>
          <h3>{winner} won</h3>
          <div className="scorebar">
            <div className="barbox">
              {result.map(el =>
                <div className='bar' style={{ height: `${el.percent}px` }}>
                </div>
              )}
            </div>
            <div className="studentname">
              {result.map(el =>
                <p>{el.student}</p>
              )}
            </div>
          </div>
          <button className='goback'><Link style={{ textDecoration: 'none' }} to="/">Go Back</Link></button>
        </div>
      }
    </div>
  )
}
