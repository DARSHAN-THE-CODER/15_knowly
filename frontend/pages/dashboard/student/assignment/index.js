import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { APIURL, MODEL } from '@/constants/api'
import { toast } from 'react-toastify'

import Landing from '@/components/editor/components/Landing'
import Loader from '@/components/common/Loader'

function CodeQuestions() {

    const [loading, setLoading] = useState(false)

    const [questions, setQuestions] = useState([])

    const [code, setCode] = useState();

    const [data, setData] = useState({

    })
    const [status, setStatus] = useState(false)

    const [review, setReview] = useState(null)
    const [content, setContent] = useState("")

    const [story, setStory] = useState({ random: "", story: "" })

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
        axios.get(`${APIURL}/classes/classCode/${classCode}`)
            .then((res) => {
                console.log(res.data.classes)
                setStory({ story: res.data.classes.story, random: res.data.classes.random })
            }
            )
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

    const handleCallModel = () => {
        setLoading(true)
        let temp = {
            question: data.question,
            code: code,
            testCases: data.testCases
        }
        console.log(temp)
        axios.post(`${MODEL}/getaireview`, temp)
            .then((res) => {
                console.log(res.data.review)
                setReview(res.data.review)
                if (process.browser) {
                    const temp = document.getElementById('knowlyreview')
                    // temp.scrollIntoView({ behavior: 'smooth' })
                    temp.innerHTML = replace(res.data.review)
                    setContent("Knowly Review")
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
                toast.error("Failed to review, internet issue !")
            })
    }

    function handleTeacherAnswerShow() {
        setReview(data.answer)
        if (process.browser) {
            const temp = document.getElementById('knowlyreview')
            // temp.scrollIntoView({ behavior: 'smooth' })
            temp.innerHTML = replace(data.answer)
            setReview(true)
            setContent("Instructor's Answer")
        }
    }

    function replace(string) {
        const replacedStr = string.replace(/\n/g, "<p></p>");
        let modifiedString = replacedStr.replace(/ /g, '&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
        return modifiedString;
    }

    function handleBack() {
        setReview({});
        setContent()
        setStatus(false);
        const temp = document.getElementById('knowlyreview')
        // temp.scrollIntoView({ behavior: 'smooth' })
        temp.innerHTML = ""
    }

    return (
        <div className='h-screen overflow-auto'>
            {
                !status ? (<div className='flex flex-wrap w-full justify-evenly m-auto items-center mt-[40px]'>
                    <div className='flex flex-col card bg-gray-100 p-4 rounded-2xl cursor-pointer m-6 w-[90vw]'>
                        <h2 className='text-3xl'>Today's knowly topic : {story?.random}</h2>
                        <p className='text-xl'>{story.story}</p>
                    </div>
                    
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
                                onClick={() => handleBack()}
                            >
                                Back
                            </button>
                        </div>
                        <Landing code={code} setCode={setCode} question={data.question} title={data.title} handleSubmit={handleCallModel} review={review} handleTeacherAnswerShow={handleTeacherAnswerShow} />
                        {
                            review && (
                                <div className='flex flex-col border-black rounded-xl p-4 w-[70vw] break-all justify-center m-auto shadow-2xl mb-7'>
                                    <h2 className='text-center text-3xl font-bold'>{content}</h2>
                                    <div id="knowlyreview" className='text-xl'></div>
                                </div>
                            )
                        }
                    </div>
                )
            }
            { loading && <Loader /> }
        </div>
    )
}

export default CodeQuestions