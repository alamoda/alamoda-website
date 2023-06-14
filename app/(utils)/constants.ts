import { Department, SortOption } from "../(types)";

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
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [638],
                order: 3,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [639],
                        order: 0,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [640],
                        order: 1,
                    },
                    {
                        name: "Bowties & Ties",
                        slug: "bowties-ties",
                        mapped_ids: [641],
                        order: 2,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [654],
                        order: 3,
                    },
                    {
                        name: "Cover & Cases",
                        slug: "cover-cases",
                        mapped_ids: [643],
                        order: 4,
                    },
                    {
                        name: "Cufflinks",
                        slug: "cufflinks",
                        mapped_ids: [644],
                        order: 5,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [656, 661],
                        order: 6,
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        mapped_ids: [645],
                        order: 7,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hat-hairbands",
                        mapped_ids: [646],
                        order: 8,
                    },
                    {
                        name: "Key Rings",
                        slug: "key-rings",
                        mapped_ids: [647],
                        order: 9,
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        mapped_ids: [648],
                        order: 10,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [655],
                        order: 11,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [649],
                        order: 12,
                    },
                    {
                        name: "Sunglasses",
                        slug: "sunglasses",
                        mapped_ids: [650],
                        order: 13,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [652, 653],
                        order: 14,
                    },
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [663],
                order: 2,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [664],
                        order: 0,
                    },
                    {
                        name: "Briefcases",
                        slug: "briefcases",
                        mapped_ids: [665],
                        order: 1,
                    },
                    {
                        name: "Bucket Bags",
                        slug: "bucket-bags",
                        mapped_ids: [666],
                        order: 2,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [667],
                        order: 3,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [668],
                        order: 4,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [669],
                        order: 5,
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        mapped_ids: [670],
                        order: 6,
                    }
                ],
            },
            {

                name: "Clothing",
                slug: "clothing",
                mapped_ids: [672],
                order: 0,
                subcategories: [
                    {
                        name: "Bermuda Shorts",
                        slug: "bermuda-shorts",
                        mapped_ids: [673],
                        order: 0,
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [674],
                        order: 1,
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [675],
                        order: 2,
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [676],
                        order: 3,
                    },
                    {
                        name: "Furs",
                        slug: "furs",
                        mapped_ids: [677],
                        order: 4,
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [678],
                        order: 5,
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        mapped_ids: [679],
                        order: 6,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [680],
                        order: 7,
                    },
                    {
                        name: "Leather Jackets",
                        slug: "leather-jackets",
                        mapped_ids: [681],
                        order: 8,
                    },
                    {
                        name: "Leggings",
                        slug: "leggings",
                        mapped_ids: [682],
                        order: 9,
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [683],
                        order: 10,
                    },
                    {
                        name: "Polo Shirts",
                        slug: "polo-shirts",
                        mapped_ids: [684],
                        order: 11,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [685],
                        order: 12,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [696],
                        order: 13,
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        mapped_ids: [686],
                        order: 14,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [687],
                        order: 15,
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        mapped_ids: [688],
                        order: 16,
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [691],
                        order: 17,
                    },
                    {
                        name: "Top",
                        slug: "top",
                        mapped_ids: [689],
                        order: 18,
                    },
                    {
                        name: "Trench Coats",
                        slug: "trench-coats",
                        mapped_ids: [690],
                        order: 19,
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        mapped_ids: [692],
                        order: 20,
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [707],
                order: 1,
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [708],
                        order: 0,
                    },
                    {
                        name: "Espadrilles",
                        slug: "espadrilles",
                        mapped_ids: [709],
                        order: 1,
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        mapped_ids: [710],
                        order: 2,
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        mapped_ids: [711],
                        order: 3,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [712],
                        order: 4,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [713],
                        order: 5,
                    }
                ],
            },
            {
                name: "Jewellery",
                slug: "jewellery",
                mapped_ids: [715],
                order: 4,
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        mapped_ids: [716],
                        order: 0,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [717],
                        order: 1,
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        mapped_ids: [718],
                        order: 2,
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        mapped_ids: [719],
                        order: 3,
                    }
                ],
            },
        ],
    },

    // Women
    {
        name: "Women",
        description: "",
        slug: "women",
        mapped_ids: [725],
        order: 0,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [726],
                order: 3,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [727],
                        order: 0,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [728],
                        order: 1,
                    },
                    {
                        name: "Brooches",
                        slug: "brooches",
                        mapped_ids: [729],
                        order: 2,
                    },
                    {
                        name: "Covers & Cases",
                        slug: "covers-cases",
                        mapped_ids: [730],
                        order: 3,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [732],
                        order: 4,
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        mapped_ids: [733],
                        order: 5,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        mapped_ids: [734],
                        order: 6,
                    },
                    {
                        name: "Keyrings & Chains",
                        slug: "keyrings-chains",
                        mapped_ids: [735],
                        order: 7,
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        mapped_ids: [736],
                        order: 8,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [737],
                        order: 9,
                    },
                    {
                        name: "Sunglasses",
                        slug: "sunglasses",
                        mapped_ids: [739],
                        order: 10,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [741],
                        order: 11,
                    }
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [749],
                order: 2,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [750],
                        order: 0,
                    },
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [760],
                        order: 1,
                    },
                    {
                        name: "Bucket Bags",
                        slug: "bucket-bags",
                        mapped_ids: [752],
                        order: 2,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [753],
                        order: 3,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [754],
                        order: 4,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [755],
                        order: 5,
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        mapped_ids: [756],
                        order: 6,
                    }
                ],
            },
            {
                name: "Clothing",
                slug: "clothing",
                mapped_ids: [761],
                order: 0,
                subcategories: [
                    {
                        name: "Bermuda Shorts",
                        slug: "bermuda-shorts",
                        mapped_ids: [762],
                        order: 0,
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [763],
                        order: 1,
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [764],
                        order: 2,
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [765],
                        order: 3,
                    },
                    {
                        name: "Dresses",
                        slug: "dresses",
                        mapped_ids: [766],
                        order: 4,
                    },
                    {
                        name: "Furs",
                        slug: "furs",
                        mapped_ids: [767],
                        order: 5,
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [768],
                        order: 6,
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        mapped_ids: [769],
                        order: 7,
                    },
                    {
                        name: "Jumpsuits",
                        slug: "jumpsuits",
                        mapped_ids: [770],
                        order: 8,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [771],
                        order: 9,
                    },
                    {
                        name: "Leather Jackets",
                        slug: "leather-jackets",
                        mapped_ids: [772],
                        order: 10,
                    },
                    {
                        name: "Leggings",
                        slug: "leggings",
                        mapped_ids: [773],
                        order: 11,
                    },
                    {
                        name: "Long Dresses",
                        slug: "long-dresses",
                        mapped_ids: [774],
                        order: 12,
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [775],
                        order: 13,
                    },
                    {
                        name: "Polo Shirts",
                        slug: "polo-shirts",
                        mapped_ids: [776],
                        order: 14,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [777],
                        order: 15,
                    },
                    {
                        name: "Skirts",
                        slug: "skirts",
                        mapped_ids: [778],
                        order: 16,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [787],
                        order: 17,
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        mapped_ids: [779],
                        order: 18,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [780],
                        order: 19,
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        mapped_ids: [781],
                        order: 20,
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [784],
                        order: 21,
                    },
                    {
                        name: "Top",
                        slug: "top",
                        mapped_ids: [782],
                        order: 22,
                    },
                    {
                        name: "Trench Coats",
                        slug: "trench-coats",
                        mapped_ids: [783],
                        order: 23,
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        mapped_ids: [785],
                        order: 24,
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [791],
                order: 1,
                subcategories: [
                    {
                        name: "Ballerinas",
                        slug: "ballerinas",
                        mapped_ids: [792],
                        order: 0,
                    },
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [793],
                        order: 1,
                    },
                    {
                        name: "Espadrilles",
                        slug: "espadrilles",
                        mapped_ids: [794],
                        order: 2,
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        mapped_ids: [795],
                        order: 3,
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        mapped_ids: [796],
                        order: 4,
                    },
                    {
                        name: "Pumps",
                        slug: "pumps",
                        mapped_ids: [797],
                        order: 5,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [798],
                        order: 6,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [799],
                        order: 7,
                    },
                    {
                        name: "Wedges",
                        slug: "wedges",
                        mapped_ids: [800],
                        order: 8,
                    }
                ],
            },
            {
                name: "Jewellery",
                slug: "jewellery",
                mapped_ids: [804],
                order: 4,
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        mapped_ids: [805],
                        order: 0,
                    },
                    {
                        name: "Earrings",
                        slug: "earrings",
                        mapped_ids: [806],
                        order: 1,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [810],
                        order: 2,
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        mapped_ids: [807],
                        order: 3,
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        mapped_ids: [808],
                        order: 4,
                    }
                ],
            },
        ],
    },

    // Unisex
    {
        name: "Unisex",
        description: "",
        slug: "unisex",
        mapped_ids: [881],
        order: 2,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [882],
                order: 3,
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [884],
                        order: 0,
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [885],
                        order: 1,
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [897],
                        order: 2,
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        mapped_ids: [891],
                        order: 3,
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [894],
                        order: 4,
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [883],
                        order: 5,
                    }
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [923],
                order: 2,
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [924],
                        order: 0,
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [927],
                        order: 1,
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [928],
                        order: 2,
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [929],
                        order: 3,
                    }
                ],
            },
            {
                name: "Clothing",
                slug: "clothing",
                mapped_ids: [902],
                order: 0,
                subcategories: [
                    {
                        name: "Bermuda Short",
                        slug: "bermuda-short",
                        mapped_ids: [903],
                        order: 0,
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [904],
                        order: 1,
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [905],
                        order: 2,
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [906],
                        order: 3,
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [908],
                        order: 4,
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [910],
                        order: 5,
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [913],
                        order: 6,
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [915],
                        order: 7,
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [917],
                        order: 8,
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [919],
                        order: 9,
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [931],
                order: 1,
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [932],
                        order: 0,
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [936],
                        order: 1,
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [937],
                        order: 2,
                    }
                ],
            },
        ],
    },

    // Lifestyle
    {
        name: "Lifestyle",
        description: "",
        slug: "lifestyle",
        mapped_ids: [1065],
        order: 3,
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [1061, 1065],
                order: 1,
                subcategories: [],
            },
            {
                name: "Home",
                slug: "home",
                mapped_ids: [1062, 1064],
                order: 0,
                subcategories: []
            },
            {
                name: "Textile",
                slug: "textile",
                mapped_ids: [1063, 1066],
                order: 2,
                subcategories: []
            },
        ],
    },
];