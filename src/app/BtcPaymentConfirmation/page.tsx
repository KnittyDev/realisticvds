"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { Copy, QrCode, HelpCircle, CheckCircle, Clock } from 'lucide-react';

const walletAddress = "bc1q7s8cseg9r36wxrjy0cd3azkcw9v2q6dld2hsdn";
const countdownTime = 30 * 60;

export default function PaymentPage() {
    const [timeLeft, setTimeLeft] = useState(countdownTime);
    const [isMobile, setIsMobile] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSupportOpen, setIsSupportOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [btcAmount, setBtcAmount] = useState("Calculating...");
    const [loading, setLoading] = useState(true);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [copiedField, setCopiedField] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get("amount");
        const orderIdParam = urlParams.get("orderId");

        if (amount) {
            setBtcAmount(amount);
        }

        if (orderIdParam) {
            setOrderId(orderIdParam);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
        setStep(1);
        setTimeout(() => setStep(2), 2000);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = '';
    };

    const toggleSupportModal = () => {
        setIsSupportOpen(!isSupportOpen);
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progressPercentage = (timeLeft / countdownTime) * 100;

    const truncateAddress = (address: string) => {
        return isMobile ? `${address.slice(0, 10)}${address.slice(-4)}...` : address;
    };

    const copyToClipboard = (text: string, field: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedField(field);
            setTimeout(() => setCopiedField(null), 2000);
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center text-white">
                    <svg className="animate-spin h-10 w-10 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    <p className="text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text inline-block">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex flex-col justify-between px-4">
            <header className="flex items-center justify-between p-4 bg-black shadow">
                <span className="text-lg font-bold font-heading">TORKS</span>
            </header>

            <main className="flex-1 container mx-auto w-full p-6 bg-white rounded-lg shadow-md mt-6">
                <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">#{orderId}</h1>
                <p className="text-gray-600 mt-2">
                    Scan the QR code or copy and paste the payment details into your wallet.
                </p>

                <div className="flex items-center w-full bg-yellow-100 text-yellow-700 p-2 mt-4 rounded">
                    <span>⚠️</span>
                    <p className="ml-2 text-sm">Once the payment is complete, you will be automatically redirected to the “order completed” page!</p>
                    <HelpCircle
                        size={isMobile ? 100 : 20}
                        className="ml-2 text-purple-600 cursor-pointer"
                        onClick={toggleSupportModal}
                    />
                    <span className="text-gray-500 ml-2">Support: <span className="font-semibold text-green-500">Available</span></span>
                </div>

                <div className="flex flex-col items-center mt-6">
                    <QRCode value={walletAddress} size={150} className="mt-4" />
                </div>

                <div className="flex flex-col items-center mt-4">
                    <p className="text-gray-700 font-semibold mb-2">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
                    <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={openModal}
                        className="bg-purple-500 text-white font-semibold w-full md:w-60 py-3 mt-4 rounded-md transform transition duration-200 ease-in-out hover:bg-purple-600 active:scale-95"
                    >
                        Check payment
                    </button>
                </div>

                <div className="flex items-center my-6">
                    <hr className="w-full border-gray-300" />
                    <span className="text-gray-500 mx-4">Details</span>
                    <hr className="w-full border-gray-300" />
                </div>

                <div className="space-y-4 w-full mx-auto flex justify-center">
                    <div className="w-full md:w-1/2">
                        <p className="text-sm text-gray-700 font-semibold">Amount</p>
                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded mt-2">
                            <span className="text-lg font-medium text-black">{btcAmount}</span>
                            <div className="flex items-center space-x-4">
                                {copiedField === 'btcAmount' ? (
                                    <CheckCircle size={24} className="text-purple-600" />
                                ) : (
                                    <Copy
                                        size={24}
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => copyToClipboard(btcAmount, 'btcAmount')}
                                    />
                                )}
                                <QrCode size={24} className="text-gray-500 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4 w-full mx-auto flex justify-center mt-4">
                    <div className="w-full md:w-1/2">
                        <p className="text-sm text-gray-700 font-semibold">Address</p>
                        <div className="flex items-center justify-between bg-gray-100 p-3 rounded mt-2">
                            <span className="text-lg font-medium text-black truncate">{truncateAddress(walletAddress)}</span>
                            <div className="flex items-center space-x-4">
                                {copiedField === 'walletAddress' ? (
                                    <CheckCircle size={24} className="text-purple-600 transition-transform transform scale-110" />
                                ) : (
                                    <Copy
                                        size={24}
                                        className="text-gray-500 cursor-pointer"
                                        onClick={() => copyToClipboard(walletAddress, 'walletAddress')}
                                    />
                                )}
                                <QrCode size={24} className="text-gray-500 cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Your payment is fully encrypted <a href="#" className="text-purple-600">by TORKS</a>
                </p>
            </main>

            <footer className="flex flex-col items-center p-4 text-center text-gray-500 text-sm">
                <p>Powered by <span className="text-purple-600">TORKS</span></p>
                <p className="mt-2">
                This payment invoice preserves anonymity by (TORKS). <a href="#" className="text-purple-600">Disclaimer applies</a>
                </p>
            </footer>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 w-4/5 sm:w-1/3 rounded-lg shadow-lg transition-all duration-300 transform scale-100 opacity-100">
                        <h2 className="text-xl font-semibold text-gray-800">Checking Payment Status...</h2>
                        <ul className="mt-4 space-y-2 text-black">
                            <li className="flex items-center">
                                {step >= 1 ? (
                                    <CheckCircle size={20} className="text-green-500 mr-2" />
                                ) : (
                                    <Clock size={20} className="text-gray-400 mr-2" />
                                )}
                                <span>Product Selected</span>
                            </li>
                            <li className="flex items-center">
                                {step >= 1 ? (
                                    <CheckCircle size={20} className="text-green-500 mr-2" />
                                ) : (
                                    <Clock size={20} className="text-gray-400 mr-2" />
                                )}
                                <span>Order Created ID: {orderId}</span>
                            </li>
                            <li className="flex items-center">
                                <Clock size={20} className="text-yellow-500 mr-2" />
                                <span>Payment Pending</span>
                            </li>
                        </ul>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white py-2 px-4 rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isSupportOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 w-4/5 sm:w-1/3 rounded-lg shadow-lg transition-all duration-300 transform scale-100 opacity-100">
                        <h2 className="text-xl font-semibold text-gray-800">Support</h2>
                        <p className="mt-4 text-gray-600">
                            If you have any questions, feel free to reach out!
                        </p>
                        <div className="mt-4 text-gray-700">
                            <p><strong>Support Load:</strong> Moderate</p>
                            <p><strong>Average Response Time:</strong> ~5-15 minutes</p>
                            <p><strong>Contact:</strong> torks@tutamail.com</p>
                        </div>
                        <button
                            onClick={toggleSupportModal}
                            className="mt-4 w-full bg-red-500 text-white py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
