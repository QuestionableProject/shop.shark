import React from "react"
import Star from "../svg/star"
import { IReviews } from "./aboutme"
import styles from './feedback.module.css'

export interface FeedbackProps {
    reviews: IReviews[]
}

export const FeedbackCard: React.FC<any> = ({ reviews }) => {
    
    return (
        <div className={styles.FeedbackCard}>
            <div className={styles.feedback__block}>
                <div className={styles.photo} style={{ background: `url(${reviews.user.image}) center/100%`, backgroundSize: "cover" }} />
                <div className={styles.feedback__information}>
                    <p>{reviews.user.name}</p>
                    <div className="star">
                        Оценка: {reviews.star}/5
                    </div>
                </div>
            </div>
            <p>"{reviews.text}"</p>
        </div>
    )
}

export default FeedbackCard