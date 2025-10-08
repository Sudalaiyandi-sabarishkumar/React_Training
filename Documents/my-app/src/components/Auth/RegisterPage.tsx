import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./AuthPage.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LocalStorage } from "../../Utils/LocalStorage";
interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), undefined], "Passwords must match")
      .required("Confirm Password is required"),
  });
  

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema)
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const onSubmit = (data: RegisterFormInputs) => {
    let users = LocalStorage.getItem("users") || [];
    const exists = users.find((u: RegisterFormInputs) => u.email === data.email);
    if (exists) {
      toast.error("Email already registered");
      return;
    }
    users.push({ email: data.email, password: data.password });
    LocalStorage.setItem("users", users);
    toast.success("Registered successfully. Login now!");
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <ToastContainer position="top-right" />
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" placeholder="Email" {...register("email")} />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div style={{ position: "relative" }}>
                 <input
                   type={showPassword ? "text" : "password"}
                   placeholder="Password"
                   {...register("password")}
                   style={{ width: "91%", }}
                 />
                 <span
                   onClick={() => setShowPassword(!showPassword)}
                   style={{
                     position: "absolute",
                     right: "10px",
                     top: "50%",
                     transform: "translateY(-80%)",
                     cursor: "pointer",
                     color: "#555",
                   }}
                 >
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
                 </span>
                 <p className="error">{errors.password?.message}</p>
               </div>
               <div style={{ position: "relative" }}>
                 <input
                   type={showCPassword ? "text" : "password"}
                   placeholder="Password"
                   {...register("confirmPassword")}
                   style={{ width: "91%", }}
                 />
                 <span
                   onClick={() => setShowCPassword(!showCPassword)}
                   style={{
                     position: "absolute",
                     right: "10px",
                     top: "50%",
                     transform: "translateY(-80%)",
                     cursor: "pointer",
                     color: "#555",
                   }}
                 >
                   {showCPassword ? <FaEyeSlash /> : <FaEye />}
                 </span>
                 <p className="error">{errors.confirmPassword?.message}</p>
               </div>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default RegisterPage;
