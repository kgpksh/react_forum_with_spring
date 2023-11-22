import { Link } from "react-router-dom";
export default function UserLinks() {
    return (
        <div className="User">
            <div><h2><Link to={'/'}>To home</Link></h2></div>
            <div><Link to={'/member/signup'}>회원가입</Link></div>
            <div>로그인</div>
        </div>
    )
}