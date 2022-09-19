import React from 'react'
import { Link } from 'react-router-dom'

export default function Homepage() {
  return (
    <div className='homepage'>
      <div className="section">
        <Link style={{ textDecoration: 'none' ,color:"black"}} to='/login'><div className="teachersection">
          <div className="blank">
            <div className="image">
              <img className='teacher' src="./images/user.png" alt="teacher" />
            </div>
          </div>
          <h3 className='homepagebutton'>Teacher</h3>
        </div></Link>
        <Link style={{ textDecoration: 'none',color:"black" }} to='/play'><div className="studentsection">
          <div className="blank">
            <div className="image">
              <img className='student' src="./images/open-book.png" alt="book" />
            </div>
          </div>
          <h3 className='homepagebutton'>Student</h3>
        </div></Link>
      </div>

    </div>
  )
}
