import { AnimatePresence, motion } from "framer-motion";
import classes from "@/styles/modal.module.scss";

const backdropVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.2, // To delay the child animation
    },
  },
};

const modalVariant = {
  hidden: {
    y: "-100vh",
  },
  visible: {
    y: 0,
    transition: {
      type: "spring", // Transition type animation used is spring
      stiffness: 70, // Stiffness of spring
    },
  },
};

const Modal = props => {
  const { isOpen, setIsOpen } = props;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={classes['modal-backdrop']}
          variants={backdropVariant}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className={classes['modal-container']} variants={modalVariant}>
            {props.children}
            <motion.div
              whileHover={{ rotate: 45 }}
              className={classes['close']}
              onClick={() => setIsOpen(false)}
            >
              <div></div>
              <div></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
