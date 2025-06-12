'use client'

import { HiButton } from '@hidstech/common_components';
import React, { useState } from 'react';
import Script from 'next/script';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const PaymentPage = () => {
    const AMOUNT = 100;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);
        try {
            const response = await fetch('/api/create-order', { method: 'POST' });
            const data = await response.json();
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: AMOUNT * 100,
                currency: 'INR',
                name: 'CoachR',
                description: 'Test Payment',
                order_id: data.id,
                handler: async function (response: any) {
                    console.log('Payment verified:', response);            
                },
                prefill: {
                    name: 'John Doe',
                    email: 'Z2TlG@example.com',
                    contact: '9999999999',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();

        } catch (error) {
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    }



return (
    <div className='h-screen pt-[200px] container'>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <h1 className='text-2xl font-bold'>Amount to Pay : {AMOUNT} INR</h1>
        <HiButton className='mt-5' disabled={isProcessing} onClick={handlePayment}>{isProcessing ? 'Processing...' : 'Pay Now'}</HiButton>
    </div>
)};

export default PaymentPage;