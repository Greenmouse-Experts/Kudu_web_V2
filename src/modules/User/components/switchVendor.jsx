import { useDispatch } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { useModal } from '../../../hooks/modal';
import useApiMutation from '../../../api/hooks/useApiMutation';

const SwitchVendorModal = ({ children, redirect }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const { mutate } = useApiMutation();

    const switchVendor = () => {
        mutate({
            url: "/user/become/vendor",
            method: "POST",
            headers: true,
            onSuccess: (response) => {
                redirect();
                closeModal();
            },
            onError: () => {
                closeModal();
            }
        });
    }

    return (
        <>
            <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
                <div className="flex gap-5 justify-center w-full">
                    <p className="font-semibold text-center text-lg">
                        Switch to Vendor?
                    </p>
                </div>
                {children}
                <div className="flex justify-center mt-5 gap-4">
                    <Button
                        onClick={() => switchVendor()}
                        className="bg-kuduOrange text-white outline-none px-4 py-2 rounded-lg"
                    >
                        Yes, Switch to Vendor
                    </Button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

export default SwitchVendorModal;