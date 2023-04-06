import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { APIURL } from '@/constants/api'

import Table from '@/components/common/Table'

function Data() {

    const [data, setData] = useState([])

    let headers = [
        {
            id: "Id",
            name: "Class Name",
            classCode: "Class Code"
        }
    ]

    useEffect(() => {
        let id = localStorage.getItem('knowlyuserid')
        axios.get(`${APIURL}/classes/teacher/${id}}`)
        .then((res) => {
            console.log(res.data)
            setData(res.data.classes)
        })
        .catch((err) => {
            console.log(err)
        }
        )
    },[])
  return (
    <div>
        <Table headers={headers} data={data} />
    </div>
  )
}

export default Data