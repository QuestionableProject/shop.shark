import React from "react"

export const Admin: React.FC = () => {
    return (
        <div>
            <div className="new__product">
                <input type="text" placeholder="Название товара"/>
                <input type="text" placeholder="Описание товара"/>
                <input type="text" placeholder="Стоимость товара"/>
                <input type="file" placeholder="Фото товара"/>
            </div>
        </div>
    )
}

export default Admin