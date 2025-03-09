import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

const Achivers = () => {
  useEffect(() => {
    gsap.from(".ranking_Card", {
      opacity: 0,
      y: 50,
      stagger: 0.5,
      scrollTrigger: {
        trigger: ".achivers",
        scroller: "body",
        // markers: true,
        start: "top 40%",
        end: "bottom 80%",
        scrub: 2,
      },
    });
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <div className="section achivers">
        <div className="content">
          <h2 className="heading text-center">Our Achivers</h2>
          <div className="achivingblocks">
            <div className="topblock">
              <div className="flex ranking_Card items-center md-w-50 w-100 h-100 mx-auto achievewrapper">
                <div className="no">1</div>
                <div className="flex items-center h-100 bggreen w-100">
                  <div className="rank">1600</div>
                  <div className="candidateinfo">
                    <div className="name">Raghav</div>
                    <div className="exam loc">SIS , Pune</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottomblock">
              <div className="row md-flex-row flex-column h-100 gap-3  ranking_Card">
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">2</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1580</div>
                      <div className="candidateinfo">
                        <div className="name">Anoushka</div>
                        <div className="exam loc">TISB , Bengaluru</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">3</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1580</div>
                      <div className="candidateinfo">
                        <div className="name">Arav</div>
                        <div className="exam loc">DAIS , Mumbai</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row md-flex-row flex-column h-100 gap-3  ranking_Card">
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">4</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1580</div>
                      <div className="candidateinfo">
                        <div className="name">Madhav</div>
                        <div className="exam loc">UWCSEA , Singapore</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">5</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1580</div>
                      <div className="candidateinfo">
                        <div className="name">Parth</div>
                        <div className="exam loc">Hill Spring , Mumbai</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row md-flex-row flex-column h-100 gap-3  ranking_Card">
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">6</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1570</div>
                      <div className="candidateinfo">
                        <div className="name">Atishaya</div>
                        <div className="exam loc">DAIS , Mumbai</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">7</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1560</div>
                      <div className="candidateinfo">
                        <div className="name">Aradhya</div>
                        <div className="exam loc">NMS , Jaipur</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row md-flex-row flex-column h-100 gap-3  ranking_Card">
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">8</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1560</div>
                      <div className="candidateinfo">
                        <div className="name">Abeer</div>
                        <div className="exam loc">
                          Brookes Intl,Moscow ,Russia
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">9</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1560</div>
                      <div className="candidateinfo">
                        <div className="name">Mihir</div>
                        <div className="exam loc">Jumeirah College , Dubai</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row md-flex-row flex-column h-100 gap-3  ranking_Card">
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">10</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1560</div>
                      <div className="candidateinfo">
                        <div className="name">Sidharth</div>
                        <div className="exam loc">DPS , Bengaluru</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">11</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1560</div>
                      <div className="candidateinfo">
                        <div className="name">Shivam</div>
                        <div className="exam loc">NMS , Jaipur</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row md-flex-row flex-column h-100 gap-3  ranking_Card">
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">12</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1550</div>
                      <div className="candidateinfo">
                        <div className="name">Ahsash</div>
                        <div className="exam loc">JPIS , Jaipur</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md-w-50 w-100 mb-3">
                  <div className="flex items-center w-100 h-100 mx-auto achievewrapper">
                    <div className="no">13</div>
                    <div className="flex items-center h-100 bgred w-100">
                      <div className="rank">1550</div>
                      <div className="candidateinfo">
                        <div className="name">Arjun</div>
                        <div className="exam loc">SIS , Mumbai</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Achivers;
