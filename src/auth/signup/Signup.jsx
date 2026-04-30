import React, { useState } from "react";
import signup from "../../assets/login.avif";
import styles from "./Signup.module.css";
import { NavLink } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "../../api/auth.api";
import Snackbar from "../../components/ui/Snackbar";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [formError, setFormError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "error" });

  const showSnackbar = (message, type = "error") => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => {
      setSnackbar({ open: false, message: "", type: "error" });
    }, 3000);
  };

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      showSnackbar("Account created successfully. You can now login.", "success");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
    },
    onError: (error) => {
      showSnackbar(error.message || "Signup failed.");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormError("");
    if (signupMutation.isError || signupMutation.isSuccess) signupMutation.reset();
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    signupMutation.reset();

    if (!formData.agreeToTerms) {
      const message = "Please accept Terms & Conditions.";
      setFormError(message);
      showSnackbar(message);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      const message = "Password and confirm password must match.";
      setFormError(message);
      showSnackbar(message);
      return;
    }

    signupMutation.mutate({
      name: formData.username,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className={styles.main}>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ open: false, message: "", type: "error" })}
      />
      {/* Left Side */}
      <div className={styles.left}>
        <h1>Sign Up</h1>

        <div className={styles.formBox}>
          <form className={styles.fields} onSubmit={handleSubmit}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Type your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Type your password"
              value={formData.password}
              onChange={handleChange}
              minLength={6}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={6}
              required
            />

            <div className={styles.terms}>
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span>I agree to the Terms & Conditions</span>
            </div>

            {formError ? <p>{formError}</p> : null}
            {signupMutation.isError ? <p>{signupMutation.error.message}</p> : null}
            {signupMutation.isSuccess ? <p>Account created successfully. You can now login.</p> : null}

            <button
              className={styles.signupBtn}
              type="submit"
              disabled={signupMutation.isPending}
            >
              {signupMutation.isPending ? "Creating..." : "Create Account"}
            </button>
            <p className={styles.loginText}>
              Already have an account?
              <NavLink replace className={styles.loginLink} to="/login">
                <span> Login</span>
              </NavLink>
            </p>

            <div className={styles.divider}>Or</div>

            <button className={styles.googleBtn} type="button">Sign up with Google</button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img src={signup} alt="signup" />
      </div>
    </div>
  );
};

export default Signup;
