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

    // Men
    {
        name: "Men",
        description: "Discover a curated selection of luxury men's fashion. Our collection features the latest from top designers, with pieces ranging from tailored suits to high-end casual wear. Elevate your style with our exclusive assortment.",
        slug: "men",
        mapped_ids: [637],
        order: 1,
        available: true,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [638],
                order: 3,
                available: true,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [639],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [640],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Bowties & Ties",
                        slug: "bowties-ties",
                        mapped_ids: [641],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [654],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Cover & Cases",
                        slug: "cover-cases",
                        mapped_ids: [643],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Cufflinks",
                        slug: "cufflinks",
                        mapped_ids: [644],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [656, 661],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        mapped_ids: [645],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hat-hairbands",
                        mapped_ids: [646],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Key Rings",
                        slug: "key-rings",
                        mapped_ids: [647],
                        order: 9,
                        available: true,
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        mapped_ids: [648],
                        order: 10,
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [655],
                        order: 11,
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [649],
                        order: 12,
                        available: true,
                    },
                    {
                        name: "Sunglasses",
                        slug: "sunglasses",
                        mapped_ids: [650],
                        order: 13,
                        available: true,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [652, 653],
                        order: 14,
                        available: true,
                    },
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [663],
                order: 2,
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [664],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Briefcases",
                        slug: "briefcases",
                        mapped_ids: [665],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Bucket Bags",
                        slug: "bucket-bags",
                        mapped_ids: [666],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [667],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [668],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [669],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        mapped_ids: [670],
                        order: 6,
                        available: true,
                    }
                ],
            },
            {

                name: "Clothing",
                slug: "clothing",
                mapped_ids: [672],
                order: 0,
                available: true,
                subcategories: [
                    {
                        name: "Bermuda Shorts",
                        slug: "bermuda-shorts",
                        mapped_ids: [673],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [674],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [675],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [676],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Furs",
                        slug: "furs",
                        mapped_ids: [677],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [678],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        mapped_ids: [679],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [680],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Leather Jackets",
                        slug: "leather-jackets",
                        mapped_ids: [681],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Leggings",
                        slug: "leggings",
                        mapped_ids: [682],
                        order: 9,
                        available: true,
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [683],
                        order: 10,
                        available: true,
                    },
                    {
                        name: "Polo Shirts",
                        slug: "polo-shirts",
                        mapped_ids: [684],
                        order: 11,
                        available: true,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [685],
                        order: 12,
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [696],
                        order: 13,
                        available: true,
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        mapped_ids: [686],
                        order: 14,
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [687],
                        order: 15,
                        available: true,
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        mapped_ids: [688],
                        order: 16,
                        available: true,
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [691],
                        order: 17,
                        available: true,
                    },
                    {
                        name: "Top",
                        slug: "top",
                        mapped_ids: [689],
                        order: 18,
                        available: true,
                    },
                    {
                        name: "Trench Coats",
                        slug: "trench-coats",
                        mapped_ids: [690],
                        order: 19,
                        available: true,
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        mapped_ids: [692],
                        order: 20,
                        available: true,
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [707],
                order: 1,
                available: true,
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [708],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Espadrilles",
                        slug: "espadrilles",
                        mapped_ids: [709],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        mapped_ids: [710],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        mapped_ids: [711],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [712],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [713],
                        order: 5,
                        available: true,
                    }
                ],
            },
            {
                name: "Jewellery",
                slug: "jewellery",
                mapped_ids: [715],
                order: 4,
                available: true,
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        mapped_ids: [716],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [717],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        mapped_ids: [718],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        mapped_ids: [719],
                        order: 3,
                        available: true,
                    }
                ],
            },
        ],
    },

    // Women
    {
        name: "Women",
        description: "Immerse yourself in the elegance of our premium women's fashion collection. Handpicked from esteemed designers, our selection showcases the finest in luxury wear, from chic dresses to sophisticated separates. Transform your wardrobe with our exclusive array of women's styles.",
        slug: "women",
        mapped_ids: [725],
        order: 0,
        available: true,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [726],
                order: 3,
                available: true,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [727],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [728],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Brooches",
                        slug: "brooches",
                        mapped_ids: [729],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Covers & Cases",
                        slug: "covers-cases",
                        mapped_ids: [730],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [732],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        mapped_ids: [733],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        mapped_ids: [734],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Keyrings & Chains",
                        slug: "keyrings-chains",
                        mapped_ids: [735],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        mapped_ids: [736],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [737],
                        order: 9,
                        available: true,
                    },
                    {
                        name: "Sunglasses",
                        slug: "sunglasses",
                        mapped_ids: [739],
                        order: 10,
                        available: true,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [741],
                        order: 11,
                        available: true,
                    }
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [749],
                order: 2,
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [750],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [760],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Bucket Bags",
                        slug: "bucket-bags",
                        mapped_ids: [752],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [753],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [754],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [755],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        mapped_ids: [756],
                        order: 6,
                        available: true,
                    }
                ],
            },
            {
                name: "Clothing",
                slug: "clothing",
                mapped_ids: [761],
                order: 0,
                available: true,
                subcategories: [
                    {
                        name: "Bermuda Shorts",
                        slug: "bermuda-shorts",
                        mapped_ids: [762],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [763],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [764],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [765],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Dresses",
                        slug: "dresses",
                        mapped_ids: [766],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Furs",
                        slug: "furs",
                        mapped_ids: [767],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [768],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        mapped_ids: [769],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Jumpsuits",
                        slug: "jumpsuits",
                        mapped_ids: [770],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [771],
                        order: 9,
                        available: true,
                    },
                    {
                        name: "Leather Jackets",
                        slug: "leather-jackets",
                        mapped_ids: [772],
                        order: 10,
                        available: true,
                    },
                    {
                        name: "Leggings",
                        slug: "leggings",
                        mapped_ids: [773],
                        order: 11,
                        available: true,
                    },
                    {
                        name: "Long Dresses",
                        slug: "long-dresses",
                        mapped_ids: [774],
                        order: 12,
                        available: true,
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [775],
                        order: 13,
                        available: true,
                    },
                    {
                        name: "Polo Shirts",
                        slug: "polo-shirts",
                        mapped_ids: [776],
                        order: 14,
                        available: true,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [777],
                        order: 15,
                        available: true,
                    },
                    {
                        name: "Skirts",
                        slug: "skirts",
                        mapped_ids: [778],
                        order: 16,
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [787],
                        order: 17,
                        available: true,
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        mapped_ids: [779],
                        order: 18,
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [780],
                        order: 19,
                        available: true,
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        mapped_ids: [781],
                        order: 20,
                        available: true,
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [784],
                        order: 21,
                        available: true,
                    },
                    {
                        name: "Top",
                        slug: "top",
                        mapped_ids: [782],
                        order: 22,
                        available: true,
                    },
                    {
                        name: "Trench Coats",
                        slug: "trench-coats",
                        mapped_ids: [783],
                        order: 23,
                        available: true,
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        mapped_ids: [785],
                        order: 24,
                        available: true,
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [791],
                order: 1,
                available: true,
                subcategories: [
                    {
                        name: "Ballerinas",
                        slug: "ballerinas",
                        mapped_ids: [792],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [793],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Espadrilles",
                        slug: "espadrilles",
                        mapped_ids: [794],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        mapped_ids: [795],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        mapped_ids: [796],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Pumps",
                        slug: "pumps",
                        mapped_ids: [797],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [798],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [799],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Wedges",
                        slug: "wedges",
                        mapped_ids: [800],
                        order: 8,
                        available: true,
                    }
                ],
            },
            {
                name: "Jewellery",
                slug: "jewellery",
                mapped_ids: [804],
                order: 4,
                available: true,
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        mapped_ids: [805],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Earrings",
                        slug: "earrings",
                        mapped_ids: [806],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [810],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        mapped_ids: [807],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        mapped_ids: [808],
                        order: 4,
                        available: true,
                    }
                ],
            },
        ],
    },

    // Unisex
    {
        name: "Unisex",
        description: "Explore the versatility of our unisex fashion collection. Sourced from celebrated designers, our range embodies the fusion of style and comfort, offering an array of luxury pieces that transcend traditional gender norms. Redefine your fashion journey with our exclusive unisex ensemble.",
        slug: "unisex",
        mapped_ids: [881],
        order: 2,
        available: true,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [882],
                order: 3,
                available: true,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [884],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [885],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [897],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        mapped_ids: [891],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [894],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [883],
                        order: 5,
                        available: true,
                    }
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [923],
                order: 2,
                available: true,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [924],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [927],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [928],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [929],
                        order: 3,
                        available: true,
                    }
                ],
            },
            {
                name: "Clothing",
                slug: "clothing",
                mapped_ids: [902],
                order: 0,
                available: true,
                subcategories: [
                    {
                        name: "Bermuda Short",
                        slug: "bermuda-short",
                        mapped_ids: [903],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [904],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [905],
                        order: 2,
                        available: true,
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [906],
                        order: 3,
                        available: true,
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [908],
                        order: 4,
                        available: true,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [910],
                        order: 5,
                        available: true,
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [913],
                        order: 6,
                        available: true,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [915],
                        order: 7,
                        available: true,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [917],
                        order: 8,
                        available: true,
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [919],
                        order: 9,
                        available: true,
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [931],
                order: 1,
                available: true,
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [932],
                        order: 0,
                        available: true,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [936],
                        order: 1,
                        available: true,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [937],
                        order: 2,
                        available: true,
                    }
                ],
            },
        ],
    },

    // Lifestyle
    {
        name: "Lifestyle",
        description: "Explore our lifestyle selection featuring luxury accessories, stylish home items, and exquisite textiles. Sourced from top designers, each piece promises to enhance your everyday experiences and bring a touch of elegance to your personal style and living space. Experience the essence of luxury living with our curated collection.",
        slug: "lifestyle",
        mapped_ids: [1065],
        order: 3,
        available: true,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [1061, 1065],
                order: 1,
                available: true,
                subcategories: [],
            },
            {
                name: "Home",
                slug: "home",
                mapped_ids: [1062, 1064],
                order: 0,
                available: true,
                subcategories: []
            },
            {
                name: "Textile",
                slug: "textile",
                mapped_ids: [1063, 1066],
                order: 2,
                available: true,
                subcategories: []
            },
        ],
    },
];

export const NAVIGATION_DEPARTMENTS: Navigation = {
    departments: [

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

        // Men
        {
            name: "Men",
            filters: ["men"],
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
    ],
    brands: [
        {
            name: "Gucci",
            filters: ["gucci"]
        }
    ],
    pages: [
        {
            name: 'About Alamoda',
            href: '/about'
        },
    ]

};