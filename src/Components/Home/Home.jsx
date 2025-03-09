import { useState, useEffect } from "react";
import "./Home.css";
import HeroSection from "./Components/HeroSection/HeroSection";
import SmoothScroll from "smooth-scroll"; // Import smooth-scroll library
import BestSeller from "./Components/BestSeller/BestSeller";
import Shop from "./Components/Shop/Shop";
import Footer from "./Components/Footer/Footer";
import Intro from "./Components/IntroSection/Intro";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "./Components/Loader/Loader";
import BgAnimation from "./Components/BgAnimation/BgAnimation";
import Achivers from "./Components/Achivers/Achivers";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Initialize SmoothScroll
    const scroll = new SmoothScroll('a[href*="#"]', {
      animationTime: 800, // [ms] Duration of scroll animation
      stepSize: 100, // [px] Amount of scroll per "step"
      accelerationDelta: 50, // [px] Speed up after scrolling this many pixels
      accelerationMax: 3, // Maximum acceleration
      touchpadSupport: false, // Disable smooth scrolling on touchpads
    });

    // GSAP animation for hiding modals (loader)
    gsap.to(".modals", {
      opacity: 0,
      display: "none",
      delay: 1.5,
      onComplete: () => {
        setIsLoading(false); // Hide loader by setting isLoading to false
      },
    });

    // Cleanup function to destroy the SmoothScroll instance when the component unmounts
    return () => {
      scroll.destroy();
    };
  }, []); // Empty dependency array ensures this effect runs only once after the component mounts

  return (
    <>
      {/* Render Loader until isLoading is true */}
      {isLoading && <Loader />}

      {/* Render the rest of the components only when isLoading is false */}
      {!isLoading && (
        <>
          <BgAnimation />
          <HeroSection />
          <Intro />
          <BestSeller />
          <Shop />
          <Achivers />
          <Footer />
        </>
      )}
    </>
  );
}

export default Home;
