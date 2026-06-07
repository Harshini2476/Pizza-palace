import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);

      if (success) {
        toast.success("Welcome Back!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <span className="text-5xl">🍕</span>

          <h1 className="text-3xl font-bold mt-4 mb-2">
            Welcome Back
          </h1>

          <p className="text-gray-600">
            Sign in to your Pizza Palace account
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="block mb-2 font-medium">
                Email Address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                })}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-medium">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
                    },
                  })}
                  className={`w-full border rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-red-600 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

          {/* Demo Admin Credentials */}
          <div className="mt-5 bg-gray-100 p-3 rounded-lg">
            <p className="text-center text-xs text-gray-600">
              Admin Login:
            </p>

            <p className="text-center text-xs font-mono mt-1">
              admin@pizzapalace.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
