import { useState } from "react"
import { Link } from "react-router-dom"

export default function BigSubjectList() {
    const subjectList = [{'subject' : '요리', 'link' : '/cook'},
                        {'subject' : '코딩', 'link' : '/coding'},
                        {'subject' : '독서', 'link' : '/book'}]
    const [subjects, setSubjects] = useState(subjectList)
    
    return(
        <div className="Subjects">
            {subjects.map(subject => (
                <h3><Link to={subject.link}>{subject.subject}</Link></h3>
            ))}
        </div>
    )
}