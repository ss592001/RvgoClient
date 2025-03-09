import React, { useEffect, useState } from "react";
import "./CustomSidebar.css";
import { Outlet, useNavigate, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAuth, setTab } from "../../Redux/Store";
import Logo from "../../../../src/images/logo.png";
import { useMediaQuery } from "../../Custom_hooks/Custom";
const CustomSidebar = () => {
  const isMobile = useMediaQuery("(max-width:430px)");
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.user.Tab);
  const auth = useSelector((state) => state.user.auth);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [sideBarVisible, setSideBarVisible] = useState(false);

  useEffect(() => {
    setSideBarVisible(false);
  }, [tab]);

  const handleNavigation = (path, filter) => {
    setRefresh(!refresh);
    if (filter) {
      dispatch(setTab(`${path}/${filter}`));
    } else {
      dispatch(setTab(path));
    }
    navigate(path, { state: { filter } });
  };

  const handleIsMainPracticeRouteActive = () => {
    if (
      tab === "/test/practice/English Reading" ||
      tab === "/test/practice/English Writing" ||
      tab === "/test/practice/Maths"
    ) {
      return true;
    }
    return false;
  };

  const handleIsPracticeEnglishRouteActive = () => {
    if (
      tab === "/test/practice/English Reading" ||
      tab === "/test/practice/English Writing"
    ) {
      return true;
    }
    return false;
  };
  const handleIsMainPracticeRouteActiveForAdmin = () => {
    if (
      tab === "/admin/test/practice/English Reading" ||
      tab === "/admin/test/practice/English Writing" ||
      tab === "/admin/test/practice/Maths"
    ) {
      return true;
    }
    return false;
  };

  const handleIsPracticeEnglishRouteActiveForAdmin = () => {
    if (
      tab === "/admin/test/practice/English Reading" ||
      tab === "/admin/test/practice/English Writing"
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      {!isMobile ? (
        <div className="Sidecontainer">
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              borderBottom: "2px solid white",
              marginTop: !isMobile ? "-4%" : "",
            }}
          >
            <img src={Logo} alt="Helio" className="helioIcon" />

            <div className="sidebarHeader">
              Welcome {auth && auth?.type === "admin" ? "Admin" : "User"}
            </div>
          </div>
          <div className="routesContainer">
            <div className="route">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0,0,300,150"
                style={{ fill: "#FFFFFF" }}
                className="routeIcon"
              >
                <g
                  fill="#ffffff"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(8,8)">
                    <path d="M3.5,10h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5zM28.5,15h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5zM28.5,23h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5z"></path>
                  </g>
                </g>
              </svg>
              {auth && auth?.type === "admin" ? (
                <div
                  className="routeName"
                  onClick={() => {
                    handleNavigation("/admin/dashboard");
                  }}
                  style={tab === "/admin/dashboard" ? { color: "white" } : {}}
                >
                  Dashboard
                </div>
              ) : (
                <div
                  className="routeName"
                  onClick={() => {
                    handleNavigation("/user/dashboard");
                  }}
                  style={
                    tab === "/user/dashboard"
                      ? { color: "white" }
                      : { color: "rgb(255, 170, 174)" }
                  }
                >
                  Dashboard
                </div>
              )}
            </div>

            <div className="route">
              <img
                width="60"
                height="60"
                src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
                alt="external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev"
                className="routeIcon"
              />
              {auth && auth.type === "admin" ? (
                <div className="routeName">
                  <div
                    style={{
                      color: handleIsMainPracticeRouteActiveForAdmin()
                        ? "white"
                        : "rgb(255, 170, 174)",
                    }}
                  >
                    Practice Tests
                  </div>
                  <div className="subRouteName">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <div>
                        <img
                          width="20"
                          height="20"
                          src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                          alt="chevron-right"
                        />
                      </div>
                      <div
                        style={{
                          // marginTop:
                          //   auth && auth?.type !== "admin" ? "-10%" : "",
                          color: handleIsPracticeEnglishRouteActiveForAdmin()
                            ? "white"
                            : "rgb(255, 170, 174)",
                        }}
                      >
                        English
                      </div>
                    </div>
                    <div className="nestedRouteContainer">
                      <div
                        className="nestedRoute"
                        onClick={() => {
                          handleNavigation(
                            "/admin/test/practice",
                            "English Reading"
                          );
                        }}
                      >
                        <div>
                          <img
                            width="15"
                            height="15"
                            style={{ opacity: 0.5 }}
                            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                            alt="chevron-right"
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "2%",
                            color:
                              tab === "/admin/test/practice/English Reading"
                                ? "white"
                                : "rgb(255, 170, 174)",
                          }}
                        >
                          Reading
                        </div>
                      </div>

                      <div
                        className="nestedRoute"
                        onClick={() => {
                          handleNavigation(
                            "/admin/test/practice",
                            "English Writing"
                          );
                        }}
                      >
                        <div>
                          <img
                            width="15"
                            height="15"
                            style={{ opacity: 0.5 }}
                            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                            alt="chevron-right"
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "2%",
                            color:
                              tab === "/admin/test/practice/English Writing"
                                ? "white"
                                : "rgb(255, 170, 174)",
                          }}
                        >
                          Writing
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                      onClick={() => {
                        handleNavigation("/admin/test/practice", "Maths");
                      }}
                    >
                      <div>
                        <img
                          width="20"
                          height="20"
                          src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                          alt="chevron-right"
                        />
                      </div>
                      <div
                        style={{
                          // marginTop: "2%",
                          color:
                            tab === "/admin/test/practice/Maths"
                              ? "white"
                              : "rgb(255, 170, 174)",
                        }}
                      >
                        Maths
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="routeName">
                    <div
                      style={{
                        color: handleIsMainPracticeRouteActive()
                          ? "white"
                          : "rgb(255, 170, 174)",
                      }}
                    >
                      Practice Tests
                    </div>
                    <div className="subRouteName">
                      <div
                        style={{
                          display: "flex",

                          justifyContent: "flex-start",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                            alt="chevron-right"
                          />
                        </div>
                        <div
                          style={{
                            color: handleIsPracticeEnglishRouteActive()
                              ? "white"
                              : "rgb(255, 170, 174)",
                          }}
                        >
                          English
                        </div>
                      </div>
                      <div className="nestedRouteContainer">
                        <div
                          className="nestedRoute"
                          onClick={() => {
                            handleNavigation(
                              "/test/practice",
                              "English Reading"
                            );
                          }}
                        >
                          <div>
                            <img
                              width="15"
                              height="15"
                              style={{ opacity: 0.5 }}
                              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                              alt="chevron-right"
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "2%",
                              color:
                                tab === "/test/practice/English Reading"
                                  ? "white"
                                  : "rgb(255, 170, 174)",
                            }}
                          >
                            Reading
                          </div>
                        </div>

                        <div
                          className="nestedRoute"
                          onClick={() => {
                            handleNavigation(
                              "/test/practice",
                              "English Writing"
                            );
                          }}
                        >
                          <div>
                            <img
                              width="15"
                              height="15"
                              style={{ opacity: 0.5 }}
                              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                              alt="chevron-right"
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "2%",
                              color:
                                tab === "/test/practice/English Writing"
                                  ? "white"
                                  : "rgb(255, 170, 174)",
                            }}
                          >
                            Writing
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                        onClick={() => {
                          handleNavigation("/test/practice", "Maths");
                        }}
                      >
                        <div>
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                            alt="chevron-right"
                          />
                        </div>
                        <div
                          style={{
                            color:
                              tab === "/test/practice/Maths"
                                ? "white"
                                : "rgb(255, 170, 174)",
                          }}
                        >
                          Maths
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div
              style={{ marginLeft: "-4%" }}
              className="route"
              onClick={() => {
                auth && auth.type === "admin"
                  ? handleNavigation("/admin/test/mock")
                  : handleNavigation("/test/mock");
              }}
            >
              <div>
                <img
                  src="https://img.icons8.com/hatch/64/FFFFFF/quick-mode-on.png"
                  alt="quick-mode-on"
                  className="routeIconMock"
                />
              </div>
              <div
                className="routeName"
                style={{
                  color:
                    tab === "/test/mock" || tab === "/admin/test/mock"
                      ? "white"
                      : "rgb(255, 170, 174)",
                }}
              >
                Mock Tests
              </div>
            </div>
            <div
              style={{ marginLeft: "-4%" }}
              className="route"
              onClick={() => {
                auth && auth.type === "admin"
                  ? handleNavigation("/admin/test/diagnostic")
                  : handleNavigation("/test/diagnostic");
              }}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,256,256"
                  style={{ fill: "#FFFFFF" }}
                  className="routeIconMock"
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                    // style={{mix-blend-mode: "normal"}}
                  >
                    <g transform="scale(10.66667,10.66667)">
                      <path d="M12,2c-5.514,0 -10,4.486 -10,10c0,2.757 1.12164,5.25736 2.93164,7.06836l1.41406,-1.41406c-1.449,-1.448 -2.3457,-3.4483 -2.3457,-5.6543c0,-4.411 3.589,-8 8,-8c4.411,0 8,3.589 8,8c0,2.206 -0.8967,4.2063 -2.3457,5.6543l1.41406,1.41406c1.81,-1.811 2.93164,-4.31136 2.93164,-7.06836c0,-5.514 -4.486,-10 -10,-10zM15.29297,7.29297l-5.29297,4.70703l2,2l4.70703,-5.29297z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div
                className="routeName"
                style={{
                  color:
                    tab === "/test/diagnostic" ||
                    tab === "/admin/test/diagnostic"
                      ? "white"
                      : "rgb(255, 170, 174)",
                }}
              >
                Diagnostic Tests
              </div>
            </div>
            {auth && auth.type === "admin" && (
              <div
                onClick={() => {
                  handleNavigation("/admin/test/upload");
                }}
                className="route"
                style={{ marginLeft: "-3%" }}
              >
                <img
                  className="routeIconMock"
                  src="https://img.icons8.com/sf-black-filled/64/FFFFFF/upload.png"
                  alt="upload"
                />
                <div
                  className="routeName"
                  style={{
                    marginLeft: "2%",
                    color: tab === "/admin/test/upload" ? "white" : "",
                  }}
                >
                  Upload Tests
                </div>
              </div>
            )}

            <div className="route">
              {auth && auth.type === "admin" ? (
                <>
                  <img
                    width="50"
                    height="50"
                    style={{
                      height: "3vw",
                      width: "3vw",
                      marginLeft: "-4%",
                    }}
                    src="https://img.icons8.com/sf-regular/48/FFFFFF/admin-settings-male.png"
                    alt="admin-settings-male"
                    className="routeIcon"
                  />
                  <div
                    className="routeName"
                    style={
                      tab === "/admin/access/users" ? { color: "white" } : {}
                    }
                    onClick={() => {
                      handleNavigation("/admin/access/users");
                    }}
                  >
                    Users
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            <div
              onClick={() => {
                navigate("/auth");
                dispatch(setAuth(null));
              }}
              className="route logout"
              style={auth && auth.type === "admin" ? { marginTop: "5%" } : {}}
            >
              <img
                style={
                  !isMobile
                    ? {
                        height: "2.5vw",
                        width: "2.5vw",
                        marginLeft: "-2%",
                        marginRight: "1.6%",
                      }
                    : {}
                }
                width="50"
                height="50"
                src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-left.png"
                alt="logout-rounded-left"
                className="routeIcon"
              />
              <div className="routeName logoutText">Logout</div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div
            className="Sidecontainer"
            style={{ display: sideBarVisible ? "block" : "none" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                borderBottom: "2px solid white",
              }}
            >
              <img src={Logo} alt="Helio" className="helioIcon" />

              <div className="sidebarHeader">
                {" "}
                Welcome {auth && auth?.type === "admin" ? "Admin" : "User"}
              </div>
              <svg
                onClick={() => {
                  setSideBarVisible(!sideBarVisible);
                }}
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="50"
                height="50"
                viewBox="0,0,300,150"
                style={{
                  fill: "#FFFFFF",
                  position: "absolute",
                  right: "2%",
                  cursor: "pointer",
                }}
              >
                <g
                  fill="#ffffff"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                >
                  <g transform="scale(3.55556,3.55556)">
                    <path d="M19,15c-1.023,0 -2.04812,0.39087 -2.82812,1.17188c-1.562,1.562 -1.562,4.09425 0,5.65625l14.17188,14.17188l-14.17187,14.17188c-1.562,1.562 -1.562,4.09425 0,5.65625c0.78,0.78 1.80513,1.17188 2.82813,1.17188c1.023,0 2.04812,-0.39088 2.82813,-1.17187l14.17188,-14.17187l14.17188,14.17188c1.56,1.562 4.09525,1.562 5.65625,0c1.563,-1.563 1.563,-4.09325 0,-5.65625l-14.17187,-14.17187l14.17188,-14.17187c1.562,-1.562 1.562,-4.09425 0,-5.65625c-1.56,-1.561 -4.09625,-1.562 -5.65625,0l-14.17187,14.17188l-14.17187,-14.17187c-0.78,-0.78 -1.80513,-1.17187 -2.82812,-1.17187z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="routesContainer">
              <div className="route">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0,0,300,150"
                  style={{ fill: "#FFFFFF" }}
                  className="routeIcon"
                >
                  <g
                    fill="#ffffff"
                    fill-rule="nonzero"
                    stroke="none"
                    stroke-width="1"
                    stroke-linecap="butt"
                    stroke-linejoin="miter"
                    stroke-miterlimit="10"
                    stroke-dasharray=""
                    stroke-dashoffset="0"
                    font-family="none"
                    font-weight="none"
                    font-size="none"
                    text-anchor="none"
                  >
                    <g transform="scale(8,8)">
                      <path d="M3.5,10h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5zM28.5,15h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5zM28.5,23h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5z"></path>
                    </g>
                  </g>
                </svg>
                {auth && auth?.type === "admin" ? (
                  <div
                    className="routeName"
                    onClick={() => {
                      handleNavigation("/admin/dashboard");
                    }}
                    style={tab === "/admin/dashboard" ? { color: "white" } : {}}
                  >
                    Dashboard
                  </div>
                ) : (
                  <div
                    className="routeName"
                    onClick={() => {
                      handleNavigation("/user/dashboard");
                    }}
                    style={
                      tab === "/user/dashboard"
                        ? { color: "white" }
                        : { color: "rgb(255, 170, 174)" }
                    }
                  >
                    Dashboard
                  </div>
                )}
              </div>

              <div className="route">
                <img
                  width="60"
                  height="60"
                  src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
                  alt="external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev"
                  className="routeIcon"
                />
                {auth && auth.type === "admin" ? (
                  <div className="routeName">
                    <div
                      style={{
                        color: handleIsMainPracticeRouteActiveForAdmin()
                          ? "white"
                          : "rgb(255, 170, 174)",
                      }}
                    >
                      Practice Tests
                    </div>
                    <div className="subRouteName">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                          textAlign: "center",
                        }}
                      >
                        <div>
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                            alt="chevron-right"
                          />
                        </div>
                        <div
                          style={{
                            // marginTop: "2%",
                            color: handleIsPracticeEnglishRouteActiveForAdmin()
                              ? "white"
                              : "rgb(255, 170, 174)",
                          }}
                        >
                          English
                        </div>
                      </div>
                      <div className="nestedRouteContainer">
                        <div
                          className="nestedRoute"
                          onClick={() => {
                            handleNavigation(
                              "/admin/test/practice",
                              "English Reading"
                            );
                          }}
                        >
                          <div>
                            <img
                              width="15"
                              height="15"
                              style={{ opacity: 0.5 }}
                              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                              alt="chevron-right"
                            />
                          </div>
                          <div
                            style={{
                              // marginTop: "2%",
                              color:
                                tab === "/admin/test/practice/English Reading"
                                  ? "white"
                                  : "rgb(255, 170, 174)",
                            }}
                          >
                            Reading
                          </div>
                        </div>

                        <div
                          className="nestedRoute"
                          onClick={() => {
                            handleNavigation(
                              "/admin/test/practice",
                              "English Writing"
                            );
                          }}
                        >
                          <div>
                            <img
                              width="15"
                              height="15"
                              style={{ opacity: 0.5 }}
                              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                              alt="chevron-right"
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "2%",
                              color:
                                tab === "/admin/test/practice/English Writing"
                                  ? "white"
                                  : "rgb(255, 170, 174)",
                            }}
                          >
                            Writing
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ display: "flex" }}
                        onClick={() => {
                          handleNavigation("/admin/test/practice", "Maths");
                        }}
                      >
                        <div>
                          <img
                            width="20"
                            height="20"
                            src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                            alt="chevron-right"
                          />
                        </div>
                        <div
                          style={{
                            marginTop: "2%",
                            color:
                              tab === "/admin/test/practice/Maths"
                                ? "white"
                                : "rgb(255, 170, 174)",
                          }}
                        >
                          Maths
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="routeName">
                      <div
                        style={{
                          color: handleIsMainPracticeRouteActive()
                            ? "white"
                            : "rgb(255, 170, 174)",
                        }}
                      >
                        Practice Tests
                      </div>
                      <div className="subRouteName">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            textAlign: "center",
                          }}
                        >
                          <div>
                            <img
                              width="20"
                              height="20"
                              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                              alt="chevron-right"
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "2%",
                              color: handleIsPracticeEnglishRouteActive()
                                ? "white"
                                : "rgb(255, 170, 174)",
                            }}
                          >
                            English
                          </div>
                        </div>
                        <div className="nestedRouteContainer">
                          <div
                            className="nestedRoute"
                            onClick={() => {
                              handleNavigation(
                                "/test/practice",
                                "English Reading"
                              );
                            }}
                          >
                            <div>
                              <img
                                width="15"
                                height="15"
                                style={{ opacity: 0.5 }}
                                src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                                alt="chevron-right"
                              />
                            </div>
                            <div
                              style={{
                                marginTop: "2%",
                                color:
                                  tab === "/test/practice/English Reading"
                                    ? "white"
                                    : "rgb(255, 170, 174)",
                              }}
                            >
                              Reading
                            </div>
                          </div>

                          <div
                            className="nestedRoute"
                            onClick={() => {
                              handleNavigation(
                                "/test/practice",
                                "English Writing"
                              );
                            }}
                          >
                            <div>
                              <img
                                width="15"
                                height="15"
                                style={{ opacity: 0.5 }}
                                src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                                alt="chevron-right"
                              />
                            </div>
                            <div
                              style={{
                                marginTop: "2%",
                                color:
                                  tab === "/test/practice/English Writing"
                                    ? "white"
                                    : "rgb(255, 170, 174)",
                              }}
                            >
                              Writing
                            </div>
                          </div>
                        </div>
                        <div
                          style={{ display: "flex" }}
                          onClick={() => {
                            handleNavigation("/test/practice", "Maths");
                          }}
                        >
                          <div>
                            <img
                              width="20"
                              height="20"
                              src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
                              alt="chevron-right"
                            />
                          </div>
                          <div
                            style={{
                              marginTop: "2%",
                              color:
                                tab === "/test/practice/Maths"
                                  ? "white"
                                  : "rgb(255, 170, 174)",
                            }}
                          >
                            Maths
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div
                className="route"
                onClick={() => {
                  auth && auth.type === "admin"
                    ? handleNavigation("/admin/test/mock")
                    : handleNavigation("/test/mock");
                }}
              >
                <div>
                  <img
                    src="https://img.icons8.com/hatch/64/FFFFFF/quick-mode-on.png"
                    alt="quick-mode-on"
                    className="routeIconMock"
                  />
                </div>
                <div
                  className="routeName"
                  style={{
                    color:
                      tab === "/test/mock" || tab === "/admin/test/mock"
                        ? "white"
                        : "rgb(255, 170, 174)",
                  }}
                >
                  Mock Tests
                </div>
              </div>
              <div
                className="route"
                onClick={() => {
                  auth && auth.type === "admin"
                    ? handleNavigation("/admin/test/diagnostic", "diagnostic")
                    : handleNavigation("/test/diagnostic", "diagnostic");
                }}
              >
                <div>
                  <img
                    src="https://img.icons8.com/hatch/64/FFFFFF/quick-mode-on.png"
                    alt="quick-mode-on"
                    className="routeIconMock"
                  />
                </div>
                <div
                  className="routeName"
                  style={{
                    color:
                      tab === "/test/diagnostic" ||
                      tab === "/admin/test/diagnostic"
                        ? "white"
                        : "rgb(255, 170, 174)",
                  }}
                >
                  Diagnostic Tests
                </div>
              </div>
              {auth && auth.type === "admin" && (
                <div
                  onClick={() => {
                    handleNavigation("/admin/test/upload");
                  }}
                  className="route"
                >
                  <img
                    className="routeIconMock"
                    src="https://img.icons8.com/sf-black-filled/64/FFFFFF/upload.png"
                    alt="upload"
                  />
                  <div
                    className="routeName"
                    style={{
                      color: tab === "/admin/test/upload" ? "white" : "",
                    }}
                  >
                    Upload Tests
                  </div>
                </div>
              )}

              <div className="route">
                {auth && auth.type === "admin" ? (
                  <>
                    <img
                      className="routeIcon"
                      src="https://img.icons8.com/sf-regular/48/FFFFFF/admin-settings-male.png"
                      alt="admin-settings-male"
                      // className="routeIcon"
                    />
                    <div
                      className="routeName"
                      style={
                        tab === "/admin/access/users" ? { color: "white" } : {}
                      }
                      onClick={() => {
                        handleNavigation("/admin/access/users");
                      }}
                    >
                      Users
                    </div>
                  </>
                ) : (
                  <></>
                  // <div
                  //   className="routeName"
                  //   style={tab === "/profile" ? { color: "white" } : {}}
                  //   onClick={() => {
                  //     handleNavigation("/profile");
                  //   }}
                  // >
                  //   Profile
                  // </div>
                )}
              </div>
              <div
                onClick={() => {
                  navigate("/auth");
                  dispatch(setAuth(null));
                }}
                className="logout route"
                style={auth && auth.type === "admin" ? { marginTop: "5%" } : {}}
              >
                <img
                  width="50"
                  height="50"
                  style={{ display: "block" }}
                  src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-left.png"
                  alt="logout-rounded-left"
                  className="routeIcon"
                />
                <div className="routeName logoutText">Logout</div>
              </div>
            </div>
          </div>
          <div className="menuIconContainer">
            <img
              onClick={() => {
                setSideBarVisible(!sideBarVisible);
              }}
              className="menuIcon"
              src="https://img.icons8.com/ios-filled/50/7e171c/menu-squared-2.png"
              alt="menu-squared-2"
            />
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
};

export default CustomSidebar;
