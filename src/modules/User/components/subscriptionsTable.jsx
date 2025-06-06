import React from 'react';
import { useModal } from '../../../hooks/modal';
import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import PaymentButton from '../../../components/PaymentButton';
import { useState } from 'react';
import useApiMutation from '../../../api/hooks/useApiMutation';
import { useMemo } from 'react';
import { useEffect } from 'react';
import useAppState from '../../../hooks/appState';
import DollarPaymentButton from '../../../components/DollarPaymentButton';
import { paystackKey } from '../../../config/paymentKeys';
import { formatNumberWithCommas } from '../../../helpers/helperFactory';

const SubscriptionTable = ({ data, refetch }) => {
    const { ipInfo } = useAppState();

    const { openModal, closeModal } = useModal();
    const { user } = useAppState();
    const [selectedSubscription, setSelectedSub] = useState({});

    const { mutate } = useApiMutation();

    const paymentKey = paystackKey;


    // Callback when the payment modal is closed.
    const onClose = () => {
        console.log("Payment closed");
        // Handle modal closure if necessary.
    };


    const handleSubscribeModal = (plan) => {
        const planObj = { ...plan, amount: parseFloat(plan.price) };

        // Create success handler with the current plan ID
        const handlePaymentSuccess = (reference) => {
            const payload = {
                refId: reference.reference,
                subscriptionPlanId: planObj.id, // Use planObj.id directly
                isWallet: false
            };

            mutate({
                url: "/vendor/subscribe",
                method: "POST",
                data: payload,
                headers: true,
                onSuccess: (response) => {
                    closeModal();
                    refetch();
                },
                onError: (error) => {
                    closeModal();
                    refetch();
                },
            });
        };

        setSelectedSub(planObj);
        openModal({
            size: "sm",
            content: (
                <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                    <div className="flex gap-5 justify-center w-full">
                        <p className="font-semibold text-center text-lg">
                            Do you wish to subscribe to this plan?
                        </p>
                    </div>
                    <div className="flex justify-center mt-5 gap-4">
                        {ipInfo.currency_name === 'Naira' ?
                            <PaymentButton
                                config={{
                                    reference: new Date().getTime().toString(),
                                    email: "greenmousedev@gmail.com",
                                    amount: planObj.amount * 100,
                                    publicKey: paymentKey,
                                    currency: "NGN",
                                }}
                                onSuccess={handlePaymentSuccess} // Use local handler
                                onClose={onClose}
                                noWidth
                            >
                                <span className="text-sm font-[500] normal-case">
                                    Subscribe
                                </span>
                            </PaymentButton>
                            :
                            <DollarPaymentButton amount={planObj.amount} noWidth onSuccess={handlePaymentSuccess}>
                                <span className="text-sm font-[500] normal-case">
                                    Subscribe
                                </span>
                            </DollarPaymentButton>
                        }
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )
        });
    };



    const handleViewModal = (plan) => {
        openModal({
            size: "md",
            content: (
                <>
                    <div className="grid grid-cols-2 gap-1 px-4">
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Plan Name</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.name}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Plan Amount</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {formatNumberWithCommas(plan.price)}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Plan Validity</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.duration} month(s)
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Product Limit</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.productLimit}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Allows Auction</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.allowsAuction ? 'Yes' : 'No'}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Auction Product Limit</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.auctionProductLimit}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Maximum Number of Ads</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.maxAds}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Ads duration days</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.adsDurationDays}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full mt-5 gap-4">
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )
        })
    }



    return (
        <>
            <div className='All'>
                <div className="rounded-md pb-2 w-full flex justify-between gap-5">
                    <h2 className="text-lg font-semibold text-black-700 mb-4">Subscriptions</h2>
                </div>
                <div className="bg-white rounded-md p-6 w-full gap-5">
                    <h2 className="text-lg font-semibold text-black-700 mb-4 mt-4">All Subscription Plans</h2>
                    <div className="overflow-x-auto mt-5">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className=" text-black-600 text-md font-medium">
                                    <th className="py-6 px-4 text-left">#</th>
                                    <th className="py-6 px-4 text-left">Plan Name</th>
                                    <th className="py-6 px-4 text-left">User Type</th>
                                    <th className="py-6 px-4 text-left">Plan Price</th>
                                    <th className="py-6 px-4 text-left">Plan Validity</th>
                                    <th className="py-6 px-4 text-left">Status</th>
                                    <th className="py-6 px-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((plan, index) => (
                                    <tr
                                        key={plan.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } text-gray-700 text-sm`}
                                    >
                                        <td className="py-6 px-4 text-left">{index + 1}</td>
                                        <td className="py-6 px-4 text-left">{plan.name}</td>
                                        <td className="py-6 px-4 text-left">Vendors</td>
                                        <td className="py-6 px-4 text-left">{plan.currency?.symbol} {formatNumberWithCommas(plan.price)}</td>
                                        <td className="py-6 px-4 text-left">{plan.duration} month(s)</td>
                                        <td className="py-6 px-4 text-left">
                                            <span
                                                className={`py-2 px-4 rounded-lg text-sm capitalize ${plan.isActiveForVendor ? 'bg-green-400 text-white' : 'bg-red-400 text-white'}`}
                                            >
                                                {plan.isActiveForVendor ? 'Active Plan' : 'Not Active'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-left">
                                            {!plan.isActiveForVendor && parseFloat(plan.price) > 0 ?
                                                <Menu placement="left">
                                                    <MenuHandler>
                                                        <button className="text-gray-400 hover:text-gray-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="9" viewBox="0 0 32 9" fill="none">
                                                                <mask id="path-1-outside-1_6231_8791" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="9" fill="black">
                                                                    <rect fill="white" width="32" height="9" />
                                                                    <path d="M4.65341 7.26989C3.87689 7.26989 3.20928 6.99527 2.65057 6.44602C2.09186 5.88731 1.8125 5.21496 1.8125 4.42898C1.8125 3.65246 2.09186 2.98958 2.65057 2.44034C3.20928 1.88163 3.87689 1.60227 4.65341 1.60227C5.42992 1.60227 6.09754 1.88163 6.65625 2.44034C7.21496 2.98958 7.49432 3.65246 7.49432 4.42898C7.49432 4.94981 7.36174 5.42803 7.09659 5.86364C6.84091 6.28977 6.5 6.63068 6.07386 6.88636C5.64773 7.14205 5.17424 7.26989 4.65341 7.26989ZM15.9815 7.26989C15.205 7.26989 14.5374 6.99527 13.9787 6.44602C13.42 5.88731 13.1406 5.21496 13.1406 4.42898C13.1406 3.65246 13.42 2.98958 13.9787 2.44034C14.5374 1.88163 15.205 1.60227 15.9815 1.60227C16.758 1.60227 17.4257 1.88163 17.9844 2.44034C18.5431 2.98958 18.8224 3.65246 18.8224 4.42898C18.8224 4.94981 18.6899 5.42803 18.4247 5.86364C18.169 6.28977 17.8281 6.63068 17.402 6.88636C16.9759 7.14205 16.5024 7.26989 15.9815 7.26989ZM27.3097 7.26989C26.5331 7.26989 25.8655 6.99527 25.3068 6.44602C24.7481 5.88731 24.4688 5.21496 24.4688 4.42898C24.4688 3.65246 24.7481 2.98958 25.3068 2.44034C25.8655 1.88163 26.5331 1.60227 27.3097 1.60227C28.0862 1.60227 28.7538 1.88163 29.3125 2.44034C29.8712 2.98958 30.1506 3.65246 30.1506 4.42898C30.1506 4.94981 30.018 5.42803 29.7528 5.86364C29.4972 6.28977 29.1562 6.63068 28.7301 6.88636C28.304 7.14205 27.8305 7.26989 27.3097 7.26989Z" />
                                                                </mask>
                                                                <path d="M4.65341 7.26989C3.87689 7.26989 3.20928 6.99527 2.65057 6.44602C2.09186 5.88731 1.8125 5.21496 1.8125 4.42898C1.8125 3.65246 2.09186 2.98958 2.65057 2.44034C3.20928 1.88163 3.87689 1.60227 4.65341 1.60227C5.42992 1.60227 6.09754 1.88163 6.65625 2.44034C7.21496 2.98958 7.49432 3.65246 7.49432 4.42898C7.49432 4.94981 7.36174 5.42803 7.09659 5.86364C6.84091 6.28977 6.5 6.63068 6.07386 6.88636C5.64773 7.14205 5.17424 7.26989 4.65341 7.26989ZM15.9815 7.26989C15.205 7.26989 14.5374 6.99527 13.9787 6.44602C13.42 5.88731 13.1406 5.21496 13.1406 4.42898C13.1406 3.65246 13.42 2.98958 13.9787 2.44034C14.5374 1.88163 15.205 1.60227 15.9815 1.60227C16.758 1.60227 17.4257 1.88163 17.9844 2.44034C18.5431 2.98958 18.8224 3.65246 18.8224 4.42898C18.8224 4.94981 18.6899 5.42803 18.4247 5.86364C18.169 6.28977 17.8281 6.63068 17.402 6.88636C16.9759 7.14205 16.5024 7.26989 15.9815 7.26989ZM27.3097 7.26989C26.5331 7.26989 25.8655 6.99527 25.3068 6.44602C24.7481 5.88731 24.4688 5.21496 24.4688 4.42898C24.4688 3.65246 24.7481 2.98958 25.3068 2.44034C25.8655 1.88163 26.5331 1.60227 27.3097 1.60227C28.0862 1.60227 28.7538 1.88163 29.3125 2.44034C29.8712 2.98958 30.1506 3.65246 30.1506 4.42898C30.1506 4.94981 30.018 5.42803 29.7528 5.86364C29.4972 6.28977 29.1562 6.63068 28.7301 6.88636C28.304 7.14205 27.8305 7.26989 27.3097 7.26989Z" fill="#2D1967" />
                                                                <path d="M2.65057 6.44602L1.94344 7.15316L1.94953 7.15915L2.65057 6.44602ZM2.65057 2.44034L3.35163 3.15349L3.35768 3.14745L2.65057 2.44034ZM6.65625 2.44034L5.94912 3.14747L5.95521 3.15347L6.65625 2.44034ZM7.09659 5.86364L6.24238 5.34368L6.2391 5.34914L7.09659 5.86364ZM4.65341 6.26989C4.14177 6.26989 3.72518 6.10014 3.35161 5.7329L1.94953 7.15915C2.69339 7.89039 3.61202 8.26989 4.65341 8.26989V6.26989ZM3.35768 5.73892C2.98538 5.36662 2.8125 4.94817 2.8125 4.42898H0.8125C0.8125 5.48175 1.19833 6.408 1.94346 7.15313L3.35768 5.73892ZM2.8125 4.42898C2.8125 3.92334 2.98221 3.5166 3.35161 3.15347L1.94953 1.72722C1.2015 2.46256 0.8125 3.38159 0.8125 4.42898H2.8125ZM3.35768 3.14745C3.73254 2.77258 4.14729 2.60227 4.65341 2.60227V0.602272C3.6065 0.602272 2.68602 0.990677 1.94346 1.73323L3.35768 3.14745ZM4.65341 2.60227C5.15953 2.60227 5.57428 2.77258 5.94914 3.14745L7.36336 1.73323C6.6208 0.990677 5.70032 0.602272 4.65341 0.602272V2.60227ZM5.95521 3.15347C6.32461 3.5166 6.49432 3.92334 6.49432 4.42898H8.49432C8.49432 3.38159 8.10531 2.46256 7.35729 1.72722L5.95521 3.15347ZM6.49432 4.42898C6.49432 4.77052 6.41006 5.06823 6.24239 5.34369L7.95079 6.38358C8.31342 5.78783 8.49432 5.1291 8.49432 4.42898H6.49432ZM6.2391 5.34914C6.06787 5.63453 5.84475 5.85764 5.55937 6.02887L6.58836 7.74386C7.15525 7.40372 7.61395 6.94502 7.95408 6.37813L6.2391 5.34914ZM5.55937 6.02887C5.29627 6.18673 5.00209 6.26989 4.65341 6.26989V8.26989C5.34639 8.26989 5.99919 8.09736 6.58836 7.74386L5.55937 6.02887ZM13.9787 6.44602L13.2716 7.15316L13.2777 7.15915L13.9787 6.44602ZM13.9787 2.44034L14.6798 3.15349L14.6858 3.14745L13.9787 2.44034ZM17.9844 2.44034L17.2772 3.14747L17.2833 3.15347L17.9844 2.44034ZM18.4247 5.86364L17.5705 5.34368L17.5672 5.34914L18.4247 5.86364ZM15.9815 6.26989C15.4699 6.26989 15.0533 6.10014 14.6797 5.7329L13.2777 7.15915C14.0215 7.89039 14.9401 8.26989 15.9815 8.26989V6.26989ZM14.6858 5.73892C14.3135 5.36662 14.1406 4.94817 14.1406 4.42898H12.1406C12.1406 5.48175 12.5265 6.408 13.2716 7.15313L14.6858 5.73892ZM14.1406 4.42898C14.1406 3.92334 14.3103 3.5166 14.6797 3.15347L13.2777 1.72722C12.5296 2.46256 12.1406 3.38159 12.1406 4.42898H14.1406ZM14.6858 3.14745C15.0607 2.77258 15.4754 2.60227 15.9815 2.60227V0.602272C14.9346 0.602272 14.0141 0.990677 13.2716 1.73323L14.6858 3.14745ZM15.9815 2.60227C16.4877 2.60227 16.9024 2.77258 17.2773 3.14745L18.6915 1.73323C17.9489 0.990677 17.0284 0.602272 15.9815 0.602272V2.60227ZM17.2833 3.15347C17.6527 3.5166 17.8224 3.92334 17.8224 4.42898H19.8224C19.8224 3.38159 19.4334 2.46256 18.6854 1.72722L17.2833 3.15347ZM17.8224 4.42898C17.8224 4.77052 17.7382 5.06823 17.5705 5.34369L19.2789 6.38358C19.6415 5.78783 19.8224 5.1291 19.8224 4.42898H17.8224ZM17.5672 5.34914C17.396 5.63453 17.1729 5.85764 16.8875 6.02887L17.9165 7.74386C18.4834 7.40372 18.9421 6.94502 19.2822 6.37813L17.5672 5.34914ZM16.8875 6.02887C16.6244 6.18673 16.3302 6.26989 15.9815 6.26989V8.26989C16.6745 8.26989 17.3273 8.09736 17.9165 7.74386L16.8875 6.02887ZM25.3068 6.44602L24.5997 7.15316L24.6058 7.15915L25.3068 6.44602ZM25.3068 2.44034L26.0079 3.15349L26.0139 3.14745L25.3068 2.44034ZM29.3125 2.44034L28.6054 3.14747L28.6115 3.15347L29.3125 2.44034ZM29.7528 5.86364L28.8986 5.34368L28.8953 5.34914L29.7528 5.86364ZM27.3097 6.26989C26.798 6.26989 26.3814 6.10014 26.0079 5.7329L24.6058 7.15915C25.3496 7.89039 26.2683 8.26989 27.3097 8.26989V6.26989ZM26.0139 5.73892C25.6416 5.36662 25.4688 4.94817 25.4688 4.42898H23.4688C23.4688 5.48175 23.8546 6.408 24.5997 7.15313L26.0139 5.73892ZM25.4688 4.42898C25.4688 3.92334 25.6385 3.5166 26.0079 3.15347L24.6058 1.72722C23.8578 2.46256 23.4688 3.38159 23.4688 4.42898H25.4688ZM26.0139 3.14745C26.3888 2.77258 26.8035 2.60227 27.3097 2.60227V0.602272C26.2628 0.602272 25.3423 0.990677 24.5997 1.73323L26.0139 3.14745ZM27.3097 2.60227C27.8158 2.60227 28.2305 2.77258 28.6054 3.14745L30.0196 1.73323C29.2771 0.990677 28.3566 0.602272 27.3097 0.602272V2.60227ZM28.6115 3.15347C28.9809 3.5166 29.1506 3.92334 29.1506 4.42898H31.1506C31.1506 3.38159 30.7616 2.46256 30.0135 1.72722L28.6115 3.15347ZM29.1506 4.42898C29.1506 4.77052 29.0663 5.06823 28.8986 5.34369L30.607 6.38358C30.9697 5.78783 31.1506 5.1291 31.1506 4.42898H29.1506ZM28.8953 5.34914C28.7241 5.63453 28.501 5.85764 28.2156 6.02887L29.2446 7.74386C29.8115 7.40372 30.2702 6.94502 30.6103 6.37813L28.8953 5.34914ZM28.2156 6.02887C27.9525 6.18673 27.6583 6.26989 27.3097 6.26989V8.26989C28.0026 8.26989 28.6554 8.09736 29.2446 7.74386L28.2156 6.02887Z" fill="white" mask="url(#path-1-outside-1_6231_8791)" />
                                                            </svg>
                                                        </button>
                                                    </MenuHandler>
                                                    <MenuList>
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer w-full" onClick={() => handleViewModal(plan)}>
                                                                View Plan
                                                            </span>
                                                        </MenuItem>
                                                        <MenuItem className="flex flex-col gap-3">
                                                            <span className="cursor-pointer w-full" onClick={() => handleSubscribeModal(plan)}>
                                                                Subscribe
                                                            </span>
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                                :
                                                <></>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubscriptionTable;
