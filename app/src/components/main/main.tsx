import React, { useState } from "react"
import styles from './main.module.css'
import img from "../../assets/img/RSROOM3000.png"
import Fish from "../svg/fish"
import Vk from "../svg/vk"
import Telegrem from "../svg/telgram"
import Instagram from "../svg/instagram"

export const Main: React.FC = () => {
    const [scroll, setScroll] = useState<number>(0)
    return (
        <div className={styles.main}>
            {scroll === 0 && (
                <div className={styles.center}>
                    <Fish />
                    <p style={{pointerEvents: "none"}}>ShopShark</p>
                    <img style={{ pointerEvents: "none",transform: "rotate(15deg)"}}  height={500} src={img.src} alt="ERROR" />
                </div>
            )}
            <div className={styles.main__hem}>
                <div className={styles.social}>
                    <Vk />
                    <Telegrem />
                    <Instagram />
                </div>
                <div className={styles.dotted}>
                    <div className={styles.cercl} onClick={() => setScroll(0)} style={scroll === 0 ? { padding: "5px" } : undefined}></div>
                </div>
                <div className="">
                    Все права защищены ©
                </div>
            </div>
        </div>
    )
}

export default Main