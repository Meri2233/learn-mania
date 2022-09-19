import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import axiosClient from '../apiConfig'
import { addTemplate } from '../slices/TemplateSlice'


export default function Dashboard() {
    return (
        <Outlet/>
    )
}
