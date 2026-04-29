import React from "react";
import login from "../../assets/login.avif";
import styles from "./Login.module.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.main}>
      {/* Left Side */}
      <div className={styles.left}>
        <h1>Login</h1>

        <div className={styles.formBox}>
          <div className={styles.fields}>
            <label>Email</label>
            <input type="email" placeholder="Type your email" />

            <label>Password</label>
            <input type="password" placeholder="Type your password" />

            <div className={styles.options}>
              <div className={styles.remember}>
                <input type="checkbox" />
                <span>Remember me</span>
              </div>

              <p>Forgot password?</p>
            </div>

            <button className={styles.loginBtn}>Log in</button>
            <p className={styles.signupText}>
              Don’t have an account?
              <NavLink replace to="/signup" className={styles.signupLink}>
                Sign Up
              </NavLink>
            </p>

            <div className={styles.divider}>Or</div>

            <button className={styles.googleBtn}>Sign in with Google</button>
          </div>
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
