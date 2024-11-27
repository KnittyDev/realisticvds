"use client";
import AnimationContainer from "@/components/global/animation-container";
import React, { useState } from "react";

const ChangeLogPage = () => {
    const [orderNumber, setOrderNumber] = useState("");
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTrackOrder = async () => {
        if (orderNumber.length >= 8) {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/track-order?orderNumber=${orderNumber}`);
                const data = await response.json();
                setOrderStatus(data.status);
            } catch (error) {
                console.error("Error tracking order:", error);
                setOrderStatus("Unable to track order. Please try again.");
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            }
        } else {
            setOrderStatus("Please enter at least 8 characters.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-20">
            <AnimationContainer delay={0.1}>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold font-heading text-center mt-6 !leading-tight">
                    Track Your Order
                </h1>
                <p className="text-base md:text-lg mt-6 text-center text-muted-foreground">
                    You can track your order live and get support.
                </p>
            </AnimationContainer>

            {/* Track Order Section */}
            <div className="mt-10 w-full max-w-md">
                <div className="flex flex-col items-center mt-4">
                    <input
                        type="text"
                        placeholder="Enter your order number"
                        className="border p-2 rounded w-full max-w-xs text-black"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                    <button
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all bg-primary text-primary-foreground hover:bg-primary/90 primary h-9 px-4 py-2 mt-4"
                        onClick={handleTrackOrder}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loader mr-2"></span> // Spinning loader
                        ) : (
                            "Track Order"
                        )}
                    </button>
                    {orderStatus && (
                        <p className="mt-4 text-center text-gray-700">
                            {orderStatus}
                        </p>
                    )}
                </div>
            </div>
            <style jsx>{`
                .loader {
                    border: 4px solid rgba(255, 255, 255, 0.3); /* Light border */
                    border-top: 4px solid #ffffff; /* White spinning border */
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite; /* Spinning animation */
                }
                
                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
};

export default ChangeLogPage;
