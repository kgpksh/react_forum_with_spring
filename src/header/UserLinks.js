import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import checkJwtExpired from "../utils/checkJwtExpired";

export default function UserLinks() {
    const location = useLocation()
    const [isLogin, setLogin] = useState()
    useEffect(() => {
        setLogin(checkJwtExpired())
    },[location])

    function logout() {
        localStorage.removeItem('jwtToken')
        setLogin(checkJwtExpired())
    }
    return (
        <div className="User">
            <div><h2><Link to={'/'}>To home</Link></h2></div>
            <div><Link to={'/member/signup'}>{isLogin &&'회원가입'}</Link></div>
            <div><Link to={'/member/login'}>{isLogin &&'로그인'}</Link></div>
            <div onClick={logout}><Link to={'/'}>{isLogin ||'로그아웃'}</Link></div>
        </div>
    )
}