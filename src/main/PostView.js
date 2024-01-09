import { createContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './PostView.css';
import PostComments from "./PostComments";
import jwtContentGetter from "../utils/jwtContentGetter";
import axiosJwtInterceptor from "../utils/axiosJwtInterceptor";

export const CommentContext = createContext()

export default function PostView() {
    const {id, category, author, title, lastModifiedDate} = useLocation().state
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])
    const [view, setView] = useState(0)
    const userInfo = useRef(jwtContentGetter())
    const history = useNavigate()

    function getContentAndComments() {
        axios.get('/post/view', {params : {postId : id}})
        .then(res => {
            setContent(res.data['content'])
            setView(res.data['view'])
            setComments(res.data['comments'])
        })
    }
    useEffect(() => {
        getContentAndComments()
    }, [])

    function deletePost() {
        if(!window.confirm('정말로 삭제 하시겠습니까?')) {
            return false
        }

        axiosJwtInterceptor.delete(`/post/post?postId=${id}`)
        .then(res => {
            if(res.data === 'success')
            history('/')
        })
    }

    return(
        <div className="postView">
            <div>
                <div className="postTitle">{title}</div>
                <div className="postMetadata">
                    <div className="left">{author}</div>
                    <div className="right">
                        <div>{lastModifiedDate}</div>
                        <div>{view}</div>
                        {userInfo.current === null || userInfo.current['username'] !== author || <button onClick={deletePost}>삭제</button>}
                    </div>
                </div>
                <div className="postContent">{content}</div>
                <CommentContext.Provider value={{comments, setComments}}>
                    <PostComments postId={id}></PostComments>
                </CommentContext.Provider>
            </div>            
        </div>
    )
}