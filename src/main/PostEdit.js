import { useContext, useRef } from "react";
import axiosJwtInterceptor from "../utils/axiosJwtInterceptor";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryContext } from "../App";

export default function PostEdit() {
    const history = useNavigate()
    const {category, title, content} = useLocation().state
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const {categories} = useContext(CategoryContext)

    function sendPost(e) {
        e.preventDefault();

        const requestBody = {author : localStorage.getItem('username'), category : categories.indexOf(category) + 1, title : titleRef.current.value, content : contentRef.current.value}
        axiosJwtInterceptor.post('/post/post', requestBody)
        .then((res) => {
            if(res.data === 'success') {
                alert('게시글 작성 성공')
                history('/')
            }
        })
    }

    return (
        <form onSubmit={sendPost} className="postEditingForm">
            <div className="titleInput">
                <input type="text" placeholder="제목을 입력하세요" ref={titleRef} maxLength={30} defaultValue={title}/>
            </div>
            <div className="contentInput">
                <input type="text" placeholder="내용을 입력하세요" ref={contentRef} defaultValue={content}/>
            </div>
            <div id="postSave">
                <button>저장</button>
            </div>
            
        </form>
    )
}