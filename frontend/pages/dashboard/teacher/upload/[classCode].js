import React, { useState, useEffect } from 'react'
import UploadComponent from '@/components/teacher/uploadComponent';
import { toast } from 'react-toastify';
import axios from 'axios';

import { APIURL } from '@/constants/api';
import { useRouter } from 'next/router';

function Upload() {


    const router = useRouter()
    const [file, setFile] = useState(null);
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        // e.preventDefault();
        if(!file || !text){
            toast.error("Please upload a file")
        } else{
            axios.post(`${APIURL}/classes/addcontent/${router.query?.classCode}`, {data: {file: file, text: text}})
            .then((res) => {
                console.log(res.data)
                toast.success("Content uploaded successfully")
                setFile(null)
                setText("")
                let knowlyuserid = localStorage.getItem('knowlyuserid')
                router.push(`/dashboard/teacher/${knowlyuserid}}`)
            })
            .catch((err) => {
                console.log(err)
                toast.error("Something went wrong, Please try again")
            })
        }
    }

  return (
    <div className='h-[80vh] '>
        <UploadComponent file={file} setFile={setFile} text={text} setText={setText} handleSubmit={handleSubmit} />
    </div>
  )
}

export default Upload