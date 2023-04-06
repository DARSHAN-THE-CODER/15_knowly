import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { APIURL } from '@/constants/api'
import { toast } from 'react-toastify'

import Landing from '@/components/editor/components/Landing'

function CodeQuestions() {

    const [questions, setQuestions] = useState([])

    const [code,setCode] = useState();

    const [data, setData] = useState({

    })
    const [status, setStatus] = useState(false)

    useEffect(() => {
        let classCode = localStorage.getItem('classCode')
        let classId = localStorage.getItem('classId')
        axios.get(`${APIURL}/codeQuestions/class/${classId}`)
            .then((res) => {
                console.log(res.data.questions)
                setQuestions(res.data.questions)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Failed to fetch data")
            })
    }, [])

    const handleOnClick = (question) => {
        console.log(question)
        setData(question)
        setStatus(true)
    }

    return (
        <div className='h-screen'>
            {
                !status ? (<div className='flex flex-wrap w-full justify-evenly m-auto items-center mt-[40px]'>
                    {
                        questions?.map((question, index) => (
                            <div class="card bg-gray-200 p-4 rounded-xl cursor-pointer">
                                <div class="text-center w-full text-black">
                                    {/* <span class="icon">
                                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clip-rule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" fill-rule="evenodd"></path>
                                </svg>
                            </span> */}
                                    <p class="">{question.title}</p>
                                </div>

                                {/* <p class="message">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam ea quo unde
                            vel adipisci blanditiis voluptates eum. Nam, cum minima?
                        </p> */}

                                <div class="actions">
                                    <button
                                        // disabled={disabled}
                                        className="px-3 py-1 text-white bg-blue-500 rounded"
                                        onClick={() => handleOnClick(question)}
                                    >
                                        Solve question
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>) : (
                    <div className='flex flex-col'>
                        <div class="actions">
                                    <button
                                        // disabled={disabled}
                                        className="px-3 py-1 text-white bg-blue-500 rounded ml-4"
                                        onClick={() => setStatus(false)}
                                    >
                                       Back
                                    </button>
                        </div>
                        <Landing code={code} setCode={setCode} question={data.question} title={data.title}/>
                    </div>
                )
            }
        </div>
    )
}

export default CodeQuestions