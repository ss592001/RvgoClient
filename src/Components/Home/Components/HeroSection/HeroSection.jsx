import React, { useEffect, useRef, useState } from "react";
import FlagAnimation from "../FlagAnimation/FlagAnimation";
import { gsap } from "gsap";
import Brandlogo from "../../assets/images/Helios_LOGO.png";

import bgstar from "../../assets/images/bg_star.svg";
// import crystal_hero from "../../assets/images/c.png"
import crystal_hero from "../../assets/images/obj.png";
import bg_sticker from "../../assets/images/bg_sticker.jpg";
import icocheked from "../../assets/images/ico-cheked.svg";
import a from "../../assets/images/why2.jpg";
import { useNavigate } from "react-router";
import emailjs, { send } from "emailjs-com";
import { toast } from "react-toastify";

const HeroSection = () => {
  const navigate = useNavigate();
  const flagUrls = [a];
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = () => {
    if (name === "" || contactNumber === "" || email === "" || message === "") {
      return toast.error("Error!! Please fillout the complete form .");
    }
    const to = "info@heliosprep.in";
    // const to = email.toLowerCase();
    const subject = "New Enquery For Helios";

    const serviceId = "service_xlhg6gu";
    const templateId = "template_z8wvcsj";
    const api = "-e3QTwnjEurEt2MLT";

    emailjs
      .send(
        serviceId,
        templateId,
        { name, email, contactNumber, to, subject, message },
        api
      )
      .then((response) => {
        setName("");
        setContactNumber("");
        setMessage("");
        setEmail("");
        toast.success(
          "Data submitted successfully. Our offical will contact you soon...."
        );
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Error !! Please try again.");
      });
  };

  const starWrapRef = useRef(null);
  const womanWrapRef = useRef(null);
  const crystalRef = useRef(null);
  const stickerWrapRef = useRef(null);

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(true); // Set state to true to add the class
    const handleMouseMove = (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;

      const offsetX = (mouseX - centerX) / centerX;
      const offsetY = (mouseY - centerY) / centerY;

      // Move the elements in the opposite direction of the mouse
      gsap.to(starWrapRef.current, {
        x: -offsetX * 10,
        y: -offsetY * 10,
        ease: "power3.out",
      });

      gsap.to(womanWrapRef.current, {
        x: -offsetX * 10,
        y: -offsetY * 10,
        ease: "power3.out",
      });

      gsap.to(crystalRef.current, {
        x: offsetX * 15,
        y: offsetY * 15,
        ease: "power3.out",
      });

      gsap.to(stickerWrapRef.current, {
        x: -offsetX * 5,
        y: -offsetY * 5,
        ease: "power3.out",
      });
    };

    // Attach mousemove event listener
    window.addEventListener("mousemove", handleMouseMove);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
      <section
        data-w-id="9a8c8c5e-18d4-aeb9-bc37-bac71fe0745b"
        className="section mod--hero"
      >
        <header className="header">
          <header className="section mod--header">
            <div className="content">
              <div className="header__columns">
                <div
                  className={`${
                    hasLoaded ? "slideup" : ""
                  } header__col  col--1`}
                >
                  {/* <a href="#" className="logo-link mod--header w-inline-block"> */}
                  <img
                    src={Brandlogo}
                    loading="lazy"
                    alt=""
                    className="logo "
                  />
                  {/* </a> */}
                </div>
                <div
                  className={`${
                    hasLoaded ? "slideup" : ""
                  } header__col  col--2`}
                >
                  <nav className="header__nav">
                    <a
                      href="#About"
                      data-anim="btn"
                      className="nav__link mod--header w-inline-block"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="overflow-hidden">
                        <div className="overflow__anim">
                          <div className="overflow__anim-txt mod--over navItems">
                            About
                          </div>
                          <div className="overflow__anim-txt navItems">
                            About
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="#Bestsellers"
                      data-anim="btn"
                      className="nav__link mod--header w-inline-block"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="overflow-hidden">
                        <div className="overflow__anim">
                          <div className="overflow__anim-txt mod--over navItems">
                            Why Choose Us
                          </div>
                          <div className="overflow__anim-txt navItems">
                            Why Choose Us
                          </div>
                        </div>
                      </div>
                    </a>
                    <a
                      href="#Shop"
                      data-anim="btn"
                      className="nav__link mod--header w-inline-block"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="overflow-hidden">
                        <div className="overflow__anim">
                          <div className="overflow__anim-txt mod--over navItems">
                            Testimonials
                          </div>
                          <div className="overflow__anim-txt navItems">
                            Testimonials
                          </div>
                        </div>
                      </div>
                    </a>
                  </nav>
                </div>
                <div
                  className={`${
                    hasLoaded ? "slideup" : ""
                  } header__col  col--3`}
                >
                  <a
                    data-remodal-target="form"
                    href="/auth"
                    className="header__link-cart loginBtn"
                    style={{ textDecoration: "none" }}
                  >
                    Login
                    {/* <span className="header__link-cart-bracket mod--1"></span> */}
                  </a>
                </div>
              </div>
            </div>
          </header>
        </header>
        <div className="content">
          <div className="home__columns">
            <div className="home__col col--1">
              <h1 className="heading1">
                <span className="heading__span" style={{ display: "none" }}>
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    HELIOS
                  </strong>
                </span>{" "}
                <span className="heading__span">
                  <strong
                    style={{ fontSize: "12vw", marginBottom: "2vh" }}
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    HELIOS
                  </strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    Tailoring
                  </strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    and
                  </strong>
                </span>{" "}
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    Illuminating
                  </strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    Futures
                  </strong>
                </span>
              </h1>

              {/* <div
                className={`${
                  hasLoaded ? "slideinup delay" : ""
                } form-block mod--home w-form`}
              >
                <form
                  id="wf-form-Hero"
                  name="wf-form-Hero"
                  data-name="Hero"
                  method="get"
                  className="form"
                >
                  <label htmlFor="email" className="label">
                    GET THE CATALOGUE
                  </label>
                  <div className="input-wrap">
                    <input
                      type="email"
                      className="input mod--hero sp_push_custom_data w-input"
                      maxLength={256}
                      name="email"
                      data-name="email"
                      placeholder="Enter your e-mail"
                      id="email-5"
                      required=""
                    />
                    <div data-anim="btn" className="form__submit-wrap">
                      <div
                        form-submitted="anim"
                        className="overflow-hidden mod--submit "
                      >
                        <div className="overflow__anim">
                          <div className="overflow__anim-txt mod--over">
                            Sign Up
                          </div>
                          <div className="overflow__anim-txt">Sign Up</div>
                        </div>
                      </div>
                      <div className="form__submit-result-wrap mod--hero">
                        <div
                          form-submitted="anim"
                          className="form__submit-result mod--hero "
                        >
                          <img
                            src={icocheked}
                            loading="lazy"
                            alt=""
                            className="form__submit-result-ico mod--hero"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div> */}
            </div>
            <div className="home__col col--2">
              <div className="hero__composition">
                <div ref={starWrapRef} className="hero__star-wrap">
                  <img
                    src={bgstar}
                    loading="lazy"
                    alt="Star"
                    className="hero__star"
                  />
                </div>
                <div ref={womanWrapRef} className="hero__woman-wrap">
                  <div class="background">
                    <div class="container">
                      <div class="screen">
                        <div class="screen-header">
                          <div class="screen-header-left">
                            <div class="screen-header-button close"></div>
                            <div class="screen-header-button maximize"></div>
                            <div class="screen-header-button minimize"></div>
                          </div>
                          <div class="screen-header-right">
                            <div class="screen-header-ellipsis"></div>
                            <div class="screen-header-ellipsis"></div>
                            <div class="screen-header-ellipsis"></div>
                          </div>
                        </div>
                        <div class="screen-body">
                          <div class="screen-body-item left">
                            <div class="app-title">
                              <span style={{ color: "#860d1c" }}>CONTACT</span>
                              <span style={{ color: "#860d1c" }}>US</span>
                            </div>
                            <div class="app-contact">
                              Be a part of our institute
                            </div>
                          </div>
                          <div class="screen-body-item">
                            <div class="app-form">
                              <div class="app-form-group">
                                <input
                                  class="app-form-control"
                                  placeholder="NAME"
                                  value={name}
                                  onChange={(ev) => {
                                    setName(ev.target.value);
                                  }}
                                />
                              </div>
                              <div class="app-form-group">
                                <input
                                  class="app-form-control"
                                  placeholder="EMAIL"
                                  value={email}
                                  onChange={(ev) => {
                                    setEmail(ev.target.value);
                                  }}
                                />
                              </div>
                              <div class="app-form-group">
                                <input
                                  class="app-form-control"
                                  placeholder="CONTACT NO"
                                  value={contactNumber}
                                  onChange={(ev) => {
                                    setContactNumber(ev.target.value);
                                  }}
                                />
                              </div>
                              <div class="app-form-group message">
                                <input
                                  class="app-form-control"
                                  placeholder="MESSAGE"
                                  value={message}
                                  onChange={(ev) => {
                                    setMessage(ev.target.value);
                                  }}
                                />
                              </div>
                              <div
                                class="app-form-group buttons"
                                style={{ color: "#860d1c" }}
                              >
                                {/* <button class="app-form-button">CANCEL</button> */}
                                <button
                                  class="app-form-button"
                                  onClick={submit}
                                  style={{ color: "#860d1c" }}
                                >
                                  SEND
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="flaganimation_wrapper">
                  
                    <FlagAnimation key={0} flagUrls={flagUrls} index={0} />
                  </div>
                  <img
                    ref={crystalRef}
                    src={crystal_hero}
                    loading="eager"
                    alt="Crystal"
                    className="hero__crystal"
                  />
                  <div ref={stickerWrapRef} className="hero__sticker-wrap">
                    <a href="#" className="hero__sticker w-inline-block">
                      <img
                        src={bg_sticker}
                        loading="eager"
                        alt="Sticker"
                        className="hero__sticker-bg"
                      />
                      <div>NEW!</div>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
