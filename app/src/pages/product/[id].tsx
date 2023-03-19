import React, { useState } from "react"
import Layout from "src/components/layout";
import Login from "src/components/login/login";
import Portal from "src/components/portal";
import Curt from "src/components/svg/curt";
import Log from "src/components/svg/log";
import Logo from "src/components/svg/logo";
import styles from './id.module.css'
import { useTransition } from 'react-spring'
import Back from "src/components/login/back";
import { useAppContext } from "src/components/state";
import { observer } from "mobx-react-lite";
import jwt_decode from "jwt-decode";
import CurtBlock from "src/components/curt/curt";
import { UserProfile } from "src/components/svg/user";

export const getServerSideProps = async (context: any) => {
    const { id } = context.params;
    const response = await fetch(`http://localhost:5000/api/products/${id}`);
    const data = await response.json();
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data
        },
    }
};
export interface Props {
    data: any
}

export const ProductPage: React.FC<Props> = observer(({ data }) => {
    const [loginOut, setLoginOut] = useState(false)
    const { user } = useAppContext()
    const [curt, setCurt] = useState(false)
    let token: any;
    var decoded: any;
    if (typeof window !== "undefined") {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token')
            decoded = jwt_decode(token);
        }
    }

    function buy() {
        if (user.isAuth !== true) {
            return alert('Чтобы делать покупки, войдите в аккаунт');
        }
        fetch('http://localhost:5000/api/curt', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: data.id,
                userId: decoded.id
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            alert(data)
        }).catch((e) => {
            console.log(e);
            alert('Ошибка: сервер выключен или ведутся тех работы')
        });
    }

    const loginAnimate = useTransition(loginOut, {
        from: {
            x: 200,
            opacity: 0,
        },
        enter: {
            x: 0,
            opacity: 1,
        },
        leave: {
            x: 200,
            opacity: 0,
        },
    })
    const curtAnimate = useTransition(curt, {
        from: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
        },
        leave: {
            opacity: 0,
        },
    })

    return (
        <Layout>
            <Portal selector="#modal">
                {curtAnimate((style, curt) =>
                    curt && <CurtBlock open={curt} style={style} onToggle={setCurt} />
                )}
            </Portal>
            <Portal selector="#modal">
                {loginAnimate((style, loginOut) =>
                    loginOut && <Login open={loginOut} style={style} onToggle={setLoginOut} />
                )}
            </Portal>
            {loginOut && (
                <Portal selector="#modal">
                    <Back />
                </Portal>
            ) || curt && (
                <Portal selector="#modal">
                    <Back />
                </Portal>
            )}
            <div className={styles.header}>
                <Logo />
                <div>
                </div>
                <div className={styles.header__menu}>
                    {user.isAuth ? (
                        <UserProfile image={decoded.image} />
                    ) : (
                        <Log setLoginOut={setLoginOut} />
                    )}
                    <Curt active={setCurt} />
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.img}>
                    <img src={data.image} alt="" />
                </div>
                <div className={styles.text}>
                    <div className={styles.text__first}>
                        <p className={styles.name}>{data.name}</p>
                        <p className={styles.prise}>{data.prise}₽</p>
                    </div>
                    <p className={styles.description}>{data.description}</p>
                    <button onClick={buy}>Купить товар</button>
                </div>
            </div>
        </Layout>
    )
})

export default ProductPage