type Navigation = {
    name: string
    filters: string[]
    order: number
    available: boolean
    categories: {
        name: string
        filters: string[],
        order: number,
        available: boolean,
        subcategories: {
            name: string,
            filters: string[],
            order: number,
            available: boolean,
        }[]
    }[]
}[]



export const NAVIGATION_DEPARTMENTS: Navigation = [

    // Men
    {
        name: "Men",
        filters: ["men", "unisex"],
        order: 1,
        available: true,
        categories: [
            // Clothing
            {

                name: "Clothing",
                filters: ["clothing"],
                order: 0,
                available: true,
                subcategories: [
                    {
                        name: "Jackets",
                        filters: ["coats", "blazers-vests", "jackets", "down-jackets", "furs", "leather-jackets", "trench-coats"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Jeans",
                        filters: ["jeans"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        filters: ["knitwear"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Pants",
                        filters: ["pants", "leggings", "bermuda-shorts"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Shirts",
                        filters: ["shirts"],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Socks",
                        filters: ["socks"],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Suits",
                        filters: ["suits"],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        filters: ["sweatshirts"],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Swimwear",
                        filters: ["swimwear"],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Top",
                        filters: ["top", "polo-shirts", "t-shirts"],
                        order: 9,
                        available: true,
                    },
                    {
                        name: "Underwear",
                        filters: ["underwear"],
                        order: 10,
                        available: true,
                    }
                ],
            },
            // Footwear
            {
                name: "Footwear",
                filters: ["footwear"],
                order: 1,
                available: true,
                subcategories: [
                    {
                        name: "Boots",
                        filters: ["boots"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Lace Up",
                        filters: ["lace-up"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Loafers",
                        filters: ["loafers"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Slides & Sandals",
                        filters: ["sandals", "espadrilles"],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        filters: ["sneakers"],
                        order: 5,
                        available: true,
                    }
                ],
            },
            // Bags
            {
                name: "Bags",
                filters: ["bags"],
                order: 2,
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        filters: ["backpacks"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Clutches",
                        filters: ["clutches"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Handbags",
                        filters: ["handbags", "briefcases", "bucket-bags"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        filters: ["shoulder-bags"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Travel Bags",
                        filters: ["travel-bags"],
                        order: 4,
                        available: true,
                    }
                ],
            },
            // Accessories
            {
                name: "Accessories",
                filters: ["accessories"],
                order: 3,
                available: true,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        filters: ["beauty-cases"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Belts & Braces",
                        filters: ["belts-braces"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Cover & Cases",
                        filters: ["cover-cases"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Eyewear",
                        filters: ["sunglasses"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Gloves",
                        filters: ["gloves"],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Hats",
                        filters: ["hat-hairbands"],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Key Rings",
                        filters: ["key-rings"],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Scarves",
                        filters: ["scarves"],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Ties",
                        filters: ["bowties-ties"],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Wallets",
                        filters: ["wallets"],
                        order: 9,
                        available: true,
                    },
                ],
            },
            // Jewellery
            {
                name: "Jewellery",
                filters: ["jewellery"],
                order: 4,
                available: true,
                subcategories: [
                    {
                        name: "Bracelets",
                        filters: ["bracelets"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Necklaces",
                        filters: ["bracelets"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Rings",
                        filters: ["rings"],
                        order: 2,
                        available: true,
                    },
                ],
            },
        ],
    },


    // Women
    {
        name: "Women",
        filters: ["women"],
        order: 0,
        available: true,
        categories: [
            // Clothing
            {
                name: "Clothing",
                filters: ["clothing"],
                order: 0,
                available: true,
                subcategories: [
                    {
                        name: "Coats & Jackets",
                        filters: ["coats", "jackets", "blazers-vests", "trench-coats", "down-jackets", "furs", "leather-jackets"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Dresses",
                        filters: ["dresses", "long-dresses"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Jeans",
                        filters: ["jeans"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Jumpsuits",
                        filters: ["jumpsuits"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        filters: ["knitwear"],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Pants & Shorts",
                        filters: ["pants", "bermuda-shorts", "leggings"],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Skirts",
                        filters: ["skirts"],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Suits",
                        filters: ["suits"],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        filters: ["sweatshirts"],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Swimwear",
                        filters: ["swimwear"],
                        order: 9,
                        available: true,
                    },
                    {
                        name: "Socks",
                        filters: ["socks"],
                        order: 10,
                        available: true,
                    },
                    {
                        name: "Top",
                        filters: ["top", "polo-shirts", "shirts", "t-shirts"],
                        order: 11,
                        available: true,
                    },

                    {
                        name: "Underwear",
                        filters: ["underwear"],
                        order: 12,
                        available: true,
                    }
                ],
            },

            // Footwear
            {
                name: "Footwear",
                filters: ["footwear"],
                order: 1,
                available: true,
                subcategories: [
                    {
                        name: "Boots",
                        filters: ["boots"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Flat Shoes",
                        filters: ["ballerinas", "espadrilles"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "High-Heeled Shoes",
                        filters: ["pumps", "wedges"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Lace Up",
                        filters: ["lace-up"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Loafers",
                        filters: ["loafers"],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Sandals",
                        filters: ["sandals"],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        filters: ["sneakers"],
                        order: 6,
                        available: true,
                    },

                ],
            },
            // Bags
            {
                name: "Bags",
                filters: ["bags"],
                order: 2,
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        filters: ["backpacks"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Clutches",
                        filters: ["clutches", "beauty-cases"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Handbags",
                        filters: ["handbags", "bucket-bags"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        filters: ["shoulder-bags"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Travel Bags",
                        filters: ["travel-bags"],
                        order: 4,
                        available: true,
                    }
                ],
            },

            // Accessories
            {
                name: "Accessories",
                filters: ["accessories"],
                order: 3,
                available: true,
                subcategories: [
                    {
                        name: "Belts & Braces",
                        filters: ["belts-braces"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Covers & Cases",
                        filters: ["covers-cases"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Eyewear",
                        filters: ["sunglasses"],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Gloves",
                        filters: ["gloves"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Hats & Hairbands",
                        filters: ["hats-hairbands"],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Keyrings & Chains",
                        filters: ["keyrings-chains"],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Scarves",
                        filters: ["scarves"],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Wallets",
                        filters: ["wallets"],
                        order: 7,
                        available: true,
                    }
                ],
            },

            // Jewellery
            {
                name: "Jewellery",
                filters: ["jewellery"],
                order: 4,
                available: true,
                subcategories: [
                    {
                        name: "Bracelets",
                        filters: ["bracelets"],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Earrings",
                        filters: ["earrings"],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Necklaces",
                        filters: ["necklaces"],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Rings",
                        filters: ["rings"],
                        order: 4,
                        available: true,
                    }
                ],
            },
        ],
    },

    // Lifestyle
    {
        name: "Lifestyle",
        filters: ["lifestyle"],
        order: 3,
        available: true,
        categories: [
            {
                name: "Accessories",
                filters: ["accessories"],
                order: 1,
                available: true,
                subcategories: [],
            },
            {
                name: "Home",
                filters: ["home"],
                order: 0,
                available: true,
                subcategories: []
            },
            {
                name: "Textile",
                filters: ["textile"],
                order: 2,
                available: true,
                subcategories: []
            },
        ],
    },
];