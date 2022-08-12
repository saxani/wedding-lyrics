import React from 'react';
import{ AnimatePresence, motion } from 'framer-motion/dist/framer-motion';

const Letters = ({ lyrics, onComplete }) => {
    return (
        <AnimatePresence>
            {lyrics.map((item, index) => {
                if (index === lyrics.length-1) {
                    return (
                        <motion.span 
                            initial={{ opacity: 0, translateY: 10 }} 
                            animate={{ opacity: 1, translateY: 0 }} 
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            className='letter' 
                            key={index}
                            onAnimationComplete={ onComplete }
                        >
                            {item === ' ' ? `\u0020` : item}
                        </motion.span>
                    );
                }

                return (
                    <motion.span 
                        initial={{ opacity: 0, translateY: 10 }} 
                        animate={{ opacity: 1, translateY: 0 }} 
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2}}
                        className='letter' 
                        key={index}
                    >
                        {item === ' ' ? `\u0020` : item}
                    </motion.span>
                );
        
            })}
        </AnimatePresence>
    );
       
    
};
export default Letters;