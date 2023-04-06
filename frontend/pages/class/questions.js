import React, { useState } from 'react'

function Questions() {
    const [status, setStatus] = useState(true)
  return (
    <div>
        {
            status ? (
                ""
            ) : (
                ""
            )
        }
    </div>
  )
}

export default Questions