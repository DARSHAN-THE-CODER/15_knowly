
import Landing from "@/components/editor/components/Landing.js"
import { useState } from "react"

export default function assessment(){
    const [code,setCode] = useState();
    return(
        <>
            <Landing code={code} setCode={setCode} />
        </>
    )
}