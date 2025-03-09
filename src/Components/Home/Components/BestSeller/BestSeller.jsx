import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import bgblur1 from "../../assets/images/n.png";
import bg_noise from "../../assets/images/bg_noise.png";
import scrollmore from "../../assets/images/scroll-more.svg";
import icoarrowright from "../../assets/images/ico_arrow-right.svg";
import a from "../../assets/images/a.jpg";
import why1 from "../../assets/images/why1.jpg";
import why2 from "../../assets/images/206.jpg";
import why3 from "../../assets/images/why3.jpg";
import FlagAnimation from "../FlagAnimation/FlagAnimation";

const img_founder = "https://i.postimg.cc/90p9d7yM/demoimage.jpg";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
// import FlagAnimation from '../FlagAnimation/FlagAnimation';

const BestSeller = () => {
  const flagUrls = [a, why1, why2, why3];

  useEffect(() => {
    const isSmallScreen = window.matchMedia("(max-width: 576px)").matches;
    // Select all .parallax__block elements
    const parallaxBlocks = document.querySelectorAll(".parallax__block");
    const parallaxBlocksRight = document.querySelectorAll(
      ".parallax__block_right"
    );
    const parallaximg = document.querySelectorAll(".parallax__img");
    const parallax__columns = document.querySelectorAll(".parallax__columns");

    if (isSmallScreen) {
      gsap.to(parallaximg[0], {
        scrollTrigger: {
          trigger: parallax__columns, // Element to trigger the scroll
          scroller: "body",
          start: "top 80%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 90%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__img")[0]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__img")[0]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__img")[0]
              .classList.add("active");
          },
          onLeaveBack: () => {},
        },
      });
      gsap.to(parallaximg[1], {
        scrollTrigger: {
          trigger: parallax__columns, // Element to trigger the scroll
          scroller: "body",
          start: "top 35%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 45%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.add("active");
          },
          onLeave: () => {},
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.remove("active");
          },
        },
      });

      gsap.to(parallaxBlocks[0], {
        scrollTrigger: {
          trigger: parallax__columns, // Element to trigger the scroll
          scroller: "body",
          start: "top 80%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 90%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block")[0]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__block")[0]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block")[0]
              .classList.add("active");
          },
          onLeaveBack: () => {},
        },
      });
      gsap.to(parallaxBlocks[1], {
        scrollTrigger: {
          trigger: parallax__columns, // Element to trigger the scroll
          scroller: "body",
          start: "top 35%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 45%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.add("active");
          },
          onLeave: () => {},
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.remove("active");
          },
        },
      });
    } else {
      // Loop through each .parallax__block element and create a ScrollTrigger for it
      gsap.to(parallaxBlocks[0], {
        scrollTrigger: {
          trigger: ".parallax__block:nth-child(1)", // Element to trigger the scroll
          scroller: "body",
          start: "top 40%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 50%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block")[0]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__block")[0]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block")[0]
              .classList.add("active");
          },
          onLeaveBack: () => {},
        },
      });
      gsap.to(parallaximg[0], {
        scrollTrigger: {
          trigger: ".parallax__block:nth-child(1)", // Element to trigger the scroll
          scroller: "body",
          start: "top 40%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 50%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__img")[0]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__img")[0]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__img")[0]
              .classList.add("active");
          },
          onLeaveBack: () => {},
        },
      });
      gsap.to(parallaxBlocksRight[0], {
        scrollTrigger: {
          trigger: ".parallax__block_right:nth-child(1)", // Element to trigger the scroll
          scroller: "body",
          start: "top 40%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 65%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block_right")[0]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__block_right")[0]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block_right")[0]
              .classList.add("active");
          },
          onLeaveBack: () => {},
        },
      });
      gsap.to(parallaxBlocks[1], {
        scrollTrigger: {
          trigger: ".parallax__block:nth-child(2)", // Element to trigger the scroll
          scroller: "body",
          start: "top 110%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 95%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__block")[1]
              .classList.remove("active");
          },
        },
      });
      gsap.to(parallaximg[1], {
        scrollTrigger: {
          trigger: ".parallax__block:nth-child(2)", // Element to trigger the scroll
          scroller: "body",
          start: "top 110%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 95%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__img")[1]
              .classList.remove("active");
          },
        },
      });
      gsap.to(parallaxBlocksRight[1], {
        scrollTrigger: {
          trigger: ".parallax__block_right:nth-child(2)", // Element to trigger the scroll
          scroller: "body",
          start: "top 110%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 95%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block_right")[1]
              .classList.add("active");
          },
          onLeave: () => {
            document
              .querySelectorAll(".parallax__block_right")[1]
              .classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block_right")[1]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__block_right")[1]
              .classList.remove("active");
          },
        },
      });
      gsap.to(parallaxBlocks[2], {
        scrollTrigger: {
          trigger: ".parallax__block:nth-child(3)", // Element to trigger the scroll
          scroller: "body",
          start: "top 42%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 5%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block")[2]
              .classList.add("active");
          },
          onLeave: () => {
            // document.querySelectorAll(".parallax__block")[2].classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block")[2]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__block")[2]
              .classList.remove("active");
          },
        },
      });
      gsap.to(parallaximg[2], {
        scrollTrigger: {
          trigger: ".parallax__block:nth-child(3)", // Element to trigger the scroll
          scroller: "body",
          start: "top 42%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 5%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__img")[2]
              .classList.add("active");
          },
          onLeave: () => {
            // document.querySelectorAll(".parallax__img")[2].classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__img")[2]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__img")[2]
              .classList.remove("active");
          },
        },
      });
      gsap.to(parallaxBlocksRight[2], {
        scrollTrigger: {
          trigger: ".parallax__block_right:nth-child(3)", // Element to trigger the scroll
          scroller: "body",
          start: "top 42%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 5%", // End when the bottom of the element reaches the top of the viewport
          scrub: true, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          onEnter: () => {
            document
              .querySelectorAll(".parallax__block_right")[2]
              .classList.add("active");
          },
          onLeave: () => {
            // document.querySelectorAll(".parallax__block_right")[2].classList.remove("active");
          },
          onEnterBack: () => {
            document
              .querySelectorAll(".parallax__block_right")[2]
              .classList.add("active");
          },
          onLeaveBack: () => {
            document
              .querySelectorAll(".parallax__block_right")[2]
              .classList.remove("active");
          },
        },
      });

      gsap.to(".bg__blur-wrap.mod--3", {
        left: "16rem", // Set position when the element enters the trigger
        top: "50rem", // Set position when the element enters the trigger
        filter: "blur(100px)",
        scrollTrigger: {
          trigger: ".bg__blur-wrap.mod--3", // Element to trigger the scroll
          scroller: "body",
          start: "top -100%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom -120%", // End when the bottom of the element reaches the top of the viewport
          scrub: 5, // Smooth scrubbing effect
          // markers: true,  // Optional: for debugging
          // onEnter callback should execute the logic inside the function
        },
      });
    }
  }, []);
  return (
    <>
      <section
        id="Bestsellers"
        data-w-id="f7b3ecfb-14d2-fbe0-4487-0149fbffe79d"
        className="section mod--parallax"
      >
        <div className="content mod--parallax">
          <div
            data-w-id="5e7345f0-c6b3-3bd2-8f85-f272e0b90b0b"
            style={{ opacity: 1 }}
            className="parallax__content"
          >
            <div data-bgblur={2} className="bg__blur-wrap mod--3">
              <img
                src={bgblur1}
                loading="eager"
                alt=""
                className="bg__blur mod--3"
              />
            </div>
            <div className="parallax__columns">
              <img
                src={bg_noise}
                loading="lazy"
                sizes="(max-width: 991px) 63vw, 95vw"
                alt=""
                className="parallax__bg-noise"
              />
              <div
                data-anim-parallax-col="left"
                data-anim-parallax="elements"
                className="parallax__col col--1"
              >
                <div className="parallax__block active">
                  <div className="parallax__numb">№1</div>
                  <h3 className="heading">
                    Digital <br />
                    Education
                  </h3>
                  <div className="parallax__circle">
                    <img
                      src={scrollmore}
                      loading="lazy"
                      alt=""
                      className="parallax__circle-img"
                    />
                  </div>
                </div>

                <div className="parallax__block mod--other">
                  <div className="parallax__numb">№2</div>
                  <h3 className="heading">
                    Full <br />
                    Mentorship
                  </h3>
                  <div className="parallax__circle">
                    <img
                      src={scrollmore}
                      loading="lazy"
                      alt=""
                      className="parallax__circle-img"
                    />
                  </div>
                </div>

                <div className="parallax__block mod--other">
                  <div className="parallax__numb">№3</div>
                  <h3 className="heading">
                    Till Exam <br />
                    Revision
                  </h3>
                  <div className="parallax__circle">
                    <img
                      src={scrollmore}
                      loading="lazy"
                      alt=""
                      className="parallax__circle-img"
                    />
                  </div>
                </div>
              </div>
              <div className="parallax__col col--2">
                <div className="parallax__heading-wrap">
                  <h2 className="parallax__heading">
                    Why <br />
                    {/* <span className="parallax__heading-span">You Should</span>{" "} */}
                    <span
                      data-anim-parallax="elements"
                      className="parallax__heading-span"
                    >
                      <strong className="parallax__heading-strong active">
                        Choose
                      </strong>{" "}
                    </span>
                    <br />
                    Us
                  </h2>
                </div>
                <div
                  data-anim-parallax="elements"
                  className="parallax__img-wrap"
                >
                  <div id="canvas-flag-1" className="parallax__img active">
                    <div className="img-canvas w-embed">
                      <div className="flaganimation_wrapper">
                        {/* Render a flag animation for each image in the array */}
                        <FlagAnimation key={1} flagUrls={flagUrls} index={1} />
                      </div>
                    </div>
                  </div>
                  <div id="canvas-flag-2" className="parallax__img mod--other">
                    <div className="img-canvas w-embed">
                      <div className="flaganimation_wrapper">
                        {/* Render a flag animation for each image in the array */}
                        <FlagAnimation key={2} flagUrls={flagUrls} index={2} />
                      </div>
                    </div>
                  </div>
                  <div id="canvas-flag-3" className="parallax__img mod--other">
                    <div className="img-canvas w-embed">
                      <div className="flaganimation_wrapper">
                        {/* Render a flag animation for each image in the array */}
                        <FlagAnimation key={3} flagUrls={flagUrls} index={3} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                data-anim-parallax-col="right"
                data-anim-parallax="elements"
                className="parallax__col col--3"
              >
                <div className="parallax__block parallax__block_right active">
                  <h3 className="heading">
                    Digital <br />
                    Education
                  </h3>
                  <p>
                    online solution designed to create, administer, and evaluate
                    assessments efficiently, offering features like automated
                    grading, real-time analytics, and interactive question
                    formats. It enables seamless remote testing for education,
                    recruitment, and training purposes.
                  </p>
                  <div
                    sd=""
                    data-remodal-target=""
                    className="parallax__founder"
                  >
                    <a
                      data-remodal-target="form"
                      data-anim="btn-arrow"
                      href="#"
                      className="parallax__btn-more w-inline-block"
                    >
                      <div className="overflow-hidden">
                        <div className="overflow__anim">
                          <img
                            src={icoarrowright}
                            loading="eager"
                            alt=""
                            className="overflow__anim-arrow"
                          />
                          <img
                            src={icoarrowright}
                            loading="eager"
                            alt=""
                            className="overflow__anim-arrow mod--2"
                          />
                        </div>
                      </div>
                    </a>
                    <div className="parallax__founder-img-wrap">
                      <img
                        src={img_founder}
                        loading="lazy"
                        width={80}
                        alt=""
                        className="parallax__founder-img"
                      />
                    </div>
                    <h4 className="parallax__founder-text">
                      <span className="parallax__founder-title">
                        Achal Sharma
                        <strong className="parallax__founder-title-line">
                          &nbsp;
                        </strong>
                        <br />
                      </span>
                      <span className="parallax__founder-span">Founder</span>
                    </h4>
                  </div>
                </div>
                <div className="parallax__block parallax__block_right mod--other">
                  <h3 className="heading">
                    Full <br />
                    Mentorship
                  </h3>
                  <p>
                    Full mentorship provides personalized guidance and support,
                    helping individuals achieve their goals through tailored
                    advice, skill-building, and continuous feedback. It fosters
                    professional and personal growth by leveraging the mentor's
                    experience and expertise.
                  </p>
                  <div data-remodal-target="form" className="parallax__founder">
                    <a
                      data-remodal-target="form"
                      data-anim="btn-arrow"
                      href="#"
                      className="parallax__btn-more w-inline-block"
                    >
                      <div className="overflow-hidden">
                        <div className="overflow__anim">
                          <img
                            src={icoarrowright}
                            loading="eager"
                            alt=""
                            className="overflow__anim-arrow"
                          />
                          <img
                            src={icoarrowright}
                            loading="eager"
                            alt=""
                            className="overflow__anim-arrow mod--2"
                          />
                        </div>
                      </div>
                    </a>
                    <div className="parallax__founder-img-wrap">
                      <img
                        src={img_founder}
                        loading="lazy"
                        width={80}
                        alt=""
                        className="parallax__founder-img"
                      />
                    </div>
                    <h4 className="parallax__founder-text">
                      <span className="parallax__founder-title">
                        Achal Sharma
                        <strong className="parallax__founder-title-line">
                          &nbsp;
                        </strong>
                        <br />
                      </span>
                      <span className="parallax__founder-span">Founder</span>
                    </h4>
                  </div>
                </div>
                <div className="parallax__block parallax__block_right mod--other ">
                  <h3 className="heading">
                    Till Exam <br />
                    Revision
                  </h3>
                  <p>
                    Till-exam revision focuses on systematic and continuous
                    review of key concepts and topics up until the exam day. It
                    ensures thorough preparation by reinforcing understanding
                    and improving retention.
                  </p>
                  <div data-remodal-target="form" className="parallax__founder">
                    <a
                      data-remodal-target="form"
                      data-anim="btn-arrow"
                      href="#"
                      className="parallax__btn-more w-inline-block"
                    >
                      <div className="overflow-hidden">
                        <div className="overflow__anim">
                          <img
                            src={icoarrowright}
                            loading="eager"
                            alt=""
                            className="overflow__anim-arrow"
                          />
                          <img
                            src={icoarrowright}
                            loading="eager"
                            alt=""
                            className="overflow__anim-arrow mod--2"
                          />
                        </div>
                      </div>
                    </a>
                    <div className="parallax__founder-img-wrap">
                      <img
                        src={img_founder}
                        loading="lazy"
                        width={80}
                        alt=""
                        className="parallax__founder-img"
                      />
                    </div>
                    <h4 className="parallax__founder-text">
                      <span className="parallax__founder-title">
                        Achal sharma
                        <strong className="parallax__founder-title-line">
                          &nbsp;
                        </strong>
                        <br />
                      </span>
                      <span className="parallax__founder-span">Founder</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BestSeller;
