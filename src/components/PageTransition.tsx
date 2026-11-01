import React from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PageTransitionProps {
  children: React.ReactElement;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    filter: 'blur(6px)',
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        onAnimationComplete={() => {
          ScrollTrigger.refresh();
        }}
        className="w-full flex-1 min-h-[calc(100vh-80px)] flex flex-col will-change-[opacity,transform,filter]"
      >
        {React.cloneElement(children, { location, key: location.pathname })}
      </motion.div>
    </AnimatePresence>
  );
};

