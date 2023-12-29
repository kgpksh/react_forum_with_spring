import { Link } from "react-router-dom";

export default function PostListElement({element}) {
    const { title, author, lastModifiedDate, view } = element;
    return (
        <li>
            <Link to='/post/view' state = {element}>
                <div className="title">{title}</div>
                <div className="author">{author}</div>
                <div className="date">{lastModifiedDate}</div>
                <div className="view">{view}</div>
            </Link>
        </li>
    )
}