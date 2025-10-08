import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { fetchCards, getLists } from "../../service/Service";
import "./AuthPage.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LocalStorage } from "../../Utils/LocalStorage";

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginPageProps {
  setLoggedInUser: (user:LoginFormInputs ) => void;
}

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup.string().required("Password required"),
}).required();

const LoginPage: React.FC<LoginPageProps> = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema)
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = async (data: LoginFormInputs) => {
    const users = LocalStorage.getItem("users") || [] ;
    const user = users.find(
      (u: any) => u.email === data.email && u.password === data.password
    );
  
    if (!user) {
      toast.error("Invalid email or password");
      return;
    }
  
    setLoggedInUser(user);
    LocalStorage.setItem("loggedInUser", user);
  
    setLoading(true);
  
    try {
      // Fetch lists independently
      await Promise.all([
        getLists(),     // already sets localStorage inside
        fetchCards()    // you can optionally set localStorage here if needed
      ]);
     
      setTimeout(() => navigate("/board", { replace: true }), 500);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="auth-page">
      <ToastContainer position="top-right" />

      <h2>Login</h2>

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

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? <span className="spinner"></span> : "Login"}
        </button>
      </form>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
};

export default LoginPage;
