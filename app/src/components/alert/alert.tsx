import React from "react"
interface IAlert {
    text: string
}
export const Alert: React.FC<IAlert> = ({text}) => {
    return (
        <div>
            <p>{text}</p>
        </div>
    )
}

export default Alert