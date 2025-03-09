import { useState, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgblurhero1 from "../../assets/images/n.png"
import bgblurhero2 from "../../assets/images/bg_blur-hero-02.svg"
import bgblurhero3 from "../../assets/images/bg_blur-hero-03.svg"
import bgblur1 from "../../assets/images/bg_blur-01.svg"
import bgblur2 from "../../assets/images/bg_blur-02.svg"
import bgblur3 from "../../assets/images/bg_blur-03.svg"

const BgAnimation = () => {

    // Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

useEffect(() => {

    // GSAP animation with ScrollTrigger
    gsap.to(".scroll__content", {
      left: "60rem",
      top: "60rem",
      scrollTrigger: {
        trigger: ".scroll__content",  // Element to trigger the scroll
        scroller: "body",
        start: "top -10%",  // Trigger when the top of the element reaches the center of the viewport
        end: "bottom -100%",  // End when the bottom of the element reaches the top of the viewport
        scrub: true,  // Smooth scrubbing effect
      },
    });
  }, []);
  return (
    <div className="scroll">
        <div className="content mod--scroll">
          <div className="scroll__content">
            <div className="scroll__bg-wrap active">
              <div className="scroll__bg-hero-wrap mod--1">
                <img
                  src={bgblurhero1}
                  loading="eager"
                  alt=""
                  className="scroll__bg mod--hero mod--1"
                />
              </div>
              <div className="scroll__bg-hero-wrap mod--2">
                <img
                  src={bgblurhero2}
                  loading="eager"
                  alt=""
                  className="scroll__bg mod--hero mod--2"
                />
              </div>
              <div className="scroll__bg-hero-wrap mod--3">
                <img
                  src={bgblurhero3}
                  loading="eager"
                  alt=""
                  className="scroll__bg mod--hero mod--3"
                />
              </div>
            </div>
            <div className="scroll__bg-wrap">
              <img
                src={bgblur2}
                loading="eager"
                alt=""
                className="scroll__bg mod--2"
              />
            </div>
            <div className="scroll__bg-wrap">
              <img
                src={bgblur3}
                loading="eager"
                alt=""
                className="scroll__bg mod--4"
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default BgAnimation