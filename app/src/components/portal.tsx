import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export interface IPortal {
    children: JSX.Element
    selector: string,
}

export const Portal: React.FC<IPortal> = ({children, selector}) => {
    const [mounted, setMounted] = useState(false)
    useEffect(()=> {
        setMounted(true)
        return ()=>setMounted(false)
    }, [selector])

    return mounted ? createPortal(children, document.querySelector(selector) as HTMLElement) :null
}

export default Portal
