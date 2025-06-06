import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useApiMutation from "../../api/hooks/useApiMutation";
import { useDispatch } from "react-redux";
import { setKuduUser } from "../../reducers/userSlice";

function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useApiMutation();

  const onSubmit = (data) => {
    setIsLoading(true);
    mutate({
      url: "/auth/admin/login",
      method: "POST",
      data: data,
      onSuccess: (response) => {
        localStorage.setItem("kuduUserToken", response.data.token);
        dispatch(setKuduUser(response.data.data));
        navigate("/admin/dashboard");
        setIsLoading(false);
      },
      onError: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <div
      className="w-full h-full flex flex-col justify-center items-center"
      style={{
        backgroundImage: `
  url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736942330/Sign_Up_1_og6gq5.jpg
`,
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100vh"
      }}
    >

      {/* Form Card */}
      <div className="w-full max-w-lg px-6 py-6 bg-white/20 backdrop-blur-lg rounded-lg">
        <div className="w-full max-w-lg px-8 py-4 bg-white rounded-lg ">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <Link to={'/'}>
              <img
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737211689/kuduMart/kudum_1_urk9wm.png"
                alt="Kudu Logo"
                sizes="20vw"
                width={250}
                height={33}
              />
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-6 text-black-800">Admin Login</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <div>
              <label
                className="block text-md font-semibold mb-3"
                htmlFor="email"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email address",
                  },
                })}
                placeholder="Your email address"
                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                style={{ outline: "none" }}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-md font-semibold mb-3"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                  style={{ outline: "none" }}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                      alt="Hide Password"
                      className="w-5"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                      alt="Show Password"
                      className="w-5"
                    />
                  )}
                </button>
              </div>
            </div>


            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-kuduOrange disabled:bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
            >
              Sign In →
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
