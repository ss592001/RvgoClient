import React from "react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const programs = [
  {
    title: "RV Go – Bucket Shell",
    items: [
      "School Academics (IB/IGCSE/A Level/ICSE/CBSE/US/All KS Year 6 to Year 16/UK SAT)",
      "Foundation For APs",
      "Foundation for SAT (Free ISEE & PSAT)",
      "$23 per class (International Kids)",
      "Rs. 600 to 1000 per class (CBSE, ICSE)",
      "Rs 1000 to 1200 per class (IB, IGCSE)",
      "*Affordable Cost - please contact",
    ],
  },
  {
    title: "RV Go – SAT",
    trackGroupTitle: "SAT Tracks",
    tracks: [
      {
        name: "Fast Track Program",
        details: [
          "2 months program*",
          "Master Classes",
          "Strategy Sessions",
          "Mocks",
          "Remedial sessions",
          "*Conditions apply",
        ],
      },
      {
        name: "Steady Track Program",
        details: [
          "4 months program*",
          "Special Sessions",
          "Strategy Sessions",
          "Mocks",
          "Remedial sessions",
          "*Conditions apply",
        ],
      },
      {
        name: "Foundation",
        details: [
          "4+ months program",
          "Intensive sessions – Inclusive of Master classes, special sessions etc",
          "Strategy Sessions",
          "Mocks",
          "Remedial sessions",
          "*Affordable Cost - please contact",
        ],
      },
    ],
  },
  {
    title: "RV Go – ACT",

    trackGroupTitle: "ACT Tracks",
    tracks: [
      {
        name: "Fast Track Program",
        details: [
          "2 months program*",
          "Master Classes",
          "Strategy Sessions",
          "Mocks",
          "Remedial sessions",
          "*Conditions apply",
        ],
      },
      {
        name: "Steady Track Program",
        details: [
          "4 months program*",
          "Special Sessions",
          "Strategy Sessions",
          "Mocks",
          "Remedial sessions",
          "*Conditions apply",
        ],
      },
      {
        name: "Foundation",
        details: [
          "4+ months program",
          "Intensive sessions – Inclusive of Master classes, special sessions etc",
          "Strategy Sessions",
          "Mocks",
          "Remedial sessions",
        ],
      },
    ],
  },
  {
    title: "RV Go – APs",
    items: ["One on One tutoring", "Expert tutors", "Affordable Cost"],
  },
];

const Card = ({ title, content }) => (
  <div className="border border-[rgb(182,182,182)] bg-[rgb(234,234,234)] hover:bg-[rgb(234,234,234)] transition-transform duration-300 xt-white p-6 rounded-2xl shadow-l hover:scale-[1.03] transition-transform duration-300  hover:shadow-lg w-full">
    <h3 className="text-lg font-semibold mb-2  pb-1 ">{title}</h3>
    <ul className="list-disc list-inside text-sm space-y-1 text-[black] ">
      {content.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);
const ProgramCard = ({ title, items, tracks, intro, trackGroupTitle }) => (
  <div className="w-full">
    <h2 className="text-2xl font-bold text-[#333f6b] mb-4">{title}</h2>

    {(items || intro) && (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card title="Program Details" content={items || intro} />
      </div>
    )}

    {tracks && (
      <>
        {/* <h3 className="text-xl font-semibold text-[#333f6b] mt-6 mb-2">
          {trackGroupTitle || "Tracks"}
        </h3> */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track, idx) => (
            <Card key={idx} title={track.name} content={track.details} />
          ))}
        </div>
      </>
    )}
    {/* <hr className="my-10 " /> */}
    <div className="my-10 "></div>
  </div>
);
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
          <div className="py-12 px-4 md:px-16 bg-white">
            <h1 className="text-3xl font-bold text-center text-[#333f6b] mb-12">
              Our Programs
            </h1>
            {programs.map((prog, idx) => (
              <ProgramCard key={idx} {...prog} />
            ))}
          </div>
        </div>
      </div>
      <div className="section achivers">
        <div className="content">
          <h2 className="heading text-center Brandtitle">Our Achievers</h2>
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
