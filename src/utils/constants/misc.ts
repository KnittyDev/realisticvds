import { BarChart3Icon, Bitcoin, FolderOpenIcon, ListOrdered, Package, PackageSearch, WandSparklesIcon } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;

export const COMPANIES = [
    {
        name: "Asana",
        logo: "/assets/company-01.svg",
    },
    {
        name: "Tidal",
        logo: "/assets/company-02.svg",
    },
    {
        name: "Innovaccer",
        logo: "/assets/company-03.svg",
    },
    {
        name: "Linear",
        logo: "/assets/company-04.svg",
    },
    {
        name: "Raycast",
        logo: "/assets/company-05.svg",
    },
    {
        name: "Labelbox",
        logo: "/assets/company-06.svg",
    }
] as const;

export const PROCESS = [
    {
        title: "Buy Bitcoin",
        description: "Buy bitcoins from platforms like Binance or Coinbase and create a bitcoin account for yourself on these sites.",
        icon: Bitcoin,
    },
    {
        title: "Order Product",
        description: "You can purchase a digital/physical card or money transfer by selecting your package from the pricing section on our website.",
        icon: PackageSearch,
    },
    {
        title: "Order Delivery",
        description: "After placing your order, you can track the status of your order live with your order number! (We do not keep data)",
        icon: Package,
    },
] as const;

export const FEATURES = [
    {
        title: "Link shortening",
        description: "Create short links that are easy to remember and share.",
    },
    {
        title: "Advanced analytics",
        description: "Track and measure the performance of your links.",
    },
    {
        title: "Password protection",
        description: "Secure your links with a password.",
    },
    {
        title: "Custom QR codes",
        description: "Generate custom QR codes for your links.",
    },
    {
        title: "Link expiration",
        description: "Set an expiration date for your links.",
    },
    {
        title: "Team collaboration",
        description: "Share links with your team and collaborate in real-time.",
    },
] as const;

export const REVIEWS = [
    {
        name: "icedcoffeee",
        username: "@icedcoffeee",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        rating: 5,
        review: "I have used it before and I often prefer paypal transfers, expanded packages help me cover my monthly expenses thx guys"
    },
    {
        name: "beckyboot",
        username: "@beckyboot",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        rating: 4,
        review: "I was very scared that I would be scammed for $350 it wasnt a lot of money but I wasnt scammed ^^ i received my digital card but cards with higher limits would be better c:"
    },
    {
        name: "SWISSGUY",
        username: "@SWISSGUY",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        rating: 4,
        review: "stocks run out very quickly It would be good if there was a notification system so i could find out when physical card stocks arrive but system safe"
    },
    {
        name: "vini4music",
        username: "@vini4music",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        rating: 5,
        review: "Paypal transfer process was very good, it only took 30 minutes"
    },
    {
        name: "alban",
        username: "@alban",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        rating: 5,
        review: "Karta ime e kreditit nuk u bllokua, e përdora në Shqipëri dhe Itali djema, kjo më ndihmoi të paguaj tarifën time vjetore të regjistrimit në universitet faleminderit djem"
    },
    {
        name: "Asunachan",
        username: "@asunachan",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        rating: 5,
        review: "Es tut mir leid, dass ich das Live-Support-Personal ein wenig genervt habe. Ich geriet ein wenig in Panik. Dies ist das erste Mal, dass ich diese Art von Website genutzt habe. Ich habe meine Geldüberweisung erhalten"
    },
    {
        name: "kerai2000",
        username: "@kerai2000",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
        rating: 4,
        review: "I order a digital card once a week ahaha lol its make addicted :D"
    },
    {
        name: "melissannexo",
        username: "@melissannexo",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        rating: 4,
        review: "Can you add a ticket system? This way i can make purchases faster like a zendesk you know?"
    },
    {
        name: "swepaul",
        username: "@swepaul",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        rating: 5,
        review: "Payment method with ethereum should be added but postiive sides this website is legit totally <3"
    },
] as const;
