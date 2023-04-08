import React, { useEffect, useState } from 'react'
// import { useSpeechRecognition } from 'react-speech-kit';

import dynamic from 'next/dynamic'

// const Speechto = dynamic(() => import('react-hook-speech-to-text'), { ssr: false })
// import useSpeechToText from "react-hook-speech-to-text"

import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs"
import io from 'socket.io-client'
import { useRouter } from 'next/router'
import { useSpeechRecognition } from 'react-speech-kit';

import UploadComponent from '@/components/teacher/uploadComponent';
import axios from 'axios'
import { APIURL, MODEL } from '@/constants/api'
import { toast } from 'react-toastify'

import Loader from '@/components/common/Loader'

const ENDPOINT = 'https://knowly.live:8001/'

const ConductQuiz = () => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()
    let socket;
    const [start, setStart] = useState(false)
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");

    const [value, setValue] = useState('')
    const { listen, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue((value) => value + " " + result)
        }
    })

    const handleSubmit = (e) => {
        // e.preventDefault();
        if (!file || !text) {
            toast.error("Please upload a file")
        } else {
            // axios.post(`${APIURL}/classes/addcontent/${router.query?.classCode}`, {data: {file: file, text: text}})
            // .then((res) => {
            //     console.log(res.data)
            //     toast.success("Content uploaded successfully")
            //     setFile(null)
            //     setText("")
            //     let knowlyuserid = localStorage.getItem('knowlyuserid')
            //     router.push(`/dashboard/teacher/${knowlyuserid}}`)
            // })
            // .catch((err) => {
            //     console.log(err)
            //     toast.error("Something went wrong, Please try again")
            // })
        }
    }


    function handleStart() {
        setStart(true)
        let classCode = router.query['classCode']

        setLoading(true)
        toast("Please wait while knowly generates questions for quiz")
        // socket = io(ENDPOINT, {
        //     query: {
        //         classCode: classCode // replace with the actual classCode
        //     }
        // })
        // socket.emit('startQuiz', { classCode, length: 2 })

        let content = value + " " + text
        console.log(content)
        axios.post(`${MODEL}/getquizz`, { content })
            .then((res) => {
                console.log(res.data.questions)
                let temp = {
                    classCode: classCode,
                    questions: res.data.questions,
                    title: "Knowly quiz"
                }
                axios.post(`${APIURL}/quiz`, { data: temp })
                    .then((res) => {
                        console.log(res.data)
                        setLoading(false)
                        toast.success("Quiz questions generated successfully")

                    }).catch((err) => {
                        console.log(err)
                        setLoading(false)
                        toast.error("unable to connect Internet")
                    })
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })
            setLoading(false)
    }

    // function handleStart() {
    //     SpeechRecognition.startListening()
    // }

    // console.log(transcript)

    console.log(value)

    function startQuiz() {
        let classCode = router.query['classCode']
        socket = io(ENDPOINT, {
            query: {
                classCode: classCode // replace with the actual classCode
            }
        })
        socket.emit('startQuiz', { classCode, length: 4 })
        toast.success("Quiz posted sucessfully")
    }

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center h-full w-full'>
                {
                    // listening ? (
                    // <button className=' h-5 w-5 text-3xl' onClick={listening ? SpeechRecognition.stopListening : handleStart}>{listening ? "listening" : "Not listening"}</button>
                    // ) : (
                    // <BsFillMicFill/> : <BsFillMicMuteFill/>
                    //     <button className=' h-5 w-5 text-3xl' onClick={SpeechRecognition.stopListening}><BsFillMicMuteFill/></button>
                    // )
                }
                <div className='flex  gap-4 flex-row justify-evenly mt-10' >
                    <div className='bg-blue-200 p-4 rounded-xl'>
                        {/* <textarea
                            value={value}
                            onChange={(event) => setValue(event.target.value)}
                        /> */}
                        <button onClick={listen} className="text-3xl">
                            <BsFillMicFill />
                        </button>

                        <button onClick={stop} className="text-3xl">
                            <BsFillMicMuteFill />
                        </button>
                    </div>
                    <div className='bg-blue-200 p-4 rounded-xl'>
                        <UploadComponent file={file} setFile={setFile} text={text} setText={setText} handleSubmit={handleSubmit} />
                    </div>
                </div>
                <div class="actions">
                    <button
                        // disabled={disabled}
                        className="px-3 py-1 text-white bg-blue-500 rounded ml-4"
                        onClick={() => handleStart()}
                    >
                        Show Questions
                    </button>
                    <button
                        // disabled={disabled}
                        className="px-3 py-1 text-white bg-blue-500 rounded ml-4"
                        onClick={() => startQuiz()}
                    >
                        START QUIZ
                    </button>
                </div>
            </div>
            { loading && <Loader /> }
        </div>
    )
}

export default ConductQuiz