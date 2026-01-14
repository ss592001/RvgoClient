import React from "react";
import Brandlogo from "../../assets/images/Helios_LOGO.png";
import icoarrowright from "../../assets/images/ico_arrow-right.svg";
import icocheked from "../../assets/images/ico-cheked.svg";
import logocopyright from "../../assets/images/logo-copyright.svg";
import fb from "../../assets/images/fb.svg";
import lin from "../../assets/images/in.svg";
import inst from "../../assets/images/inst.svg";
import bgblur2 from "../../assets/images/bg_blur-02.svg";
import { useState } from "react";
import emailjs, { send } from "emailjs-com";
import { toast } from "react-toastify";
import "./Footer.css";
import { PostRoute } from "Components/Custom_hooks/Routes";
import { useMediaQuery } from "../../../Custom_hooks/Custom";
const Footer = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [sending,setSending]=useState(false)
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
  return (
    <>
      <footer className="section mod--footer">
        <div
          data-w-id="c2faefc5-6508-38a3-8cb4-a05433b3696a"
          className="content"
        >
          <div className="footer__columns mod--1">
            <div className="footer__col col--1">
              <a href="#" className="logo-link mod--footer w-inline-block">
                <div className="Brandtitle">RVGO</div>
              </a>
            </div>
            <div className="footer__col col--2">
              <div className="footer__heading-wrap">
                <h2 className="heading mod--footer">
                  Still have questions?
                  <br />
                </h2>
                <a
                  data-remodal-target="form"
                  data-anim="btn"
                  href="http://"
                  className="footer__link-talk w-inline-block"
                >
                  <div className="overflow-hidden">
                    <div className="overflow__anim">
                      <div
                        className="overflow__anim-txt mod--over mod--talk"
                        style={{ color: "gray" }}
                      >
                        Let’s talk.
                      </div>
                      <div
                        className="overflow__anim-txt"
                        style={{ color: "gray" }}
                      >
                        Let’s talk.
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="footer__columns mod--2">
            <div className="footer__col col--1">
              <div className="footer__form-wrap">
                <h1 style={{ fontWeight: "bolder" }}>Subscribe to newsleter</h1>
                <div className="from-block mod--subs w-form">
                  <form
                    id="wf-form-sender"
                    name="wf-form-sender"
                    data-name="sender"
                    method="get"
                    className="form"
                    aria-label="sender"
                  >
                    <input
                      style={{ width: !isMobile ? "20vw" : "90%" }}
                      type="email"
                      className="input mod--subs w-input"
                      maxLength={256}
                      name="email"
                      data-name="email"
                      placeholder="Email address"
                      id="email-4"
                      required=""
                    />
                    <div data-anim="btn-arrow" className="form__submit-wrap2">
                      <div className="form__submit-bg-square" />

                      <div
                        form-submitted="anim"
                        className="overflow-hidden mod--submit "
                      >
                        <div className="overflow__anim">
                          <img
                            loading="eager"
                            src={icoarrowright}
                            alt=""
                            className="overflow__anim-arrow mod--submit"
                          />
                          <img
                            loading="eager"
                            src={icoarrowright}
                            alt=""
                            className="overflow__anim-arrow mod--2 mod--submit"
                          />
                        </div>
                      </div>
                      <div className="form__submit-result-wrap">
                        <div
                          form-submitted="anim"
                          className="form__submit-result "
                        >
                          <img
                            src={icocheked}
                            loading="lazy"
                            alt=""
                            className="form__submit-result-ico"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div
                    className="w-form-done"
                    tabIndex={-1}
                    role="region"
                    aria-label="sender success"
                  >
                    <div>Thank you! Your submission has been received!</div>
                  </div>
                  <div
                    className="w-form-fail"
                    tabIndex={-1}
                    role="region"
                    aria-label="sender failure"
                  >
                    <div>
                      Oops! Something went wrong while submitting the form.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__col col--2">
              <div className="footer__nav-columns">
                <div className="footer__nav-col mod--1">
                  <h1 style={{ fontWeight: "bolder" }}>What We Provide ?</h1>
                  <div className="footer__grid">
                    <div
                      id="w-node-_12876181-4b13-d96c-de4d-cceb18652c6d-1b10fa2e"
                      className="footer__grid-block"
                    >
                      <div
                        href="#Shop"
                        data-anim="btn"
                        className="nav__link mod--footer w-inline-block"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow__anim">
                            <div className="overflow__anim-txt mod--over">
                              Personal Mentorship
                            </div>
                            <div className="overflow__anim-txt">
                              Personal Mentorship
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_3373777e-0061-fb7d-f761-e94940a42d40-1b10fa2e"
                      className="footer__grid-block"
                    >
                      <div
                        href="#Bestsellers"
                        data-anim="btn"
                        className="nav__link mod--footer w-inline-block"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow__anim">
                            <div className="overflow__anim-txt mod--over">
                              Digital Test Practice Platform
                            </div>
                            <div className="overflow__anim-txt">
                              Digital Test Practice Platform
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_1478bce9-b991-ebba-614a-f99441176a70-1b10fa2e"
                      className="footer__grid-block"
                    >
                      <div
                        href="#About"
                        data-anim="btn"
                        className="nav__link mod--footer w-inline-block"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow__anim">
                            <div className="overflow__anim-txt mod--over">
                              Access To Multiple Tests
                            </div>
                            <div className="overflow__anim-txt">
                              Access To Multiple Tests
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="w-node-_2dd566b5-8538-a0d4-abcb-ca6636ec3e1f-1b10fa2e"
                      className="footer__grid-block"
                    >
                      <div
                        data-remodal-target="form"
                        data-anim="btn"
                        href="#"
                        className="nav__link mod--footer w-inline-block"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow__anim">
                            <div className="overflow__anim-txt mod--over">
                              SAT Coachings
                            </div>
                            <div className="overflow__anim-txt">
                              SAT Coachings
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="footer__nav-col mod--2">
                  <h1 style={{ fontWeight: "bolder" }}>Contact Us</h1>
                  <div className="footer__grid">
                    <div className="from-block mod--subs w-form">
                      <div
                        href="#Shop"
                        data-anim="btn"
                        className="nav__link mod--footer w-inline-block"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow__anim">
                            <div
                              className="overflow__anim-txt"
                              style={{ width: !isMobile ? "100%" : "100%" }}
                            >
                              {isMobile ? (
                                <>
                                  For any query related to courses and digital
                                  platform contact us on info@rvgoprep.com or
                                  (+91) 8950608487 . You Can also fill out the
                                  contact us form.
                                </>
                              ) : (
                                <>
                                  <div>- info@rvgoprep.com</div>
                                  <div>- (+91)8950608487</div>
                                </>
                              )}
                              {isMobile && (
                                // <div class="background">
                                //   <div class="container">
                                <div class="screen" style={{ marginTop: "3%" }}>
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
                                        <span style={{ color: "#860d1c" }}>
                                          CONTACT
                                        </span>
                                        <span style={{ color: "#860d1c" }}>
                                          US
                                        </span>
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
                                            style={{
                                              color: "#860d1c",
                                            }}
                                          >
                                            SEND
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {isMobile && (
                                <div className="home__col col--2">
                                  <div className="hero__composition">
                                    <div className="hero__woman-wrap">
                                      {/* <div class="background">
                                        <div class="container">
                                          <div class="screen">
                                            <div
                                              class="screen-header"
                                              style={{
                                                backgroundColor: "#333f6b",
                                              }}
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
                                                borderBottomRightRadius:
                                                  "1.5vw",
                                              }}
                                            >
                                              <div class="screen-body-item left">
                                                <div class="app-title">
                                                  <span
                                                    style={{ color: "white" }}
                                                  >
                                                    CONTACT
                                                  </span>
                                                  <span
                                                    style={{ color: "white" }}
                                                  >
                                                    US
                                                  </span>
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
                                                        setName(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div class="app-form-group">
                                                    <input
                                                      class="app-form-control"
                                                      placeholder="EMAIL"
                                                      value={email}
                                                      onChange={(ev) => {
                                                        setEmail(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div class="app-form-group">
                                                    <input
                                                      class="app-form-control"
                                                      placeholder="CONTACT NO"
                                                      value={contactNumber}
                                                      onChange={(ev) => {
                                                        setContactNumber(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div class="app-form-group message">
                                                    <input
                                                      class="app-form-control"
                                                      placeholder="MESSAGE"
                                                      value={message}
                                                      onChange={(ev) => {
                                                        setMessage(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div
                                                    class="app-form-group buttons"
                                                    style={{ color: "#860d1c" }}
                                                  >
                                                    
                                                    <button
                                                      class="app-form-button"
                                                      onClick={submit}
                                                      style={{ color: "white" }}
                                                    >
                                                      SEND
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div> */}
                                      <div class="background">
                                        <div class="container">
                                          <div class="screen">
                                            <div
                                              class="screen-header"
                                              style={{
                                                backgroundColor: "#333f6b",
                                              }}
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
                                                borderBottomRightRadius:
                                                  "1.5vw",
                                              }}
                                            >
                                              <div class="screen-body-item left">
                                                <div class="app-title">
                                                  <span
                                                    style={{ color: "white" }}
                                                  >
                                                    CONTACT
                                                  </span>
                                                  <span
                                                    style={{ color: "white" }}
                                                  >
                                                    US
                                                  </span>
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
                                                        setName(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div class="app-form-group">
                                                    <input
                                                      class="app-form-control"
                                                      placeholder="EMAIL"
                                                      value={email}
                                                      onChange={(ev) => {
                                                        setEmail(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div class="app-form-group">
                                                    <input
                                                      class="app-form-control"
                                                      placeholder="CONTACT NO"
                                                      value={contactNumber}
                                                      onChange={(ev) => {
                                                        setContactNumber(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div class="app-form-group message">
                                                    <input
                                                      class="app-form-control"
                                                      placeholder="MESSAGE"
                                                      value={message}
                                                      onChange={(ev) => {
                                                        setMessage(
                                                          ev.target.value
                                                        );
                                                      }}
                                                    />
                                                  </div>
                                                  <div
                                                    class="app-form-group buttons"
                                                    style={{ color: "#860d1c" }}
                                                  >
                                                    <button
                                                      class="app-form-button"
                                                      onClick={submit}
                                                      style={{ color: "white" }}
                                                    >
                                                     {sending?'SENDING...':'SEND'}
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
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        href="#Shop"
                        data-anim="btn"
                        className="nav__link mod--footer w-inline-block"
                      >
                        <div className="overflow-hidden">
                          <div className="overflow__anim">
                            <div className="overflow__anim-txt mod--over">
                              1. support@rvgo.in
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
          <div className="footer__columns mod--3">
            <div className="footer__col col--1">
              <div className="footer__description">
                A platform for seamless SAT preparation with assessments and
                analytics.
              </div>
            </div>
            <div className="footer__col col--2">
              <div className="footer__nav-columns">
                <div className="footer__nav-col mod--1">
                  <a
                    href="http://halo-lab.com"
                    target="_blank"
                    className="footer__copyright-link w-inline-block"
                  >
                    <img
                      src={logocopyright}
                      loading="eager"
                      alt=""
                      className="footer__copyright-logo"
                    />
                    <div>
                      2025 rvgo <br />© All rights reserved
                    </div>
                  </a>
                </div>
                <div className="footer__nav-col mod--2">
                  <div className="footer__social">
                    <a
                      href=""
                      target="_blank"
                      className="footer__soc-link w-inline-block"
                    >
                      <img
                        src={fb}
                        loading="eager"
                        alt=""
                        className="footer__soc-img"
                      />
                    </a>

                    <a
                      href=""
                      target="_blank"
                      className="footer__soc-link w-inline-block"
                    >
                      <img
                        src={lin}
                        loading="eager"
                        alt=""
                        className="footer__soc-img"
                      />
                    </a>
                    <a
                      href=""
                      target="_blank"
                      className="footer__soc-link w-inline-block"
                    >
                      <img
                        src={inst}
                        loading="eager"
                        alt=""
                        className="footer__soc-img"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__follow-wrap"></div>
        <img src={bgblur2} loading="eager" alt="" className="footer__bg-blur" />
      </footer>
    </>
  );
};

export default Footer;
