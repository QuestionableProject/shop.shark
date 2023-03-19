import React, { useState, useRef, useEffect } from "react"
import styles from './login.module.css'
import { animated } from 'react-spring'
import { useAppContext } from "../state"
import { observer } from "mobx-react-lite"
import Eye from "../svg/eye"

export interface LoginProps {
    open: boolean
    onToggle: (state: boolean) => void
    style: any
}
export const Login: React.FC<LoginProps> = observer(({ open, onToggle, style }) => {
    const [active, setActive] = useState(false)
    const [inLogin, setInLogin] = useState<string>("")
    const [inPassword, setInPassword] = useState<string>("")
    const [outLogin, setOutLogin] = useState<string>("")
    const [outPassword, setOutPassword] = useState<string>("")
    const [outPassword2, setOutPassword2] = useState<string>("")
    const LoginRef = useRef<any>(null)
    const { user } = useAppContext()
    const [passCheck, setPassCheck] = useState('password');

    const login = () => {
        if (inLogin.length === 0 || inPassword.length === 0) return alert("Введите все данные")
        if (inLogin.length < 4) return alert("Логин слишком маленький")
        if (inPassword.length < 8) return alert("Пароль слишком маленький")
        fetch('http://localhost:5000/api/user/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: inLogin,
                password: inPassword
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token)
                user.setIsAuth(true);
                user.setUser(user)
                onToggle(false)
            }
            if (data.message) {
                alert(data.message)
            }
            
        }).catch((e) => {
            alert('Ошибка: сервер выключен')
            setInLogin("")
            setInPassword("")
        });

    }
    const registration = () => {        
        if (outLogin.length === 0 || outPassword.length === 0 || outPassword2.length === 0) return alert("Введите все данные")
        if (outLogin === outPassword) return alert('Пароль не может быть такой же как логин')
        if (outPassword !== outPassword2) return alert("Пароли не совпадают")
        if (Number(outLogin[0])) return alert('Логин не может начинаться на цифру')
        if (!outPassword.replace(/\D/g, '')) return alert('Пароль должен содержать цифры и буквы')
        fetch('http://localhost:5000/api/user/registration', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: outLogin,
                password: outPassword
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
            if (data.message) {
                return alert(data.message)
            }
            alert(data)
            setActive(false)
        }).catch((e) => {
            alert('Ошибка: сервер выключен')
            setOutLogin("")
            setOutPassword("")
            setOutPassword2("")
        });
    }

    useEffect(() => {
        const onClick = (e: any) => {
            if (!LoginRef.current.contains(e.target) && !e.target.getAttribute("data-login")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)
        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, LoginRef])

    return (
        <animated.div className={styles.login__block} ref={LoginRef} style={style} data-login>
            {!active && (
                <form className={styles.login}>
                    <h3>Вход</h3>
                    <input type="text" placeholder={"Логин"} value={inLogin} onChange={(e) => setInLogin(e.target.value)} maxLength={20} minLength={4} />
                    <label><input type={passCheck} placeholder={"Пароль"} value={inPassword} onChange={(e) => setInPassword(e.target.value)} maxLength={30} minLength={8} /> <Eye check={passCheck} onCheck={setPassCheck}/> </label>
                    <button type="button" onClick={login}>Войти</button>
                    <p onClick={() => setActive(true)} data-login >У меня нет аккаунта</p>
                </form>
            )}
            {active && (
                <form className={styles.registration}>
                    <h3>Регистрация</h3>
                    <input type="text" placeholder={"Логин"} value={outLogin} onChange={(e) => setOutLogin(e.target.value)} maxLength={20} minLength={4} />
                    <label><input type={passCheck} placeholder={"Пароль"} value={outPassword} onChange={(e) => setOutPassword(e.target.value)} maxLength={30} minLength={8} /> <Eye check={passCheck} onCheck={setPassCheck}/> </label>
                    <label><input type={passCheck} placeholder={"Повторите пароль"} value={outPassword2} onChange={(e) => setOutPassword2(e.target.value)} maxLength={30} minLength={8} /> <Eye check={passCheck} onCheck={setPassCheck}/> </label>
                    <button type="button" onClick={registration}>Зарегестрироваться</button>
                    <p onClick={() => setActive(false)} data-login>У меня есть аккаунт</p>
                </form>
            )}
        </animated.div>
    )
})

export default Login

