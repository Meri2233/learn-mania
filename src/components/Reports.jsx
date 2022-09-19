import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { addReport } from '../slices/ReportSlice';

export default function Reports() {
    let dispatch = useDispatch();

    useEffect(() => {
        axiosClient.get('/report/list').then(resp => {
            let reports = resp.data;
            for (let i = 0; i < reports.length; i++) {
                dispatch(addReport(reports[i]));
            }
        }).catch((e) => console.log(e.message))
    }, [])

    return (
        <div>Reports</div>
    )
}
