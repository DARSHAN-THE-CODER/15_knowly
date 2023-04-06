import React, { useEffect, useState } from 'react'
import AssignmentComponent from '@/components/teacher/assignment.js'

import { useRouter } from 'next/router'
import axios from 'axios'
import { APIURL } from '@/constants/api'

import Table from '@/components/common/Table'

const Assignment = () => {

    const router = useRouter()

    const [assignments, setAssignments] = useState([])
    const [status, setStatus] = useState({id:null, status: false})

    const headers = [
        {
            id: "Id",
            title: "Title",
        }
    ]

    useEffect(() => {
        const { classCode } = router.query
        console.log(classCode)
        axios.get(`${APIURL}/codequestions`)
        .then((res) => {
            console.log(res.data)
            setAssignments(res.data)
        })
        .catch((err) => {
            console.log(err)
        }
        )
    },[])
  return (
    <div className='h-screen'>
        <AssignmentComponent />
    </div>
  )
}

export default Assignment
