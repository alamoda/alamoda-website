import { Brand, Product } from "@prisma/client"
import { ProductWithRelations } from "../(lib)/db"

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

export type Department = {
    name: string
    description: string
    slug: string
    available: boolean
    categories: Category[]
}

export type Category = {
    name: string
    slug: string
    available: boolean
    subcategories: Subcategory[]
}

export type Subcategory = {
    slug: string
    name: string
    available: boolean
}

export type SortOption = {
    name: string,
    slug: string
    filter: object
}

export type CartProduct = {
    product: Product,
    size: Size
    quantity: number
}

export type Order = {
    mongo_id: string
    cart_products: Object[]
    amount?: number
    name?: string
    email: string
    street?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
    paid: boolean
    created_at: string
}








export type NavigationDepartment = {
    name: string
    description: string
    filter: string
    order: number
    available: boolean
    categories: NavigationCategory[]
}

export type NavigationCategory = {
    name: string
    filters: string[],
    order: number,
    available: boolean,
    subcategories: NavigationSubcategory[]
}

export type NavigationSubcategory = {
    name: string,
    filters: string[],
    order: number,
    available: boolean,
}

export type NavigationBrands = {
    name: string
    filters: string[]
}

export type NavigationPages = {
    name: string,
    href: string,
}

export type Navigation = {
    departments: NavigationDepartment[]
    // brands: NavigationBrands[]
    pages: NavigationPages[]
}

export type ProductFilters = {
    
    // Mandatory
    statuses: ProductScrapeStatus[]
    available: boolean

    // Optional
    department?: Department
    category?: Category
    subcategories?: Subcategory[]
    brands?: Brand[]
    query?: string
    exclude?: ProductWithRelations[]
}

enum ProductScrapeStatus {
    // Fatal problem in processing the product
    FATAL = -1,
    // No image found
    NO_IMAGE = 0,
    // Image found but only small size
    SMALL_IMAGE = 1,
    // Full size image found
    FULL_IMAGE = 2,
}