import React, { useState, useEffect } from "react"
import styles from './contact.module.css'
import { IInformation } from 'src/constant'


export const Contact: React.FC = () => {
    const [arrayInformation, setArrayInformation] = useState<IInformation[]>();
    useEffect(() => {
        fetch('http://localhost:5000/api/information')
            .then((res) => res.json())
            .then((data) => {
                setArrayInformation(data)
            }).catch((e) => {
                alert('Ошибка: сервер выключен')
            });
    }, [])
    
    
    return (
        <div className={styles.contact}>
            <div className={styles.post}>
                {arrayInformation && arrayInformation.map((e) =>
                    <div key={e.address}>
                        <p>{e.address}</p>
                        <p>{e.phone}</p>
                        <p>{e.timeStart} - {e.timeEnd}</p>
                    </div>
                )}
            </div>
            <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d59827.07539450422!2d37.709131767075824!3d55.77912247299251!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54a8dc17cb187%3A0xa903e7259290ae52!2z0JrRg9GA0YHQutCw0Y8!5e0!3m2!1sru!2sru!4v1669492154302!5m2!1sru!2sru" loading="lazy"></iframe>
        </div>
    )
}

export default Contact