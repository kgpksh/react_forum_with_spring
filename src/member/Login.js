import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosJwtInterceptor from "../utils/axiosJwtInterceptor";

export default function Login() {
    const history = useNavigate()
    const idRef = useRef(null)
    const pwRef = useRef(null)

    function onSubmit(e) {
        e.preventDefault();

        const requestBody = {username : idRef.current.value, password : pwRef.current.value}
        axiosJwtInterceptor.post('/member/login', requestBody)
        .then((res) => {
            alert(res.data.resultMsg)
            if(res.data.successLogin) {
                localStorage.setItem('jwtToken', res.data.token)
                history('/')
                return
            }
        })
    }

    return(
        <div className="signup">
            <h2>로그인</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h4>아이디</h4>
                    <input type="text" name="username" placeholder="id를 입력해 주세요" className="input_area" ref={idRef}></input>
                </div>

                <div>
                    <h4>비밀번호</h4>
                    <input type="password" name="password" placeholder="비밀번호를 입력해 주세요" className="input_area" ref={pwRef}></input>
                </div>
                <button className="signupButton">로그인 하기</button>
            </form>
        </div>
    )
}