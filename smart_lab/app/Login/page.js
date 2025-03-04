"use client";

import styles from "../styles/Login.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";
import Link from "next/link";

export default function Login() {
  const { clickPosition } = useTransition();
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    setIsEntering(true);
  }, []);

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

          <form className={styles.form}>
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <button type="submit" className={styles.button}>
              Sign In
            </button>
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
            <a href="/Register" className={styles.link}>Sign Up</a>
            <a href="/ForgotPassword" className={styles.link}>Forgot Password</a>
          </div>
        </div>
      </div>

      <div className={styles.rightSection}></div> {/* ส่วนภาพพื้นหลัง */}

    </motion.div>
  );
}