export type Product = {
    mongo_id: string
    id: number
    sku: string
    brand: Brand
    name: string
    description: string
    features: string[]
    department: string
    category: string
    subcategory: string
    price: number
    wholesale_price: number
    sizes: string[]
    images: string[]
    status: number
    available: boolean
}

export type Brand = {
    id: number
    name: string
}

export type Option = {
    id: number
    name: string
}

export type Department = {
    id: string
    name: string
    href: string
    categories: Category[]
}

export type Category = {
    id: string
    name: string
    href: string
    imageSrc: string
    imageAlt: string
    subcategories: Subcategory[]
}

export type Subcategory = {
    id: string 
    name: string
}