import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import CreateTemplate from './CreateTemplate'
import Dashboard from './Dashboard'
import Game from './Game'
import Homepage from './Homepage'
import Layout from './Layout'
import Login from './Login'
import Play from './Play'
import Question from './Question'
import Signup from './Signup'
import Template from './Template'
import GameArea from './GameArea'
import Reports from './Reports'
import Quiz from './Quiz'
import { useEffect } from 'react'
import Status from './Status'

export default function Main() {
  let accessToken = localStorage.getItem('access_token');
  let navigate = useNavigate();

  useEffect(() => {
    /*if (accessToken !== "undefined" || accessToken === undefined) {
      navigate('/dashboard');
    }
    else {
      navigate('/');
    }*/
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={<Quiz />} />
          <Route path='/dashboard/reports' element={<Reports />} />
        </Route>
        <Route path='/newtemplate' element={<CreateTemplate />} />
        <Route path='/questions/:id' element={<Template />} />
        <Route path='/play' element={<Play />} />
        <Route path='/addquestion' element={<Question />} />
        <Route path='/game/:id' element={<Game />} />
        <Route path='/gamearea/:id' element={<GameArea />} />
        <Route path='/status/:id' element={<Status />} />
      </Route>
    </Routes>
  )
}
