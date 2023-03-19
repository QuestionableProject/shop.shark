import React from "react"

export interface Arrow {
    className: string
    newblock: () => void;
}

export const Arrow: React.FC<Arrow> = ({className, newblock}) => {
    return (
        <svg  onClick={newblock} className={className} width="30px" height="30px" viewBox="0 0 11 20" version="1.1">
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(-548.000000, -3434.000000)">
                    <g transform="translate(100.000000, 3378.000000)">
                        <g transform="translate(442.000000, 54.000000)">
                            <g>
                                <polygon opacity="0.87" points="0 0 24 0 24 24 0 24"></polygon>
                                <path d="M16.62,2.99 C16.13,2.5 15.34,2.5 14.85,2.99 L6.54,11.3 C6.15,11.69 6.15,12.32 6.54,12.71 L14.85,21.02 C15.34,21.51 16.13,21.51 16.62,21.02 C17.11,20.53 17.11,19.74 16.62,19.25 L9.38,12 L16.63,4.75 C17.11,4.27 17.11,3.47 16.62,2.99 Z" fill="white"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
    )
}

export default Arrow