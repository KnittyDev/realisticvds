"use client";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, PLANS, PRICING_FEATURES } from "@/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

type Tab = "monthly" | "yearly";

export const YEARLY_FEATURES = [
    { text: "Extra yearly feature 1", tooltip: "Exclusive to yearly plan" },
    { text: "Extra yearly feature 2", tooltip: "Additional benefit only for yearly" },
];


const getActivePlans = (activeTab: "monthly" | "yearly") => {
    return PLANS.map(plan => {
        // Yıllık plan için mevcut özelliklerin değerlerini değiştirme
        const updatedFeatures = plan.features.map(feature => {
            if (activeTab === "yearly") {
                switch (feature.text) {
                    case "$3000 money transfer":
                        return { ...feature, text: "$5000 money transfer" }; // Özelliği güncelle
                    case "$2500 Card Balance":
                        return { ...feature, text: "$4000 Card Balance" };
                    case "$2500 Card Balance":
                        return { ...feature, text: "$4000 Card Balance" };
                    // Limit değişimi
                    // Diğer özellikler için benzer güncellemeleri ekleyebilirsiniz
                    default:
                        return feature; // Diğer özellikleri olduğu gibi bırak
                }
            }
            return feature; // Aylık tab aktifse mevcut özellikleri koru
        });

        return {
            ...plan,
            features: updatedFeatures,
        };
    });
};


const PricingCards = () => {
    const MotionTabTrigger = motion(TabsTrigger);
    const [activeTab, setActiveTab] = useState<Tab>("monthly");

    // PLANS verisini activeTab’e göre güncellenmiş olarak ayarlıyoruz
    const activePlans = getActivePlans(activeTab);

    return (
        <Tabs defaultValue="monthly" className="w-full flex flex-col items-center justify-center">
            <TabsList>
                <MotionTabTrigger
                    value="monthly"
                    onClick={() => setActiveTab("monthly")}
                    className="relative"
                >
                    {activeTab === "monthly" && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                            }}
                            className="absolute top-0 left-0 w-full h-full bg-background shadow-sm rounded-md z-10"
                        />

                    )}
                    <span className="z-20">Standart</span>
                </MotionTabTrigger>
                <MotionTabTrigger
                    value="yearly"
                    onClick={() => setActiveTab("yearly")}
                    className="relative"
                >
                    {activeTab === "yearly" && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                            }}
                            className="absolute top-0 left-0 w-full h-full bg-background shadow-sm rounded-md z-10"
                        />
                    )}
                    <span className="z-20">Expanded</span>
                </MotionTabTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto pt-6">
                {activePlans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={cn(
                            "flex flex-col w-full border-border rounded-xl",
                            plan.name === "Pro" && "border-2 border-purple-500"
                        )}
                    >
                        <CardHeader className={cn(
                            "border-b border-border",
                            plan.name === "Pro" ? "bg-purple-500/[0.07]" : "bg-foreground/[0.03]"
                        )}>
                            <CardTitle className={cn(plan.name !== "Pro" && "text-muted-foreground", "text-lg font-medium")}>
                                {plan.name}
                            </CardTitle>
                            <CardDescription>{plan.info}</CardDescription>
                            <h5 className="text-3xl font-semibold">
                                ${plan.price[activeTab]}
                                <span className="text-base text-muted-foreground font-normal">
                                    {plan.name !== "Free" ? "/Product" : ""}                                </span>
                            </h5>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            {plan.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <CheckCircleIcon className="text-purple-500 w-4 h-4" />
                                    <TooltipProvider>
                                        <Tooltip delayDuration={0}>
                                            <TooltipTrigger asChild>
                                                <p className={cn(feature.tooltip && "border-b !border-dashed border-border cursor-pointer")}>
                                                    {feature.text}
                                                </p>
                                            </TooltipTrigger>
                                            {feature.tooltip && (
                                                <TooltipContent>
                                                    <p>{feature.tooltip}</p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            ))}
                        </CardContent>
                        <CardFooter className="w-full mt-auto">
                            <Link
                                href="/bitcoin-payment" // Change this to the actual path of your Bitcoin payment page
                                style={{ width: "100%" }}
                                className={buttonVariants({ className: plan.name === "Pro" && "bg-purple-500 hover:bg-purple-500/80 text-white" })}
                            >
                                {plan.btn.text}
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </TabsContent>
        </Tabs>
    );
};



export default PricingCards;
