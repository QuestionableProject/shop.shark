import React, { useEffect } from "react"
import Head from 'next/head'

import styles from './layout.module.css'
import { useAppContext } from "./state"
export interface ILayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
    const { user } = useAppContext()
    let token: string | null;
    if (typeof window !== "undefined") {
        if (localStorage.getItem('token')) {
            token = localStorage.getItem('token')
        }
    }
    useEffect(() => {
        if (token) {
            fetch('http://localhost:5000/api/user/auth', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then((res) => res.json())
                .then((data) => {
                    if (data.token) {
                        localStorage.setItem('token', data.token)
                        user.setIsAuth(true)
                        user.setUser(true)
                    }
                })
        }
    }, [])
    return (
        <div className={styles.Layout}>
            <Head>
                <title>ShopShark</title>
            </Head>
            {children}
        </div>
    )
}

export default Layout