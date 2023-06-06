export type Product = {
    mongo_id: string
    id: number
    sku: string
    brand: Brand
    name: string
    description: string
    features: Feature[]
    department: Department
    category: Category
    subcategory: Subcategory
    price: number
    wholesale_price: number
    sizes: object
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
    id: Number,
    name: String,
    categories: Category[]
}

export type Category = {
    id: Number,
    name: String,
    subcategories: Subcategory[]
}

export type Subcategory = {
    id: Number,
    name: String,
}