import { useState } from "react";
import { Link } from "react-router-dom";
export default function UserLinks() {
    const [isLogin, setLogin] = useState(localStorage.getItem('isLogin'))
    return (
        <div className="User">
            <div><h2><Link to={'/'}>To home</Link></h2></div>
            <div><Link to={'/member/signup'}>{isLogin &&'회원가입'}</Link></div>
            <div>{isLogin &&'로그인'}</div>
        </div>
    )
}