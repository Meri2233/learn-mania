import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='layout'>
            <div className="header">
                <h3>Learn Mania</h3>
                <Link style={{ textDecoration: 'none' }} to="/login"><button className='signupbutton'>Login</button></Link>
            </div>
            <Outlet />
        </div>
    )
}
