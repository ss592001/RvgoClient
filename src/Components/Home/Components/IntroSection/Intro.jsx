import React, { useEffect } from "react";
import ico_star from "../../assets/images/ico_star.svg";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Intro = () => {
  let mm = gsap.matchMedia();

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    mm.add("(min-width: 576px)", () => {
      gsap.to(".care__heading-wrap strong.heading__span-strong", {
        transform:
          "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        scrollTrigger: {
          trigger: ".mod--care", // Element to trigger the scroll
          scroller: "body",
          start: "top 65%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 0%", // End when the bottom of the element reaches the top of the viewport
          //   markers:true,
        },
      });
      gsap.to(".care__heading-star", {
        transform:
          "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
        opacity: 1,
        scrollTrigger: {
          trigger: ".mod--care", // Element to trigger the scroll
          scroller: "body",
          start: "top 65%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 0%", // End when the bottom of the element reaches the top of the viewport
          //   markers:true,
        },
      });
      gsap.to(".care__slide-title", {
        top: 0,
        scrollTrigger: {
          trigger: ".mod--care", // Element to trigger the scroll
          scroller: "body",
          start: "top 65%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 0%", // End when the bottom of the element reaches the top of the viewport
          //   markers:true,
        },
      });
      gsap.from(".ani-text", {
        transform: "translateY(8rem)",
        delay: 0.3,
        scrollTrigger: {
          trigger: ".mod--care", // Element to trigger the scroll
          scroller: "body",
          start: "top 68%", // Trigger when the top of the element reaches the center of the viewport
          end: "bottom 0%", // End when the bottom of the element reaches the top of the viewport
          //   markers:true,
        },
      });
    });
  });
  return (
    <>
      <section className="section mod--care" id="About">
        <div
          data-w-id="904e079f-3195-8349-049c-301b453106cc"
          className="content"
        >
          <div
            className="care__columns"
            style={{
              backgroundColor: "rgb(126, 23, 28,0.3)",
              borderRadius: ".7vw",
            }}
          >
            <div className="care__col col--1" style={{ opacity: 1 }}>
              <div className="care__heading-wrap" style={{ opacity: 1 }}>
                <img
                  src={ico_star}
                  loading="lazy"
                  style={{
                    transform:
                      "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(90deg) skew(0deg, 0deg)",
                    transformStyle: "preserve-3d",
                    opacity: "0",
                  }}
                  alt=""
                  className="care__heading-star"
                />
                <h3 className="heading mod--margin-0">
                  <span className="heading__span">
                    <strong
                      style={{
                        transform:
                          "translate3d(0px, 5rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                        transformStyle: "preserve-3d",
                      }}
                      className="heading__span-strong"
                    >
                      What we do?
                    </strong>
                  </span>{" "}
                  {/* <span className="heading__span">
                                        <strong
                                            style={{
                                                transform:
                                                    "translate3d(0px, 5rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                                                transformStyle: "preserve-3d"
                                            }}
                                            className="heading__span-strong"
                                        >
                                            the right body care.
                                        </strong>
                                    </span> */}
                </h3>
              </div>
              <br />
              <p className="ani-text">
                Over the last 4 years, Helios has emerged as the largest online
                test prep company in India offering exclusive one-on-one online
                prep for undergraduate studies abroad. Helios offers highly
                customised and personalised prep programs delivered as live
                one-on-one video calls. In order to ensure the most premium and
                personalised services, we keep the number of our clients to a
                minimum.
              </p>
            </div>
            <div className="care__col col--2" style={{ opacity: 1 }}>
              <div
                data-delay={4000}
                data-animation="outin"
                className="care__slider w-slider"
                data-autoplay="false"
                data-easing="ease"
                data-hide-arrows="false"
                data-disable-swipe="true"
                data-autoplay-limit={0}
                data-nav-spacing={3}
                data-duration={500}
                data-infinite="true"
                role="region"
                aria-label="carousel"
              >
                <div className="w-slider-mask" id="w-slider-mask-0">
                  <div
                    className="w-slide"
                    aria-label="1 of 3"
                    role="group"
                    style={{
                      transition: "all",
                      transform: "translateX(-964.8px)",
                      opacity: 1,
                      visibility: "hidden",
                    }}
                    aria-hidden="true"
                  >
                    <div className="care__slider-content" aria-hidden="true">
                      <div className="overflow-hidden" aria-hidden="true">
                        <h4
                          data-anim="elem"
                          data-w-id="7340a1ed-f222-afd2-d87c-23d1fb2f85b5"
                          style={{
                            transform:
                              "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            top: "2rem",
                          }}
                          className="care__slide-title active"
                          aria-hidden="true"
                        >
                          Care crystal salt
                        </h4>
                      </div>
                      <div className="overflow-hidden" aria-hidden="true">
                        <p
                          data-anim="elem"
                          data-w-id="98da5128-32d5-5170-2e89-b7097708f571"
                          style={{
                            transform:
                              "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            top: "10rem",
                          }}
                          className="care__p active"
                          aria-hidden="true"
                        >
                          Salt from the sea normalizes the activity of the
                          sebaceous glands, which helps to get rid of the oily.
                          Slow down, take a moment, and allow the restorative
                          effects of Fensea help create a stronger you.
                        </p>
                      </div>
                      <div
                        className="overflow-hidden mod--care-btn"
                        aria-hidden="true"
                      >
                        <a
                          data-remodal-target="form"
                          data-anim="btn"
                          data-w-id="c8fb09de-795b-5861-bcff-26c89e91e13d"
                          style={{
                            transform:
                              "translate3d(0px, 0rem, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                            transformStyle: "preserve-3d",
                            top: "2rem",
                          }}
                          href="#"
                          className="btn-link mod--care active w-inline-block"
                          tabIndex={-1}
                          aria-hidden="true"
                        >
                          <div className="overflow-hidden" aria-hidden="true">
                            <div className="overflow__anim" aria-hidden="true">
                              <div
                                className="overflow__anim-txt mod--over"
                                aria-hidden="true"
                              >
                                Read more
                              </div>
                              <div
                                className="overflow__anim-txt"
                                aria-hidden="true"
                              >
                                Read more
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-slide"
                    aria-label="2 of 3"
                    role="group"
                    style={{
                      transition: "all",
                      transform: "translateX(-964.8px)",
                      opacity: 1,
                      zIndex: 1,
                      visibility: "hidden",
                    }}
                    aria-hidden="true"
                  >
                    <div className="care__slider-content" aria-hidden="true">
                      <div className="overflow-hidden" aria-hidden="true">
                        <h4
                          data-anim="elem"
                          className="care__slide-title"
                          aria-hidden="true"
                          style={{ top: "2rem" }}
                        >
                          Persian Sapphire Blue Salt
                        </h4>
                      </div>
                      <div className="overflow-hidden" aria-hidden="true">
                        <p
                          data-anim="elem"
                          className="care__p"
                          aria-hidden="true"
                          style={{ top: "10rem" }}
                        >
                          The blue color of this Iranian salt comes from the
                          potassium ore called sylvinite. With only a few tons
                          extracted each year, Persian blue salt is one of the
                          rarest in the world.
                        </p>
                      </div>
                      <div
                        className="overflow-hidden mod--care-btn"
                        aria-hidden="true"
                      >
                        <a
                          data-remodal-target="form"
                          data-anim="btn"
                          href="http://"
                          className="btn-link mod--care w-inline-block"
                          tabIndex={-1}
                          aria-hidden="true"
                          style={{ top: "2rem" }}
                        >
                          <div className="overflow-hidden" aria-hidden="true">
                            <div className="overflow__anim" aria-hidden="true">
                              <div
                                className="overflow__anim-txt mod--over"
                                aria-hidden="true"
                              >
                                Read more
                              </div>
                              <div
                                className="overflow__anim-txt"
                                aria-hidden="true"
                              >
                                Read more
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-slide"
                    aria-label="3 of 3"
                    role="group"
                    style={{
                      transition: "all, opacity 250ms",
                      transform: "translateX(-964.8px)",
                      opacity: 1,
                      zIndex: 2,
                    }}
                  >
                    <div className="care__slider-content">
                      <div className="overflow-hidden">
                        <h4
                          data-anim="elem"
                          className="care__slide-title"
                          style={{ top: "5rem" }}
                        >
                          The current spectrum of offering includes,
                        </h4>
                      </div>
                      <div className="overflow-hidden ani-text">
                        <p
                          data-anim="elem"
                          className="care__p"
                          style={{ top: "0rem" }}
                        ></p>
                        <div style={{ marginBottom: "10px" }}>
                          SAT ACT AP Calculus AB & BC GCSE IGCSE IBDP AAHL
                        </div>
                        <ul className="offersList ">
                          <li>• 25 to 35 hours of live one-on-one classes.</li>
                          <li>• 10 to 15 hours of group classes.</li>
                          <li>
                            • Complete support for Math, Reading & Writing
                            sections.
                          </li>
                          <li>
                            • Personalised training with a team of 3 tutors per
                            student: each a domain expert.
                          </li>
                          <li>
                            • Comprehensive study material, including books,
                            assignments & test papers.
                          </li>
                          <li>• 18 Sectional Tests & 18 Full Mock Tests.</li>
                          <li>• 3 Live proctored mocks.</li>
                          <li>• Test Discussion & Review classes.</li>
                          <li>• The services of a Prep Manager.</li>
                          <li>• At least 2 online Parent-Tutor Meetings.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div
                    aria-live="off"
                    aria-atomic="true"
                    className="w-slider-aria-label"
                    data-wf-ignore=""
                  >
                    Slide 3 of 3.
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

export default Intro;
