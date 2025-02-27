"use client";

import styles from "../styles/Login.module.css";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTransition } from "../context/TransitionContext";

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
      transition={{ duration: 0.8, delay: 0.1 }}
    >
      <h1 className={styles.title}>Login</h1>
    </motion.div>
  );
}