import React from "react"
import { IProducts } from "src/constant"
import styles from './card.module.css'
import Link from "next/link"
import { useAppContext } from "src/components/state";
import jwt_decode from "jwt-decode";

export interface ICard {
    products: IProducts
}
export const Card: React.FC<ICard> = ({ products }) => {
    const {user} = useAppContext()
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
                productId: products.id,
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
    return (
        <div className={styles.card}>
            <div className={styles.img}>
                <img src={products.image} alt={products.name} />
            </div>
            <div className={styles.information}>
                <div className={styles.text}>
                    <p>{products.name}</p>
                    <p>{products.prise}₽</p>
                </div>
                <div className={styles.btn}>
                    <Link href={`product/${products.id}`}>
                        <button>Подробнее</button>
                    </Link>
                    <button onClick={buy}>Купить сейчас</button>
                </div>
            </div>

        </div>
    )
}

export default Card