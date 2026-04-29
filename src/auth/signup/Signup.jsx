import React from "react";
import signup from "../../assets/login.avif";
import styles from "./Signup.module.css";
import { NavLink } from "react-router-dom";

const Signup = () => {
  return (
    <div className={styles.main}>
      {/* Left Side */}
      <div className={styles.left}>
        <h1>Sign Up</h1>

        <div className={styles.formBox}>
          <div className={styles.fields}>
            <label>Username</label>
            <input type="text" placeholder="Type your username" />

            <label>Email</label>
            <input type="email" placeholder="Type your email" />

            <label>Password</label>
            <input type="password" placeholder="Type your password" />

            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm your password" />

            <div className={styles.terms}>
              <input type="checkbox" />
              <span>I agree to the Terms & Conditions</span>
            </div>

            <button className={styles.signupBtn}>Create Account</button>
            <p className={styles.loginText}>
              Already have an account?
              <NavLink replace className={styles.loginLink} to="/login">
                <span> Login</span>
              </NavLink>
            </p>

            <div className={styles.divider}>Or</div>

            <button className={styles.googleBtn}>Sign up with Google</button>
          </div>
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
