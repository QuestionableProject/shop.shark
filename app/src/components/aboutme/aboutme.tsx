import React, {useState, useEffect} from "react"
import styles from './aboutme.module.css'
import FeedbackCard from "./feedback"

export type IReviewsUser = {
    name: string
    image: string
}
export type IReviews = {
    id: number
    star: number
    text: string
    user: IReviewsUser[]
}

export const Aboutme: React.FC = () => {
    const [reviews, setReviews] = useState<IReviews[]>()
    const [rew, setRew] = useState(false)
    useEffect(() => {
        fetch('http://localhost:5000/api/reviews')
            .then((res) => res.json())
            .then((data) => {
                setReviews(data?.splice(-3))
            }).catch((e) => {
                alert('Ошибка: сервер выключен')
            });
    }, [])
    return (
        <div className={styles.aboutme}>
            <div className={styles.text}>
                <h2>Расскажем о себе!</h2>
                <p>Мы предоставляем рыбакам самую новейшую экипировку для рыбалки и не только. Начиная с 2008 года, мы развивались в этой индустрии и старались делать и продавать максимально качественные товары для рыбаков. Мы старались не подводить вас и всегда шли только вперед. За это нас и полюбили, если посмотреть на отзывы то вы увидите 1000+ положительных результатов.</p>
            </div>
            <div className={styles.official}>
                <p style={{fontSize: "25px", fontWeight: "bold"}} >Отзывы на нас</p>
                <div className={styles.feedback}>
                    {reviews && reviews.map((e) =>
                        <FeedbackCard key={e.id} reviews={e} />
                    )}
                </div>
            </div>
            <p onClick={() => setRew(true)}>Оставить свой отзыв</p>
            {rew && <input type="text" />}
        </div>
    )
}

export default Aboutme