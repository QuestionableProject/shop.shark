import Link from "next/link"
import React from "react"

export const Instagram: React.FC = () => {
    return (
        <Link href="https://www.instagram.com/">
            <svg style={{
                cursor: "pointer"
            }} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
        </Link>
    )
}

export default Instagram