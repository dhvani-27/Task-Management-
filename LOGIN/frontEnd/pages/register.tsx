import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      alert("Registration Successful");
      console.log(response.data);
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
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h2>Register</h2>

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
            ? "Registering..."
            : "Register"}
        </button>
      </form>

      <p style={{ marginTop: 16 }}>
        Already have an account?{' '}
        <button
          type="button"
          onClick={onSwitch}
          style={{
            background: "none",
            border: "none",
            color: "blue",
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
