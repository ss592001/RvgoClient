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
      <section
        className="section mod--care"
        id="About"
        // style={{ backgroundColor: "#333f6b" }}
      >
        <div
          data-w-id="904e079f-3195-8349-049c-301b453106cc"
          className="content"
        >
          <div
            className="care__columns"
            style={{
              backgroundColor: "#333f6b",
              borderRadius: "1vw",
              boxShadow: "2px 2px 10px 5px gray",
            }}
          >
            <div
              className="care__col col--1"
              style={{ opacity: 1, color: "white" }}
            >
              <div
                className="care__heading-wrap"
                style={{ opacity: 1, color: "white" }}
              >
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
                      What we do and our experience-
                    </strong>
                  </span>{" "}
                </h3>
              </div>
              <br />
              <p className="ani-text">
                RV Go is an innovative online test preparation platform
                dedicated to providing affordable, customized, and effective
                learning solutions for students preparing for the SAT, ACT,
                AP’s, AMC, IB Curriculum, GCSE (AQA & Edexcel Board), KS 2 to KS
                15, ISEE, UK SATs, IGCSE, CBSE, ICSE, State Board exams. With a
                focus on personalized one-on-one tutoring, RV Go ensures that
                each student receives tailored guidance that aligns with their
                individual learning style, strengths, and goals.
                <br />
                At RV Go, we believe that every student has the potential to
                succeed, and we make that success attainable by offering highly
                flexible and interactive tutoring sessions. Whether students are
                aiming for top-tier universities abroad or striving for academic
                excellence in their home country, our mission is to guide them
                every step of the way.
                <br />
                <br />• Personalized one-on-one tutoring.
                <br />
                • Live video calls with expert tutors to ensure direct
                engagement and real-time feedback.
                <br />
                • Comprehensive study materials, including practice tests,
                assignments, and mock exams.
                <br />
                • Affordable pricing without compromising on the quality of
                service.
                <br />
                • Customized lesson plans that are specifically designed to
                address the unique needs of each student.
                <br />
                • Dedicated prep manager to provide ongoing support and monitor
                progress.
                <br />
                • Interactive online classroom sessions, ensuring students have
                access to group discussions and peer learning.
                <br />
                • Progress tracking through periodic reviews, sectional tests,
                and mock exams to ensure measurable improvement.
                <br />
                <br />
                <br />
                At RV Go, our goal is simple: to make learning accessible,
                effective, and affordable, while ensuring each student reaches
                their highest potential. With a combination of personalized
                tutoring and a proven test prep strategy, RV Go is the perfect
                partner for students aiming for success in their standardized
                exams.
              </p>
            </div>
            {/* <div
              className="care__col col--2"
              style={{ opacity: 1, color: "white" }}
            >
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
                          At RV Go, we believe that every student has the
                          potential to succeed, and we make that success
                          attainable by offering highly flexible and interactive
                          tutoring sessions. Whether students are aiming for
                          top-tier universities abroad or striving for academic
                          excellence in their home country, our mission is to
                          guide them every step of the way.
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
                          At RV Go, we believe that every student has the
                          potential to succeed, and we make that success
                          attainable by offering highly flexible and interactive
                          tutoring sessions. Whether students are aiming for
                          top-tier universities abroad or striving for academic
                          excellence in their home country, our mission is to
                          guide them every step of the way.
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
                    <div
                      className="care__slider-content"
                      style={{ width: "100%" }}
                    >
                      <div className="overflow-hidden ani-text">
                        <h2
                          data-anim="elem"
                          className="care__slide-title active "
                          style={{ top: "5rem", fontSize: "2vw" }}
                        >
                          The current spectrum of offering includes,
                        </h2>
                      </div>
                      <div className="overflow-hidden ani-text">
                        <p
                          data-anim="elem"
                          className="care__p"
                          // style={{ top: "0rem" }}
                        ></p>
                        <ul className="offersList ">
                          <li>
                            • SAT ACT AP Calculus AB & BC GCSE IGCSE IBDP AAHL
                          </li>
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
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
