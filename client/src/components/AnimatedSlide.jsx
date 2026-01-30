import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

const AnimatedSlide = ({ children, slideKey }) => (
    <AnimatePresence mode="wait">
        <motion.div
            key={slideKey}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full w-full"
        >
            {children}
        </motion.div>
    </AnimatePresence>
);

export default AnimatedSlide;
