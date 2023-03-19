import React from "react"


export const Log: React.FC<any> = ({setLoginOut}) => {
    return (
        <div style={{cursor: "pointer"}} onClick={()=> setLoginOut(true)} data-login>Войти</div>
    )
}

export default Log
