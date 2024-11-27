import { BadgeHelp, HelpCircleIcon, LineChartIcon, Link2Icon, LockIcon, NewspaperIcon, QrCodeIcon, Truck } from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Features",
        href: "/features",
        menu: [
            {
                title: "24/7 Support",
                tagline: "You can ask us all the questions you are worried about and curious about in live support.",
                href: "/features/support",
                icon: BadgeHelp,
            },
            {
                title: "End-to-end encryption",
                tagline: "Keep your CC / Paypal orders confidential with end-to-end encryption!",
                href: "/features/password-protection",
                icon: LockIcon,
            },
            {
                title: "Track Your Order",
                tagline: "Track your orders live with the special order number given to you!",
                href: "/features/trackinfo",
                icon: Truck,
            },
            {
                title: "Easy QR Payment",
                tagline: "Complete your payment easily using our QR code system",
                href: "/features/qr-codes",
                icon: QrCodeIcon,
            },
        ],
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Proof",
        href: "/proof",
    },
    {
        title: "Resources",
        href: "/resources",
        menu: [
            {
                title: "Blog",
                tagline: "Read articles on the latest trends in tech.",
                href: "/resources/blog",
                icon: NewspaperIcon,
            },
            // {
            //     title: "Help",
            //     tagline: "Get answers to your questions.",
            //     href: "/resources/help",
            //     icon: HelpCircleIcon,
            // },
        ]
    },
    {
        title: "Track Order",
        href: "/trackorder",
    },

    {
        title: "FAQ",
        href: "/faq",
    }
];
