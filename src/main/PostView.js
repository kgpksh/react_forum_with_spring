import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './PostView.css';
import PostComments from "./PostComments";

export const CommentContext = createContext()

export default function PostView() {
    const {id, category, author, title, lastModifiedDate, view} = useLocation().state
    const [content, setContent] = useState('')
    const [comments, setComments] = useState([])

    function getContentAndComments() {
        axios.get('/post/view', {params : {postId : id}})
        .then(res => {
            setContent(res.data['content'])
            setComments(res.data['comments'])
        })
    }
    useEffect(() => {
        getContentAndComments()
    }, [])

    return(
        <div className="postView">
            <div>
                <div className="postTitle">{title}</div>
                <div className="postMetadata">
                    <div className="left">{author}</div>
                    <div className="right">
                        <div>{lastModifiedDate}</div>
                        <div>{view}</div>
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