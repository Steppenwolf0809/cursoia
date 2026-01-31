import { motion, AnimatePresence } from 'framer-motion';

const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
};

const AnimatedSlide = ({ children, slideKey }) => {
    // Temporarily removed AnimatePresence due to crash
    return (
        <div key={slideKey} className="h-full w-full animate-in fade-in duration-500">
            {children}
        </div>
    );
};

export default AnimatedSlide;
