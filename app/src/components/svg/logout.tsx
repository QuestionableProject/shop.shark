import { observer } from "mobx-react-lite";
import React from "react"
import { useAppContext } from "../state"

export const Logout: React.FC = observer( () => {
    const { user } = useAppContext()
    
    return (
        <div style={{ cursor: "pointer" }} onClick={() => {
            location.href ='/'
            user.setIsAuth(false);
            user.setUser({});
            localStorage.removeItem("token")
        }} data-login>Выйти</div>
    )
})

export default Logout