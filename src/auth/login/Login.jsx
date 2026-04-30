import { useState } from "react";
import login from "../../assets/login.avif";
import styles from "./Login.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/auth.api";
import { setData } from "../../utils/localStorage";
import { isAdminUser } from "../../utils/auth";
import Snackbar from "../../components/ui/Snackbar";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [formError, setFormError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "error" });

  const showSnackbar = (message, type = "error") => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => {
      setSnackbar({ open: false, message: "", type: "error" });
    }, 3000);
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      setData("authToken", response.token);
      setData("authUser", response.data.user);
      showSnackbar("Login successful.", "success");
      const isAdminLogin = isAdminUser(response.data.user);
      const nextPath = isAdminLogin ? "/admin" : redirectPath;
      setTimeout(() => navigate(nextPath, { replace: true }), 500);
    },
    onError: (error) => {
      showSnackbar(error.message || "Login failed.");
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormError("");
    if (loginMutation.isError || loginMutation.isSuccess) loginMutation.reset();
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    loginMutation.reset();

    if (!formData.email || !formData.password) {
      const message = "Email and password are required.";
      setFormError(message);
      showSnackbar(message);
      return;
    }

    loginMutation.mutate({
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
        <h1>Login</h1>

        <div className={styles.formBox}>
          <form className={styles.fields} onSubmit={handleSubmit}>
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

            <div className={styles.options}>
              <div className={styles.remember}>
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span>Remember me</span>
              </div>

              <p>Forgot password?</p>
            </div>

            {formError ? <p>{formError}</p> : null}
            {loginMutation.isError ? <p>{loginMutation.error.message}</p> : null}

            <button className={styles.loginBtn} type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "Logging in..." : "Log in"}
            </button>
            <p className={styles.signupText}>
              Don’t have an account?
              <NavLink replace to="/signup" className={styles.signupLink}>
                Sign Up
              </NavLink>
            </p>

            <div className={styles.divider}>Or</div>

            <button className={styles.googleBtn} type="button">Sign in with Google</button>
          </form>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img src={login} alt="login" />
      </div>
    </div>
  );
};

export default Login;
