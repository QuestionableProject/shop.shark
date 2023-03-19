import React from "react"
import styles from './eye.module.css'
export interface IEye {
    check: string
    onCheck: (state: string) => void
}

export const Eye: React.FC<IEye> = ({check, onCheck}) => {
    return (
        <svg onClick={() => check==="password"?onCheck('text'):onCheck('password')} style={check!=="password"?{stroke: "black"}:undefined} className={styles.Eye} width={20} height={20} viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
    )
}

export default Eye