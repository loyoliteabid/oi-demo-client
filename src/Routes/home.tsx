import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  // Scroll to the graph section
  const scrollToGraph = () => {
    navigate("/chart");
  };

  return (
    <div className="min-h-screen flex flex-col items-start gap-5">
      <div className="h-screen flex flex-col lg:flex-row justify-center items-center mx-auto gap-12 lg:gap-16 p-5">
        <div>
          {/* Logo Animation */}
          <motion.div
            id="logo"
            className="bg-primary rounded-full h-28 md:h-32 lg:h-36 w-28 md:w-32 lg:w-36 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8, rotateY: -180 }} // Start with a flipped logo and small scale
            animate={{ opacity: 1, scale: 1, rotateY: 0 }} // End in normal position with full opacity
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 25,
              duration: 1,
            }} // Smoother spring transition
          >
            <p className="text-black font-inter font-bold text-5xl md:text-6xl lg:text-7xl leading-10 tracking-widest">
              OI
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col gap-5 lg:gap-10 text-center lg:text-start">
          {/* Text Fade-in Animation */}
          <motion.div
            className="flex font-inter text-primary flex-col items-center gap-14 uppercase font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl"
            initial={{ opacity: 0 }} // Start with invisible text
            animate={{ opacity: 1 }} // Fade in the text
            transition={{ delay: 0.5, duration: 1 }} // Slight delay to sync with the logo animation
          >
            oi data visualization
          </motion.div>

          <motion.div
            className="flex flex-wrap text-xl md:text-3xl lg:text-3xl font-inter font-bold leading-10 tracking-tight uppercase max-w-[380px]"
            initial={{ opacity: 0 }} // Start with invisible text
            animate={{ opacity: 1 }} // Fade in the text
            transition={{ delay: 1, duration: 1 }} // Delay to appear after the first text
          >
            Graphical representation of air quality data
          </motion.div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToGraph}
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }} // Bouncing effect
        transition={{ duration: 1, repeat: Infinity, repeatType: "loop" }}
      >
        <div className="text-4xl text-primary">↓</div> {/* Down Arrow Icon */}
      </motion.div>
    </div>
  );
};

export default HomePage;
