import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupUser, verifyOTP } from "../services/authService";

import {
  loginSchema,
  LoginFormData,
} from "../schemas/loginSchema";

const Register = ({ onSwitch }: { onSwitch: () => void }) => {
  const [otpSent, setOtpSent] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);

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
      alert(response.data.message || "Registration successful. Check your email for OTP.");
      setRegisteredEmail(data.email);
      setOtpSent(true);
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP sent to your email.");
      return;
    }

    setVerificationLoading(true);
    try {
      const response = await verifyOTP({ email: registeredEmail, otp });
      alert(response.data.message || "Email verified successfully. You can now login.");
      onSwitch();
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "OTP verification failed"
      );
    } finally {
      setVerificationLoading(false);
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
      <h2 style={{ marginBottom: 24 }}>
        {otpSent ? "Verify OTP" : "Register"}
      </h2>

      {!otpSent ? (
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
      ) : (
        <div>
          <p style={{ marginBottom: 20 }}>
            An OTP has been sent to <strong>{registeredEmail}</strong>.
            Enter it below to verify your email and complete registration.
          </p>

          <div style={{ marginBottom: 24 }}>
            <label
              htmlFor="otp"
              style={{ display: "block", marginBottom: 8 }}
            >
              OTP
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 10,
                border: "1px solid #d1d5db",
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={verificationLoading}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 10,
              border: "none",
              background: "#1d4ed8",
              color: "white",
              fontWeight: 600,
              cursor: verificationLoading ? "not-allowed" : "pointer",
            }}
          >
            {verificationLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      )}

      {!otpSent && (
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
      )}
    </div>
  );
};

export default Register;
