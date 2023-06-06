export type Product = {
    mongo_id: string
    id: number
    sku: string
    brand: Brand
    name: string
    description?: string
    features?: Feature[] 
    department: Department 
    category: Category 
    subcategory?: Subcategory
    price: number
    wholesale_price: number
    sizes: Size[]
    images: string[]
    status: number
    available: boolean
    updated_at?: number
    created_at?: number
}

export type Brand = {
    id: number
    name: string
}

export type Option = {
    id: number
    name: string
}

export type Feature = {
    id_feature: string
    name: string
    position: string
    value: string
}

export type Size = {
    variant_id: string
    name: string
    quantity: string
}

export type FilterValue = {
    department?: string,
    category?: string,
    subcategory?: string,
}

export type Filter = {
    id: string,
    name: string,
    value: FilterValue
}

export type Department = {
    id: number,
    name: string,
    categories: Category[]
}

export type Category = {
    id: number,
    name: string,
    subcategories: Subcategory[]
}

export type Subcategory = {
    id: number,
    name: string,
}