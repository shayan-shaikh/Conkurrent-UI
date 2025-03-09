import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { teamMembers } from "../../constants/constants";


const AboutUs = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Adjust for responsiveness
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="aboutus">
    <div className="min-h-[50vh] bg-gray-900 flex flex-col items-center justify-center px-4 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-white mb-8"
      >
        Meet Our Team
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-4xl"
      >
        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer text-center">
                <motion.img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-white/20"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                />
                <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                <p className="text-sm text-gray-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </div>
    </section>
  );
};

export default AboutUs;
