import { useContext, useRef } from "react"
import axiosJwtInterceptor from "../utils/axiosJwtInterceptor"
import checkJwtExpired from "../utils/checkJwtExpired"
import jwtContentGetter from "../utils/jwtContentGetter"
import { CommentModifyingContext } from "./PostComment"
import { CommentContext } from "./PostView"

export default function CommentInput({postId, comment}) {
    const username = useRef(jwtContentGetter()['username'])
    const commentContent = useRef(comment['comment'])
    const {isChange, setIsChange} = useContext(CommentModifyingContext)
    const {comments, setComments} = useContext(CommentContext)

    function sendComment(e) {
        e.preventDefault()

        if(!checkUser()) {
            return false
        }

        axiosJwtInterceptor.put('/post/comment', {postId : postId, id : comment['id'], comment : commentContent.current.value, author : username.current})
        .then(res => {
            setComments(res.data)
            setIsChange(false)
            return true
        })

        return false
    }

    function checkUser() {
        return !checkJwtExpired() && username.current === comment['author']
    }

    return (
        <form onSubmit={sendComment} className="commentModifying">
            <textarea defaultValue={commentContent.current} ref={commentContent}/>
            <div>
                <button>수정</button>
                <button type="button" onClick={() => setIsChange(false)}>취소</button>
            </div>
            
        </form>
    )
}