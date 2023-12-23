import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function BigSubjectList() {
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        axios.get('/category/categoryList')
        .then(res => {
            const categoryList = res.data.map(element => element['category'])
            return categoryList;
        })
        .then(categoryList => {
            setSubjects(categoryList)
        })
    },[])
    
    return(
        <div className="Subjects">
            {subjects.map(subject => (
                <h3><Link to={'/' + subject}>{subject}</Link></h3>
            ))}
        </div>
    )
}