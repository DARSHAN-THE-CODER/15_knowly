import React, { useState } from 'react'
import LoginPage from '@/components/forms/Login'
import axios from 'axios'

import { APIURL } from '@/constants/api'
import { toast } from 'react-toastify'

import { useRouter } from 'next/router'

function Teacher() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  function handleReset() {
    setUser({
      email: '',
      password: '',
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(user)
    // axios.post(`${APIURL}/user/login`, user)
    //   .then((res) => {
    //     console.log(res.data)
    //     toast.success('Login Successful')
    //     localStorage.setItem('lmsuser', 'student')
    //     localStorage.setItem('lmsuserid', res.data.id)
    //     router.push(`/dashboard/student/${res.data.id}`)
    //   }
    //   )
    //   .catch((err) => {
    //     console.log(err)
    //     toast.error('Login Failed')
    //   }
    //   )
}


  return (
    <div className='h-[80vh]'>
        <LoginPage
            handleReset={handleReset}
            user={user}
            setUser={setUser}
            content='Teacher Login'
            handleSubmit={handleSubmit}
        />
    </div>
  )
}

export default Teacher