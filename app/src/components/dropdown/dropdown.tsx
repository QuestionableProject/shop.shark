import React, { useRef, useEffect } from "react"
import styles from './dropdown.module.css'
import { animated } from "react-spring"

interface DropDownProps {
    open: boolean
    onToggle: (state: boolean) => void
    setElement: (state: number) => void
    element: number
    style: any
}

export const DropDown: React.FC<DropDownProps> = ({ open, onToggle, element, setElement, style }) => {
    const dropDownRef = useRef<any>(null)
    useEffect(() => {
        const onClick = (e: any) => {
            if (!dropDownRef?.current.contains(e.target) && !e.target.getAttribute("data-dropdown")) {
                onToggle(false)
            }
        }

        document.addEventListener('click', onClick)
        return () => {
            document.removeEventListener('click', onClick)
        }
    }, [open, dropDownRef])
    return (
        <animated.div className={styles.dropdown} style={style} ref={dropDownRef}>
            <ul>
                <li onClick={() => setElement(0)} style={element === 0 ? { color: "white" } : undefined}>Главная</li>
                <li onClick={() => setElement(1)} style={element === 1 ? { color: "white" } : undefined}>Каталог</li>
                <li onClick={() => setElement(2)} style={element === 2 ? { color: "white" } : undefined}>О нас</li>
                {/* <li onClick={() =>  setElement(3)} style={element===3 ?{color: "white"}:undefined}>Интересное</li> */}
                <li onClick={() => setElement(4)} style={element === 4 ? { color: "white" } : undefined}>Контакты</li>
            </ul>
        </animated.div>
    )
}

export default DropDown