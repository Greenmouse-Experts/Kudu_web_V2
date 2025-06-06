import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Imgix from "react-imgix";
import Loader from "../../components/Loader";
import useApiMutation from "../../api/hooks/useApiMutation";
import { useNavigate, useParams } from "react-router-dom";
import { currencyFormat, formatNumberWithCommas, formatString } from "../../helpers/helperFactory";
import { getDateDifference } from "../../helpers/dateHelper";
import useAppState from "../../hooks/appState";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useModal } from "../../hooks/modal";
import { Carousel } from "@material-tailwind/react";
import { sendMessage } from "../../api/message";
import ProductReview from "./productReviews";
import { useAddToCart } from "../../api/cart";
import { Bookmark } from "lucide-react";
import SafeHTML from "../../helpers/safeHTML";


export default function ViewProduct() {
  const [bookmarked, setBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const { openModal } = useModal();

  const { mutate: addItemToCart, isLoading } = useAddToCart();

  const { user } = useAppState();

  const { mutate } = useApiMutation();

  const { id } = useParams();

  const navigate = useNavigate();

  const getProductDetails = async () => {
    try {
      const productRequest = new Promise((resolve, reject) => {
        mutate({
          url: `/product?productId=${id}`,
          method: "GET",
          headers: true,
          hideToast: true,
          onSuccess: (response) => resolve(response.data.data),
          onError: reject,
        });
      });
      const [product] = await Promise.all([productRequest]);
      setProduct(product);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };




  const getSavedProducts = async () => {
    try {
      const savedProducts = new Promise((resolve, reject) => {
        mutate({
          url: `/user/saved/products`,
          method: "GET",
          headers: true,
          hideToast: true,
          onSuccess: (response) => {
            const isBookmarked = response.data.data.some((item) => item.productId === id);
            setBookmarked(isBookmarked);
          },
          onError: reject,
        });
      });
      const [product] = await Promise.all([savedProducts]);
      //setProduct(product);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    getProductDetails();
    user ? getSavedProducts() : null;
  }, []);



  const addToBookMark = () => {
    mutate({
      url: `/user/save/product`,
      method: "POST",
      headers: true,
      data: { productId: id },
      onSuccess: (response) => setBookmarked(true),
    });
  }



  const handleAddToCart = () => {
    if (user) {
      const payload = { productId: id, quantity };
      addItemToCart(payload);
    } else {
      navigate("/login");
    }
  };

  const handleIncrease = () => {
    setQuantity((prevState) => prevState + 1);
    setDisabled(false);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevState) => prevState - 1);
    }
    if (quantity === 1) {
      setDisabled(true);
    }
  };

  const { mutate: initiate, isLoading: isInitiating } = sendMessage();
  const initiateChat = () => {
    initiate(
      {
        productId: id,
        receiverId: product.vendor.id ? product.vendor.id : product.vendorId,
        content: `Hello ${product.vendor.firstName ? product.vendor.firstName : ""
          }`,
      },
      {
        onSuccess: () => {
          navigate(`/messages?productId=${id}`);
          toast.success("Chat initiated successfully!");
        },
      }
    );
  };

  const showContact = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    openModal({
      size: "sm",
      content: (
        <>
          <div className="w-full flex h-auto flex-col px-3 py-6 gap-3 -mt-3">
            <div className="flex gap-5 justify-center w-full">
              <p className="font-semibold text-center text-lg">
                Vendor Contact
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-sm gap-2 flex leading-[1.7rem]">
                <svg
                  className="mt-1"
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5253 1.30599C11.5508 1.21081 11.5947 1.12158 11.6547 1.04339C11.7147 0.965204 11.7894 0.899598 11.8748 0.850321C11.9601 0.801044 12.0543 0.769061 12.152 0.7562C12.2496 0.743339 12.3489 0.749852 12.4441 0.775367C13.8344 1.13813 15.103 1.86497 16.119 2.88103C17.1351 3.89708 17.8619 5.16562 18.2247 6.55599C18.2502 6.65116 18.2567 6.75042 18.2439 6.84811C18.231 6.94579 18.199 7.03999 18.1497 7.12531C18.1005 7.21063 18.0349 7.28541 17.9567 7.34536C17.8785 7.40532 17.7893 7.44928 17.6941 7.47474C17.6307 7.49138 17.5655 7.49989 17.5 7.50005C17.3347 7.50005 17.1741 7.44545 17.043 7.34475C16.912 7.24405 16.8179 7.10288 16.7753 6.94318C16.4795 5.80817 15.8863 4.77259 15.0569 3.9432C14.2275 3.11381 13.1919 2.52061 12.0569 2.22474C11.9616 2.19938 11.8723 2.15549 11.794 2.09558C11.7157 2.03566 11.65 1.9609 11.6006 1.87557C11.5513 1.79024 11.5192 1.69601 11.5063 1.59828C11.4933 1.50054 11.4998 1.40122 11.5253 1.30599ZM11.3069 5.22474C12.5997 5.56974 13.4303 6.40037 13.7753 7.69318C13.8179 7.85288 13.912 7.99405 14.043 8.09475C14.1741 8.19545 14.3347 8.25005 14.5 8.25005C14.5655 8.24989 14.6307 8.24138 14.6941 8.22474C14.7893 8.19928 14.8785 8.15532 14.9567 8.09536C15.0349 8.03541 15.1005 7.96063 15.1497 7.87531C15.199 7.78999 15.231 7.69579 15.2439 7.59811C15.2567 7.50042 15.2502 7.40116 15.2247 7.30599C14.7447 5.50974 13.4903 4.25537 11.6941 3.77537C11.5019 3.72402 11.2971 3.75113 11.1249 3.85073C10.9527 3.95033 10.8271 4.11426 10.7758 4.30646C10.7244 4.49866 10.7516 4.70338 10.8512 4.87559C10.9508 5.04781 11.1147 5.1734 11.3069 5.22474ZM18.9888 14.1638C18.8216 15.4341 18.1977 16.6002 17.2337 17.4442C16.2696 18.2882 15.0313 18.7523 13.75 18.7501C6.30626 18.7501 0.250008 12.6938 0.250008 5.25005C0.247712 3.96876 0.711903 2.73045 1.55588 1.76639C2.39986 0.802337 3.56592 0.178467 4.83626 0.0113044C5.1575 -0.0279197 5.4828 0.0378001 5.76362 0.198653C6.04444 0.359506 6.2657 0.606865 6.39438 0.903804L8.37438 5.32412V5.33537C8.4729 5.56267 8.51359 5.81083 8.49282 6.05769C8.47204 6.30455 8.39044 6.54242 8.25532 6.75005C8.23845 6.77537 8.22063 6.7988 8.20188 6.82224L6.25001 9.13599C6.9522 10.5629 8.4447 12.0422 9.89032 12.7463L12.1722 10.8047C12.1946 10.7859 12.2181 10.7684 12.2425 10.7522C12.45 10.6139 12.6887 10.5294 12.937 10.5065C13.1853 10.4836 13.4354 10.5229 13.6647 10.621L13.6769 10.6266L18.0934 12.6057C18.3909 12.7339 18.6389 12.955 18.8003 13.2358C18.9616 13.5167 19.0278 13.8422 18.9888 14.1638ZM17.5 13.9763C17.5 13.9763 17.4934 13.9763 17.4897 13.9763L13.0834 12.0029L10.8006 13.9444C10.7785 13.9632 10.7553 13.9807 10.7313 13.9969C10.5154 14.1409 10.2659 14.2265 10.0071 14.2452C9.74828 14.2639 9.48904 14.2152 9.2547 14.1038C7.49876 13.2554 5.74845 11.5182 4.89907 9.78099C4.7866 9.54836 4.73613 9.29061 4.75255 9.03274C4.76898 8.77486 4.85174 8.5256 4.99282 8.30912C5.00872 8.2837 5.02659 8.25956 5.04626 8.23693L7.00001 5.92037L5.03126 1.51412C5.03089 1.51038 5.03089 1.50661 5.03126 1.50287C4.12212 1.62146 3.28739 2.0674 2.68339 2.75716C2.0794 3.44693 1.74755 4.33322 1.75001 5.25005C1.75348 8.43159 3.01888 11.4818 5.26856 13.7315C7.51825 15.9812 10.5685 17.2466 13.75 17.2501C14.6663 17.2532 15.5523 16.9225 16.2425 16.3198C16.9327 15.7171 17.3797 14.8837 17.5 13.9754V13.9763Z"
                    fill="rgba(255, 111, 34, 1)"
                  />
                </svg>
                <span className="flex flex-col justify-center h-full text-black items-center">
                  {product.vendor.phoneNumber}
                </span>
              </span>

              <span className="text-sm gap-2 flex leading-[1.7rem]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="rgba(255, 111, 34, 1)"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 0a2 2 0 012-2h14a2 2 0 012 2m-18 0v8a2 2 0 002 2h14a2 2 0 002-2V8"
                  />
                </svg>
                <span className="flex flex-col justify-center h-full text-black items-center">
                  {product.vendor.email}
                </span>
              </span>
            </div>
          </div>
        </>
      ),
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  } else {
    if (Object.keys(product).length === 0) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="empty-store">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                alt="Empty Store Illustration"
                className="w-80 h-80 mx-auto"
              />
            </div>
            <h1 className="text-center text-lg font-bold mb-4">
              Product Not Found
            </h1>
          </div>
        </div>
      );
    }
  }










  return (
    <>
      <div className="w-full flex flex-col">
        <div className="w-full flex flex-col h-full xl:px-80 lg:pl-40 lg:pr-36 md:px-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-kuduLightBlue h-full">
          <div className="w-full flex flex-col gap-4">
            <div className="w-full py-3 flex md:mt-20 mt-14 gap-3">
              {/*labels.map((label, index) => (
                                <div className="bg-white md:py-2 px-4 rounded-full" key={index}>
                                    <span className="text-xs">
                                        {label}
                                    </span>
                                </div>
                            ))*/}
            </div>
            <div className="w-full flex md:flex-row flex-col mt-10 md:mt-0 gap-4">
              <div className="lg:w-[65%] md:w-[55%] w-full flex flex-col gap-3">
                <div className="flex w-full h-[26rem]">
                  <Carousel
                    className="rounded-xl bg-white shadow-lg"
                    autoplay
                    loop
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                          <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i
                              ? "w-8 bg-white"
                              : "w-4 bg-white/50"
                              }`}
                            onClick={() => setActiveIndex(i)}
                          />
                        ))}
                      </div>
                    )}
                    prevArrow={({ handlePrev }) => (
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800/80 text-white transition hover:bg-gray-900/90"
                      >
                        ◀
                      </button>
                    )}
                    nextArrow={({ handleNext }) => (
                      <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-gray-800/80 text-white transition hover:bg-gray-900/90"
                      >
                        ▶
                      </button>
                    )}
                  >
                    {product.additional_images.map((image, index) => (
                      <>
                        <img
                          src={image}
                          alt="image 1"
                          className="h-full w-full bg-transparent object-contain"
                        />
                      </>
                    ))}
                  </Carousel>
                </div>
                <div className="overflow-x-auto flex gap-2 pb-2 custom-scrollbar">
                  {product.additional_images.map((image, index) => (
                    <>
                      <img
                        src={image}
                        key={index}
                        alt="main-product"
                        className="rounded-md w-48 h-32 object-cover"
                      />
                    </>
                  ))}
                </div>
                <div className="flex w-full flex-col gap-8 py-6 px-6 shadow shadow-md bg-white rounded-md">
                  <div className="flex flex-col gap-4">
                    <span className="lg:text-2xl md:text-xl text-lg font-bold w-full overflow-hidden">
                      {product.name}
                    </span>
                  </div>

                  <div className="w-full h-[1px] border" />

                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-col gap-6">
                      <div className="w-full md:flex-row flex flex-col gap-2">
                        <div className="md:w-[40%] w-full flex flex-col gap-1">
                          <span className="text-sm font-bold text-kuduRomanSilver uppercase">
                            Condition
                          </span>
                          <span className="text-sm">
                            {formatString(product.condition)}
                          </span>
                        </div>
                      </div>

                      {/** Brand */}
                      <div className="w-full md:flex-row flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-sm font-bold text-kuduRomanSilver uppercase">
                            Description
                          </span>
                          <span className="text-sm">
                            <SafeHTML htmlContent={product.description} />
                          </span>
                        </div>
                      </div>

                      <div className="w-full md:flex-row flex flex-col gap-2">
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-sm font-bold text-kuduRomanSilver uppercase">
                            Specification
                          </span>
                          <span className="text-sm">
                            <SafeHTML htmlContent={product.specification} />
                          </span>
                        </div>
                      </div>

                      {/** Case Size */}
                      <div className="w-full md:flex-row flex flex-col gap-2">
                        <div className="md:w-[40%] w-full flex flex-col gap-1">
                          <span className="text-sm font-bold text-kuduRomanSilver uppercase">
                            Return Policy
                          </span>
                          <span className="text-sm">
                            {product.return_policy
                              ? product.return_policy
                              : "No return policy"}
                          </span>
                        </div>
                        <div className="md:w-[60%] w-full flex flex-col gap-1">
                          <span className="text-sm font-bold text-kuduRomanSilver uppercase">
                            Warranty
                          </span>
                          <span className="text-sm">
                            {product.warranty
                              ? product.warranty
                              : "No warranty"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-[1px] border" />

                    <div className="w-full flex flex-col gap-4">
                      <div className="w-full flex gap-1">
                        <span className="flex">
                          <svg
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.75 6C19.7504 5.93027 19.7409 5.86083 19.7219 5.79375L18.3766 1.0875C18.2861 0.775232 18.0971 0.500591 17.8378 0.304588C17.5784 0.108585 17.2626 0.00173713 16.9375 0H3.0625C2.73741 0.00173713 2.4216 0.108585 2.16223 0.304588C1.90287 0.500591 1.71386 0.775232 1.62344 1.0875L0.279063 5.79375C0.259696 5.86079 0.249912 5.93022 0.250001 6V7.5C0.250001 8.08217 0.385545 8.65634 0.645899 9.17705C0.906253 9.69776 1.28427 10.1507 1.75 10.5V17.25C1.75 17.4489 1.82902 17.6397 1.96967 17.7803C2.11032 17.921 2.30109 18 2.5 18H17.5C17.6989 18 17.8897 17.921 18.0303 17.7803C18.171 17.6397 18.25 17.4489 18.25 17.25V10.5C18.7157 10.1507 19.0937 9.69776 19.3541 9.17705C19.6145 8.65634 19.75 8.08217 19.75 7.5V6ZM3.0625 1.5H16.9375L18.0081 5.25H1.99469L3.0625 1.5ZM7.75 6.75H12.25V7.5C12.25 8.09674 12.0129 8.66903 11.591 9.09099C11.169 9.51295 10.5967 9.75 10 9.75C9.40326 9.75 8.83097 9.51295 8.40901 9.09099C7.98705 8.66903 7.75 8.09674 7.75 7.5V6.75ZM6.25 6.75V7.5C6.24987 7.88691 6.14996 8.26725 5.95993 8.60428C5.7699 8.94131 5.49617 9.22364 5.16518 9.42401C4.83419 9.62437 4.45713 9.736 4.07041 9.74811C3.68369 9.76022 3.30038 9.67239 2.9575 9.49312C2.90533 9.45251 2.84794 9.41909 2.78688 9.39375C2.46913 9.19034 2.20764 8.91029 2.02646 8.57937C1.84527 8.24845 1.7502 7.87728 1.75 7.5V6.75H6.25ZM16.75 16.5H3.25V11.175C3.4969 11.2248 3.74813 11.2499 4 11.25C4.58217 11.25 5.15634 11.1145 5.67705 10.8541C6.19776 10.5937 6.6507 10.2157 7 9.75C7.3493 10.2157 7.80224 10.5937 8.32295 10.8541C8.84366 11.1145 9.41783 11.25 10 11.25C10.5822 11.25 11.1563 11.1145 11.6771 10.8541C12.1978 10.5937 12.6507 10.2157 13 9.75C13.3493 10.2157 13.8022 10.5937 14.3229 10.8541C14.8437 11.1145 15.4178 11.25 16 11.25C16.2519 11.2499 16.5031 11.2248 16.75 11.175V16.5ZM17.2122 9.39375C17.1519 9.41914 17.0952 9.45223 17.0434 9.49219C16.7006 9.67164 16.3173 9.75964 15.9305 9.74769C15.5437 9.73574 15.1666 9.62423 14.8355 9.42395C14.5044 9.22367 14.2305 8.94138 14.0404 8.60436C13.8502 8.26733 13.7502 7.88696 13.75 7.5V6.75H18.25V7.5C18.2497 7.87736 18.1545 8.24859 17.9731 8.57952C17.7918 8.91045 17.5301 9.19044 17.2122 9.39375Z"
                              fill="black"
                            />
                          </svg>
                        </span>
                        <span className="text-sm font-semibold">
                          Store Address
                        </span>
                      </div>
                      <div className="py-2 flex gap-2 rounded-md">
                        <span className="flex">
                          <svg
                            width="15"
                            height="19"
                            viewBox="0 0 18 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15.75 20H11.1131C11.892 19.3045 12.6266 18.5608 13.3125 17.7734C15.8859 14.8138 17.25 11.6938 17.25 8.75C17.25 6.56196 16.3808 4.46354 14.8336 2.91637C13.2865 1.36919 11.188 0.5 9 0.5C6.81196 0.5 4.71354 1.36919 3.16637 2.91637C1.61919 4.46354 0.75 6.56196 0.75 8.75C0.75 11.6938 2.11031 14.8138 4.6875 17.7734C5.37338 18.5608 6.10795 19.3045 6.88688 20H2.25C2.05109 20 1.86032 20.079 1.71967 20.2197C1.57902 20.3603 1.5 20.5511 1.5 20.75C1.5 20.9489 1.57902 21.1397 1.71967 21.2803C1.86032 21.421 2.05109 21.5 2.25 21.5H15.75C15.9489 21.5 16.1397 21.421 16.2803 21.2803C16.421 21.1397 16.5 20.9489 16.5 20.75C16.5 20.5511 16.421 20.3603 16.2803 20.2197C16.1397 20.079 15.9489 20 15.75 20ZM2.25 8.75C2.25 6.95979 2.96116 5.2429 4.22703 3.97703C5.4929 2.71116 7.20979 2 9 2C10.7902 2 12.5071 2.71116 13.773 3.97703C15.0388 5.2429 15.75 6.95979 15.75 8.75C15.75 14.1153 10.5497 18.5938 9 19.8125C7.45031 18.5938 2.25 14.1153 2.25 8.75ZM12.75 8.75C12.75 8.00832 12.5301 7.2833 12.118 6.66661C11.706 6.04993 11.1203 5.56928 10.4351 5.28545C9.74984 5.00162 8.99584 4.92736 8.26841 5.07205C7.54098 5.21675 6.8728 5.5739 6.34835 6.09835C5.8239 6.6228 5.46675 7.29098 5.32205 8.01841C5.17736 8.74584 5.25162 9.49984 5.53545 10.1851C5.81928 10.8703 6.29993 11.456 6.91661 11.868C7.5333 12.2801 8.25832 12.5 9 12.5C9.99456 12.5 10.9484 12.1049 11.6517 11.4017C12.3549 10.6984 12.75 9.74456 12.75 8.75ZM6.75 8.75C6.75 8.30499 6.88196 7.86998 7.12919 7.49997C7.37643 7.12996 7.72783 6.84157 8.13896 6.67127C8.5501 6.50097 9.0025 6.45642 9.43895 6.54323C9.87541 6.63005 10.2763 6.84434 10.591 7.15901C10.9057 7.47368 11.12 7.87459 11.2068 8.31105C11.2936 8.7475 11.249 9.1999 11.0787 9.61104C10.9084 10.0222 10.62 10.3736 10.25 10.6208C9.88002 10.868 9.44501 11 9 11C8.40326 11 7.83097 10.7629 7.40901 10.341C6.98705 9.91903 6.75 9.34674 6.75 8.75Z"
                              fill="#727070"
                            />
                          </svg>
                        </span>
                        <span className="text-sm">
                          {product.store.location.address},{" "}
                          {product.store.location.city},{" "}
                          {product.store.location.state},{" "}
                          {product.store.location.country}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-[1px] border" />
                  </div>
                </div>
              </div>

              <div className="lg:w-[35%] md:w-[45%] w-full flex flex-col gap-4">
                <div className="w-full flex flex-col gap-3 py-5 md:px-8 px-4 rounded-md bg-white shadow shadow-md">
                  {(() => {
                    const price = parseFloat(product?.price);
                    const discountPrice = parseFloat(product?.discount_price);
                    const currencySymbol = product?.store?.currency?.symbol || "₦";
                    const hasValidDiscount = discountPrice > 0 && discountPrice < price;

                    return hasValidDiscount ? (
                      <div className="flex flex-col mt-2">
                        <p className="md:text-2xl text-xl font-bold text-red-500 line-through">
                          {currencySymbol} {formatNumberWithCommas(price)}
                        </p>
                        <p className="md:text-2xl text-xl font-bold leading-loose">
                          {currencySymbol} {formatNumberWithCommas(discountPrice)}
                        </p>
                      </div>
                    ) : (
                      <p className="md:text-2xl text-xl font-bold leading-loose">
                        {currencySymbol} {formatNumberWithCommas(price)}
                      </p>
                    );
                  })()}
                  <div className="w-full">
                    <div className="flex gap-2 mt-2">
                      <p className="text-sm font-bold text-kuduRomanSilver">
                        Quantity Available: {product.quantity}
                      </p>
                    </div>
                  </div>
                  {/* <Button
                                        type="submit"
                                        className="w-full py-2 px-4 flex justify-center gap-2 bg-transparent rounded-md border border-kuduOrange text-kuduOrange transition-colors"
                                    >
                                        <span className='flex text-sm font-[500]'>
                                            Request Call Back
                                        </span>
                                    </Button> */}
                </div>

                {product.vendor ? (
                  <div className="w-full flex flex-col gap-3 py-5 md:px-8 px-4 rounded-md bg-white shadow shadow-md">
                    <div className="flex gap-2">
                      <div className="flex">
                        <Imgix
                          sizes="100vw"
                          src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426601/kudu_mart/profile_icon_yq3gnr.png"
                          alt="avatar"
                          width={60}
                          height={60}
                          className="w-[50px] h-[50px] rounded-full object-fit-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-center gap-1">
                        <span className="text-lg font-bold">
                          {product.vendor.firstName} {product.vendor.lastName}
                        </span>
                        <div className="flex gap-2 w-full">
                          {product.vendor.isVerified ? (
                            <span className="py-2 px-4 gap-1 rounded-full flex bg-[rgba(52,168,83,1)] text-white">
                              <span className="flex mt-[1.5px]">
                                <svg
                                  width="14"
                                  height="12"
                                  viewBox="0 0 18 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.8607 6.18026C15.7013 6.20694 15.559 6.29583 15.4652 6.42739C15.3713 6.55896 15.3336 6.72241 15.3602 6.88181C15.4221 7.25133 15.4532 7.62534 15.4532 8.00001C15.4546 9.6409 14.8515 11.2248 13.7591 12.4492C13.0795 11.4644 12.1238 10.7024 11.0123 10.2593C11.6094 9.78902 12.045 9.1444 12.2588 8.41507C12.4725 7.68573 12.4536 6.90793 12.2047 6.18982C11.9559 5.47171 11.4895 4.849 10.8703 4.40827C10.2511 3.96754 9.51003 3.73071 8.75003 3.73071C7.99003 3.73071 7.24892 3.96754 6.62976 4.40827C6.01059 4.849 5.54416 5.47171 5.29532 6.18982C5.04648 6.90793 5.0276 7.68573 5.2413 8.41507C5.45501 9.1444 5.89068 9.78902 6.48772 10.2593C5.37624 10.7024 4.42059 11.4644 3.74097 12.4492C2.88382 11.4833 2.32392 10.2904 2.12859 9.01389C1.93327 7.73737 2.11083 6.43161 2.63993 5.25361C3.16903 4.0756 4.02714 3.07551 5.11108 2.37358C6.19503 1.67165 7.45866 1.29776 8.75003 1.29688C9.12469 1.29682 9.49871 1.32791 9.86823 1.38981C10.0269 1.41485 10.189 1.37622 10.3194 1.28233C10.4497 1.18843 10.5377 1.04687 10.5642 0.888436C10.5907 0.730001 10.5536 0.567507 10.4609 0.436302C10.3682 0.305097 10.2275 0.215795 10.0693 0.187821C8.41445 -0.0905756 6.71391 0.164158 5.21324 0.915243C3.71257 1.66633 2.48943 2.8749 1.72042 4.36646C0.951403 5.85801 0.676307 7.55538 0.934851 9.21347C1.1934 10.8716 1.9722 12.4046 3.15882 13.5912C4.34544 14.7778 5.87847 15.5566 7.53656 15.8152C9.19466 16.0737 10.892 15.7986 12.3836 15.0296C13.8751 14.2606 15.0837 13.0375 15.8348 11.5368C16.5859 10.0361 16.8406 8.33559 16.5622 6.68071C16.5355 6.52132 16.4466 6.37905 16.3151 6.2852C16.1835 6.19135 16.0201 6.1536 15.8607 6.18026ZM6.31253 7.39063C6.31253 6.90854 6.45548 6.43728 6.72332 6.03643C6.99116 5.63559 7.37184 5.32317 7.81724 5.13868C8.26263 4.95419 8.75273 4.90592 9.22556 4.99997C9.69839 5.09402 10.1327 5.32617 10.4736 5.66706C10.8145 6.00795 11.0466 6.44227 11.1407 6.9151C11.2347 7.38793 11.1865 7.87803 11.002 8.32342C10.8175 8.76882 10.5051 9.1495 10.1042 9.41734C9.70339 9.68518 9.23212 9.82813 8.75003 9.82813C8.10356 9.82813 7.48357 9.57133 7.02645 9.11421C6.56933 8.65709 6.31253 8.0371 6.31253 7.39063ZM4.64284 13.294C5.08367 12.6045 5.69097 12.0371 6.40875 11.6441C7.12653 11.2511 7.9317 11.0451 8.75003 11.0451C9.56836 11.0451 10.3735 11.2511 11.0913 11.6441C11.8091 12.0371 12.4164 12.6045 12.8572 13.294C11.6829 14.2072 10.2377 14.7031 8.75003 14.7031C7.26237 14.7031 5.81715 14.2072 4.64284 13.294ZM17.103 1.72802L14.6655 4.16552C14.6089 4.22217 14.5417 4.26712 14.4678 4.29779C14.3938 4.32845 14.3145 4.34424 14.2344 4.34424C14.1543 4.34424 14.075 4.32845 14.001 4.29779C13.9271 4.26712 13.8599 4.22217 13.8033 4.16552L12.5845 2.94677C12.5279 2.89015 12.483 2.82294 12.4524 2.74896C12.4217 2.67499 12.4059 2.5957 12.4059 2.51563C12.4059 2.43556 12.4217 2.35628 12.4524 2.28231C12.483 2.20833 12.5279 2.14112 12.5845 2.0845C12.6989 1.97016 12.8539 1.90592 13.0157 1.90592C13.0957 1.90592 13.175 1.92169 13.249 1.95233C13.323 1.98297 13.3902 2.02788 13.4468 2.0845L14.2344 2.87288L16.2408 0.865751C16.2974 0.809134 16.3646 0.764223 16.4386 0.733582C16.5125 0.702941 16.5918 0.68717 16.6719 0.68717C16.752 0.68717 16.8313 0.702941 16.9052 0.733582C16.9792 0.764223 17.0464 0.809134 17.103 0.865751C17.1597 0.922368 17.2046 0.989582 17.2352 1.06356C17.2658 1.13753 17.2816 1.21681 17.2816 1.29688C17.2816 1.37695 17.2658 1.45624 17.2352 1.53021C17.2046 1.60419 17.1597 1.6714 17.103 1.72802Z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                              <span className="text-xs">Verified </span>
                            </span>
                          ) : (
                            <span className="py-2 px-4 gap-1 rounded-full flex bg-red-500 text-white">
                              <span className="flex mt-[1.5px]">
                                <svg
                                  width="14"
                                  height="12"
                                  viewBox="0 0 18 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M15.8607 6.18026C15.7013 6.20694 15.559 6.29583 15.4652 6.42739C15.3713 6.55896 15.3336 6.72241 15.3602 6.88181C15.4221 7.25133 15.4532 7.62534 15.4532 8.00001C15.4546 9.6409 14.8515 11.2248 13.7591 12.4492C13.0795 11.4644 12.1238 10.7024 11.0123 10.2593C11.6094 9.78902 12.045 9.1444 12.2588 8.41507C12.4725 7.68573 12.4536 6.90793 12.2047 6.18982C11.9559 5.47171 11.4895 4.849 10.8703 4.40827C10.2511 3.96754 9.51003 3.73071 8.75003 3.73071C7.99003 3.73071 7.24892 3.96754 6.62976 4.40827C6.01059 4.849 5.54416 5.47171 5.29532 6.18982C5.04648 6.90793 5.0276 7.68573 5.2413 8.41507C5.45501 9.1444 5.89068 9.78902 6.48772 10.2593C5.37624 10.7024 4.42059 11.4644 3.74097 12.4492C2.88382 11.4833 2.32392 10.2904 2.12859 9.01389C1.93327 7.73737 2.11083 6.43161 2.63993 5.25361C3.16903 4.0756 4.02714 3.07551 5.11108 2.37358C6.19503 1.67165 7.45866 1.29776 8.75003 1.29688C9.12469 1.29682 9.49871 1.32791 9.86823 1.38981C10.0269 1.41485 10.189 1.37622 10.3194 1.28233C10.4497 1.18843 10.5377 1.04687 10.5642 0.888436C10.5907 0.730001 10.5536 0.567507 10.4609 0.436302C10.3682 0.305097 10.2275 0.215795 10.0693 0.187821C8.41445 -0.0905756 6.71391 0.164158 5.21324 0.915243C3.71257 1.66633 2.48943 2.8749 1.72042 4.36646C0.951403 5.85801 0.676307 7.55538 0.934851 9.21347C1.1934 10.8716 1.9722 12.4046 3.15882 13.5912C4.34544 14.7778 5.87847 15.5566 7.53656 15.8152C9.19466 16.0737 10.892 15.7986 12.3836 15.0296C13.8751 14.2606 15.0837 13.0375 15.8348 11.5368C16.5859 10.0361 16.8406 8.33559 16.5622 6.68071C16.5355 6.52132 16.4466 6.37905 16.3151 6.2852C16.1835 6.19135 16.0201 6.1536 15.8607 6.18026ZM6.31253 7.39063C6.31253 6.90854 6.45548 6.43728 6.72332 6.03643C6.99116 5.63559 7.37184 5.32317 7.81724 5.13868C8.26263 4.95419 8.75273 4.90592 9.22556 4.99997C9.69839 5.09402 10.1327 5.32617 10.4736 5.66706C10.8145 6.00795 11.0466 6.44227 11.1407 6.9151C11.2347 7.38793 11.1865 7.87803 11.002 8.32342C10.8175 8.76882 10.5051 9.1495 10.1042 9.41734C9.70339 9.68518 9.23212 9.82813 8.75003 9.82813C8.10356 9.82813 7.48357 9.57133 7.02645 9.11421C6.56933 8.65709 6.31253 8.0371 6.31253 7.39063ZM4.64284 13.294C5.08367 12.6045 5.69097 12.0371 6.40875 11.6441C7.12653 11.2511 7.9317 11.0451 8.75003 11.0451C9.56836 11.0451 10.3735 11.2511 11.0913 11.6441C11.8091 12.0371 12.4164 12.6045 12.8572 13.294C11.6829 14.2072 10.2377 14.7031 8.75003 14.7031C7.26237 14.7031 5.81715 14.2072 4.64284 13.294ZM17.103 1.72802L14.6655 4.16552C14.6089 4.22217 14.5417 4.26712 14.4678 4.29779C14.3938 4.32845 14.3145 4.34424 14.2344 4.34424C14.1543 4.34424 14.075 4.32845 14.001 4.29779C13.9271 4.26712 13.8599 4.22217 13.8033 4.16552L12.5845 2.94677C12.5279 2.89015 12.483 2.82294 12.4524 2.74896C12.4217 2.67499 12.4059 2.5957 12.4059 2.51563C12.4059 2.43556 12.4217 2.35628 12.4524 2.28231C12.483 2.20833 12.5279 2.14112 12.5845 2.0845C12.6989 1.97016 12.8539 1.90592 13.0157 1.90592C13.0957 1.90592 13.175 1.92169 13.249 1.95233C13.323 1.98297 13.3902 2.02788 13.4468 2.0845L14.2344 2.87288L16.2408 0.865751C16.2974 0.809134 16.3646 0.764223 16.4386 0.733582C16.5125 0.702941 16.5918 0.68717 16.6719 0.68717C16.752 0.68717 16.8313 0.702941 16.9052 0.733582C16.9792 0.764223 17.0464 0.809134 17.103 0.865751C17.1597 0.922368 17.2046 0.989582 17.2352 1.06356C17.2658 1.13753 17.2816 1.21681 17.2816 1.29688C17.2816 1.37695 17.2658 1.45624 17.2352 1.53021C17.2046 1.60419 17.1597 1.6714 17.103 1.72802Z"
                                    fill="white"
                                  />
                                </svg>
                              </span>
                              <span className="text-xs">Unverified </span>
                            </span>
                          )}
                          <span className="flex flex-col justify-center text-xs font-semibold">
                            {getDateDifference(product.vendor.createdAt)} on
                            Kudu
                          </span>
                        </div>
                      </div>
                    </div>
                    {user ? product.vendor.isVerified ? (
                      <Button
                        type="button"
                        className="w-full py-2 px-4 flex justify-center gap-2 bg-[rgba(66,133,244,1)] text-white rounded-md transition-colors"
                        onClick={initiateChat}
                      >
                        <span className="flex mt-[2px]">
                          <svg
                            width="21"
                            height="19"
                            viewBox="0 0 21 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.37503 8C9.37503 7.7775 9.44101 7.55999 9.56462 7.37498C9.68824 7.18998 9.86394 7.04578 10.0695 6.96064C10.2751 6.87549 10.5013 6.85321 10.7195 6.89662C10.9377 6.94003 11.1382 7.04717 11.2955 7.20451C11.4529 7.36184 11.56 7.56229 11.6034 7.78052C11.6468 7.99875 11.6245 8.22495 11.5394 8.43052C11.4542 8.63609 11.31 8.81179 11.125 8.9354C10.94 9.05902 10.7225 9.125 10.5 9.125C10.2017 9.125 9.91551 9.00647 9.70453 8.7955C9.49355 8.58452 9.37503 8.29837 9.37503 8ZM6.37503 9.125C6.59753 9.125 6.81504 9.05902 7.00004 8.9354C7.18505 8.81179 7.32924 8.63609 7.41439 8.43052C7.49954 8.22495 7.52182 7.99875 7.47841 7.78052C7.435 7.56229 7.32786 7.36184 7.17052 7.20451C7.01319 7.04717 6.81273 6.94003 6.5945 6.89662C6.37627 6.85321 6.15007 6.87549 5.94451 6.96064C5.73894 7.04578 5.56324 7.18998 5.43962 7.37498C5.31601 7.55999 5.25003 7.7775 5.25003 8C5.25003 8.29837 5.36855 8.58452 5.57953 8.7955C5.79051 9.00647 6.07666 9.125 6.37503 9.125ZM14.625 9.125C14.8475 9.125 15.065 9.05902 15.25 8.9354C15.435 8.81179 15.5792 8.63609 15.6644 8.43052C15.7495 8.22495 15.7718 7.99875 15.7284 7.78052C15.685 7.56229 15.5779 7.36184 15.4205 7.20451C15.2632 7.04717 15.0627 6.94003 14.8445 6.89662C14.6263 6.85321 14.4001 6.87549 14.1945 6.96064C13.9889 7.04578 13.8132 7.18998 13.6896 7.37498C13.566 7.55999 13.5 7.7775 13.5 8C13.5 8.29837 13.6186 8.58452 13.8295 8.7955C14.0405 9.00647 14.3267 9.125 14.625 9.125ZM20.25 2V14C20.25 14.3978 20.092 14.7794 19.8107 15.0607C19.5294 15.342 19.1479 15.5 18.75 15.5H6.28128L3.22503 18.14L3.21659 18.1466C2.94662 18.3755 2.60397 18.5008 2.25003 18.5C2.02968 18.4995 1.81211 18.4509 1.61253 18.3575C1.35365 18.2379 1.13468 18.0462 0.981739 17.8055C0.828802 17.5648 0.748363 17.2852 0.750025 17V2C0.750025 1.60218 0.90806 1.22064 1.18937 0.93934C1.47067 0.658035 1.8522 0.5 2.25003 0.5H18.75C19.1479 0.5 19.5294 0.658035 19.8107 0.93934C20.092 1.22064 20.25 1.60218 20.25 2ZM18.75 2H2.25003V17L5.50971 14.1875C5.64523 14.068 5.81934 14.0014 6.00003 14H18.75V2Z"
                              fill="white"
                            />
                          </svg>
                        </span>
                        <span className="flex mt-[4px]">Start Chat</span>
                      </Button>
                    ) : (
                      <></>
                    )
                      :
                      <></>}
                  </div>
                ) : (
                  <></>
                )}
                <div className="w-full flex flex-col gap-3 py-5 md:px-8 px-8 rounded-md bg-white shadow shadow-md">
                  <p className="text-lg font-bold">Safety Tips</p>
                  <ul
                    className="text-sm font-[500] md:px-4 flex flex-col gap-2"
                    style={{ listStyle: "disc" }}
                  >
                    <li>Meet with the seller at a safe public place.</li>
                    <li>
                      Inspect the item and ensure it&apos;s exactly what you
                      want
                    </li>
                    <li>
                      Make sure that the packed item is the one you&apos;ve
                      inspected
                    </li>
                  </ul>
                </div>
                {(
                  product.vendor?.isVerified || product.admin ? (
                    <div className="w-full flex flex-col gap-3 py-5 md:px-8 px-4 rounded-md bg-white shadow shadow-md">
                      <>
                        <div className="flex items-center gap-5">
                          <span className="flex flex-col justify-center h-full text-base font-[600]">
                            Quantity
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={handleDecrease}
                              disabled={product.quantity === 0}
                              className="bg-kuduOrange text-white px-3 py-1 rounded hover:bg-orange-600"
                            >
                              -
                            </button>
                            <span className="px-4 py-1 text-sm font-semibold rounded">
                              {quantity}
                            </span>
                            <button
                              onClick={handleIncrease}
                              disabled={product.quantity === 0 || quantity >= product.quantity}
                              className="bg-kuduOrange text-white px-3 py-1 rounded hover:bg-orange-600"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <Button
                          type="submit"
                          onClick={() => handleAddToCart()}
                          disabled={disabled}
                          className="w-full py-3 px-4 flex justify-center rounded-md gap-3 bg-kuduOrange text-white transition-colors"
                        >
                          <span className="flex mt-[2px]">
                            <svg
                              width="20"
                              height="18"
                              viewBox="0 0 26 23"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M13.8784 12.1081V18.3514C13.8784 18.5879 13.7845 18.8148 13.6172 18.982C13.4499 19.1493 13.2231 19.2433 12.9865 19.2433C12.75 19.2433 12.5231 19.1493 12.3559 18.982C12.1886 18.8148 12.0946 18.5879 12.0946 18.3514V12.1081C12.0946 11.8716 12.1886 11.6447 12.3559 11.4775C12.5231 11.3102 12.75 11.2162 12.9865 11.2162C13.2231 11.2162 13.4499 11.3102 13.6172 11.4775C13.7845 11.6447 13.8784 11.8716 13.8784 12.1081ZM17.9856 12.0189L17.3613 18.2622C17.3489 18.3791 17.3598 18.4972 17.3933 18.6099C17.4268 18.7226 17.4822 18.8275 17.5564 18.9187C17.6306 19.0099 17.7221 19.0855 17.8256 19.1412C17.9291 19.1969 18.0426 19.2316 18.1595 19.2433C18.1896 19.2449 18.2197 19.2449 18.2498 19.2433C18.4707 19.243 18.6837 19.1607 18.8474 19.0124C19.0112 18.8641 19.114 18.6604 19.1361 18.4406L19.7605 12.1973C19.7841 11.962 19.7133 11.7268 19.5636 11.5437C19.4139 11.3605 19.1976 11.2443 18.9622 11.2207C18.7269 11.197 18.4917 11.2678 18.3086 11.4175C18.1254 11.5672 18.0092 11.7836 17.9856 12.0189ZM7.98749 12.0189C7.96383 11.7836 7.84765 11.5672 7.6645 11.4175C7.48135 11.2678 7.24623 11.197 7.01087 11.2207C6.77551 11.2443 6.55918 11.3605 6.40948 11.5437C6.25978 11.7268 6.18897 11.962 6.21262 12.1973L6.83695 18.4406C6.85913 18.6613 6.96281 18.8659 7.12773 19.0143C7.29265 19.1627 7.50697 19.2444 7.72884 19.2433C7.75892 19.2449 7.78907 19.2449 7.81914 19.2433C7.93568 19.2315 8.04878 19.197 8.15196 19.1416C8.25515 19.0862 8.34641 19.011 8.42053 18.9203C8.49466 18.8296 8.55019 18.7252 8.58397 18.613C8.61775 18.5009 8.6291 18.3832 8.61739 18.2666L7.98749 12.0189ZM25.4652 8.65873L23.7851 21.2634C23.7265 21.6912 23.5153 22.0834 23.1904 22.3677C22.8654 22.6521 22.4487 22.8094 22.0169 22.8108H3.95614C3.52436 22.8094 3.10763 22.6521 2.78271 22.3677C2.45779 22.0834 2.24657 21.6912 2.18796 21.2634L0.507864 8.65873C0.491022 8.53274 0.501305 8.40461 0.538023 8.28291C0.574742 8.16122 0.637048 8.04878 0.720767 7.95314C0.804485 7.85749 0.907681 7.78084 1.02344 7.72833C1.1392 7.67582 1.26484 7.64866 1.39195 7.64866H6.3386L12.3176 0.817891C12.4013 0.722988 12.5043 0.64698 12.6196 0.594918C12.7349 0.542856 12.86 0.51593 12.9865 0.51593C13.1131 0.51593 13.2382 0.542856 13.3535 0.594918C13.4688 0.64698 13.5718 0.722988 13.6555 0.817891L19.6345 7.64866H24.5811C24.7082 7.64866 24.8339 7.67582 24.9496 7.72833C25.0654 7.78084 25.1686 7.85749 25.2523 7.95314C25.336 8.04878 25.3983 8.16122 25.4351 8.28291C25.4718 8.40461 25.4821 8.53274 25.4652 8.65873ZM8.70881 7.64866H17.2643L12.9865 2.75998L8.70881 7.64866ZM23.5621 9.43245H2.41094L3.95614 21.027H22.0169L23.5621 9.43245Z"
                                fill="white"
                              />
                            </svg>
                          </span>
                          <span className="flex mt-[4px]">Add to Cart</span>
                        </Button>
                      </>
                    </div>
                  ) : (
                    <></>
                  )
                )}

                {user &&
                  <div className="w-full flex flex-col gap-3 py-5 md:px-8 px-4 rounded-md bg-white shadow shadow-md">
                    <span className="p-1 mt-3 text-center bg-white w-full">
                      <Button disabled={bookmarked} className="w-full text-white flex justify-center gap-3" onClick={() => addToBookMark()}>
                        <Bookmark color="rgba(255, 255, 255, 1)" size={18} />
                        <span className="text-sm font-semibold">
                          {bookmarked ? 'Added to your saved list' : 'Add to your saved list'}
                        </span>
                      </Button>
                    </span>
                  </div>
                }

                {product.vendor &&
                  !product.vendor.isVerified &&
                  !product.admin ? (
                  <div className="w-full flex">
                    <Button
                      type="submit"
                      onClick={() => showContact()}
                      className=" w-full py-4 px-4 flex justify-center gap-2 bg-kuduOrange text-white rounded-lg transition-colors"
                    >
                      <span className="flex mt-[2px]">
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.5253 1.30599C11.5508 1.21081 11.5947 1.12158 11.6547 1.04339C11.7147 0.965204 11.7894 0.899598 11.8748 0.850321C11.9601 0.801044 12.0543 0.769061 12.152 0.7562C12.2496 0.743339 12.3489 0.749852 12.4441 0.775367C13.8344 1.13813 15.103 1.86497 16.119 2.88103C17.1351 3.89708 17.8619 5.16562 18.2247 6.55599C18.2502 6.65116 18.2567 6.75042 18.2439 6.84811C18.231 6.94579 18.199 7.03999 18.1497 7.12531C18.1005 7.21063 18.0349 7.28541 17.9567 7.34536C17.8785 7.40532 17.7893 7.44928 17.6941 7.47474C17.6307 7.49138 17.5655 7.49989 17.5 7.50005C17.3347 7.50005 17.1741 7.44545 17.043 7.34475C16.912 7.24405 16.8179 7.10288 16.7753 6.94318C16.4795 5.80817 15.8863 4.77259 15.0569 3.9432C14.2275 3.11381 13.1919 2.52061 12.0569 2.22474C11.9616 2.19938 11.8723 2.15549 11.794 2.09558C11.7157 2.03566 11.65 1.9609 11.6006 1.87557C11.5513 1.79024 11.5192 1.69601 11.5063 1.59828C11.4933 1.50054 11.4998 1.40122 11.5253 1.30599ZM11.3069 5.22474C12.5997 5.56974 13.4303 6.40037 13.7753 7.69318C13.8179 7.85288 13.912 7.99405 14.043 8.09475C14.1741 8.19545 14.3347 8.25005 14.5 8.25005C14.5655 8.24989 14.6307 8.24138 14.6941 8.22474C14.7893 8.19928 14.8785 8.15532 14.9567 8.09536C15.0349 8.03541 15.1005 7.96063 15.1497 7.87531C15.199 7.78999 15.231 7.69579 15.2439 7.59811C15.2567 7.50042 15.2502 7.40116 15.2247 7.30599C14.7447 5.50974 13.4903 4.25537 11.6941 3.77537C11.5019 3.72402 11.2971 3.75113 11.1249 3.85073C10.9527 3.95033 10.8271 4.11426 10.7758 4.30646C10.7244 4.49866 10.7516 4.70338 10.8512 4.87559C10.9508 5.04781 11.1147 5.1734 11.3069 5.22474ZM18.9888 14.1638C18.8216 15.4341 18.1977 16.6002 17.2337 17.4442C16.2696 18.2882 15.0313 18.7523 13.75 18.7501C6.30626 18.7501 0.250008 12.6938 0.250008 5.25005C0.247712 3.96876 0.711903 2.73045 1.55588 1.76639C2.39986 0.802337 3.56592 0.178467 4.83626 0.0113044C5.1575 -0.0279197 5.4828 0.0378001 5.76362 0.198653C6.04444 0.359506 6.2657 0.606865 6.39438 0.903804L8.37438 5.32412V5.33537C8.4729 5.56267 8.51359 5.81083 8.49282 6.05769C8.47204 6.30455 8.39044 6.54242 8.25532 6.75005C8.23845 6.77537 8.22063 6.7988 8.20188 6.82224L6.25001 9.13599C6.9522 10.5629 8.4447 12.0422 9.89032 12.7463L12.1722 10.8047C12.1946 10.7859 12.2181 10.7684 12.2425 10.7522C12.45 10.6139 12.6887 10.5294 12.937 10.5065C13.1853 10.4836 13.4354 10.5229 13.6647 10.621L13.6769 10.6266L18.0934 12.6057C18.3909 12.7339 18.6389 12.955 18.8003 13.2358C18.9616 13.5167 19.0278 13.8422 18.9888 14.1638ZM17.5 13.9763C17.5 13.9763 17.4934 13.9763 17.4897 13.9763L13.0834 12.0029L10.8006 13.9444C10.7785 13.9632 10.7553 13.9807 10.7313 13.9969C10.5154 14.1409 10.2659 14.2265 10.0071 14.2452C9.74828 14.2639 9.48904 14.2152 9.2547 14.1038C7.49876 13.2554 5.74845 11.5182 4.89907 9.78099C4.7866 9.54836 4.73613 9.29061 4.75255 9.03274C4.76898 8.77486 4.85174 8.5256 4.99282 8.30912C5.00872 8.2837 5.02659 8.25956 5.04626 8.23693L7.00001 5.92037L5.03126 1.51412C5.03089 1.51038 5.03089 1.50661 5.03126 1.50287C4.12212 1.62146 3.28739 2.0674 2.68339 2.75716C2.0794 3.44693 1.74755 4.33322 1.75001 5.25005C1.75348 8.43159 3.01888 11.4818 5.26856 13.7315C7.51825 15.9812 10.5685 17.2466 13.75 17.2501C14.6663 17.2532 15.5523 16.9225 16.2425 16.3198C16.9327 15.7171 17.3797 14.8837 17.5 13.9754V13.9763Z"
                            fill="white"
                          />
                        </svg>
                      </span>
                      <span className="flex mt-[4px]">
                        Display Contact
                      </span>
                    </Button>
                  </div>
                ) : (
                  <></>
                )
                }

                <div>
                  <ProductReview reviews={product.reviews} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
