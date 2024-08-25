import { motion } from "framer-motion";

export default function Icon({ children, text, onClick }) {
  return (
    <motion.li
      className="mt-5 flex justify-center items-center flex-col text-bgPrimary cursor-pointer"
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      {children}
      <p>{text}</p>
    </motion.li>
  );
}
