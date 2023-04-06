import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { quest } from '../constants/quest';

const Question = ({question, title}) => {

    const [data,setData] = useState();
    // setData(quest[0]);

    // useEffect(async ()=>{
    //    axios.get('').then((res)=>{

    //    }).catch((error)=>{
    //     console.log("Failed to fetch question",error);
    //    })
        

    // },[])

  return (
    <div className='flex'>
      <div className="w-full p-4 shadow-md lg:max-w-lg">
            <div className="space-y-2">
                <h3 className="text-2xl font-semibold">
                    {title}
                </h3>
                <p className="text-gray-600">
                    {question}
                </p>
            </div>
      </div>
           
        

    </div>
  )
}

export default Question