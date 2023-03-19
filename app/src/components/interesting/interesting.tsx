import React from "react"
import Link from "next/link"
import { intresting } from "src/constant"
import styles from './interesting.module.css'
export const Interesting: React.FC = () => {
    return (
        <div className={styles.interesting}>
            <div className={styles.grid}>
                {intresting.map((e) => 
                    <Link key={e.url} href={`/${e.url}`}>
                        <div className={styles.collaps} style={{background: `url(${e.img}) no-repeat`, backgroundSize: "cover"}}/>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Interesting