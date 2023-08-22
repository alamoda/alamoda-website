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
    description?: string
    slug: string
    mapped_ids: [number]
    available: boolean
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

export type Department = {
    mongo_id?: string
    name: string
    description: string
    slug: string
    mapped_ids: number[]
    order: number
    available: boolean
    categories: Category[]
}

export type Category = {
    mongo_id?: string
    name: string
    slug: string
    mapped_ids: number[]
    order: number
    available: boolean
    subcategories: Subcategory[]
}

export type Subcategory = {
    mongo_id?: string
    slug: string
    name: string
    order: number
    available: boolean
    mapped_ids: number[]
}

export type Route = {
    name: string,
    href: string
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
    filters: string[]
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


// TODO
// export type ProductFilters = {
//     department?: Department,
//     category?: Category,
//     subcategories?: Subcategory[]
//     order?: SortOption
//     brands?: Brand[]
//     statuses?: string[]
//     excludes?: string[]
//     limit?: number
//     available?: boolean
// }

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

export type ProductAPIFilter = {
    department: string
    category: string
    subcategories: string[]
    brands: string[]
    query: string
    order: string
    skip: number
    take: number
    statuses: ProductScrapeStatus[]
    available: boolean
    exclude: string[]
}

export type ProductFilters = {
    
    // Mandatory
    statuses: ProductScrapeStatus[]
    available: boolean

    // Optional
    department?: string
    category?: string
    subcategories?: string[]
    brands?: string[]
    query?: string
    exclude?: string[]
}