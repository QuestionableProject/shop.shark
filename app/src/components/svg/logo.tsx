import React from "react"
import Link from "next/link"
export const Logo: React.FC = () => {
    return (
        <Link href="/">
            <h1 style={{cursor: "pointer"}}>ShopShark</h1>
        </Link>
    )
}

export default Logo