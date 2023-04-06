import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'
import axios from 'axios'

import { APIURL } from '@/constants/api'
import { toast } from 'react-toastify'

import { useRouter } from 'next/router'

import Modal from '@/components/common/Modal'

function student() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const [open, setOpen] = useState(true)

  function handleReset() {
    setUser({
      email: '',
      password: '',
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    axios.post(`${APIURL}/student/login`, {data:user})
      .then((res) => {
        console.log(res.data)
        toast.success('Login Successful')
        localStorage.setItem('lmsuser', 'student')
        localStorage.setItem('lmsuserid', res.data.id)
        router.push(`/dashboard/student/${res.data.id}`)
      }
      )
      .catch((err) => {
        console.log(err)
        toast.error('Login Failed')
      }
      )
}


  return (
    <div className=''>
      <Modal open={open} setOpen={setOpen} >
        <LoginPage
            handleReset={handleReset}
            user={user}
            setUser={setUser}
            content='Student Login'
            handleSubmit={handleSubmit}
        />
        </Modal>
    </div>
  )
}

export default student