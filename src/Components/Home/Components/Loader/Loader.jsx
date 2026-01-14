import React, { useEffect } from "react";
import Brandlogo from "../../assets/images/favicon.png";
import gsap from "gsap";
import { useMediaQuery } from "Components/Custom_hooks/Custom";
const Loader = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  useEffect(() => {
    gsap.to(".preloader__img-logo ", {
      transform:
        "translate3d(0, 0%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
      onComplete: () => {
        gsap.to(".preloader__img-logo ", {
          transform:
            "translate3d(0, -200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
          delay: 2,
        });
      },
    });
  });
  return (
    <div className="modals">
      <div style={{ display: "flex" }} className="preloader">
        <div className="preloader__content">
          <div>
            <div
              className="preloader__img-logo "
              style={{
                WebkitTransform:
                  "translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                MozTransform:
                  "translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                msTransform:
                  "translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
                transform:
                  "translate3d(0, 200%, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)",
              }}
            >
              <img
                src={Brandlogo}
                loading="eager"
                alt=""
                className=""
                style={{
                  scale: !isMobile ? "1.5" : "1",
                  marginLeft: !isMobile ? "20%" : "1%",
                }}
              />
              <h1 className="Brandtitle">RVGO – Reach the Victory</h1>
              {/* <h3 className="Brandtitle brandDiscription">Tailoring and Illuminating Futures</h3> */}
            </div>
          </div>
          <div className="overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
