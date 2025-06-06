import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../components/Loader';
import useApiMutation from '../../../api/hooks/useApiMutation';
import DropZone from '../../../components/DropZone';

const UpdateAdvert = () => {
    const [categories, setCategories] = useState([]);
    const [files, setFiles] = useState([]);
    const { id } = useParams();
    const [advert, setViewedAdvert] = useState({});
    const [loading, setLoading] = useState(true);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        if (files.length > 0) {
            delete data.category;
            const payload = { ...data, advertId: id, showOnHomepage: data.showOnHomepage === 'true', media_url: files[0][0] };
            mutate({
                url: "/admin/adverts",
                method: "PUT",
                data: payload,
                headers: true,
                onSuccess: (response) => {
                    navigate(-1)
                },
                onError: () => {
                },
            });
        }
    }


    const getCategories = () => {
        mutate({
            url: `/admin/sub/categories`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setCategories(response.data.data);
            },
            onError: () => {
            }
        });
    }


    const getAdvert = () => {
        mutate({
            url: `/admin/general/adverts`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const adverts = response.data.data;
                // Find the advert whose id matches the id from the URL.
                // Note: Make sure both values are of the same type (string vs number).
                const foundAdvert = adverts.find((advert) => String(advert.id) === id);
                setViewedAdvert(foundAdvert);
            },
            onError: () => {
            }
        });
    }


    useEffect(() => {
        getCategories();
        getAdvert();
    }, []);


    const handleDrop = (data) => {
        setFiles((prevFiles) => [data]);
    }


    useEffect(() => {
        if (!advert || Object.keys(advert || {}).length === 0) return;

        setValue("title", advert.title);
        setValue("description", advert.description);
        setValue("showOnHomepage", advert.showOnHomepage.toString());
        setValue("categoryId", advert.categoryId);
        setFiles([advert.media_url]);
        setLoading(false);
    }, [advert, setValue]);



    if (loading) {
        return (<div className="w-full h-screen flex items-center justify-center">
            <Loader />
        </div>
        )
    }



    return (
        <div className='All'>
            <div className="rounded-md pb-2 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700 mt-4 mb-4">Update Advert</h2>
            </div>
            <div className="w-full flex flex-grow mt-3">
                <div className="shadow-xl py-2 px-5 md:w-3/5 w-full bg-white flex rounded-xl flex-col gap-10">

                    <form
                        className="w-full flex flex-col items-center justify-center p-4"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full p-6">
                            <div className="mb-4">
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <select
                                    id='categoryId'
                                    {...register("categoryId", { required: "Category is required" })}
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required
                                >
                                    <option value={null} disabled selected>Select Category</option>
                                    {categories.map((category) => (
                                        <option value={category.id} key={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="title"
                                >
                                    Advert Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    {...register("title", { required: "Advert Title is required" })}
                                    placeholder="Enter title of advert"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    id="description"
                                    {...register("description", { required: "Advert description is required" })}
                                    placeholder="Describe your advert"
                                    className="w-full px-4 py-4 h-60 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className='mb-4'>
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="showOnHomepage"
                                >
                                    Show on Homepage
                                </label>
                                <div className="flex items-center gap-10">
                                    {/* Yes Option */}
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="showOnHomepage"
                                            value="true"
                                            {...register("showOnHomepage")}
                                            className="hidden"
                                        />
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center radio-indicator">
                                            <div className="w-3 h-3 rounded-full"></div>
                                        </div>
                                        <span className="text-gray-700 font-semibold">Yes</span>
                                    </label>

                                    {/* No Option */}
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="showOnHomepage"
                                            value="false"
                                            {...register("showOnHomepage")}
                                            className="hidden"
                                        />
                                        <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center radio-indicator">
                                            <div className="w-3 h-3 rounded-full"></div>
                                        </div>
                                        <span className="text-gray-700 font-semibold">No</span>
                                    </label>
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-2 mt-10">
                                <div className="flex flex-col md:w-1/2 w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Advert Image <i>(Recommended image size: 1309 × 384 pixels)</i>
                                    </p>
                                    <DropZone onUpload={handleDrop} text={'Upload an Image of Advert'} />
                                </div>
                                <div className="grid grid-cols-3 gap-4 my-4">
                                    {files.map((fileObj, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={fileObj}
                                                alt="preview"
                                                className="w-full h-24 object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-kuduOrange text-white py-2 px-4 rounded-md font-bold"
                            >
                                Update Advert
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );
};

export default UpdateAdvert;
