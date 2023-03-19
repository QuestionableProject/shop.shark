export type IProducts = {
    id: number
    name: string
    category: string
    description: string
    prise: number
    image: string
}
export type IInformation = {
    address: string
    phone: string
    timeStart: string
    timeEnd: string
}
export type IInresting = {
    img: string
    url: string
}

export const intresting: IInresting[] = [
    {img: "https://images.unsplash.com/photo-1666932520929-c4f447b98224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60", url: "cooking"},
    {img: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZmlzaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", url: "fish"},
    {img: "https://images.unsplash.com/photo-1529230117010-b6c436154f25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmlzaGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60", url: "fishing"},
]
