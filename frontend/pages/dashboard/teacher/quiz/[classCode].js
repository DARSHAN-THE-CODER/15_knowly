import React, { useEffect, useState } from 'react'

import dynamic from 'next/dynamic'

// const Speechto = dynamic(() => import('react-hook-speech-to-text'), { ssr: false })
// import useSpeechToText from "react-hook-speech-to-text"

// import {BsFillMicFill, BsFillMicMuteFill} from "react-icons/bs"
import io from 'socket.io-client'
import { useRouter } from 'next/router'

const ENDPOINT = 'http://localhost:8001'

const ConductQuiz = () => {

    const router = useRouter()
    let socket;
    const [start, setStart] = useState(false)

    // useEffect(() => {
    //     if(router?.query['classCode']){

    //     }
    // },[router])

    // const {
    //     error,
    //     interimResult,
    //     isRecording,
    //     results,
    //     startSpeechToText,
    //     stopSpeechToText,
    // } = Speechto({
    //     continuous: true,
    //     useLegacyResults: false
    // })

    // useEffect(() => {

    // },[])

    function handleStart() {
        setStart(true)
        let classCode = router.query['classCode']

        socket = io(ENDPOINT, {
            query: {
                classCode: classCode // replace with the actual classCode
            }
        })
        socket.emit('startQuiz', { classCode, length: 2 })
    }

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center justify-center h-full'>
                <div class="actions">
                    <button
                        // disabled={disabled}
                        className="px-3 py-1 text-white bg-blue-500 rounded ml-4"
                        onClick={() => handleStart()}
                    >
                        Start Quiz
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConductQuiz