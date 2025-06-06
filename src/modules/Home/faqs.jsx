import { useState } from "react";
import "../Home/components/style.css";
import ShoppingExperience from "./components/ShoppingExperience";
import GetApp from "./components/GetApp";
import { useGetFaqClient } from "../../api/pages/faqs";
import Loader from "../../components/Loader";

const FAQs = () => {
  const [activeCategory, setActiveCategory] = useState("General");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: faqs, isLoading } = useGetFaqClient();

  const categories = [
    "General",
    "Buying on KUDU",
    "Selling on KUDU",
    "Auction",
    "Safety & Policy",
    "Support",
  ];
  const questions = {
    General: [
      {
        id: 1,
        question: "Q: What is Kudu?",
        answer:
          "A: Kudu is an online marketplace that allows users to buy, sell, and auction physical items easily and securely.",
      },
      {
        id: 2,
        question: "Q: Who can use Kudu?",
        answer:
          "A: Both local and international individuals and businesses can use Kudu to buy, sell, or auction items.",
      },
      {
        id: 3,
        question: "Q: What sort of items can I buy or sell on Kudu?",
        answer:
          "A: You can buy or sell items and services as well as auction actual products in good condition across our range of categories. Keep in mind that services are not up for sale.",
      },
      {
        id: 4,
        question: "Q: Are my transactions safe on Kudu? ",
        answer:
          "A: Kudu supports safe practices when working with unverified vendors and offers a secure checkout process for verified sellers.",
      },
      {
        id: 5,
        question: "Q:How can I create an account on Kudu?",
        answer:
          "A: Select 'Register', and fill out the form with your name, email, and other details. Verify your account via email to get started.",
      },
    ],
    "Buying on KUDU": [
      {
        id: 1,
        question: "Q: How do I buy on Kudu?",
        answer:
          "A: Create an account, look through our extensive products or services, add to your cart, your preferred items or services if the vendor is verified, and proceed to checkout. Contact unverified vendors via call or text to conclude the purchase.",
      },
      {
        id: 2,
        question: "Q: Can I buy services on Kudu?",
        answer:
          "A: Yes, you can buy services from listed vendors, but services can not be auctioned.",
      },
      {
        id: 3,
        question: "Q: What payment methods are accepted on Kudu?",
        answer:
          "A: Kudu accepts payment options like Paypal, debit/ credit card, bank transfer.",
      },
      {
        id: 4,
        question: "Q: How can I identify a verified vendor?",
        answer:
          "A: For easy identification, verified vendors and their listings are marked with a unique badge.",
      },
      {
        id: 5,
        question: "Q: Can I track my order after purchase?",
        answer:
          "A: Yes, you can track your order via the 'My Orders' section on your account dashboard.",
      },
      {
        id: 6,
        question:
          "Q: What should I do if an item I bought doesn’t match its description?",
        answer:
          "A: Contact the seller directly or report the issue to Kudu’s support team for assistance.",
      },
      {
        id: 7,
        question: "Q: Can I cancel my order after checkout?",
        answer:
          "A: Order cancellation policies depend on the seller’s terms. Check the cancellation and return policies on the product page before purchasing.",
      },
      {
        id: 8,
        question: "Q8:  How can I manage inquiries from buyers?",
        answer:
          "You can create an account by signing up with your email on our website.",
      },
    ],
    "Selling on KUDU": [
      {
        id: 1,
        question: "Q: How can I sell on Kudu?",
        answer:
          "A: Create an account, select the “Vendor” section, list your product or service with clear details and pictures, and publish it for buyers to view.",
      },
      {
        id: 2,
        question: "Q: Can I sell services on Kudu?",
        answer:
          "A: Yes, you can list services for sale, but services can not be auctioned.",
      },
      {
        id: 4,
        question: "Q: Do I need a subscription package to sell on Kudu?",
        answer:
          "A: Yes, sellers must purchase a subscription package to access optimal selling features and list products or services on Kudu.",
      },
      {
        id: 5,
        question: "Q: How do I get paid after selling on Kudu?",
        answer:
          "A: Payments are processed through the platform’s secure payment system and credited to your account once the transaction is complete.",
      },
      {
        id: 6,
        question: "Q: Can I edit or delete my listings?",
        answer:
          "A: Yes, you can edit or delete your product or service listings anytime from your seller dashboard.",
      },
      {
        id: 7,
        question: "Q: How can I manage inquiries from buyers?",
        answer:
          "A: Buyers can contact you via chat or text feature. Make sure to respond swiftly to finalize sales.",
      },
      {
        id: 8,
        question: "Q: Can I sell physical products through an auction?",
        answer:
          "A: Yes, you can list physical products for auction by setting a starting price, and auction time frame.",
      },
      {
        id: 9,
        question: "Q: What types of items or services are prohibited on Kudu?",
        answer:
          "A: Illegal or barred items and services are not allowed on Kudu. Ensure your listing adheres to our terms and conditions.",
      },
      {
        id: 10,
        question: "Q: Are there additional fees apart from the subscription?",
        answer:
          "A: While the subscription covers listing products or services, additional fees may apply for premium features or successful transactions.",
      },
    ],
    Auction: [
      {
        id: 1,
        question: "Q: How do I auction an item on Kudu?",
        answer:
          "A: Create an account, navigate to the auction section, list your product with details, set the starting price, and duration, then publish it.",
      },
      {
        id: 2,
        question: "Q: What items can I auction on Kudu?",
        answer:
          "A: Only physical products in good condition can be auctioned. Services cannot be auctioned.",
      },
      {
        id: 3,
        question: "Q: Can I cancel an auction after it starts?",
        answer: "A: Auctions can only be canceled if no bids have been placed.",
      },
      {
        id: 4,
        question: "Q: How does bidding work?",
        answer:
          "A: Buyers place bids starting from the minimum price you set. The product is sold to the highest bidder once the auction ends.",
      },
      {
        id: 5,
        question: "Q: How do I know the auction winner?",
        answer:
          "A: The highest bidder at the end of the auction is automatically notified, and you’ll receive details to proceed with the transaction.",
      },
    ],
    "Safety & Policy": [
      {
        id: 1,
        question: "Q: How does Kudu ensure safe transactions?",
        answer:
          "A: Kudu provides a secure payment system for verified sellers and encourages buyers to use platform-based communications and payments for added safety.",
      },
      {
        id: 2,
        question: "Q: Are there guidelines for selling and buying?",
        answer:
          "A: Yes, all users must follow Kudu’s terms of service, which outline prohibited items, transaction rules, and acceptable conduct.",
      },
      {
        id: 3,
        question: "Q: How do I handle disputes?",
        answer:
          "A: If there’s a dispute, contact Kudu’s support team with relevant details for resolution.",
      },
      {
        id: 4,
        question: "Q: Are unverified sellers safe to buy from?",
        answer:
          "A: For unverified sellers, it’s advisable to meet in a public place, inspect the product before paying, and avoid online payments.",
      },
      {
        id: 5,
        question: "Q: What items or services are prohibited on Kudu?",
        answer:
          "A: Illegal, counterfeit, and restricted items or services are not allowed. Refer to our prohibited items policy for details.",
      },
    ],
    Support: [
      {
        id: 1,
        question: "Q: How do I contact Kudu’s support team?",
        answer:
          "A: You can reach our support team through the 'Contact Us' page, live chat, or email for assistance with any issues.",
      },
      {
        id: 2,
        question: "Q: What should I do if I encounter a technical issue?",
        answer:
          "A: Report technical issues via the live chat feature or by submitting a ticket through the support page.",
      },
      {
        id: 3,
        question: "Q: How do I reset my password?",
        answer:
          "A: Click on “Forgot Password” on the login page, and follow the instructions sent to your registered email to reset it.",
      },
      {
        id: 4,
        question: "Q: Can I get assistance with creating listings or auctions?",
        answer:
          "A: Yes, Kudu’s support team can guide you through the process of listing products or setting up an auction.",
      },
      {
        id: 5,
        question: "Q: What is the response time for support inquiries?",
        answer: "A: Support inquiries are typically handled within 24 hours.",
      },
    ],
  };

  if (isLoading)
    return (
      <div className="py-40">
        <Loader />
      </div>
    );
  // Filter questions by search query
  const filteredQuestions = faqs?.filter((q) => q.name === activeCategory);

  const faqCategories = faqs.map((faq) => faq.name);

  return (
    <>
      <div className="w-full flex flex-col">
        <section
          className="breadcrumb"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738005374/image_1_zkrcpb.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col py-12">
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
              <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            </div>
          </div>
        </section>
        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full bg-white">
          <div className="w-full flex flex-col md:flex-row gap-8 p-6 Justtttt">
            {/* Categories Sidebar */}
            <div className="w-full md:w-1/4 bg-white shadow rounded-lg p-4">
              <h2 className="font-semibold text-xl py-4 px-5 mb-4">
                Categories
              </h2>
              <ul className="space-y-2">
                {faqCategories.map((category) => (
                  <li
                    key={category}
                    className={`cursor-pointer py-4 px-5 rounded-lg ${
                      activeCategory === category
                        ? "bg-[#FF6F22] text-white"
                        : "text-black hover:bg-[#FF6F22] hover:text-white"
                    }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            {/* Questions Section */}
            <div className="w-full md:w-3/4">
              {/* Search Bar */}
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search in frequently asked questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded-lg p-5 w-full bg-gray-50"
                  style={{ outline: "none" }}
                />
              </div>

              {/* Questions */}
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="font-semibold text-xl mb-4">Got Questions?</h2>
                <div className="space-y-4">
                  {filteredQuestions[0]?.faqs?.map((q) => (
                    <div key={q.id} className="border-b pb-4">
                      <div
                        className="flex justify-between items-center cursor-pointer py-4"
                        onClick={() =>
                          setExpandedQuestion(
                            expandedQuestion === q.id ? null : q.id
                          )
                        }
                      >
                        <p className="text-black font-medium">{q.question}</p>
                        <button className="py-3">
                          {expandedQuestion === q.id ? "-" : "+"}
                        </button>
                      </div>
                      {expandedQuestion === q.id && (
                        <p className="mt-4 text-black font-medium mb-3">
                          {q.answer}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
          <div className="w-full flex mt-3 Justing">
            <ShoppingExperience />
          </div>
        </div>
        <div
          className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 Amenn"
          style={{
            backgroundImage: `
                    url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737405367/Frame_1618873123_fy7sgx.png)
                    `,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            className: "sm-[70vh]",
          }}
        >
          <div className="w-full flex flex-col gap-5 ">
            <GetApp />
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
