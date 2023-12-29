import { createContext, useContext, useEffect, useRef, useState } from "react"
import checkJwtExpired from "../utils/checkJwtExpired"
import PostComment from "./PostComment"
import axiosJwtInterceptor from "../utils/axiosJwtInterceptor"
import jwtContentGetter from "../utils/jwtContentGetter"
import { CommentContext } from "./PostView"

export default function PostComments({postId}) {
    // const [comments, setComments] = useState([])
    const commentContent = useRef('')
    const {comments, setComments} = useContext(CommentContext)

    useEffect(() => {
    }, [comments])

    function sendComment(e) {
        e.preventDefault()
        axiosJwtInterceptor.post('/post/comment', {postId : postId, comment : commentContent.current.value, author : jwtContentGetter()['username']})
        .then(res => {
            setComments(res.data)
            commentContent.current.value = ''
        })
    }

    return (
        <div>
            {!checkJwtExpired() && 
            <form onSubmit={sendComment} id="newComment">
                <textarea placeholder="댓글을 입력해 주세요" ref={commentContent}/>
                <button>댓글 작성</button>
            </form>
            }
            <ul className="comment">
                {comments.map(comment =>(
                    <PostComment postId = {postId} comment = {comment} key={comment['id']}></PostComment>
                ))}
            </ul>
        </div>
    )
}