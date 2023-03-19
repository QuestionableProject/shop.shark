import React, { useState, useEffect } from "react"
import Layout from "src/components/layout"
import Error from "./404"
import styles from './user.module.css'
import Logo from "src/components/svg/logo"
import { useAppContext } from "src/components/state"
import Logout from "src/components/svg/logout"
import { observer } from "mobx-react-lite"
import jwt_decode from "jwt-decode";
import clsx from "clsx"

const User: React.FC = observer(() => {
    const [loader, setLoader] = useState(true)
    const { user } = useAppContext()
    let token: any;
    var decoded: any;
    if (typeof window !== "undefined") {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token')
            decoded = jwt_decode(token);
        }
    }
    const [userName, setUserName] = useState(decoded?.name)
    const rename = () => {
        if (Number(userName[0])) return alert('Логин не может начинаться на цифру')
        if (userName !== decoded.name) {
            fetch('http://localhost:5000/api/user/rename', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: decoded.id,
                    newName: userName
                }),
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                }
                location.reload()
            }).catch((e) => {
                alert('Ошибка: сервер выключен')
            });
        } else alert('У вас уже такое имя')

    }
    
    if (decoded?.role === "admin") {
        // fetch('http://localhost:5000/api/user/rename', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         userId: decoded.id,
        //     }),
        // }).then((response) => {
        //     return response.json();
        // }).then((data) => {
        //     if (data.token) {
        //         localStorage.setItem('token', data.token)
        //     }
        //     location.reload()
        // }).catch((e) => {
        //     alert('Ошибка: сервер выключен')
        // });
    }
    return user.isAuth ? (
        <Layout>
            <div className={styles.header}>
                <Logo />
                <div className="d">
                    <p>Здравствуй, {decoded.name}</p>
                </div>
                <div className={styles.header__menu}>
                    <Logout />
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.main__block}>
                    <p className={styles.block__name}>Редактирование профиля</p>
                    <div className={styles.edit__profile}>
                        <div className={styles.container__image}>
                            <img src={decoded.image} alt={decoded.name} />
                            <div className={styles.image__back}></div>
                        </div>
                        <div className={styles.container__name}>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} maxLength={30} />
                            <button onClick={rename}>Изменить имя</button>
                        </div>
                    </div>
                </div>
                <div className={styles.main__block}>
                    <p className={styles.block__name}>Отзывы</p>
                    {decoded.role !== 'admin' ? (
                        <div className="reviews__block">
                            <p>Отзыв на нас</p>
                            <div className="reviews__about">

                            </div>
                            <p>Отзывы на товары</p>
                            <div className="reviews__product">

                            </div>
                        </div>
                    ) : (
                        <div className="admin">
                            <p>Открытые заказы</p>
                            <div className="open__order">

                            </div>
                            <p>Завершенные заказы</p>
                            <div className="close__order">

                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    ) : (
        <Error />
    )
})

export default User