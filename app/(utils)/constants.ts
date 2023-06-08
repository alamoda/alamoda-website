import { Department, SortOption } from "../(types)";

export const PRODUCT_SORT_OPTIONS: SortOption[] = [
    { name: 'New in', value: 'new-in' },
    { name: 'Price (high first)', value: 'price-low' },
    { name: 'Price (low first)', value: 'price-high' },
]

export const DEPARTMENTS: Department[] = [

    // Men
    {
        name: "Men",
        slug: "men",
        mapped_ids: [637],
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [638],
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [639],
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [640],
                    },
                    {
                        name: "Bowties & Ties",
                        slug: "bowties-ties",
                        mapped_ids: [641],
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [654],
                    },
                    {
                        name: "Cover & Cases",
                        slug: "cover-cases",
                        mapped_ids: [643],
                    },
                    {
                        name: "Cufflinks",
                        slug: "cufflinks",
                        mapped_ids: [644],
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [656, 661],
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        mapped_ids: [645],
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hat-hairbands",
                        mapped_ids: [646],
                    },
                    {
                        name: "Key Rings",
                        slug: "key-rings",
                        mapped_ids: [647],
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        mapped_ids: [648],
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [655],
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [649],
                    },
                    {
                        name: "Sunglasses",
                        slug: "sunglasses",
                        mapped_ids: [650],
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [652, 653],
                    },
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [663],
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [664],
                    },
                    {
                        name: "Briefcases",
                        slug: "briefcases",
                        mapped_ids: [665],
                    },
                    {
                        name: "Bucket Bags",
                        slug: "bucket-bags",
                        mapped_ids: [666],
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [667],
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [668],
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [669],
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        mapped_ids: [670],
                    }
                ],
            },
            {

                name: "Clothing",
                slug: "clothing",
                mapped_ids: [672],
                subcategories: [
                    {
                        name: "Bermuda Shorts",
                        slug: "bermuda-shorts",
                        mapped_ids: [673],
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [674],
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [675],
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [676],
                    },
                    {
                        name: "Furs",
                        slug: "furs",
                        mapped_ids: [677],
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [678],
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        mapped_ids: [679],
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [680],
                    },
                    {
                        name: "Leather Jackets",
                        slug: "leather-jackets",
                        mapped_ids: [681],
                    },
                    {
                        name: "Leggings",
                        slug: "leggings",
                        mapped_ids: [682],
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [683],
                    },
                    {
                        name: "Polo Shirts",
                        slug: "polo-shirts",
                        mapped_ids: [684],
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [685],
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [696],
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        mapped_ids: [686],
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [687],
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        mapped_ids: [688],
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [691],
                    },
                    {
                        name: "Top",
                        slug: "top",
                        mapped_ids: [689],
                    },
                    {
                        name: "Trench Coats",
                        slug: "trench-coats",
                        mapped_ids: [690],
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        mapped_ids: [692],
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [707],
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [708]
                    },
                    {
                        name: "Espadrilles",
                        slug: "espadrilles",
                        mapped_ids: [709]
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        mapped_ids: [710]
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        mapped_ids: [711]
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [712]
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [713]
                    }
                ],
            },
            {
                name: "Jewellery",
                slug: "jewellery",
                mapped_ids: [715],
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        mapped_ids: [716]
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [717]
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        mapped_ids: [718]
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        mapped_ids: [719]
                    }
                ],
            },
        ],
    },

    // Women
    {
        name: 'Women',
        slug: 'women',
        mapped_ids: [725],
        categories: [
            {
                name: 'Accessories',
                slug: 'accessories',
                mapped_ids: [726],
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [727]
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [728]
                    },
                    {
                        name: "Brooches",
                        slug: "brooches",
                        mapped_ids: [729]
                    },
                    {
                        name: "Covers & Cases",
                        slug: "covers-cases",
                        mapped_ids: [730]
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [732]
                    },
                    {
                        name: "Gloves",
                        slug: "gloves",
                        mapped_ids: [733]
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        mapped_ids: [734]
                    },
                    {
                        name: "Keyrings & Chains",
                        slug: "keyrings-chains",
                        mapped_ids: [735]
                    },
                    {
                        name: "Scarves",
                        slug: "scarves",
                        mapped_ids: [736]
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [737]
                    },
                    {
                        name: "Sunglasses",
                        slug: "sunglasses",
                        mapped_ids: [739]
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [741]
                    }
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [749],
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [750]
                    },
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [760]
                    },
                    {
                        name: "Bucket Bags",
                        slug: "bucket-bags",
                        mapped_ids: [752]
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [753]
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [754]
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [755]
                    },
                    {
                        name: "Travel Bags",
                        slug: "travel-bags",
                        mapped_ids: [756]
                    }
                ],
            },
            {
                name: 'Clothing',
                slug: 'clothing',
                mapped_ids: [761],
                subcategories: [
                    {
                        name: "Bermuda Shorts",
                        slug: "bermuda-shorts",
                        mapped_ids: [762]
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [763]
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [764]
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [765]
                    },
                    {
                        name: "Dresses",
                        slug: "dresses",
                        mapped_ids: [766]
                    },
                    {
                        name: "Furs",
                        slug: "furs",
                        mapped_ids: [767]
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [768]
                    },
                    {
                        name: "Jeans",
                        slug: "jeans",
                        mapped_ids: [769]
                    },
                    {
                        name: "Jumpsuits",
                        slug: "jumpsuits",
                        mapped_ids: [770]
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [771]
                    },
                    {
                        name: "Leather Jackets",
                        slug: "leather-jackets",
                        mapped_ids: [772]
                    },
                    {
                        name: "Leggings",
                        slug: "leggings",
                        mapped_ids: [773]
                    },
                    {
                        name: "Long Dresses",
                        slug: "long-dresses",
                        mapped_ids: [774]
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [775]
                    },
                    {
                        name: "Polo Shirts",
                        slug: "polo-shirts",
                        mapped_ids: [776]
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [777]
                    },
                    {
                        name: "Skirts",
                        slug: "skirts",
                        mapped_ids: [778]
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [787]
                    },
                    {
                        name: "Suits",
                        slug: "suits",
                        mapped_ids: [779]
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [780]
                    },
                    {
                        name: "Swimwear",
                        slug: "swimwear",
                        mapped_ids: [781]
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [784]
                    },
                    {
                        name: "Top",
                        slug: "top",
                        mapped_ids: [782]
                    },
                    {
                        name: "Trench Coats",
                        slug: "trench-coats",
                        mapped_ids: [783]
                    },
                    {
                        name: "Underwear",
                        slug: "underwear",
                        mapped_ids: [785]
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [791],
                subcategories: [
                    {
                        name: "Ballerinas",
                        slug: "ballerinas",
                        mapped_ids: [792]
                    },
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [793]
                    },
                    {
                        name: "Espadrilles",
                        slug: "espadrilles",
                        mapped_ids: [794]
                    },
                    {
                        name: "Lace Up",
                        slug: "lace-up",
                        mapped_ids: [795]
                    },
                    {
                        name: "Loafers",
                        slug: "loafers",
                        mapped_ids: [796]
                    },
                    {
                        name: "Pumps",
                        slug: "pumps",
                        mapped_ids: [797]
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [798]
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [799]
                    },
                    {
                        name: "Wedges",
                        slug: "wedges",
                        mapped_ids: [800]
                    }
                ],
            },
            {
                name: "Jewellery",
                slug: "jewellery",
                mapped_ids: [804],
                subcategories: [
                    {
                        name: "Bracelets",
                        slug: "bracelets",
                        mapped_ids: [805]
                    },
                    {
                        name: "Earrings",
                        slug: "earrings",
                        mapped_ids: [806]
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [810]
                    },
                    {
                        name: "Necklaces",
                        slug: "necklaces",
                        mapped_ids: [807]
                    },
                    {
                        name: "Rings",
                        slug: "rings",
                        mapped_ids: [808]
                    }
                ],
            },
        ],
    },

    // Unisex
    {
        name: 'Unisex',
        slug: 'unisex',
        mapped_ids: [881],
        categories: [
            {
                name: 'Accessories',
                slug: 'accessories',
                mapped_ids: [882],
                subcategories: [
                    {
                        name: "Beauty Cases",
                        slug: "beauty-cases",
                        mapped_ids: [884]
                    },
                    {
                        name: "Belts & Braces",
                        slug: "belts-braces",
                        mapped_ids: [885]
                    },
                    {
                        name: "Extras",
                        slug: "extras",
                        mapped_ids: [897]
                    },
                    {
                        name: "Hats & Hairbands",
                        slug: "hats-hairbands",
                        mapped_ids: [891]
                    },
                    {
                        name: "Socks",
                        slug: "socks",
                        mapped_ids: [894]
                    },
                    {
                        name: "Wallets",
                        slug: "wallets",
                        mapped_ids: [883]
                    }
                ],
            },
            {
                name: "Bags",
                slug: "bags",
                mapped_ids: [923],
                subcategories: [
                    {
                        name: "Backpacks",
                        slug: "backpacks",
                        mapped_ids: [924]
                    },
                    {
                        name: "Clutches",
                        slug: "clutches",
                        mapped_ids: [927]
                    },
                    {
                        name: "Handbags",
                        slug: "handbags",
                        mapped_ids: [928]
                    },
                    {
                        name: "Shoulder Bags",
                        slug: "shoulder-bags",
                        mapped_ids: [929]
                    }
                ],
            },
            {
                name: "Clothing",
                slug: "clothing",
                mapped_ids: [902],
                subcategories: [
                    {
                        name: "Bermuda Short",
                        slug: "bermuda-short",
                        mapped_ids: [903]
                    },
                    {
                        name: "Blazers & Vests",
                        slug: "blazers-vests",
                        mapped_ids: [904]
                    },
                    {
                        name: "Coats",
                        slug: "coats",
                        mapped_ids: [905]
                    },
                    {
                        name: "Down Jackets",
                        slug: "down-jackets",
                        mapped_ids: [906]
                    },
                    {
                        name: "Jackets",
                        slug: "jackets",
                        mapped_ids: [908]
                    },
                    {
                        name: "Knitwear",
                        slug: "knitwear",
                        mapped_ids: [910]
                    },
                    {
                        name: "Pants",
                        slug: "pants",
                        mapped_ids: [913]
                    },
                    {
                        name: "Shirts",
                        slug: "shirts",
                        mapped_ids: [915]
                    },
                    {
                        name: "Sweatshirts",
                        slug: "sweatshirts",
                        mapped_ids: [917]
                    },
                    {
                        name: "T-Shirts",
                        slug: "t-shirts",
                        mapped_ids: [919]
                    }
                ],
            },
            {
                name: "Footwear",
                slug: "footwear",
                mapped_ids: [931],
                subcategories: [
                    {
                        name: "Boots",
                        slug: "boots",
                        mapped_ids: [932]
                    },
                    {
                        name: "Sandals",
                        slug: "sandals",
                        mapped_ids: [936]
                    },
                    {
                        name: "Sneakers",
                        slug: "sneakers",
                        mapped_ids: [937]
                    }
                ],
            },
        ],
    },

    // Lifestyle
    {
        name: 'Lifestyle',
        slug: 'lifestyle',
        mapped_ids: [1065],
        categories: [
            {
                name: "Accessories",
                slug: "accessories",
                mapped_ids: [1061, 1065],
                subcategories: [],
            },
            {
                name: "Home",
                slug: "home",
                mapped_ids: [1062, 1064],
                subcategories: []
            },
            {
                name: "Textile",
                slug: "textile",
                mapped_ids: [1063, 1066],
                subcategories: []
            },
        ],
    },
];