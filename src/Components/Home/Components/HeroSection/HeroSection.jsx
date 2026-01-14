import React, { useEffect, useRef, useState } from "react";
import FlagAnimation from "../FlagAnimation/FlagAnimation";
import { gsap } from "gsap";
import Brandlogo from "../../assets/images/favicon.png";

import bgstar from "../../assets/images/bg_star.svg";
// import crystal_hero from "../../assets/images/c.png"
import crystal_hero from "../../assets/images/obj.png";
import bg_sticker from "../../assets/images/bg_sticker.jpg";
import icocheked from "../../assets/images/ico-cheked.svg";
import a from "../../assets/images/why2.jpg";
import { useNavigate } from "react-router";
import emailjs, { send } from "emailjs-com";
import { toast } from "react-toastify";
import { PostRoute } from "Components/Custom_hooks/Routes";

const HeroSection = () => {
  const navigate = useNavigate();
  const flagUrls = [a];
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const submit = () => {
    if (name === "" || contactNumber === "" || email === "" || message === "") {
      return toast.error("Error!! Please fillout the complete form .");
    }
    const bodyData = {
      name: name,
      email: email,
      phone: contactNumber,
      desc: message,
    };
    PostRoute(
      "sendEmail",
      () => {
        setSending(true);
      },
      (res) => {
        setSending(false);
        setName("");
        setEmail("");
        setContactNumber("");
        setMessage("");
        toast.success(
          "Data submitted successfully. Our offical will contact you soon...."
        );
      },
      bodyData
    );
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
                  {/* <div className="Brandtitle brandlogoTop">RVGO</div> */}
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
                          {/* <div className="overflow__anim-txt mod--over navItems ">
                            About
                          </div> */}
                          <div className="overflow__anim-txt navItems ">
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
                          {/* <div className="overflow__anim-txt mod--over navItems">
                            Why Choose Us
                          </div> */}
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
                          {/* <div className="overflow__anim-txt mod--over navItems">
                            Testimonials
                          </div> */}
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
                    style={{ color: "#101734" }}
                  >
                    RVGO
                  </strong>
                </span>{" "}
                <span className="heading__span">
                  <strong
                    style={{
                      fontSize: "12vw",
                      marginBottom: "2vh",
                      color: "#101734",
                    }}
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  >
                    RVGO
                  </strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                    style={{ color: "#333f6b" }}
                  >
                    Affordable and Customized
                    {/* Top Scores */}
                  </strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                    style={{ color: "#333f6b" }}
                  >
                    {/* Start with the */}
                    Learning – Your Path to Victory
                  </strong>
                </span>{" "}
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                    style={{ color: "#333f6b" }}
                  >
                    {/* Right Preparation */}
                  </strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong
                    className={`${
                      hasLoaded ? "slideup" : ""
                    } heading__span-strong mod--home`}
                  ></strong>
                </span>
              </h1>
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
                        <div
                          class="screen-header"
                          style={{ backgroundColor: "#333f6b" }}
                        >
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
                        <div
                          class="screen-body"
                          style={{
                            backgroundColor: "#101734",
                            borderBottomLeftRadius: "1.5vw",
                            borderBottomRightRadius: "1.5vw",
                          }}
                        >
                          <div class="screen-body-item left">
                            <div class="app-title">
                              <span style={{ color: "white" }}>CONTACT</span>
                              <span style={{ color: "white" }}>US</span>
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
                                  style={{ color: "white" }}
                                >
                                  {sending ? "SENDING..." : "SEND"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <a className="call" href="tel:+918950608487">
        <img
          width="67"
          height="67"
          src="https://img.icons8.com/external-others-inmotus-design/67/external-Call-phone-operations-and-functions-others-inmotus-design-3.png"
          alt="external-Call-phone-operations-and-functions-others-inmotus-design-3"
        />
      </a>
      <a
        className="whatsapp"
        href="https://wa.me/918950608487?text=Hello%20I%20would%20like%20to%20connect"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#fff"
            d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
          ></path>
          <path
            fill="#fff"
            d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
          ></path>
          <path
            fill="#cfd8dc"
            d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
          ></path>
          <path
            fill="#40c351"
            d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
          ></path>
          <path
            fill="#fff"
            fill-rule="evenodd"
            d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </>
  );
};

export default HeroSection;
