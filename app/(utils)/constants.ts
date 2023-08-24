import { Department, Navigation, SortOption } from "../(types)";


export const LETTER_SIZE_ORDER = ["UNI", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];


export const PRODUCT_SORT_OPTIONS: SortOption[] = [
    {
        name: "New in",
        slug: "new-in",
        filter: { created_at: "desc", }
    },
    {
        name: "Price (high first)",
        slug: "price-high",
        filter: { price: "desc", }
    },
    {
        name: "Price (low first)",
        slug: "price-low",
        filter: { price: "asc" }
    },
]

export const DEPARTMENTS: Department[] = [

    // Women
    {
        name: "Women",
        description: "Immerse yourself in the elegance of our premium women's fashion collection. Handpicked from esteemed designers, our selection showcases the finest in luxury wear, from chic dresses to sophisticated separates. Transform your wardrobe with our exclusive array of women's styles.",
        slug: "women",
        available: true,
        categories: [
            // Clothing
            {
                name: "Clothing",
                slug: "clothing",
                available: true,
                subcategories: [
                    {
                        name: "Coats & Jackets",
                        slug: "coats-jackets",
                        available: true,
                    },
                    {
                        name: "Dresses",
                        slug: "dresses",
                        available: true,
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        available: true,
                    },
                    {
                        name: "Jumpsuits",
                        slug: "jumpsuits",
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        available: true,
                    },
                    {
                        name: "Pants & Shorts",
                        slug: "pants-shorts",
                        available: true,
                    },
                    {
                        name: "Skirts",
                        slug: "skirts",
                        available: true,
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        available: true,
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        available: true,
                    },
                    {
                        name: "Top",
                        slug: "top",
                        available: true,
                    },

                    {
                        name: "Underwear",
                        slug: "underwear",
                        available: true,
                    }
                ],
            },

            // Footwear
            {
                name: "Footwear",
                slug: "footwear",
                available: true,
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        available: true,
                    },
                    {
                        name: "Flat Shoes",
                        slug: "flat-shoes",
                        available: true,
                    },
                    {
                        name: "High-Heeled Shoes",
                        slug: "high-heeled-shoes",
                        available: true,
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        available: true,
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        available: true,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        available: true,
                    },

                ],
            },

            // Bags
            {
                name: "Bags",
                slug: "bags",
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        available: true,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        available: true,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        available: true,
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        available: true,
                    }
                ],
            },

            // Accessories
            {
                name: "Accessories",
                slug: "accessories",
                available: true,
                subcategories: [
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        available: true,
                    },
                    {
                        name: "Covers & Cases",
                        slug: "covers-cases",
                        available: true,
                    },
                    {
                        name: "Eyewear",
                        slug: "eyewear",
                        available: true,
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        available: true,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        available: true,
                    },
                    {
                        name: "Keyrings & Chains",
                        slug: "keyrings-chains",
                        available: true,
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        available: true,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        available: true,
                    }
                ],
            },

            // Jewellery
            {
                name: "Jewellery",
                slug: "jewellery",
                available: true,
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        available: true,
                    },
                    {
                        name: "Earrings",
                        slug: "earrings",
                        available: true,
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        available: true,
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        available: true,
                    }
                ],
            },
        ],
    },

    // Men
    {
        name: "Men",
        description: "Discover a curated selection of luxury men's fashion. Our collection features the latest from top designers, with pieces ranging from tailored suits to high-end casual wear. Elevate your style with our exclusive assortment.",
        slug: "men",
        available: true,
        categories: [
            // Clothing
            {

                name: "Clothing",
                slug: "clothing",
                available: true,
                subcategories: [
                    {
                        name: "Jackets",
                        slug: "jackets",
                        available: true,
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        available: true,
                    },
                    {
                        name: "Pants & Shorts",
                        slug: "pants-shorts",
                        available: true,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        available: true,
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        available: true,
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        available: true,
                    },
                    {
                        name: "Top",
                        slug: "top",
                        available: true,
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        available: true,
                    }
                ],
            },
            // Footwear
            {
                name: "Footwear",
                slug: "footwear",
                available: true,
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        available: true,
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        available: true,
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        available: true,
                    },
                    {
                        name: "Slides & Sandals",
                        slug: "slides-sandals",
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        available: true,
                    }
                ],
            },
            // Bags
            {
                name: "Bags",
                slug: "bags",
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        available: true,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        available: true,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        available: true,
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        available: true,
                    }
                ],
            },
            // Accessories
            {
                name: "Accessories",
                slug: "accessories",
                available: true,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        available: true,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        available: true,
                    },
                    {
                        name: "Cover & Cases",
                        slug: "cover-cases",
                        available: true,
                    },
                    {
                        name: "Eyewear",
                        slug: "eyewear",
                        available: true,
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        available: true,
                    },
                    {
                        name: "Hats",
                        slug: "hats",
                        available: true,
                    },
                    {
                        name: "Key Rings",
                        slug: "key-rings",
                        available: true,
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        available: true,
                    },
                    {
                        name: "Ties",
                        slug: "ties",
                        available: true,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        available: true,
                    },
                ],
            },
            // Jewellery
            {
                name: "Jewellery",
                slug: "jewellery",
                available: true,
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        available: true,
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        available: true,
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        available: true,
                    },
                ],
            },
        ],
    },

    // Lifestyle
    {
        name: "Lifestyle",
        description: "Explore our lifestyle selection featuring luxury accessories, stylish home items, and exquisite textiles. Sourced from top designers, each piece promises to enhance your everyday experiences and bring a touch of elegance to your personal style and living space. Experience the essence of luxury living with our curated collection.",
        slug: "lifestyle",
        available: true,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                available: true,
                subcategories: [],
            },
            {
                name: "Home",
                slug: "home",
                available: true,
                subcategories: []
            },
            {
                name: "Textile",
                slug: "textile",
                available: true,
                subcategories: []
            },
        ],
    },

    // Unisex
    // {
    //     name: "Unisex",
    //     description: "Explore the versatility of our unisex fashion collection. Sourced from celebrated designers, our range embodies the fusion of style and comfort, offering an array of luxury pieces that transcend traditional gender norms. Redefine your fashion journey with our exclusive unisex ensemble.",
    //     slug: "unisex",
    //     mapped_ids: [881],
    //     order: 2,
    //     available: true,
    //     categories: [
    //         {
    //             name: "Accessories",
    //             slug: "accessories",
    //             mapped_ids: [882],
    //             order: 3,
    //             available: true,
    //             subcategories: [
    //                 {
    //                     name: "Beauty Cases",
    //                     slug: "beauty-cases",
    //                     mapped_ids: [884],
    //                     order: 0,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Belts & Braces",
    //                     slug: "belts-braces",
    //                     mapped_ids: [885],
    //                     order: 1,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Extras",
    //                     slug: "extras",
    //                     mapped_ids: [897],
    //                     order: 2,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Hats & Hairbands",
    //                     slug: "hats-hairbands",
    //                     mapped_ids: [891],
    //                     order: 3,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Socks",
    //                     slug: "socks",
    //                     mapped_ids: [894],
    //                     order: 4,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Wallets",
    //                     slug: "wallets",
    //                     mapped_ids: [883],
    //                     order: 5,
    //                     available: true,
    //                 }
    //             ],
    //         },
    //         {
    //             name: "Bags",
    //             slug: "bags",
    //             mapped_ids: [923],
    //             order: 2,
    //             available: true,
    //             subcategories: [
    //                 {
    //                     name: "Backpacks",
    //                     slug: "backpacks",
    //                     mapped_ids: [924],
    //                     order: 0,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Clutches",
    //                     slug: "clutches",
    //                     mapped_ids: [927],
    //                     order: 1,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Handbags",
    //                     slug: "handbags",
    //                     mapped_ids: [928],
    //                     order: 2,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Shoulder Bags",
    //                     slug: "shoulder-bags",
    //                     mapped_ids: [929],
    //                     order: 3,
    //                     available: true,
    //                 }
    //             ],
    //         },
    //         {
    //             name: "Clothing",
    //             slug: "clothing",
    //             mapped_ids: [902],
    //             order: 0,
    //             available: true,
    //             subcategories: [
    //                 {
    //                     name: "Bermuda Short",
    //                     slug: "bermuda-short",
    //                     mapped_ids: [903],
    //                     order: 0,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Blazers & Vests",
    //                     slug: "blazers-vests",
    //                     mapped_ids: [904],
    //                     order: 1,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Coats",
    //                     slug: "coats",
    //                     mapped_ids: [905],
    //                     order: 2,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Down Jackets",
    //                     slug: "down-jackets",
    //                     mapped_ids: [906],
    //                     order: 3,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Jackets",
    //                     slug: "jackets",
    //                     mapped_ids: [908],
    //                     order: 4,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Knitwear",
    //                     slug: "knitwear",
    //                     mapped_ids: [910],
    //                     order: 5,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Pants",
    //                     slug: "pants",
    //                     mapped_ids: [913],
    //                     order: 6,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Shirts",
    //                     slug: "shirts",
    //                     mapped_ids: [915],
    //                     order: 7,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Sweatshirts",
    //                     slug: "sweatshirts",
    //                     mapped_ids: [917],
    //                     order: 8,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "T-Shirts",
    //                     slug: "t-shirts",
    //                     mapped_ids: [919],
    //                     order: 9,
    //                     available: true,
    //                 }
    //             ],
    //         },
    //         {
    //             name: "Footwear",
    //             slug: "footwear",
    //             mapped_ids: [931],
    //             order: 1,
    //             available: true,
    //             subcategories: [
    //                 {
    //                     name: "Boots",
    //                     slug: "boots",
    //                     mapped_ids: [932],
    //                     order: 0,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Sandals",
    //                     slug: "sandals",
    //                     mapped_ids: [936],
    //                     order: 1,
    //                     available: true,
    //                 },
    //                 {
    //                     name: "Sneakers",
    //                     slug: "sneakers",
    //                     mapped_ids: [937],
    //                     order: 2,
    //                     available: true,
    //                 }
    //             ],
    //         },
    //     ],
    // },
];

export const NAVIGATION: Navigation = {

    departments: DEPARTMENTS,
    pages: [
        {
            name: 'About Alamoda',
            href: '/about'
        },
    ]

};