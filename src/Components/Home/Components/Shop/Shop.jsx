import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Navigation } from 'swiper/modules';


import icoarrowright from "../../assets/images/ico_arrow-right.svg"
import bg_noise from "../../assets/images/bg_noise.png"
import bgblur3 from "../../assets/images/bg_blur-03.svg"
import demo1 from "../../assets/images/test1.jpeg"
import demo2 from "../../assets/images/test2.jpeg"
import demo3 from "../../assets/images/test3.jpeg"



const Shop = () => {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  const [swiperNavigation, setSwiperNavigation] = useState({
    prevEl: null,
    nextEl: null
  });

  useEffect(() => {
    // Set the navigation refs after component is mounted
    setSwiperNavigation({
      prevEl: navigationPrevRef.current,
      nextEl: navigationNextRef.current
    });
  }, []);

  return (
    <>
      <section id="Shop" className="section">
        <div className="content">
          <div className="product__columns">
            <div className="product__col mod--1">
              <h2 className="heading">
                <span className="heading__span">
                  <strong className="heading__span-strong">What</strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong className="heading__span-strong">People</strong>
                </span>{" "}
                <br />
                <span className="heading__span">
                  <strong className="heading__span-strong">Say</strong>
                </span>
              </h2>
              <div className="product__nav">
                <div data-anim="btn-arrow" data-swiper="prev-product" className="product__nav-btn mod--prev" tabIndex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-e104983c66f8b7969" ref={navigationPrevRef}><div className="overflow-hidden"><div className="overflow__anim"><img src={icoarrowright} loading="eager" alt="" className="overflow__anim-arrow" /><img src={icoarrowright} loading="eager" alt="" className="overflow__anim-arrow mod--2" /></div></div></div>


                <div data-anim="btn-arrow" data-swiper="next-product" className="product__nav-btn" tabIndex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-dae11eddf5a3faf0" ref={navigationNextRef}>
                  <div className="overflow-hidden">
                    <div className="overflow__anim"><img src={icoarrowright} loading="eager" alt="" className="overflow__anim-arrow" /><img src={icoarrowright} loading="eager" alt="" className="overflow__anim-arrow mod--2" /></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Swiper Section */}
            <div className="product__col col--2">
              <Swiper
                spaceBetween={0}
                loop={true}
                navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
                }}
                modules={[Navigation]}
                breakpoints={{
                  1024: {
                    slidesPerView: 3,  // 1 slide per view for screens smaller than 768px
                  },
                  768: {
                    slidesPerView: 1,  // 1 slide per view for screens smaller than 768px
                  },
                }}
                className="mySwiper"
              >
                <SwiperSlide>

                  <div className="testimonial-box d-flex">
                    <div
                      className="user-img"
                      style={{ backgroundImage: `url(${demo1})` }}
                    ></div>
                    <div className="text pl-4">
                      <span className="quote">
                        <i className="fa fa-quote-left" />
                      </span>
                      <p>
                      Helios was incredibly helpful for my ISEE preparation. The content was comprehensive, interactive, and well-structured, boosting my confidence and performance.
                      </p>
                      <p className="name">Ahnika</p>
                      <span className="position">Preparing for ISEE exam</span>
                    </div>
                  </div>


                </SwiperSlide>
                <SwiperSlide>

                  <div className="testimonial-box d-flex">
                    <div
                      className="user-img"
                      style={{ backgroundImage: `url(${demo2})` }}
                    ></div>
                    <div className="text pl-4">
                      <span className="quote">
                        <i className="fa fa-quote-left" />
                      </span>
                      <p>
                      I'm currently using Helios for my SAT and AP prep, and it's been fantastic. The lessons are engaging, well-structured, and really effective.
                      </p>
                      <p className="name">Srija</p>
                      <span className="position">Preparing for SAT and AP exams</span>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>

                  <div className="testimonial-box d-flex">
                    <div
                      className="user-img"
                      style={{ backgroundImage: `url(${demo3})` }}
                    ></div>
                    <div className="text pl-4">
                      <span className="quote">
                        <i className="fa fa-quote-left" />
                      </span>
                      <p>
                     
Helios helped me tremendously with my SAT prep. The structured lessons and practice tests have boosted my confidence and skills.
                      </p>
                      <p className="name">Ruchira</p>
                      <span className="position">Prepared for SAT</span>
                    </div>
                  </div>

                </SwiperSlide>
                <SwiperSlide>

                <div className="testimonial-box d-flex">
                    <div
                      className="user-img"
                      style={{ backgroundImage: `url(${demo1})` }}
                    ></div>
                    <div className="text pl-4">
                      <span className="quote">
                        <i className="fa fa-quote-left" />
                      </span>
                      <p>
                      Helios was incredibly helpful for my ISEE preparation. The content was comprehensive, interactive, and well-structured, boosting my confidence and performance.
                      </p>
                      <p className="name">Ahnika</p>
                      <span className="position">Preparing for ISEE exam</span>
                    </div>
                  </div>
                </SwiperSlide>

              </Swiper>
            </div>
          </div>

          {/* Background Noise Image */}
          <img
            src={bg_noise}
            loading="lazy"
            sizes="(max-width: 991px) 38vw, 57vw"
            alt="Background Noise"
            className="prodict__bg-noise"
          />

          {/* Background Blur Effect */}
          <div data-bgblur={4} className="bg__blur-wrap mod--5">

            <img
              src={bgblur3}
              alt="Blurred Background"
              className="bg__blur mod--4"
            />
          </div>
          <div data-bgblur={5} className="bg__blur-wrap mod--6">
            <img
              src={bgblur3}
              alt="Blurred Background"
              className="bg__blur mod--4"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
