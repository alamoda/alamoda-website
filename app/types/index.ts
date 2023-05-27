export type Product = {
    mongo_id: string
    id: number
    sku: string
    name: string
    description: string
    features: string[]
    gender: string
    category: string
    price: number
    wholesale_price: number
    sizes: string[]
    images: string[]
    status: number
    available: boolean
}