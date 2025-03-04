"use client";

import styles from "../styles/Login.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const { clickPosition } = useTransition();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEntering, setIsEntering] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsEntering(true);
  }, []);

  const validateCredentials = () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    if(password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }

    return true;

  }

  const handleSubmit = (e) => {

    e.preventDefault();
    setError("");
    console.log("Email:", email);
    console.log("Password:", password);

    router.push("/Dashboard"); // for development

    // if(validateCredentials()) {
    //   try {
    //     console.log("Login successful!");
    //     router.push("/Home");
    //   } catch (error) {
    //     console.log(error);
    //     setError("Something went wrong. Please try again.");
    //   }
    // }
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
          <h1 className={styles.title}>Sign In</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <input type="email" 
                   placeholder="Email" 
                   className={styles.input} 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input type="password" 
                   placeholder="Password" 
                   className={styles.input} 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/ForgotPassword" className={styles.link}>
              Forgot Password
            </a>
            <button type="submit" className={styles.button}>
              Sign In
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>

          <div className={styles.socialButtons}>
            <span>or sign in with</span>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>F</a> {/* Facebook */}
              <a href="#" className={styles.socialIcon}>G</a> {/* Google */}
              <a href="#" className={styles.socialIcon}>A</a> {/* Apple */}
            </div>
          </div>

          <div className={styles.linkContainer}>
            <Link href={"/Register"} className={styles.link}>
                Sign Up
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}></div> {/* ส่วนภาพพื้นหลัง */}

    </motion.div>
  );
}