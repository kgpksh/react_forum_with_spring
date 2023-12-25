export default function PostListElement({element}) {
    const { title, author, lastModifiedDate, view } = element;
    return (
        <li>
            <div>
                <div className="title">{title}</div>
                <div className="author">{author}</div>
                <div className="date">{lastModifiedDate}</div>
                <div className="view">{view}</div>
            </div>
        </li>
    )
}