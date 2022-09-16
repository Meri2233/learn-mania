import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateTemplate from './CreateTemplate'
import Dashboard from './Dashboard'
import Homepage from './Homepage'
import Layout from './Layout'
import Login from './Login'
import Signup from './Signup'

export default function Main() {
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
            <Route index element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/newtemplate' element={<CreateTemplate/>}/>
        </Route>
    </Routes>
  )
}
