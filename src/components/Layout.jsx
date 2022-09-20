import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
let prevevent;

export default function Layout() {
    let accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    let navigate = useNavigate()

    function logout(e) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        navigate('/')
    }
    function changeColor(e) {
        if (prevevent !== undefined) {
            prevevent.style.backgroundColor = "transparent";
            prevevent.style.color = "rgb(62, 218, 130)";
        }
        e.target.style.backgroundColor = "rgb(62, 218, 130)";
        e.target.style.color = "black";
        prevevent = e.target
    }

    return (
        <div className='layout'>
            <div className="header">
                <h3>QuizUp</h3>
                {accessToken !== null ?
                    <div className="dashboarditems">
                        <div className="items">
                            <Link style={{ textDecoration: 'none' }} to="/dashboard"><button onClick={(e) => changeColor(e)} className='myquizzes'>My Quizzes</button></Link>
                            <Link style={{ textDecoration: 'none' }} to="/dashboard/reports"><button onClick={(e) => changeColor(e)} className='myreports'>My Reports</button></Link>
                        </div>
                        <button onClick={(e) => logout(e)} className='logout'>Logout</button>
                    </div>
                    : ""
                }
            </div>
            <Outlet />
        </div>
    )
}
