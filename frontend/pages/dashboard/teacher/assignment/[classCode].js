import React, { useEffect, useState } from 'react'
import AssignmentComponent from '@/components/teacher/assignment.js'

import { useRouter } from 'next/router'
import axios from 'axios'
import { APIURL } from '@/constants/api'

import Table from '@/components/common/Table'
import { toast } from 'react-toastify'

const Assignment = () => {

    const router = useRouter()

    const [assignments, setAssignments] = useState([])
    const [status, setStatus] = useState({id:null, status: false})

    const [question, setQuestion] = useState("");
    const [solution, setSolution] = useState("");
    const [title, setTitle] = useState("")
    const [testCases, setTestCases] = useState([{ input: "", output: "" }]);

    const addQuestion = (e) => {
        e.preventDefault()
        let classId = localStorage.getItem('classId')
        let temp = {
            title: title,
            question: question,
            answer: solution,
            testCases: testCases,
            classId: classId,
            isCode: true,
            classId: classId
        }
        console.log(temp)
        axios.post(`${APIURL}/codequestions`, {data:temp})
        .then((res) => {
            console.log(res.data)
            toast.success("Question posted successfully")
            router.push('/dashboard/teacher/assignment')
        })
        .catch((err) => {
            console.log(err)
        })
    }

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
        <AssignmentComponent 
            title={title}
            setTitle={setTitle}
            question={question}
            setQuestion={setQuestion}
            solution={solution}
            setSolution={setSolution}
            testCases={testCases}
            setTestCases={setTestCases}
            handleSubmit={addQuestion}

        />
    </div>
  )
}

export default Assignment
