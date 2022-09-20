import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import axiosClient from '../apiConfig'
import { addTemplate } from '../slices/TemplateSlice'


export default function Quiz() {
    let dispatch = useDispatch();
    let data = useSelector(state => state.template.templates)

    useEffect(() => {
        axiosClient.get('/template/mylist').then(resp => {
            let templates = resp.data;
            for (let i = 0; i < templates.length; i++) {
                dispatch(addTemplate(templates[i]));
            }
        });
    }, [])

    return (
        <div className='dashboard'>
            <div className="templates">
                {data.map((el, index) =>
                    <div key={index} className="template">
                        <div className="contentsection">
                            <h4>{el.title}</h4>
                            <p>{el.description}</p>
                            <div><p>Last edited: {el.editedAt.substring(0,10)}</p></div>
                        </div>
                        <div className="buttonssection">
                            <button className="delete">x</button>
                            <button ><Link style={{ textDecoration: 'none', color: "white" }} to={`/questions/:${el._id}`}>Edit</Link></button>
                            <button><Link style={{ textDecoration: 'none', color: "white" }} to={`/game/:${el._id}`}>Start</Link></button>
                        </div>
                    </div>
                )}
            </div>
            <div className="newtemplate">
                <div><Link style={{ textDecoration: 'none', color: "black" }} to='/newtemplate'><p>Create Template</p></Link></div>
            </div>
        </div>
    )
}
