import { useEffect, useState } from "react";
import { Button, Step, Stepper } from "@material-tailwind/react";
import useApiMutation from "../api/hooks/useApiMutation";

const TrackOrder = ({ userType, orderId, status, admin, refetch }) => {
    const { mutate } = useApiMutation();

    const statusArr = ['pending', 'processing', 'shipped', 'delivered'];
    const statusIndex = statusArr.indexOf(status);

    const [activeStep, setActiveStep] = useState(statusIndex);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    const handleNext = () => {
        mutate({
            url: admin ? `/admin/order/item/update/status` : `/user/order/item/update/status`,
            method: "POST",
            headers: true,
            data: {
                orderItemId: orderId,
                status: `${statusArr[statusIndex + 1]}`
            },
            onSuccess: (response) => {
                refetch();
            }
        });
    };


    const handlePrev = () => {
        mutate({
            url: admin ? `/admin/order/item/update/status` : `/user/order/item/update/status`,
            method: "POST",
            headers: true,
            data: {
                orderItemId: orderId,
                status: `cancelled`
            },
            onSuccess: (response) => {
                refetch();
            }
        });
    };

    return (
        <div className="w-full p-6 bg-white h-full shadow rounded-lg">
            <div className="flex w-full justify-between">
                <h2 className="text-lg font-bold mb-4">Track Order</h2>
            </div>

            <div className="w-full py-4 mt-8 px-8">
                <Stepper
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                >
                    <Step className="h-4 w-4">
                        <div className="absolute -bottom-[3.5rem] w-max text-center">
                            <span className={activeStep === 0 ? "text-kuduOrange" : "text-black"}>
                                Pending
                            </span>
                        </div>
                    </Step>
                    <Step className="h-4 w-4">
                        <div className="absolute -bottom-[3.5rem] w-max text-center">
                            <span className={activeStep === 1 ? "text-kuduOrange" : "text-black"}>
                                Processing
                            </span>
                        </div>
                    </Step>
                    <Step className="h-4 w-4">
                        <div className="absolute -bottom-[3.5rem] w-max text-center">
                            <span className={activeStep === 2 ? "text-kuduOrange" : "text-black"}>
                                Shipped
                            </span>
                        </div>
                    </Step>
                    <Step className="h-4 w-4">
                        <div className="absolute -bottom-[3.5rem] w-max text-center">
                            <span className={activeStep === 3 ? "text-kuduOrange" : ""}>
                                Delivered
                            </span>
                        </div>
                    </Step>
                </Stepper>
            </div>
            {status !== 'cancelled' ?
                userType ? (
                    <div className="mt-20 flex justify-between">
                        <Button className="bg-red-500" onClick={handlePrev} disabled={isLastStep}>
                            Cancel
                        </Button>
                        <Button onClick={handleNext} disabled={isLastStep}>
                            Next
                        </Button>
                    </div>
                )
                    :
                    (
                        status !== 'shipped' && (
                            <div className="mt-20 flex justify-between">
                                <Button className="bg-red-500" onClick={handlePrev} disabled={isLastStep}>
                                    Cancel
                                </Button>
                            </div>
                        )
                    )
                :
                <></>
            }
                <div className="mt-20 flex justify-between">
                </div>
        </div>
    )
};

export default TrackOrder;