import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className='dashboard'>
            <div className="newtemplate">
                <Link style={{ textDecoration: 'none' }} to='/newtemplate'><p>Create Template</p></Link>
            </div>
        </div>
    )
}
