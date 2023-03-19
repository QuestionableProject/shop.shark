import React from "react"
import Link from "next/link"
import styles from './error.module.css'
import Layout from "src/components/layout"
export const Error: React.FC = () => {
    return (
        <Layout>
            <div className={styles.Error}>
                <p style={{ pointerEvents: "none" }}>Страницы не существует</p>
                <Link href="/">
                    <p style={{ cursor: "pointer" }}>Вернуться на главную</p>
                </Link>
                <p style={{ pointerEvents: "none" }} className={styles.background__text}>OOPS</p>
            </div>
        </Layout>
    )
}

export default Error