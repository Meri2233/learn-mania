import React from 'react'

export default function Options(props) {
    return (
        <div onClick={(e) => props.changeColor(props.currquestion, props.idx, e)} style={{ backgroundColor: props.color }} className='choicestudent'><p>{props.value}</p></div>
    )
}
