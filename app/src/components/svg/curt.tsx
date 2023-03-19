import React from "react"

export const Curt: React.FC<any> = ({ active }) => {
    return (
        <svg style={{
            cursor: "pointer"
        }}
            onClick={() => active(true)}
            data-curt
            xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
    )
}

export default Curt