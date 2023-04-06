import React, { useState, useEffect, use } from 'react'

import axios from 'axios'

import { APIURL } from '@/constants/api'

import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Table from '@/components/common/Table'

function StudentDashboard() {

    const router = useRouter()

    const [classes, setClasses] = useState([])

    let headers = [
        {
            id: "Id",
            name: "Class Name",
            classCode: "Class Code"
        }
    ]

    useEffect(() => {
        axios.get(`${APIURL}/classes/student/${localStorage.getItem('knowlyuserid')}`)
        .then((res) => {
            console.log(res.data.classes)
            setClasses(res.data.classes)
        })
        .catch((err) => {
            console.log(err)
        })
    },[])

    const handleSpecialCase = (row) => {
        console.log(row)
        localStorage.setItem('classCode', row.classCode)
        localStorage.setItem('classId', row.id)
        router.push(`/dashboard/student/assignment`)
    }

  return (
    <div className='h-screen'>
        <Table headers={headers} data={classes} viewBtn={"View class"} routePath={"upload"} user={"student"}  handleSpecialCase={ handleSpecialCase } />
    </div>
  )
}

export default StudentDashboard