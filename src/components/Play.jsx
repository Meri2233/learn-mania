import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Play() {
  let navigate = useNavigate();

  function enterGame(e) {
    let value = document.querySelector('#pin').value
    let name = document.querySelector('#name').value
    navigate(`/game/:${value}-${name}`)
  }

  return (
    <div className='play'>
      <div className="playsection">
        <label htmlFor='pin'><h3>Enter the Room Pin</h3></label>
        <input type="text" name="pin" id="pin" />
        <label htmlFor="name"><h3>Enter your Name</h3></label>
        <input type="name" name="name" id="name" />
        <p className='playtext'>Click to Play</p>
        <button className='loginsubmit' onClick={(e) => enterGame(e)}>Enter</button>
      </div>
    </div>
  )
}
