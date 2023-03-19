import React from "react"
import styles from './loader.module.css'

export const Loader: React.FC = () => {
    return (
        <svg className={styles.loader} height="300">
            <circle r="100" cx="150" cy="150" />
        </svg>
    )
}

export default Loader