import React from "react";
import "./Footer.css";
import logo from "../../images/logo.png";
import CustomButton from "../CustomComponents/CustomButton/CustomButton";
const Footer = () => {
  return (
    <>
      <div className="partition"></div>
      <div className="lastbox">
        <div className=" flogoContainer">
          <img src={logo} alt="logo" className="fLogoImage" />
          <span className="flogo">HELIOS</span>
        </div>
        <div className="disc1">A Digital Test Platform</div>
        <div style={{ display: "flex" }} className="logobox">
          <div className="facebookicon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#039be5"
                d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"
              ></path>
              <path
                fill="#fff"
                d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"
              ></path>
            </svg>
          </div>
          <div className="instagramicon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                cx="19.38"
                cy="42.035"
                r="44.899"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#fd5"></stop>
                <stop offset=".328" stop-color="#ff543f"></stop>
                <stop offset=".348" stop-color="#fc5245"></stop>
                <stop offset=".504" stop-color="#e64771"></stop>
                <stop offset=".643" stop-color="#d53e91"></stop>
                <stop offset=".761" stop-color="#cc39a4"></stop>
                <stop offset=".841" stop-color="#c837ab"></stop>
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              ></path>
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                cx="11.786"
                cy="5.54"
                r="29.813"
                gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#4168c9"></stop>
                <stop
                  offset=".999"
                  stop-color="#4168c9"
                  stop-opacity="0"
                ></stop>
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              ></path>
              <path
                fill="#fff"
                d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
              ></path>
              <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
              <path
                fill="#fff"
                d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
              ></path>
            </svg>
          </div>
          <div className="twittericon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="100"
              height="100"
              viewBox="0 0 48 48"
            >
              <path
                fill="#03a9f4"
                d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"
              ></path>
              <path
                fill="#fff"
                d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3	c-0.951,0.559-2.671,1.156-3.793,1.372C29.789,13.808,24,14.755,24,20v2c-4,0-7.9-3.047-10.327-6c-2.254,3.807,1.858,6.689,2.327,7	c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27	c0.626,1.935,3.773,2.958,5.928,3c-2.617,2.029-7.126,2.079-8,1.977c8.989,5.289,22.669,0.513,21.982-12.477	C34.95,18.818,35.342,18.104,36,17.12"
              ></path>
            </svg>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div className="f3">
            <ul>
              <li className="head">Our Features</li>
              <li>Best Quality</li>
              <li>Affordable</li>
              <li>Convenient</li>
              <li>Easy to use</li>
              <li>Best Results</li>
              <li>Focused Study</li>
            </ul>
            <ul>
              <li className="head">What We Provide</li>
              <li>one to one live classes</li>
              <li>Mock tests</li>
              <li>Practice Tests</li>
              <li>Advanced test analysis</li>
              <li>One to one monitoring</li>
              <li>Result driven plans</li>
            </ul>
          </div>
          <div className="f4">
            <ul>
              <li className="head">Our Features</li>
              <li>Best Quality</li>
              <li>Affordable</li>
              <li>Convenient</li>
              <li>Easy to use</li>
              <li>Best Results</li>
              <li>Focused Study</li>
            </ul>
            <ul>
              <li className="head">What We Provide</li>
              <li>one to one live classes</li>
              <li>Mock tests</li>
              <li>Practice Tests</li>
              <li>Advanced test analysis</li>
              <li>One to one monitoring</li>
              <li>Result driven plans</li>
            </ul>
          </div>
        </div>

        <div className="terms">*Terms and Conditions</div>
      </div>
    </>
  );
};

export default Footer;
