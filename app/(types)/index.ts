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
    mongo_id: string
    name: string
}

export type Option = {
    mongo_id: string
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
    mongo_id?: string,
    name: string,
    slug: string,
    mapped_ids: number[],
    categories: Category[]
}

export type Category = {
    mongo_id?: string,
    name: string,
    slug: string,
    mapped_ids: number[]
    subcategories: Subcategory[]
}

export type Subcategory = {
    mongo_id?: string,
    slug: string,
    name: string,
    mapped_ids: number[],
}

export type Route = {
    name: string,
    href: string
}

export type SortOption = {
    name: string,
    value: string
}