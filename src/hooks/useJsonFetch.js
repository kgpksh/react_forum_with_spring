import { useEffect, useState } from "react"

export default function useJsonFetch(url, method, body) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetch(url, {
            method : method,
            headers : {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
            },
            body : JSON.stringify(body)
        })
        .then(res => {
            if(res.ok) {
                setData(res.json())
            }
        })
    }, [url])
    
    return data
}