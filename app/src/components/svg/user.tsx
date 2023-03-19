import Link from "next/link"
import React from "react"
import styles from './user.module.css'

interface UserProfile {
    image?: string
} 
export const UserProfile: React.FC<UserProfile> = ({image}) => {
    return image?(
        <img onClick={() => location.href='/user'} className={styles.image} src={image} alt="UserPhoto" />
    ): (
        <div>Профиль</div>
    )
}

export default UserProfile