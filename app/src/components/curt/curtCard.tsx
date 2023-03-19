import React, { useState } from "react"
import { useAppContext } from "../state"
import { ICurt, IProd } from "./curt"
import styles from './curtCard.module.css'

export interface ICurtCard {
    data: IProd,
    productid: number,
    userid: number
    i: number
}
export const CurtCard: React.FC<ICurtCard> = ({ data, productid, userid, i }) => {
    const [count, setCount] = useState(1)
    const {product} = useAppContext()
    
    const del = () => {
        fetch('http://localhost:5000/api/curt/delete', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productId: productid, userId: userid
            }),
        }).then((res) => res.json(
                
        )).then((data) => {
            if (data === 'Товар удален') {
                product.curt.splice(i, 1) 
                product.setCurt(product.curt)
            }
            
        }).catch((e) => {
                alert('Ошибка: сервер выключен')
            });
    }
    return (
        <div className={styles.Card}>
            <div className={styles.block}>
                <img src={data.image} alt="" />
                <div className={styles.text}>
                    <p>{data.name}</p>
                    <p>{data.prise}₽</p>
                </div>
            </div>
            <div className={styles.btn}>
                <button onClick={() => count <= 1 ? alert('Нельзя сделать меньше 1') : setCount(count - 1)}>-</button>
                <p>{count}</p>
                <button onClick={() => count >= 10 ? alert('Нельзя сделать больше 10') : setCount(count + 1)}>+</button>
            </div>
            <div className={styles.option}>
                <p style={{cursor: "pointer"}} onClick={del}>Удалить товар</p>
            </div>
        </div>
    )
}

export default CurtCard