import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { stripeKey } from '../config/paymentKeys';
import { Button } from '@material-tailwind/react';
import { useModal } from '../hooks/modal';
import useAppState from '../hooks/appState';
import useApiMutation from '../api/hooks/useApiMutation';

const CheckoutForm = ({ closeModal, amount, successCall }) => {
    const { user } = useAppState();
    const { mutate } = useApiMutation();
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage(null);

        if (!stripe || !elements) {
            setLoading(false);
            return;
        }

        try {
            // Validate form elements first
            const { error: elementsError } = await elements.submit();
            if (elementsError) {
                throw elementsError;
            }

            // Create payment intent through backend
            mutate({
                url: "/create-payment-intent",
                method: "POST",
                data: { amount, currency: "usd" },
                headers: true,
                onSuccess: async (response) => {
                    const clientSecret = response.data.data;

                    // Confirm payment with Stripe
                    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
                        elements,
                        clientSecret,
                        confirmParams: {
                            return_url: window.location.href,
                        },
                        redirect: 'if_required',
                    });

                    if (confirmError) {
                        throw confirmError;
                    }

                    // Handle successful payment
                    if (successCall) {
                        successCall({reference: paymentIntent.id});
                        closeModal();
                    } else {
                        // Call your order confirmation endpoint
                        mutate({
                            url: "/user/checkout/dollar",
                            method: "POST",
                            data: {
                                refId: paymentIntent.id,
                                shippingAddress: `${user.location.city} ${user.location.state}, ${user.location.country}`,
                            },
                            headers: true,
                            onSuccess: () => {
                                console.log("Order confirmed!");
                                closeModal();
                            },
                            onError: (error) => {
                                setErrorMessage(error.message);
                            },
                        });
                    }
                },
                onError: (error) => {
                    throw new Error(error.message);
                },
            });
        } catch (err) {
            setErrorMessage(err.message);
            setTimeout(() => closeModal(), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <PaymentElement
                options={{
                    wallets: {
                        link: 'never' // Disable Link wallet
                    }
                }}
            />
            <div className="mt-4 flex justify-center">
                <Button
                    className="bg-kuduOrange w-1/2"
                    type="submit"
                    disabled={!stripe || loading}
                >
                    {loading ? "Processing..." : "Pay"}
                </Button>
            </div>
            {errorMessage && (
                <div className="text-red-500 mt-2">
                    {errorMessage} (Closing in 3 seconds...)
                </div>
            )}
        </form>
    );
};

const DollarPaymentButton = ({ amount, children, noWidth, bgColor, onSuccess }) => {
    const { openModal, closeModal } = useModal();
    const stripePromise = loadStripe(stripeKey);

    const options = {
        mode: 'payment',
        amount: amount * 100,
        currency: 'usd',
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#e76f51', // Your brand color
            }
        },
    };

    const handleModal = () => {
        openModal({
            size: "sm",
            content: (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                        closeModal={closeModal}
                        amount={amount}
                        successCall={onSuccess}
                    />
                </Elements>
            )
        });
    };

    return (
        <Button
            onClick={handleModal}
            className={`${noWidth ? '' : 'w-3/4'} py-3 px-4 flex justify-center gap-2 ${bgColor || 'bg-kuduOrange'} shadow-md text-white rounded-lg font-[500] transition-colors`}
        >
            {children}
        </Button>
    );
};

export default DollarPaymentButton;