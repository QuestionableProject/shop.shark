import clsx from "clsx"
import { observer } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { IProducts } from "src/constant"
import { useAppContext } from "../state"
import Arrow from "../svg/arrow"
import Loader from "../svg/loader"
import Card from "./card"
import styles from './product.module.css'

export const Product: React.FC = observer(() => {
    const {product} = useAppContext()
    const [prod, setProdd] = useState<any>()
    
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((res) => res.json())
            .then((data) => {
                product.setProd(data)
                setProdd(product.product)
                setLoading(false)
            }).catch((e) => {
                alert('Ошибка: сервер выключен')
            });
    }, [])

    
    
    const left = () => {
        setProdd(product.product)   
        setProdd(product.product.splice(-15))
    }
    const right = () => {
        setProdd(product.product)
        setProdd(product.product.splice(15))
    }
    return !loading? (
        <div className={styles.product}>
            <Arrow newblock={left} className={clsx(styles.btn, styles.btn1)} />
            <Arrow newblock={right} className={clsx(styles.btn, styles.btn2)} />
            <div className={styles.product__block}>
                {prod && prod.map((e: IProducts) =>
                    <Card key={e.id} products={e} />
                )}
            </div>
        </div>
    ):(
        <Loader/>
    )
})

export default Product