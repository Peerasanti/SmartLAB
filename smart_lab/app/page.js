"use client";

import styles from "./styles/Home.module.css";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTransition } from "./context/TransitionContext";

export default function Home() {
  const router = useRouter();
  const { setClickPosition } = useTransition();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [localClickPosition, setLocalClickPosition] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    setLocalClickPosition({ x, y });
    setClickPosition({ x, y });
    setIsTransitioning(true);

    setTimeout(() => {
      router.push("/Login");
    }, 300);
  };

  return (
    <motion.div
      className={styles.container}
      onClick={handleClick}
      initial={{ clipPath: "circle(150% at 50% 50%)" }}
      animate={
        isTransitioning
          ? { clipPath: `circle(0% at ${localClickPosition.x}px ${localClickPosition.y}px)` }
          : { clipPath: `circle(150% at ${localClickPosition.x}px ${localClickPosition.y}px)` }
      }
      transition={{ duration: 0.3, ease: "easeInOut"}}
    >

      <div className={styles.overlay}>
        <h1 className={styles.title}>SMART LAB</h1>

        <p className={styles.continue}>
          Press anywhere on the screen to start your journey with us.
        </p>
      </div>

    </motion.div>
  );
}