// export const PLANS = [
//     {
//         name: "Free",
//         info: "For most individuals",
//         price: {
//             monthly: 0,
//             yearly: 0,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 100 tags", limit: "100 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "1K clicks/month" },
//             { text: "Community support", tooltip: "Get answers your questions on discord" },
//             { text: "AI powered suggestions", tooltip: "Get up to 100 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Start for free",
//             href: "/auth/sign-up?plan=free",
//             variant: "default",
//         }
//     },
//     {
//         name: "Pro",
//         info: "For small businesses",
//         price: {
//             monthly: 9,
//             yearly: 90,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Up to 500 tags", limit: "500 tags" },
//             { text: "Customizable branded links" },
//             { text: "Track clicks", tooltip: "20K clicks/month" },
//             { text: "Export click data", tooltip: "Upto 1K links" },
//             { text: "Priority support", tooltip: "Get 24/7 chat support" },
//             { text: "AI powered suggestions", tooltip: "Get up to 500 AI powered suggestions" },
//         ],
//         btn: {
//             text: "Get started",
//             href: "/auth/sign-up?plan=pro",
//             variant: "purple",
//         }
//     },
//     {
//         name: "Business",
//         info: "For large organizations",
//         price: {
//             monthly: 49,
//             yearly: 490,
//         },
//         features: [
//             { text: "Shorten links" },
//             { text: "Unlimited tags" },
//             { text: "Customizable branded links"},
//             { text: "Track clicks", tooltip: "Unlimited clicks" },
//             { text: "Export click data", tooltip: "Unlimited clicks" },
//             { text: "Dedicated manager", tooltip: "Get priority support from our team" },
//             { text: "AI powered suggestions", tooltip: "Get unlimited AI powered suggestions" },
//         ],
//         btn: {
//             text: "Contact team",
//             href: "/auth/sign-up?plan=business",
//             variant: "default",
//         }
//     }
// ];

// export const PRICING_FEATURES = [
//     {
//         text: "Shorten links",
//         tooltip: "Create shortened links",
//     },
//     {
//         text: "Track clicks",
//         tooltip: "Track clicks on your links",
//     },
//     {
//         text: "See top countries",
//         tooltip: "See top countries where your links are clicked",
//     },
//     {
//         text: "Upto 10 tags",
//         tooltip: "Add upto 10 tags to your links",
//     },
//     {
//         text: "Community support",
//         tooltip: "Community support is available for free users",
//     },
//     {
//         text: "Priority support",
//         tooltip: "Get priority support from our team",
//     },
//     {
//         text: "AI powered suggestions",
//         tooltip: "Get AI powered suggestions for your links",
//     },
// ];

// export const WORKSPACE_LIMIT = 2;
export const PLANS = [
    {
        name: "Digital Card",
        info: "Master / Visa / AmericanExpress",
        price: {
            monthly: 350,
            yearly: 399,
        },
        features: [
            { text: "$2500 Card Balance", tooltip: "$2500 USD-EURO-CHF limit" },
            { text: "Special Proxy", tooltip: "We provide 100% protection with our Private Proxy Gateway" },
            { text: "%100 Freedom", tooltip: "You can do whatever you want with the card, there is no limit" },
            { text: "PIN Code", tooltip:"A 4-digit PIN code required for shopping at ATMs and stores and for cardless withdrawals." },
            { text: "Full Guide", tooltip: "Full guide to give you more tips" },
            { text: "Google/Apple Wallet Support", tooltip: "You can actively use the card for Google and Apple Pay payments." },
            { text: "Worldwide", tooltip: "Global shipping and support🌍" },
            { text: "%100 Safe", tooltip: "We deliver your orders without requesting your name or invoice. NO TRACKABLE!" },
            { text: "ATM's Withdrawals", tooltip: "You can withdraw money from all ATMs, both national and international." },
            { text: "Priority Support", tooltip: "Get 24/7 chat support" },

        ],
        btn: {
            text: "Order now",
            href: "/auth/sign-up?plan=free",
            variant: "default",
        }
    },
    {
        name: "Paypal Transfer",
        info: "Transfer to any paypal account you want",
        price: {
            monthly: 250,
            yearly: 350,
        },
        features: [
            { text: "$3000 money transfer", tooltip: "3000 USD-EURO-CHF money transfer" },
            { text: "Transfer money from safe accounts", tooltip: "Transfer money from safe accounts %100" },
            { text: "%100 Freedom", tooltip: "You can do whatever you want with that money transfer, there is no limit" },
            { text: "Familiar Methods", tooltip: "We provide money transfers with clean PayPal accounts that have at least 9 months of account history and verification" },
            { text: "Special Proxy", tooltip: "We provide 100% protection with our Private Proxy Gateway" },
            { text: "PIN Code" },
            { text: "Worldwide", tooltip: "Global Support for all of the countries about paypal transfers!" },
            { text: "%100 Safe", tooltip: "We deliver your orders without requesting your name or invoice. NO TRACKABLE!" },
            { text: "Priority Support", tooltip: "Get 24/7 chat support" },

        ],
        btn: {
            text: "Order Now",
            href: "/auth/sign-up?plan=pro",
            variant: "purple",
        }
    },
    {
        name: "Pyhsical Card",
        info: "Master / Visa / AmericanExpress",
        price: {
            monthly: 350,
            yearly: 399,
        },
        features: [
            { text: "$2500 Card Balance", tooltip: "2500 USD-EURO-CHF credit card limit" },
            { text: "Special Proxy", tooltip: "We provide 100% protection with our Private Proxy Gateway" },
            { text: "%100 Freedom", tooltip: "You can do whatever you want with the card, there is no limit" },
            { text: "Fully Card PIN" },
            { text: "Full Guide", tooltip: "Full guide to give you more tips" },
            { text: "Worldwide", tooltip: "Global shipping and support🌍" },
            { text: "Shipping Worldwide", tooltip: "Full guide to give you more tips" },
            { text: "%100 Safe", tooltip: "We deliver your orders without requesting your name or invoice. NO TRACKABLE!" },
            { text: "ATM's Withdrawals", tooltip: "You can withdraw money from all ATMs, both national and international." },
            { text: "Priority Support", tooltip: "Get 24/7 chat support" },
        ],
        btn: {
            text: "Order now",
            href: "/auth/sign-up?plan=business",
            variant: "default",
        }
    }
];

export const PRICING_FEATURES = [
    {
        text: "Shorten links",
        tooltip: "Create shortened links",
    },
    {
        text: "Track clicks",
        tooltip: "Track clicks on your links",
    },
    {
        text: "See top countries",
        tooltip: "See top countries where your links are clicked",
    },
    {
        text: "Upto 10 tags",
        tooltip: "Add upto 10 tags to your links",
    },
    {
        text: "Community support",
        tooltip: "Community support is available for free users",
    },
    {
        text: "Priority support",
        tooltip: "Get priority support from our team",
    },
    {
        text: "AI powered suggestions",
        tooltip: "Get AI powered suggestions for your links",
    },
];

export const WORKSPACE_LIMIT = 2;