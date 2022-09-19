import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../service/socket';
import { setNumber } from '../slices/RoomNoSlice';
import { addStudent } from '../slices/StudentSlice';

export default function Game() {

    let { id } = useParams();
    let _id = id.substring(1);

    let [students, setStudents] = useState([]);
    let pin = useSelector(state => state.room.number);
    
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(() => {
        if (_id.includes("-")) {
            let value = _id.split('-');
            let room = value[0];
            let student = value[1]
            socket.emit('join-room', room)
            socket.emit('send-name', student, room)
        }
        else {
            socket.emit('create-room', Math.floor(Math.random() * 10000));
            socket.on('room-code', (room) => {
                console.log(room);
                dispatch(setNumber(room));
            })
        }
    }, []);

    socket.on('name', (student, room) => {
        let copy = [...students];
        if (!copy.includes(student)) {
            copy.push(student);
            setStudents(copy);
            dispatch(addStudent(student));
        }
    })

    socket.on('start-game', () => {
        navigate(`/gamearea/:${_id}`)
    })

    function startGame(pin) {
        socket.emit('navigate', pin);
    }

    return (
        <div className='game'>
            {pin !== null ?
                <div className="gameteacher">
                    <div className="gameteachersection">
                        <div className="liststudents">
                            {students.map((el, index) => <p key={index}>{el}</p>)}
                        </div>
                        <div className="gamestart">
                            <p>Game Pin: {pin} </p>
                        </div>
                    </div>
                    <button onClick={(e) => startGame(pin)}>Start Game</button>
                </div>
                :
                <div className="gamestudent">
                    Waiting for teacher to start game
                </div>
            }
        </div>
    )
}
