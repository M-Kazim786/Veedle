import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, userLogin } from "../store/authSlice";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const loading = useSelector((state) => state.auth?.loading);

  const submit = async (data) => {
    const isEmail = data.username.includes("@");
    const loginData = isEmail
      ? { email: data.username, password: data.password }
      : data;

    const response = await dispatch(userLogin(loginData));
    const user = await dispatch(getCurrentUser());
    if (user && response?.payload) {
      navigate("/");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90 backdrop-blur-sm z-50"
    >
      <motion.div
        ref={modalRef}
        initial={{ y: -20, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-gradient-to-br from-[#051622] via-[#072331] to-[#051622] border border-[#1e3a47] rounded-xl p-8 text-white text-center shadow-2xl max-w-sm w-full relative overflow-hidden"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#00ed64] rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#0d3446] rounded-full filter blur-3xl opacity-20"></div>

        <div className="relative z-10">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-[#00ed64] rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-8 h-8 text-[#051622]"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00ed64] to-[#00c050]">
            Welcome Back
          </h1>
          <p className="text-slate-400 mb-6">Sign in to access your account</p>

          <form onSubmit={handleSubmit(submit)} className="space-y-5 text-left">
            <div>
              <Input
                className="w-full bg-[#0d3446] border-[#1e3a47] text-white placeholder-gray-500 py-3 px-4 rounded-lg focus:ring-2 focus:ring-[#00ed64] focus:border-transparent"
                type="text"
                placeholder="Username or email"
                {...register("username", {
                  required: "Username or email is required",
                })}
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="relative">
              <Input
                className="w-full bg-[#0d3446] border-[#1e3a47] text-white placeholder-gray-500 py-3 px-4 rounded-lg pr-12 focus:ring-2 focus:ring-[#00ed64] focus:border-transparent"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {/* Toggle icon */}
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-[#00ed64] to-[#00c050] hover:from-[#00c050] hover:to-[#00a040] transition-all duration-300 shadow-lg hover:shadow-[#00ed64]/20 text-[#051622]"
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>

            <p className="text-center text-sm text-slate-400 mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-[#00ed64] hover:text-[#00c050] font-medium transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Login;
