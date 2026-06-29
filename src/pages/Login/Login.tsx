import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa"; // Loading spinner icon
import PabloImg from "../../assets/pablo-sign-in.svg";
import Logo from "../../components/Logo/Logo";
import toast from "react-hot-toast";
import "./Login.scss";

type FormData = {
    email: string;
    password: string;
};

const Login = () => {

    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("login")

    useEffect(() => {
        if (loggedIn === "true") {
            toast.error("You are already logged in.", { duration: 2000 })
            navigate("/users")

        }
    })
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Dummy user data for authentication
    const dummyUsers = [
        { email: import.meta.env.VITE_EMAIL, password: import.meta.env.VITE_PASSWORD },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data: FormData) => {
        setLoginError("");
        setIsLoading(true); // Start loading

        try {
            // Simulate API call delay (1.5 seconds)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Check if credentials match dummy data
            const user = dummyUsers.find(
                (u) => u.email === data.email && u.password === data.password
            );

            if (user) {
                toast.success("Login successful", { duration: 2000 })
                localStorage.setItem("login", "true")
                navigate("/users");
            } else {
                // Failed login

                toast.error("Invalid email or password", { duration: 2000 });
            }
        } catch (error) {
            setLoginError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    return (
        <div className="container">
            <section className="left-section">
                <div className="logo-container">
                    <Logo />
                </div>
                <img className="pablo-img" src={PabloImg} alt="Sign in illustration" />
            </section>

            <section className="right-section">
                <div className="right-section-header">
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Login Error Message */}
                    {loginError && <p className="error-message">{loginError}</p>}
                    <div className="input-wrapper">
                        {/* Email Input */}
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Email"
                                className={errors.email ? "input-error" : ""}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address",
                                    },
                                })}
                                disabled={isLoading} // Disable input during loading
                            />
                        </div>
                        <div>
                            {errors.email && (
                                <p className="error-message">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className={errors.password ? "input-error" : ""}
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters",
                                    },
                                })}
                                disabled={isLoading} // Disable input during loading
                            />
                            <div
                                onClick={togglePasswordVisibility}
                                className="input-toggle"
                                style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? "not-allowed" : "pointer" }}
                            >
                                {showPassword ? "HIDE" : "SHOW"}
                            </div>
                        </div>
                        {errors.password && (
                            <p className="error-message">{errors.password.message}</p>
                        )}


                        <p className="forgot-password">FORGOT PASSWORD?</p>
                    </div>

                    {/* Submit Button with Loading State */}
                    <button
                        className="submit-button"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="spinner" /> LOGGING IN...
                            </>
                        ) : (
                            "LOG IN"
                        )}
                    </button>
                </form>
            </section>
        </div>
    );
};

export default Login;