import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupUser } from "../services/authService";

import {
  loginSchema,
  LoginFormData,
} from "../schemas/loginSchema";

const Register = ({ onSwitch }: { onSwitch: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signupUser(data);
      alert(response.data.message || "Registration Successful");
      onSwitch();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration Failed"
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
      <h2 style={{ marginBottom: 24 }}>Register</h2>

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
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 20, textAlign: "center" }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          style={{
            background: "none",
            border: "none",
            color: "#1d4ed8",
            textDecoration: "underline",
            cursor: "pointer",
            padding: 0,
          }}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
