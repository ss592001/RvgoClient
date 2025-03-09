import React, { useEffect } from "react";
import Brandlogo from "../../assets/images/Helios_LOGO.png";
import bgblur1 from "../../assets/images/n.png";
import gsap from "gsap";

const Loader = () => {
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
          <div className="overflow-hidden">
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
              <img src={Brandlogo} loading="eager" alt="" className="" />
              <h2 className="Brandtitle ">HELIOS</h2>
            </div>
          </div>
          <div className="overflow-hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
