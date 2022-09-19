import React from 'react'
import { useNavigate } from 'react-router-dom';
import axiosClient from '../apiConfig';

export default function CreateTemplate() {
    let navigate = useNavigate();

    let createTemplate = (e) => {
        let data = new FormData(e.target);
        let title = data.get('title');
        let description = data.get('description');

        axiosClient({
            method: 'post',
            url: '/template/createnew',
            data: {
                title: title,
                description: description
            }
        }).then((response) => {
            console.log(response)
            navigate('/dashboard')
        })
            .catch((error) => console.log(error))
    }
    return (
        <div className='createtemplate'>
            <h1>Create Template</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                createTemplate(e)
            }}>
                <label htmlFor="title">Title</label>
                <input type="text" name='title' id='title' />
                <label htmlFor="description">Description</label>
                <input type="text" name='description' id='description' />
                <button type='submit'>Create</button>
            </form>
        </div>
    )
}
