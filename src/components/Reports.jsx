import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../apiConfig';
import { addReport } from '../slices/ReportSlice';

export default function Reports() {
    let dispatch = useDispatch();
    let reports = useSelector(state => state.report.reports)

    useEffect(() => {
        axiosClient.get('/report/list').then(resp => {
            let reports = resp.data;
            console.log(reports);
            for (let i = 0; i < reports.length; i++) {
                dispatch(addReport(reports[i]));
            }
        }).catch((e) => console.log(e.message))
    }, [])

    return (
        <div className='reportsection'>
            <div className='reports'>
                {reports.map((el, index) =>
                    <div key={index} className="report">
                        <div className="uppersection">
                            <h4>{el.title}</h4>
                            <p>Played At: {el.createdAt.substring(0,10)}</p>
                        </div>
                        <div className="lowersection">
                            <p>Total Students: {el.students.length}</p>
                            <p>Winner: {el.winner}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
