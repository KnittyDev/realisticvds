"use client";
import React, { useState, useEffect } from "react";
import { CreditCard, DollarSign, Wallet, User, Mail, MapPin, Phone, Flag, Bike, Car, Plane } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Order {
    id: number;
    name: string;
    description: string;
    usdPrice: number;
    icon: React.ReactNode;
}

interface SubCategoryType {
    id: number;
    name: string;
    balance: string;
    usdPrice: number;
}

const fetchBtcPrice = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd");
        const data = await response.json();
        return data.bitcoin.usd;
    } catch (error) {
        console.error("BTC price fetch error:", error);
        return null;
    }
};

const orders: Order[] = [
    { id: 1, name: "Digital Card", description: "Virtual card | Online Purchases | CVV/CVC | Proxy | ApplePay / GooglePay avaible ", usdPrice: 350, icon: <CreditCard size={24} className="text-gray-600" /> },
    { id: 2, name: "Prepaid Card", description: "Physical card | 4 Digit PIN | ATM'S withdrawawls | CVV/CVC | Contactless payment", usdPrice: 350, icon: <CreditCard size={24} className="text-gray-600" /> },
    { id: 3, name: "Paypal Transfer", description: "Transfer money to paypal account | Familiar Methods | From Safe Accounts", usdPrice: 250, icon: <DollarSign size={24} className="text-gray-600" /> },
];

const cardCategoryTypes: SubCategoryType[] = [
    { id: 1, name: "Standart Balance: ", balance: "$2500", usdPrice: 350 },
    { id: 2, name: "Expanded Balance: ", balance: "$4000", usdPrice: 399 },
];

const paypalCategoryTypes: SubCategoryType[] = [
    { id: 1, name: "$3000 Transfer", balance: "", usdPrice: 250 },
    { id: 2, name: "$5000 Transfer", balance: "", usdPrice: 350 },
    { id: 3, name: "$7000 Transfer", balance: "", usdPrice: 399 },
];

export default function OrderSelection() {
    const [btcPrice, setBtcPrice] = useState<number | null>(null);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [selectedCategoryType, setSelectedCategoryType] = useState<SubCategoryType | null>(null);
    const [selectedShippingOption, setSelectedShippingOption] = useState<string | null>(null);
    const [totalPriceBtc, setTotalPriceBtc] = useState<string>("Calculating...");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});
    const [isConfirmButtonEnabled, setIsConfirmButtonEnabled] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPhoneAlert, setShowPhoneAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const getBtcPrice = async () => {
            const price = await fetchBtcPrice();
            setBtcPrice(price);
        };
        getBtcPrice();
    }, []);

    useEffect(() => {
        if (btcPrice && selectedCategoryType) {
            let totalUsdPrice = selectedCategoryType.usdPrice;
            if (selectedShippingOption === "Car") totalUsdPrice += 15;
            if (selectedShippingOption === "Plane") totalUsdPrice += 27;
            const totalPrice = (totalUsdPrice / btcPrice).toFixed(6) + " BTC";
            setTotalPriceBtc(totalPrice);
        }
    }, [btcPrice, selectedCategoryType, selectedShippingOption]);

    useEffect(() => {
        const requiredFields = selectedOrder?.id === 2 
            ? selectedShippingOption 
                ? ["nameSurname", "country", "address", "email"]
                : []
            : selectedOrder?.id === 1 
            ? ["nameSurname", "email"] 
            : ["nameSurname", "paypalId", "email"];
    
        const allFieldsFilled = requiredFields.every(field => formData[field]);
        setIsConfirmButtonEnabled(allFieldsFilled && (selectedOrder?.id !== 2 || selectedShippingOption !== null));
    }, [formData, selectedOrder, selectedShippingOption]);

    const validateEmail = (email: string) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhone = (phone: string) => {
        const phonePattern = /^\+?[0-9]{7,15}$/;
        return phonePattern.test(phone);
    };

    const handleNext = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIsConfirmButtonEnabled(false);
        setFormData({});
    };
    
    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = 'hidden';
            toast.info("After entering your information, you will be directed to the payment page!");
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    const handleConfirmDetails = () => {
        const emailValid = selectedOrder?.id === 1 ? validateEmail(formData.email) : true;
        const phoneValid = selectedOrder?.id === 2 ? validatePhone(formData.phone) : true;
    
        if (!emailValid) {
            setAlertMessage("Please enter a valid email.");
            setShowEmailAlert(true);
        } else if (!phoneValid) {
            setAlertMessage("Please enter a valid phone number.");
            setShowPhoneAlert(true);
        } else {
            const orderId = '4' + Math.floor(1000000 + Math.random() * 9000000).toString();
            const query = new URLSearchParams({ amount: totalPriceBtc, orderId }).toString();
            router.push(`/BtcPaymentConfirmation?${query}`);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCloseAlerts = () => {
        setShowEmailAlert(false);
        setShowPhoneAlert(false);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col justify-between px-4">
            <header className="flex items-center justify-between p-4 bg-black shadow">
                <span className="text-lg font-bold font-heading">Order Selection</span>
            </header>

            <main className="flex-1 container mx-auto w-full p-6 bg-white rounded-lg shadow-md mt-6">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">Select Your Order</h1>
                <p className="text-gray-600 mt-2">Please choose an order from the list below</p>

                <div className="mt-4 space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className={`flex justify-between items-center p-4 border rounded-lg cursor-pointer ${selectedOrder?.id === order.id ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 border-gray-300'}`}
                            onClick={() => setSelectedOrder(order)}
                        >
                            <div className="flex items-center">
                                {order.icon}
                                <div className="ml-2">
                                    <h2 className="text-lg font-semibold text-purple-600">{order.name}</h2>
                                    <p className="text-gray-500">{order.description}</p>
                                </div>
                            </div>
                            <span className="text-lg font-medium text-black">${order.usdPrice}</span>
                        </div>
                    ))}
                </div>

                {selectedOrder && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800">Select a Category Type:</h2>
                        <div className="mt-2 space-y-2">
                            {(selectedOrder.id === 3 ? paypalCategoryTypes : cardCategoryTypes).map((type) => (
                                <div
                                    key={type.id}
                                    className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer ${selectedCategoryType?.id === type.id ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 border-gray-300'}`}
                                    onClick={() => setSelectedCategoryType(type)}
                                >
                                    <span className="text-purple-600">{type.name} {type.balance && <Wallet size={16} className="inline-block ml-1 text-[#8E24AA]" />} {type.balance}</span>
                                    <span className="text-black">${type.usdPrice}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedOrder?.id === 2 && selectedCategoryType && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-800">Select Shipping Option:</h2>
                        <div className="mt-2 space-y-2">
                            <div
                                className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer ${selectedShippingOption === "Bike" ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 border-gray-300'}`}
                                onClick={() => setSelectedShippingOption("Bike")}
                            >
                                <span className="flex items-center text-purple-600">
                                    <Bike size={16} className="mr-2" /> Normal: 7-14 days delivery
                                </span>
                            </div>
                            <div
                                className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer ${selectedShippingOption === "Car" ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 border-gray-300'}`}
                                onClick={() => setSelectedShippingOption("Car")}
                            >
                                <span className="flex items-center text-purple-600">
                                    <Car size={16} className="mr-2" /> Express: 5-8 days delivery, +15 dollars
                                </span>
                            </div>
                            <div
                                className={`flex justify-between items-center p-2 border rounded-lg cursor-pointer ${selectedShippingOption === "Plane" ? 'bg-purple-100 border-purple-400' : 'bg-gray-100 border-gray-300'}`}
                                onClick={() => setSelectedShippingOption("Plane")}
                            >
                                <span className="flex items-center text-purple-600">
                                    <Plane size={16} className="mr-2" /> Premium: 1-4 days delivery, +27 dollars
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {selectedCategoryType && (
                    <div className="flex justify-between items-center p-4 border border-gray-300 rounded-lg mt-6">
                        <span className="font-bold text-gray-800">Total Price:</span>
                        <span className="font-bold text-purple-600">{totalPriceBtc}</span>
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleNext}
                        className={`px-4 py-2 rounded-lg w-full md:w-60 ${!selectedOrder || !selectedCategoryType || btcPrice === null || (selectedOrder?.id === 2 && !selectedShippingOption) ? 'bg-gray-400 text-gray-200' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                        disabled={!selectedOrder || !selectedCategoryType || btcPrice === null || (selectedOrder?.id === 2 && !selectedShippingOption)}
                    >
                        Next
                    </button>
                </div>
            </main>

            <ToastContainer
    toastStyle={{
        backgroundColor: "#ffffff",
        color: "#8E24AA"
    }}
    progressStyle={{
        backgroundColor: "#8E24AA" // Azalan barın rengini değiştiriyoruz
    }}
    icon={<span style={{ color: "#8E24AA" }}>ℹ️</span>} // Bilgi ikonu rengi değiştirildi
/>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold text-purple-600">Confirm Your Details</h2>

                        {selectedOrder?.id === 2 && (
                            <>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <User size={16} className="mr-2" />
                                    <input name="nameSurname" placeholder="Name / Surname" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Mail size={16} className="mr-2" />
                                    <input name="email" placeholder="Email example@mail.com" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Flag size={16} className="mr-2" />
                                    <input name="country" placeholder="Country" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <MapPin size={16} className="mr-2" />
                                    <input name="address" placeholder="Address" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Phone size={16} className="mr-2" />
                                    <input name="phone" placeholder="Phone Number +123456789" onChange={handleInputChange} className="flex-1" />
                                </div>
                            </>
                        )}

                        {selectedOrder?.id === 1 && (
                            <>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <User size={16} className="mr-2" />
                                    <input name="nameSurname" placeholder="Name / Surname" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Mail size={16} className="mr-2" />
                                    <input name="email" placeholder="Email example@mail.com" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Phone size={16} className="mr-2" />
                                    <input name="phone" placeholder="+123456789 (Optional)" onChange={handleInputChange} className="flex-1" />
                                </div>
                            </>
                        )}

                        {selectedOrder?.id === 3 && (
                            <>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <User size={16} className="mr-2" />
                                    <input name="nameSurname" placeholder="Name / Surname" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Mail size={16} className="mr-2" />
                                    <input name="email" placeholder="Email example@mail.com" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <DollarSign size={16} className="mr-2" />
                                    <input name="paypalId" placeholder="Paypal ID" onChange={handleInputChange} className="flex-1" />
                                </div>
                                <div className="flex items-center mb-2 p-2 border rounded w-full text-purple-600">
                                    <Phone size={16} className="mr-2" />
                                    <input name="phone" placeholder="+123456789 (Optional)" onChange={handleInputChange} className="flex-1" />
                                </div>
                            </>
                        )}

                        <button
                            onClick={handleConfirmDetails}
                            className={`mt-4 px-4 py-2 rounded-lg w-full ${isConfirmButtonEnabled ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-gray-400 text-gray-200'}`}
                            disabled={!isConfirmButtonEnabled}
                        >
                            Save Details
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="mt-2 text-gray-500 w-full"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {showEmailAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-red-500 text-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold">Warning</h2>
                        <p>{alertMessage}</p>
                        <div className="flex justify-center mt-4">
                            <button onClick={handleCloseAlerts} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showPhoneAlert && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-red-500 text-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
                        <h2 className="text-lg font-semibold">Warning</h2>
                        <p>{alertMessage}</p>
                        <div className="flex justify-center mt-4">
                            <button onClick={handleCloseAlerts} className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
