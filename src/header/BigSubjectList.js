import { useContext } from "react"
import { Link } from "react-router-dom"
import { CategoryContext } from "../App"

export default function BigSubjectList() {
    const {categories} = useContext(CategoryContext)
    return(
        <div className="Subjects">
            {categories.map(category => (
                <h3><Link to={'/post?category=' + category} key={category}>{category}</Link></h3>
            ))}
        </div>
    )
}