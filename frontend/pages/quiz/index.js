import React, { useEffect, useState } from 'react'

import Modal from '@/components/common/Modal'
import io from 'socket.io-client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { data } from 'autoprefixer'

import { APIURL } from '@/constants/api'

const ENDPOINT = 'https://knowly.live'

// import  useTimer  from '@/components/common/Timer'

import Loader from '@/components/common/Loader'
import Table from '@/components/common/Table'

function Quiz() {

    const [duration, setDuration] = useState(10);
    const [isRunning, setIsRunning] = useState(false);

    const [loading, setLoading] = useState(false)
    const [id, setId] = useState(null)
    const [leaderBoard, setLeaderBoard] = useState({ status: false, data: {} })

    // useEffect(() => {
    //     axios.get(`${APIURL}/quiz/leaderboard/ABCD123`)
    //         .then((res) => {
    //             console.log(res.data?.leaderboard?.Response)
    //             let temp = res.data?.leaderboard?.Response
    //             temp?.sort((a, b) => b.score - a.score);
    //             setLeaderBoard({ status: true, data: temp })
    //         }).catch((err) => {
    //             console.log(err)
    //             toast.error("Couldnt fetch leaderboard")
    //         })

    //     setLeaderBoard({ status: true, data: data })
    // }, [])

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setDuration((prevDuration) => {
                    if (prevDuration === 0) {
                        setIsRunning(false);
                        return 0;
                    }
                    return prevDuration - 1;
                });
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);
    const resetTimer = (newDuration) => setDuration(newDuration);


    let socket = io(ENDPOINT)

    const [status, setStatus] = useState(true)
    const [student, setStudent] = useState({ name: "", classCode: "" })

    const [showQuiz, setShowQuiz] = useState(false)
    const [questions, setQuestions] = useState([])

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState(null)

    const [prevQuestion, setPrevQuestion] = useState(0)

    const [score, setScore] = useState({ correct: 0, score: 0 })
    // console.log(APIURL)


    function handleJoinQuiz(e) {
        e.preventDefault();
        console.log(student)
        socket.emit('joinQuiz', { name: student?.name, classCode: student?.classCode });
        setLoading(true)
        setStatus(false)
        toast("Please wait while we start the quiz")
    }

    // useEffect(() => {
    //     axios.get(`http://localhost:8001/api/v1/quiz/ABCD123`)
    //         .then((res) => {
    //             console.log(res.data.quiz[0]?.questions)
    //             setQuestions(res.data.quiz[0]?.questions)
    //             setStatus(false)
    //             toast.success("Quiz started")
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //             toast.error("Couldnt start quiz ! internet issue")
    //         })
    // }, [])

    // console.log(questions)

    useEffect(() => {

        socket.on('joined', (data) => {
            console.log(data)
            setId(data)
        })

        socket.on('startQuiz', (data) => {
            console.log(data)
            axios.get(`${APIURL}/quiz/${data}`)
                .then((res) => {
                    // console.log(res.data.quiz.questions)
                    setQuestions(res.data.quiz[1]?.questions)
                    setStatus(false)
                    // startTimer()
                    setLoading(false)
                    startTimer()
                    toast.success("Quiz started")
                })
                .catch((err) => {
                    console.log(err)
                    toast.error("Couldnt start quiz ! internet issue")
                })
        })

        socket.on('nextQuestion', (data) => {
            console.log(data)
            if (prevQuestion === data) {

            } else {
                setSelectedIndex(null)
                setSelectedOption(null)
                resetTimer(10)
                startTimer()
                setCurrentQuestion(data)
                setLoading(false)
            }
        })

        socket.on('quizEnded', (data) => {
            console.log(data)
            setStatus(false)
            toast.success("Quiz ended")
            setLoading(false)

            axios.get(`${APIURL}/quiz/leaderboard/${student?.classCode}`)
                .then((res) => {
                    console.log(res.data?.leaderboard?.Response)
                    let temp = res.data?.leaderboard?.Response
                    temp?.sort((a, b) => b.score - a.score);
                    setLeaderBoard({ status: true, data: temp })
                }).catch((err) => {
                    console.log(err)
                    toast.error("Couldnt fetch leaderboard")
                })

            setLeaderBoard({ status: true, data: data })
        })

    })

    // console.log(score)
    const handleAnswerSelection = (answerIndex, answer, correctAnswer) => {
        if (selectedIndex !== null) {
            return
        }

        if (correctAnswer === answer) {
            socket.emit("clicked", { id: id, student: student?.name, score: score.score + duration, correct: score.correct + 1 })
            setScore({ correct: score.correct + 1, score: score.score + duration, studentName: student?.name })

        }
        console.log(answerIndex, answer)

        console.log(duration)

        setSelectedOption(answer);
        setSelectedIndex(answerIndex)

        setLoading(true)
        toast("Please wait until the next question")
        // const newAnswers = [...answers]
        // newAnswers[currentQuestionIndex] = answerIndex
        // setAnswers(newAnswers)
    }

    //   score += timeLeft 
    //  correct += 1

    //   console.log(questions[currentQuestion])

    let headers = [
        {
            name: "Student Name",
            score: "Score",
        }
    ]
    return (
        <div className='h-screen'>
            {
                status && (
                    <Modal showModal={status} setShowModal={setStatus} title={"Enter details"}>
                        <div className="flex justify-center items-center overflow-scroll bg-gray-100 w-[500px]">
                            <div className="w-full">
                                {/* <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{content}</h1> */}
                                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" target="_blank" >
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                                            Enter anonymous name
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="text"
                                            name="name"
                                            placeholder="Funny name"
                                            value={student?.name}
                                            onChange={(e) => setStudent({ ...student, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
                                            Class Code
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                            id="code"
                                            type="text"
                                            name="classCode"
                                            placeholder="Class code "
                                            value={student?.classCode}
                                            onChange={(e) => setStudent({ ...student, classCode: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex items-center text-center m-auto">
                                        <button
                                            className="bg-blue-500 flex justify-center items-center text-center hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            //   type="submit"
                                            onClick={(e) => handleJoinQuiz(e)}
                                        >
                                            Join
                                        </button>
                                        {/* <button
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                            type="button"
                                            onClick={handleReset}
                                        >
                                            Reset
                                        </button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                )

            }
            {!leaderBoard?.status ? (<div>
                {

                    <>
                        <div className="max-w-md mx-auto mt-8">
                            <h2 className="text-2xl font-bold mb-4">Question {currentQuestion + 1}</h2>
                            <p className="mb-4">{questions[currentQuestion]?.question}</p>
                            <div className="space-y-2">
                                {questions[currentQuestion]?.options?.map((option, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border-2 ${(selectedOption === questions[currentQuestion]?.answer && selectedIndex === index)
                                            ? 'border-green-500'
                                            : selectedIndex === index
                                                ? 'border-red-500'
                                                : 'border-gray-200'
                                            }`}
                                    >
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                className="form-radio"
                                                checked={selectedOption === index}
                                                onChange={() => handleAnswerSelection(index, option["text"], questions[currentQuestion]?.answer)}
                                            />
                                            <span className="ml-2">{option["text"]}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                }
            </div>) : (
                <div className='h-screen'>
                    <div className="bg-blue-100 p-4">
                        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
                        {/* <div className="grid grid-cols-3 gap-4">
                            {leaderBoard?.data?.map(({item}, index) => (
                                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                                    <p className="font-bold">{item.studentName}</p>
                                    <p className="text-gray-500">{item.score} points</p>
                                </div>
                            ))}
                        </div> */}
                    </div>
                </div>
            )}
            {loading && <Loader />}
        </div>
    )
}


export default Quiz
