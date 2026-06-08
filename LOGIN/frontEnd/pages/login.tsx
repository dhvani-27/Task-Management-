import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  loginSchema,
  LoginFormData,
} from "../schemas/loginSchema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      alert("Login Successful");
      console.log(response.data);
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
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>

          <input
            type="email"
            {...register("email")}
            placeholder="Enter email"
          />

          <p style={{ color: "red" }}>
            {errors.email?.message}
          </p>
        </div>

        <div>
          <label>Password</label>

          <input
            type="password"
            {...register("password")}
            placeholder="Enter password"
          />

          <p style={{ color: "red" }}>
            {errors.password?.message}
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Logging in..."
            : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;