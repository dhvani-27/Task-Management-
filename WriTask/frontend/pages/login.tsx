import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "../services/authApi";

import {
  loginSchema,
  LoginFormData,
} from "../schemas/loginSchema";

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.data.token);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      alert("Login Successful");
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: 450,
        margin: "60px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 16px 40px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <img
          src="/images/logo.png"
          alt="WriTask Logo"
          width={120}
          height={120}
          style={{ display: "inline-block", marginBottom: 16 }}
        />
      </div>
      <h2 style={{ marginBottom: 24, textAlign: "center" }}>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: 8 }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #d1d5db",
            }}
          />
          <p style={{ color: "#dc2626", marginTop: 8 }}>
            {errors.email?.message}
          </p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: 8 }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 10,
              border: "1px solid #d1d5db",
            }}
          />
          <p style={{ color: "#dc2626", marginTop: 8 }}>
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            padding: 14,
            borderRadius: 10,
            border: "none",
            background: "#1d4ed8",
            color: "white",
            fontWeight: 600,
            cursor: isSubmitting ? "not-allowed" : "pointer",
          }}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
