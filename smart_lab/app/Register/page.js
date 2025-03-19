"use client";

import styles from "../styles/Register.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";
import Link from "next/link";

export default function Register() {
  const { clickPosition } = useTransition();
  const [isEntering, setIsEntering] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password); 
    const hasThreeNumbers = (password.match(/\d/g) || []).length >= 3;
    return hasUppercase && hasSpecialChar && hasThreeNumbers;
  }


  useEffect(() => {
    setIsEntering(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [full_name, email, password, confirmPassword] = Object.values(formData);

    if(!validateEmail(email)) {
      setError("Invalid email format.");
      return;
    }

    if(!validatePassword(password)) {
      setError("Password must have at least 1 uppercase, 1 special character, and 3 numbers.");
      return;
    }

    if(password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError(""); 

    try {
      const response = await fetch("http://localhost:8000/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name : full_name, email : email, password: password }),
      });

      const data = await response.json();
      if(response.ok) {
        alert("Sign up successful!");
        setFormData({
          full_name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setError(data.detail || "Sign up failed.");
      }
    } catch (error) {
      console.log(error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)` }}
      animate={
        isEntering
          ? { clipPath: `circle(150% at ${clickPosition.x}px ${clickPosition.y}px)` }
          : { clipPath: `circle(0% at ${clickPosition.x}px ${clickPosition.y}px)` }
      }
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          <Link href="/">
            <span>SMART LAB</span> {/* โลโก้ */}
          </Link>
        </div>

        <div className={styles.overlay}>
          <h1 className={styles.title}>Sign Up</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} value={formData.full_name} className={styles.input} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} className={styles.input} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} className={styles.input} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} value={formData.confirmPassword} className={styles.input} />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>

          <div className={styles.linkContainer}>
            <Link href={"/Login"} className={styles.link}>
                Sign In
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}></div> {/* ส่วนภาพพื้นหลัง */}
    </motion.div>
  );
}