import React, { useRef, useEffect, useState } from "react"
import styles from './curt.module.css'
import { animated } from "react-spring"
import jwt_decode from "jwt-decode";
import CurtCard from "./curtCard";
import { useAppContext } from "../state";
import { observer } from "mobx-react-lite";

export interface CurtProps {
    open: boolean
    onToggle: (state: boolean) => void
    style: any
}
export type ICurt = {
    product: IProd
    productId: number
}
export type IProd = {
    name: string,
    image: string,
    prise: number,
}
export const CurtBlock: React.FC<CurtProps> = observer(({ open, onToggle, style }) => {
    const { user, product } = useAppContext()
    const [allPrise, setAllPrise] = useState(0)
    const [nameOrder, setNameOrder] = useState<string>('')
    const [surnameOrder, setSurnameOrder] = useState<string>('')
    const [phoneOrder, setPhoneOrder] = useState<string>('')
    const [addressOrder, setAddressOrder] = useState<string>('')



    const CurtRef = useRef<HTMLDivElement>(null)
    let token: any;
    var decoded: any;
    if (typeof window !== "undefined") {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token')
            decoded = jwt_decode(token);
        }
    }
    useEffect(() => {
        if (decoded) {
            fetch('http://localhost:5000/api/curt/getcurt', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: decoded.id
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    product.setCurt(data)
                }).catch((e) => {
                    alert('Ошибка: сервер выключен')
                });
        }
    }, [])
    useEffect(() => {
        const onClick = (e: any) => {
            if (!CurtRef.current?.contains(e.target) && !e.target.getAttribute("data-curt")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)
        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, CurtRef])
    const order = () => {
        if (product.curt.length === 0) return alert('Корзина пуста')
        if (nameOrder.length===0 || surnameOrder.length===0 || phoneOrder.length===0 || addressOrder.length === 0) return alert('Проверьте введенные данные, возможно вы что-то забыли!')
        if (parseInt(nameOrder.replace(/\D/g, ''))) return alert('В имени не могут быть цифры');
        if (parseInt(surnameOrder.replace(/\D/g, ''))) return alert('В фамилии не могут быть цифры');
        fetch('http://localhost:5000/api/curt/order', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: decoded.id, 
                name: nameOrder, 
                surname: surnameOrder, 
                phone: phoneOrder, 
                address: addressOrder
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data);
                if(data) {
                    product.setProd(product.curt.splice(0, product.curt.length))
                }
                setNameOrder('')
                setSurnameOrder('')
                setAddressOrder('')
                setPhoneOrder('')
            }).catch((e) => {
                alert('Ошибка: сервер выключен')
            });
    }
    return user.isAuth ? (
        <animated.div ref={CurtRef} style={style} className={styles.Curt} data-curt>
            <div className={styles.curt__box}>
                <h3>Корзина</h3>
                {product.curt.length !== 0 ? (
                    <div className={styles.curt__product}>
                        {product.curt.map((e: ICurt, i: number) =>
                            <CurtCard key={e.productId} i={i} data={e.product} userid={decoded.id} productid={e.productId} />
                        )}
                    </div>
                ) : (
                    <p>Корзина пуста</p>
                )}
                <p>Общая сумма заказа: 0 ₽</p>
            </div>
            <div className={styles.curt__decoration}>
                <h3>Оформить заказ</h3>
                <div className={styles.decoration}>
                    <input type="text" placeholder="Имя" value={nameOrder} onChange={(e) => setNameOrder(e.target.value)} />
                    <input type="text" placeholder="Фамилия" value={surnameOrder} onChange={(e) => setSurnameOrder(e.target.value)} />
                    <input type="text" placeholder="Телефон" maxLength={11} value={phoneOrder} onChange={(e) => setPhoneOrder(e.target.value)} />
                    <input type="text" placeholder="Адрес доставки" value={addressOrder} onChange={(e) => setAddressOrder(e.target.value)} />
                </div>
                <button onClick={order}>Оформить заказ</button>
            </div>
        </animated.div>
    ) : (
        <animated.div ref={CurtRef} style={style} className={styles.Curt} data-curt>
            <h3>Корзина будет пуста, пока вы не войдете</h3>
        </animated.div>
    )
})

export default CurtBlock