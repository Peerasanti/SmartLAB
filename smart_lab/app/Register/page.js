"use client";

import styles from "../styles/Register.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";
import Link from "next/link";

export default function Register() {
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
          <h1 className={styles.title}>Sign Up</h1>

          <form className={styles.form}>
            <input type="text" placeholder="Full Name" className={styles.input} />
            <input type="email" placeholder="Email" className={styles.input} />
            <input type="password" placeholder="Password" className={styles.input} />
            <input type="password" placeholder="Confirm Password" className={styles.input} />
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>

          <div className={styles.socialButtons}>
            <span>or sign up with</span>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon}>F</a> {/* Facebook */}
              <a href="#" className={styles.socialIcon}>G</a> {/* Google */}
              <a href="#" className={styles.socialIcon}>A</a> {/* Apple */}
            </div>
          </div>

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