import { useState, createContext, useRef } from "react"
import CommentInput from "./CommentInput"
import jwtContentGetter from "../utils/jwtContentGetter"
import formDateTime from "../utils/formatDateTime"

export const CommentModifyingContext = createContext()

export default function PostComment({postId, comment}) {
    const[isChange, setIsChange] = useState(false)
    const username = useRef(jwtContentGetter())
    
    return (
        <li>
            <div>
                <div>{comment['author']}</div>
                <div>{formDateTime(comment['lastModifiedDate'])}</div>
                {!isChange && username.current !== null && comment['author'] === username.current['username'] && <button onClick={() => setIsChange(true)}>수정</button>}
            </div>
            <CommentModifyingContext.Provider value={{isChange, setIsChange}}>
                {!isChange ? <div>{comment['comment']}</div> : <CommentInput postId={postId} comment={comment}/>}
            </CommentModifyingContext.Provider>
            
        </li>
    )
}