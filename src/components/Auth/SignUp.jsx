import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import google from "../../assets/Auth/google.png";
import github from "../../assets/Auth/github.png";
import { registerUser } from "../../services/operations/authApi";

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const dispatch = useDispatch();

    const userNameValue = useWatch({ control, name: "userName" });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const submitForm = (data) => {
        console.log(data);
        // Dispatch the form data excluding confirmPassword
        const { confirmPassword, ...userData } = data;
        dispatch(registerUser(userData)); // Dispatch only the required data
    };

    return (
        <div className="flex">
            {/* left */}
            <div className="flex flex-col">
                <div>
                    <p>Logo</p>
                    <p>Welcome Back !!!</p>
                    <p>Log IN</p>
                </div>

                {/* form */}
                <div>
                    <form onSubmit={handleSubmit(submitForm)}>
                        {/* Full Name */}
                        <div>
                            <label>Full Name:</label>
                            <input
                                type="text"
                                {...register("fullName", { required: true })}
                            />
                            {errors.fullName && <p>Full Name is required</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p style={{ color: "red" }}>{errors.email.message}</p>
                            )}
                        </div>

                        {/* User Name */}
                        <div>
                            <label>User Name:</label>
                            <input
                                type="text"
                                {...register("userName", {
                                    required: "User Name is required",
                                    pattern: {
                                        value: /^[a-z0-9@_]+$/,
                                        message:
                                            "Only lowercase letters, numbers, '@', and '_' are allowed",
                                    },
                                })}
                            />
                            {/* Real-time error message */}
                            {userNameValue &&
                                !/^[a-z0-9@_]+$/.test(userNameValue) && (
                                    <p style={{ color: "red" }}>
                                        Only lowercase letters, numbers, '@', and '_' are allowed
                                    </p>
                                )}
                            {errors.userName && !userNameValue && (
                                <p style={{ color: "red" }}>{errors.userName.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label>Password:</label>

                            <div className="flex items-center">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="ml-2"
                                >
                                    {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>

                            {errors.password && <p>Password is required</p>}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label>Confirm Password:</label>

                            <div className="flex items-center">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", { required: true })}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="ml-2"
                                >
                                    {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                </button>
                            </div>
                            {errors.confirmPassword && <p>Confirm Password is required</p>}
                        </div>

                        {/* Button */}
                        <div>
                            <button type="submit">SignUp</button>
                        </div>
                    </form>
                </div>

                {/* oauth section */}
                <div>
                    <div>
                        <p>
                            or <span>SignUp with</span>
                        </p>
                    </div>
                    <div>
                        <img src={google} alt="" className="w-[5%]" />
                        <img src={github} alt="" className="w-[5%]" />
                    </div>
                    <div>
                        <p>
                            Have an account ? <span>LogIn</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
