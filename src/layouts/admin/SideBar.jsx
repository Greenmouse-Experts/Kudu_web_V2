import { useState } from "react";
import Imgix from "react-imgix";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useModal } from "../../hooks/modal";
import LogOutModal from "../../components/LogOut";
import { FaLaptop } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";


const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    const [dropdownStates, setDropdownStates] = useState({
        stores: false,
        orders: false,
        users: false,
        products: false,
        pages: false,
        jobs: false,
    });
    const { openModal } = useModal();
    const navigate = useNavigate();

    const handleChildren = (type) => {
        setDropdownStates((prevState) => ({
            stores: type === 'stores' ? !prevState.stores : false,
            orders: type === 'orders' ? !prevState.orders : false,
            users: type === 'users' ? !prevState.users : false,
            products: type === 'products' ? !prevState.products : false,
            pages: type === 'pages' ? !prevState.pages : false,
            jobs: type === 'jobs' ? !prevState.jobs : false,
        }));
    };

    const logOutRedirect = () => {
        navigate('/auth/admin/login');
    }

    const handleLogOutModal = () => {
        openModal({
            size: "sm",
            content: <LogOutModal redirect={logOutRedirect} mode='admin' />
        })
    }

    return (
        <>
            <div className={`bg-kuduMade h-full px-6 pt-6 rounded-md flex-col w-full md:w-[20%] relative md:fixed flex overflow-auto bg-mobiDarkCloud transition-all mb-10`}>
                <div className={`h-full bg-white pb-20 rounded-md flex-col w-full md:w-[21%] relative md:fixed flex overflow-auto bg-mobiDarkCloud transition-all mb-10`}>
                    {/* Logo */}
                    <div className="px-4 flex flex-col gap-2">
                        <Link to={'/auth/admin/login'}>
                            <Imgix
                                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737211689/kuduMart/kudum_1_urk9wm.png"
                                alt="Kudu Mart Logo"
                                className="object-cover"
                                style={{ width: "80px", height: "80px" }}
                            />
                        </Link>
                        <div className='w-full h-[1px] mb-4 border-mobiSilverDivider border-bottom border'></div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="px-5 space-y-5">
                        <Link to={'/admin/dashboard'}
                            className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/dashboard') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-[#FFF1E9]'
                                }`}>
                            <i className="mr-5"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.9823 2.764C12.631 2.49075 12.4553 2.35412 12.2613 2.3016C12.0902 2.25526 11.9098 2.25526 11.7387 2.3016C11.5447 2.35412 11.369 2.49075 11.0177 2.764L4.23539 8.03912C3.78202 8.39175 3.55534 8.56806 3.39203 8.78886C3.24737 8.98444 3.1396 9.20478 3.07403 9.43905C3 9.70352 3 9.9907 3 10.5651V17.8C3 18.9201 3 19.4801 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.0799 21 6.2 21H8.2C8.48003 21 8.62004 21 8.727 20.9455C8.82108 20.8976 8.89757 20.8211 8.9455 20.727C9 20.62 9 20.48 9 20.2V13.6C9 13.0399 9 12.7599 9.10899 12.546C9.20487 12.3578 9.35785 12.2049 9.54601 12.109C9.75992 12 10.0399 12 10.6 12H13.4C13.9601 12 14.2401 12 14.454 12.109C14.6422 12.2049 14.7951 12.3578 14.891 12.546C15 12.7599 15 13.0399 15 13.6V20.2C15 20.48 15 20.62 15.0545 20.727C15.1024 20.8211 15.1789 20.8976 15.273 20.9455C15.38 21 15.52 21 15.8 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4801 21 18.9201 21 17.8V10.5651C21 9.9907 21 9.70352 20.926 9.43905C20.8604 9.20478 20.7526 8.98444 20.608 8.78886C20.4447 8.56806 20.218 8.39175 19.7646 8.03913L12.9823 2.764Z"
                                    stroke={'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            </i>
                            <span className="text-md font-[600]">Dashboard</span>
                        </Link>
                        <div className='relative'>
                            <button onClick={() => handleChildren('users')} className="flex items-center px-4 h-[57px] rounded-lg transition text-[#7F7F7F] hover:bg-[#FFF1E9] w-full">
                                <i className="mr-5">
                                    <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.50855 19.577L7.50852 19.577C6.96322 19.6566 6.55146 20.1334 6.55146 20.7072V20.7076C6.55075 20.9577 6.63252 21.2009 6.7841 21.3998C7.07156 21.7741 7.36665 22.1424 7.66919 22.5046L7.8748 22.7508H7.55406H6.00786H5.935L5.88996 22.6935C5.79237 22.5694 5.69426 22.443 5.59507 22.3144C5.23889 21.8524 5.05146 21.283 5.05146 20.7078C5.05146 19.4124 5.98691 18.2839 7.29177 18.0934C11.5405 17.4725 14.4973 17.5287 18.719 18.113C20.0111 18.2915 20.9514 19.4034 20.9515 20.6915C20.9515 20.6915 20.9515 20.6916 20.9515 20.6916H20.8015C20.8019 21.2547 20.6078 21.8008 20.2519 22.2372L7.50855 19.577ZM7.50855 19.577C11.5996 18.9793 14.413 19.0305 18.5129 19.5981L7.50855 19.577ZM14.3217 13.1876C13.9031 13.361 13.4545 13.4502 13.0015 13.4502C12.0865 13.4502 11.2089 13.0867 10.5619 12.4397C9.91495 11.7927 9.55147 10.9152 9.55147 10.0002C9.55147 9.0852 9.91495 8.20768 10.5619 7.56068C11.2089 6.91368 12.0865 6.5502 13.0015 6.5502C13.4545 6.5502 13.9031 6.63943 14.3217 6.81281C14.7403 6.98619 15.1206 7.24031 15.441 7.56068C15.7613 7.88104 16.0155 8.26136 16.1888 8.67994C16.3622 9.09851 16.4515 9.54713 16.4515 10.0002C16.4515 10.4533 16.3622 10.9019 16.1888 11.3205C16.0155 11.739 15.7613 12.1194 15.441 12.4397C15.1206 12.7601 14.7403 13.0142 14.3217 13.1876ZM13.0015 14.9502C14.3143 14.9502 15.5733 14.4287 16.5016 13.5004C17.4299 12.5721 17.9515 11.313 17.9515 10.0002C17.9515 8.68737 17.4299 7.42832 16.5016 6.50002C15.5733 5.57171 14.3143 5.0502 13.0015 5.0502C11.6886 5.0502 10.4296 5.57171 9.50129 6.50002C8.57298 7.42832 8.05146 8.68737 8.05146 10.0002C8.05146 11.313 8.57298 12.5721 9.50129 13.5004C10.4296 14.4287 11.6886 14.9502 13.0015 14.9502Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                        <path d="M23.65 13C23.65 18.8818 18.8818 23.65 13 23.65C7.11824 23.65 2.35 18.8818 2.35 13C2.35 7.11824 7.11824 2.35 13 2.35C18.8818 2.35 23.65 7.11824 23.65 13ZM13 25.15C19.7104 25.15 25.15 19.7104 25.15 13C25.15 6.28956 19.7104 0.85 13 0.85C6.28956 0.85 0.85 6.28956 0.85 13C0.85 19.7104 6.28956 25.15 13 25.15Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                    </svg>
                                </i>
                                <span className="text-md font-[600]">Users</span>
                                <i className="ml-5 right-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L6 8H18L12 14Z" fill="currentColor" />
                                    </svg>
                                </i>
                            </button>
                            {dropdownStates.users && (
                                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-3 z-10">
                                    <Link to={'/admin/all-customers'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">All Customers</Link>
                                    <Link to={'/admin/all-vendors'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">All Vendors</Link>

                                </div>
                            )}
                        </div>
                        <div className='relative'>
                            <button onClick={() => handleChildren('products')} className="flex items-center px-4 h-[57px] rounded-lg transition text-[#7F7F7F] hover:bg-gray-100 w-full">
                                <i className="mr-5">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
                                            stroke={'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </i>
                                <span className="text-md font-[600]">Products</span>
                                <i className="ml-5 right-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L6 8H18L12 14Z" fill="currentColor" />
                                    </svg>
                                </i>
                            </button>
                            {dropdownStates.products && (
                                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-3 z-10">
                                    <Link to={'products-sell'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">All Products</Link>
                                    <Link to={'my-products'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">My Products</Link>
                                    <Link to={'auction-products'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Auction Products</Link>
                                    <Link to={'products-categories'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Categories</Link>
                                    <Link to={'products-categories/sub-category'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Product SubCategories</Link>
                                </div>
                            )}
                        </div>

                        <div className='relative'>
                            <button onClick={() => handleChildren('stores')} className="flex items-center px-4 h-[57px] rounded-lg transition text-[#7F7F7F] hover:bg-gray-100 w-full">
                                <i className="mr-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M1.58479 1.6V0H22.4138V1.6H1.58479ZM1.69062 24V14.4H0V12.8L1.58479 4.8H22.4138L24 12.8V14.4H22.308V24H20.9335V14.4H14.061V24H1.69062ZM3.06512 22.4H12.6866V14.4H3.06512V22.4ZM1.38824 12.8H22.6104L21.3349 6.4H2.66377L1.38824 12.8Z" fill="#7F7F7F" />
                                    </svg>
                                </i>
                                <span className="text-md font-[600]">Stores</span>
                                <i className="ml-5 right-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L6 8H18L12 14Z" fill="currentColor" />
                                    </svg>
                                </i>
                            </button>
                            {dropdownStates.stores && (
                                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-3 z-10">
                                    <Link to={'/admin/all-stores'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/all-stores') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                                        }`}>All Stores</Link>
                                    <Link to={'/admin/my-stores'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/my-stores') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                                        }`}>My Stores</Link>
                                </div>
                            )}
                        </div>

                        <div className='relative'>
                            <button onClick={() => handleChildren('orders')} className="flex items-center px-4 h-[57px] rounded-lg transition text-[#7F7F7F] hover:bg-gray-100 w-full">
                                <i className="mr-5">
                                    <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.3966 13.1724L14.0863 3.86212C13.9475 3.72223 13.7823 3.61131 13.6002 3.53583C13.4182 3.46035 13.223 3.4218 13.0259 3.42243H4.33625C4.13734 3.42243 3.94657 3.50145 3.80592 3.6421C3.66527 3.78275 3.58625 3.97352 3.58625 4.17243V12.8621C3.58562 13.0592 3.62417 13.2544 3.69965 13.4364C3.77513 13.6184 3.88604 13.7836 4.02594 13.9224L13.3363 23.2327C13.4755 23.3721 13.6409 23.4826 13.8229 23.558C14.0049 23.6334 14.2 23.6722 14.397 23.6722C14.594 23.6722 14.7891 23.6334 14.9711 23.558C15.1531 23.4826 15.3185 23.3721 15.4578 23.2327L23.3966 15.294C23.5359 15.1547 23.6464 14.9893 23.7218 14.8073C23.7972 14.6253 23.836 14.4302 23.836 14.2332C23.836 14.0362 23.7972 13.8411 23.7218 13.6591C23.6464 13.4771 23.5359 13.3117 23.3966 13.1724ZM14.3966 22.1724L5.08625 12.8621V4.92243H13.0259L22.3363 14.2327L14.3966 22.1724ZM9.58625 8.29743C9.58625 8.51994 9.52027 8.73744 9.39665 8.92245C9.27304 9.10745 9.09734 9.25165 8.89177 9.3368C8.6862 9.42195 8.46 9.44422 8.24177 9.40082C8.02354 9.35741 7.82309 9.25026 7.66575 9.09293C7.50842 8.93559 7.40127 8.73514 7.35787 8.51691C7.31446 8.29868 7.33674 8.07248 7.42189 7.86691C7.50703 7.66135 7.65123 7.48564 7.83623 7.36203C8.02124 7.23841 8.23875 7.17243 8.46125 7.17243C8.75962 7.17243 9.04577 7.29096 9.25675 7.50194C9.46772 7.71291 9.58625 7.99906 9.58625 8.29743Z" fill="currentColor" />
                                    </svg>
                                </i>
                                <span className="text-md font-[600]">Orders</span>
                                <i className="ml-5 right-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L6 8H18L12 14Z" fill="currentColor" />
                                    </svg>
                                </i>
                            </button>
                            {dropdownStates.orders && (
                                <div className="absolute left-0 w-full bg-white rounded-md shadow-lg py-3 z-10">
                                    <Link to={'/admin/orders'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/orders') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                                        }`}>All Orders</Link>
                                    <Link to={'/admin/customer-orders'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/customer-orders') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                                        }`}>Customer's Orders</Link>
                                </div>
                            )}
                        </div>
                        <Link to={'/admin/transactions'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/transactions') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                            }`}>
                            <i className="mr-5">
                                <svg width="20" height="15" viewBox="0 0 23 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20.7 18H2.3C1.69 18 1.10499 17.7893 0.673654 17.4142C0.242321 17.0391 0 16.5304 0 16V2C0 1.46957 0.242321 0.960859 0.673654 0.585786C1.10499 0.210714 1.69 0 2.3 0H20.7C21.31 0 21.895 0.210714 22.3263 0.585786C22.7577 0.960859 23 1.46957 23 2V16C23 16.5304 22.7577 17.0391 22.3263 17.4142C21.895 17.7893 21.31 18 20.7 18ZM2.3 4V16H20.7V4H2.3ZM10.35 13.121L6.08695 9.414L7.71305 8L10.35 10.293L15.287 6L16.913 7.414L10.35 13.121Z" fill="currentColor" />
                                </svg>
                            </i>
                            <span className={`text-md font-[600]`}>Transactions</span>
                        </Link>

                        <Link to={'/admin/withdrawal-request'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/withdrawal-request') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                            }`}>
                            <i className="mr-5">
                                <IoCashOutline size={20} />
                            </i>
                            <span className={`text-md font-[600]`}>Withdrawal Request</span>
                        </Link>

                        <div className='relative'>
                            <button onClick={() => handleChildren('pages')} className="flex items-center px-4 h-[57px] rounded-lg transition text-[#7F7F7F] hover:bg-gray-100 w-full">
                                <i className="mr-5">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5"
                                            stroke={'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </i>
                                <span className="text-md font-[600]">Pages</span>
                                <i className="ml-5 right-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L6 8H18L12 14Z" fill="currentColor" />
                                    </svg>
                                </i>
                            </button>
                            {dropdownStates.pages && (
                                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-3 z-10">
                                    <Link to={'pages/faq-category'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Faq category</Link>
                                    <Link to={'pages/faqs'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Faqs</Link>
                                    <Link to={'pages/testimonials'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Testimonial</Link>
                                    {/* <Link to={'products-categories/sub-category'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Product SubCategories</Link> */}
                                </div>
                            )}
                        </div>

                        <div className='relative'>
                            <button onClick={() => handleChildren('jobs')} className="flex items-center px-4 h-[57px] rounded-lg transition text-[#7F7F7F] hover:bg-gray-100 w-full">
                                <FaLaptop className="mr-5" size={20} />
                                <span className="text-md font-[600]">Jobs</span>
                                <i className="ml-5 right-0">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 14L6 8H18L12 14Z" fill="currentColor" />
                                    </svg>
                                </i>
                            </button>
                            {dropdownStates.jobs && (
                                <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg py-3 z-10">
                                    <Link to={'jobs'} onClick={() => handleChildren('')} className="block px-4 py-4 text-sm text-gray-700 hover:bg-gray-100">Jobs</Link>
                                </div>
                            )}
                        </div>

                        <Link to={'/admin/adverts'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/adverts') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                            }`}>
                            <i className="mr-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="26" viewBox="0 0 29 26" fill="none">
                                    <path d="M5.67466 18.3227L9.03999 9.03866C9.65333 7.74933 10.5893 6.68399 11.6627 9.23999C12.6533 11.6 14.1293 15.92 15.0027 18.3267M7.20266 14.336H13.428" stroke="#7F7F7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M2.952 2.75733C1 4.51467 1 7.344 1 13C1 18.656 1 21.4853 2.952 23.2427C4.90667 25 8.048 25 14.3333 25C20.6187 25 23.7613 25 25.7133 23.2427C27.6653 21.4853 27.6667 18.656 27.6667 13C27.6667 7.344 27.6667 4.51467 25.7133 2.75733C23.7627 1 20.6187 1 14.3333 1C8.048 1 4.90533 1 2.952 2.75733Z" stroke="#7F7F7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22.9787 8.98242V12.9758M22.9787 12.9758V18.2331M22.9787 12.9758H20.288C19.968 12.9758 19.6507 13.0344 19.352 13.1504C17.0947 14.0264 17.0947 17.2838 19.352 18.1598C19.652 18.2758 19.968 18.3344 20.288 18.3344H22.9787" stroke="#7F7F7F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </i>
                            <span className={`text-md font-[600]`}>Adverts</span>
                        </Link>

                        <Link to={'subscriptions'} className={`flex items-center px-4 h-[57px] rounded-lg text-[#7F7F7F] hover:bg-gray-100 transition`}>
                            <i className="mr-5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="24" viewBox="0 0 27 24" fill="none">
                                    <path d="M11.3555 17.8879L17.0313 12.2121L18.3464 13.5273L11.2495 20.6242L7.86159 17.2364L9.17673 15.9212L11.1434 17.8879L11.2495 17.9939L11.3555 17.8879ZM21.6682 6.39545H4.51364V4.51364H21.6682V6.39545ZM6.69546 0.15H19.4864V2.03182H6.69546V0.15Z" fill="#7F7F7F" stroke="white" strokeWidth="0.3" />
                                    <path d="M24 21.9684H24.15V21.8184V10.9094V10.7594H24H2.18182H2.03182V10.9094V21.8184V21.9684H2.18182H24ZM2.18182 8.87754H24C24.5389 8.87754 25.0557 9.09161 25.4367 9.47265C25.8178 9.85369 26.0318 10.3705 26.0318 10.9094V21.8184C26.0318 22.3573 25.8178 22.8741 25.4367 23.2552C25.0557 23.6362 24.5389 23.8503 24 23.8503H2.18182C1.64295 23.8503 1.12615 23.6362 0.745106 23.2552C0.364066 22.8741 0.15 22.3573 0.15 21.8184V10.9094C0.15 10.3705 0.364066 9.85369 0.745106 9.47265C1.12615 9.09161 1.64295 8.87754 2.18182 8.87754Z" fill="#7F7F7F" stroke="white" strokeWidth="0.3" />
                                </svg>
                            </i>
                            <span className={`text-md font-[600]`}>Subscription</span>
                        </Link>


                        <Link to={'user-inquiries'} className={`flex items-center px-4 h-[57px] rounded-lg text-[#7F7F7F] hover:bg-gray-100 transition`}>
                            <i className="mr-5">
                                <svg width="20" height="20" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.50855 19.577L7.50852 19.577C6.96322 19.6566 6.55146 20.1334 6.55146 20.7072V20.7076C6.55075 20.9577 6.63252 21.2009 6.7841 21.3998C7.07156 21.7741 7.36665 22.1424 7.66919 22.5046L7.8748 22.7508H7.55406H6.00786H5.935L5.88996 22.6935C5.79237 22.5694 5.69426 22.443 5.59507 22.3144C5.23889 21.8524 5.05146 21.283 5.05146 20.7078C5.05146 19.4124 5.98691 18.2839 7.29177 18.0934C11.5405 17.4725 14.4973 17.5287 18.719 18.113C20.0111 18.2915 20.9514 19.4034 20.9515 20.6915C20.9515 20.6915 20.9515 20.6916 20.9515 20.6916H20.8015C20.8019 21.2547 20.6078 21.8008 20.2519 22.2372L7.50855 19.577ZM7.50855 19.577C11.5996 18.9793 14.413 19.0305 18.5129 19.5981L7.50855 19.577ZM14.3217 13.1876C13.9031 13.361 13.4545 13.4502 13.0015 13.4502C12.0865 13.4502 11.2089 13.0867 10.5619 12.4397C9.91495 11.7927 9.55147 10.9152 9.55147 10.0002C9.55147 9.0852 9.91495 8.20768 10.5619 7.56068C11.2089 6.91368 12.0865 6.5502 13.0015 6.5502C13.4545 6.5502 13.9031 6.63943 14.3217 6.81281C14.7403 6.98619 15.1206 7.24031 15.441 7.56068C15.7613 7.88104 16.0155 8.26136 16.1888 8.67994C16.3622 9.09851 16.4515 9.54713 16.4515 10.0002C16.4515 10.4533 16.3622 10.9019 16.1888 11.3205C16.0155 11.739 15.7613 12.1194 15.441 12.4397C15.1206 12.7601 14.7403 13.0142 14.3217 13.1876ZM13.0015 14.9502C14.3143 14.9502 15.5733 14.4287 16.5016 13.5004C17.4299 12.5721 17.9515 11.313 17.9515 10.0002C17.9515 8.68737 17.4299 7.42832 16.5016 6.50002C15.5733 5.57171 14.3143 5.0502 13.0015 5.0502C11.6886 5.0502 10.4296 5.57171 9.50129 6.50002C8.57298 7.42832 8.05146 8.68737 8.05146 10.0002C8.05146 11.313 8.57298 12.5721 9.50129 13.5004C10.4296 14.4287 11.6886 14.9502 13.0015 14.9502Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                    <path d="M23.65 13C23.65 18.8818 18.8818 23.65 13 23.65C7.11824 23.65 2.35 18.8818 2.35 13C2.35 7.11824 7.11824 2.35 13 2.35C18.8818 2.35 23.65 7.11824 23.65 13ZM13 25.15C19.7104 25.15 25.15 19.7104 25.15 13C25.15 6.28956 19.7104 0.85 13 0.85C6.28956 0.85 0.85 6.28956 0.85 13C0.85 19.7104 6.28956 25.15 13 25.15Z" fill="currentColor" stroke="currentColor" strokeWidth="0.3" />
                                </svg>
                            </i>
                            <span className={`text-md font-[600]`}>User Inquiries</span>
                        </Link>


                        {/*  <Link to={'#'} className={`flex items-center px-4 h-[57px] rounded-lg text-[#7F7F7F] hover:bg-gray-100 transition`}>
                            <i className="mr-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 21H10M18 8C18 6.4087 17.3679 4.88258 16.2427 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.8826 2.63214 7.75738 3.75736C6.63216 4.88258 6.00002 6.4087 6.00002 8C6.00002 11.0902 5.22049 13.206 4.34968 14.6054C3.61515 15.7859 3.24788 16.3761 3.26134 16.5408C3.27626 16.7231 3.31488 16.7926 3.46179 16.9016C3.59448 17 4.19261 17 5.38887 17H18.6112C19.8074 17 20.4056 17 20.5382 16.9016C20.6852 16.7926 20.7238 16.7231 20.7387 16.5408C20.7522 16.3761 20.3849 15.7859 19.6504 14.6054C18.7795 13.206 18 11.0902 18 8Z"
                                        stroke={'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </i>
                            <span className={`text-md font-[600]`}>Notification</span>
                        </Link> */}

                        {/*<Link to={'/admin/sublevel'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/sublevel') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                            }`}>
                            <i className="mr-5">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.3048 8.8421C16.464 8.8421 17.4048 9.83242 17.4048 11.0526V15.1579H17.4V15.4737C17.4 15.7249 17.3052 15.9659 17.1364 16.1436C16.9676 16.3212 16.7387 16.4211 16.5 16.4211C16.2613 16.4211 16.0324 16.3212 15.8636 16.1436C15.6948 15.9659 15.6 15.7249 15.6 15.4737V12.6316H15.6048V11.0526C15.6048 10.9689 15.5732 10.8886 15.5169 10.8293C15.4607 10.7701 15.3844 10.7368 15.3048 10.7368H8.7024C8.62283 10.7368 8.54653 10.7701 8.49027 10.8293C8.43401 10.8886 8.4024 10.9689 8.4024 11.0526V15.1579H8.4V15.4737C8.4 15.7249 8.30518 15.9659 8.1364 16.1436C7.96761 16.3212 7.73869 16.4211 7.5 16.4211C7.2613 16.4211 7.03239 16.3212 6.8636 16.1436C6.69482 15.9659 6.6 15.7249 6.6 15.4737V12.6316H6.6024V11.0526C6.6024 9.83242 7.542 8.8421 8.7024 8.8421H15.3048ZM22.2 11.0526V15.4737C22.2 15.7249 22.2948 15.9659 22.4636 16.1436C22.6324 16.3212 22.8613 16.4211 23.1 16.4211C23.3387 16.4211 23.5676 16.3212 23.7364 16.1436C23.9052 15.9659 24 15.7249 24 15.4737V11.0526C24 10.4664 23.7787 9.90411 23.3849 9.48955C22.9911 9.075 22.457 8.8421 21.9 8.8421H17.85C18.2616 9.36632 18.5304 10.0194 18.5916 10.7368H21.9C21.9796 10.7368 22.0559 10.7701 22.1121 10.8293C22.1684 10.8886 22.2 10.9689 22.2 11.0526ZM0 15.4737C5.03012e-09 15.7249 0.094821 15.9659 0.263604 16.1436C0.432386 16.3212 0.661305 16.4211 0.9 16.4211C1.13869 16.4211 1.36761 16.3212 1.5364 16.1436C1.70518 15.9659 1.8 15.7249 1.8 15.4737V11.0526C1.8 10.9689 1.83161 10.8886 1.88787 10.8293C1.94413 10.7701 2.02043 10.7368 2.1 10.7368H5.4156C5.47529 10.0409 5.73384 9.38032 6.1572 8.8421H2.1C1.54305 8.8421 1.0089 9.075 0.615076 9.48955C0.221249 9.90411 0 10.4664 0 11.0526V15.4737ZM12 0C12.9548 0 13.8705 0.399247 14.5456 1.10991C15.2207 1.82058 15.6 2.78444 15.6 3.78947C15.6 4.7945 15.2207 5.75837 14.5456 6.46904C13.8705 7.1797 12.9548 7.57895 12 7.57895C11.0452 7.57895 10.1295 7.1797 9.45442 6.46904C8.77928 5.75837 8.4 4.7945 8.4 3.78947C8.4 2.78444 8.77928 1.82058 9.45442 1.10991C10.1295 0.399247 11.0452 0 12 0ZM12 1.89474C11.5226 1.89474 11.0648 2.09436 10.7272 2.44969C10.3896 2.80502 10.2 3.28696 10.2 3.78947C10.2 4.29199 10.3896 4.77392 10.7272 5.12925C11.0648 5.48459 11.5226 5.68421 12 5.68421C12.4774 5.68421 12.9352 5.48459 13.2728 5.12925C13.6104 4.77392 13.8 4.29199 13.8 3.78947C13.8 3.28696 13.6104 2.80502 13.2728 2.44969C12.9352 2.09436 12.4774 1.89474 12 1.89474ZM19.8 1.26316C20.5956 1.26316 21.3587 1.59586 21.9213 2.18808C22.4839 2.7803 22.8 3.58353 22.8 4.42105C22.8 5.25858 22.4839 6.0618 21.9213 6.65402C21.3587 7.24624 20.5956 7.57895 19.8 7.57895C19.0043 7.57895 18.2413 7.24624 17.6787 6.65402C17.1161 6.0618 16.8 5.25858 16.8 4.42105C16.8 3.58353 17.1161 2.7803 17.6787 2.18808C18.2413 1.59586 19.0043 1.26316 19.8 1.26316ZM19.8 3.15789C19.4817 3.15789 19.1765 3.29098 18.9515 3.52787C18.7264 3.76475 18.6 4.08604 18.6 4.42105C18.6 4.75606 18.7264 5.07735 18.9515 5.31424C19.1765 5.55113 19.4817 5.68421 19.8 5.68421C20.1183 5.68421 20.4235 5.55113 20.6485 5.31424C20.8736 5.07735 21 4.75606 21 4.42105C21 4.08604 20.8736 3.76475 20.6485 3.52787C20.4235 3.29098 20.1183 3.15789 19.8 3.15789ZM4.2 1.26316C4.99565 1.26316 5.75871 1.59586 6.32132 2.18808C6.88393 2.7803 7.2 3.58353 7.2 4.42105C7.2 5.25858 6.88393 6.0618 6.32132 6.65402C5.75871 7.24624 4.99565 7.57895 4.2 7.57895C3.40435 7.57895 2.64129 7.24624 2.07868 6.65402C1.51607 6.0618 1.2 5.25858 1.2 4.42105C1.2 3.58353 1.51607 2.7803 2.07868 2.18808C2.64129 1.59586 3.40435 1.26316 4.2 1.26316ZM4.2 3.15789C3.88174 3.15789 3.57652 3.29098 3.35147 3.52787C3.12643 3.76475 3 4.08604 3 4.42105C3 4.75606 3.12643 5.07735 3.35147 5.31424C3.57652 5.55113 3.88174 5.68421 4.2 5.68421C4.51826 5.68421 4.82348 5.55113 5.04853 5.31424C5.27357 5.07735 5.4 4.75606 5.4 4.42105C5.4 4.08604 5.27357 3.76475 5.04853 3.52787C4.82348 3.29098 4.51826 3.15789 4.2 3.15789ZM0.9 17.6842C0.661305 17.6842 0.432386 17.784 0.263604 17.9617C0.094821 18.1394 0 18.3803 0 18.6316V19.2632C0 20.5194 0.474106 21.7243 1.31802 22.6126C2.16193 23.5009 3.30653 24 4.5 24H19.5C20.6935 24 21.8381 23.5009 22.682 22.6126C23.5259 21.7243 24 20.5194 24 19.2632V18.6316C24 18.3803 23.9052 18.1394 23.7364 17.9617C23.5676 17.784 23.3387 17.6842 23.1 17.6842H0.9ZM4.5 22.1053C3.83588 22.1052 3.19505 21.8476 2.70005 21.3815C2.20505 20.9154 1.89059 20.2737 1.8168 19.5789H22.1832C22.1094 20.2737 21.795 20.9154 21.2999 21.3815C20.8049 21.8476 20.1641 22.1052 19.5 22.1053H4.5Z"
                                        fill={'currentColor'}
                                    />
                                </svg>
                            </i>
                            <span className={`text-md font-[600]`}>Sub Admins</span>
                        </Link>*/}

                        <div className='w-full h-[1px] px-4 border-mobiSilverDivider border-bottom border'></div>
                    </nav>

                    {/* Footer */}
                    <div className="px-4 py-6">
                        <Link to={'/admin/settings'} className={`flex items-center px-4 h-[57px] rounded-lg transition ${isActive('/admin/settings') ? 'bg-[#FFF1E9] text-black' : 'text-[#7F7F7F] hover:bg-gray-100'
                            }`}>
                            <i className={`fas fa-cog mr-5`}></i>
                            <span className="text-md font-[600]">Settings</span>
                        </Link>
                        <span onClick={() => [handleLogOutModal(), onSelected(false)]} className={`flex cursor-pointer items-center py-2 px-4 h-[57px] rounded-lg text-red-500 hover:bg-kuduLightGray  transition`}>
                            <i className="fas fa-sign-out-alt mr-5"></i>
                            <span className="text-md font-[600]">Logout</span>
                        </span>
                    </div>
                </div>
            </div>

        </>
    );
}
export default Sidebar;
