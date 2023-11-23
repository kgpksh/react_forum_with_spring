import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const history = useNavigate()
    const idRef = useRef(null)
    const pwRef = useRef(null)

    function onSubmit(e) {
        e.preventDefault();
        for (const key in validation) {
            if (typeof validation[key] === 'function') {
                const [isSuccess, resultCode] = validation[key]()
                if(!isSuccess) {
                    alert(resultCode)
                    return false
                }
            }
          }

        const requestBody = {username : idRef.current.value, password : pwRef.current.value}
        fetch('/member/signup', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Accept': 'application/json',
            },
            body : JSON.stringify(requestBody)
        }).then((res) => {
            if(res.ok) {
                return res.json()
            }
        }).then((result) => {
            if(result['successSignup']) {
                history('/')
            } else {
                alert(result['resultMsg'])
            }
        })
    }

    const validation = {
        checkLength() {
            const idLength = idRef.current.value.length;
            const pwLength = pwRef.current.value.length;

            return [5 <= idLength && idLength <= 10 && 5 <= pwLength && pwLength <= 10, '아이디와 비밀번호는 5자 이상 10자 미만이어야 합니다.']
        }
    }

    return(
        <div className="signup">
            <h2>회원가입</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <h4>아이디</h4>
                    <input type="text" name="username" placeholder="5~10 자리의 id를 입력해 주세요" className="input_area" ref={idRef}></input>
                </div>

                <div>
                    <h4>비밀번호</h4>
                    <input type="password" name="password" placeholder="5~10 자리의 비밀번호를 입력해 주세요" className="input_area" ref={pwRef}></input>
                </div>
                <button className="signupButton">회원가입</button>
            </form>
        </div>
    )
}