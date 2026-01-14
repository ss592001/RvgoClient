// import React, { useEffect, useState } from "react";
// import "./CustomSidebar.css";
// import { Outlet, useNavigate, useLocation } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuth, setTab } from "../../Redux/Store";
// import Logo from "../../../../src/images/logo.png";
// import { useMediaQuery } from "../../Custom_hooks/Custom";
// import { MovingBorder } from "@/components/ui/moving-border";
// const CustomSidebar = () => {
//   const isMobile = useMediaQuery("(max-width:430px)");
//   const dispatch = useDispatch();
//   const tab = useSelector((state) => state.user.Tab);
//   const auth = useSelector((state) => state.user.auth);
//   // const user = useSelector((state) => state.user.auth.data);
//   const navigate = useNavigate();
//   const [refresh, setRefresh] = useState(false);
//   const [sideBarVisible, setSideBarVisible] = useState(false);

//   useEffect(() => {
//     setSideBarVisible(false);
//   }, [tab]);

//   const handleNavigation = (path, filter) => {
//     setRefresh(!refresh);
//     if (filter) {
//       dispatch(setTab(`${path}/${filter}`));
//     } else {
//       dispatch(setTab(path));
//     }
//     navigate(path, { state: { filter } });
//   };

//   const handleIsMainPracticeRouteActive = () => {
//     if (
//       tab === "/test/practice/English Reading" ||
//       tab === "/test/practice/English Writing" ||
//       tab === "/test/practice/Maths" ||
//       tab === "/test/practice/Miscellaneous"
//     ) {
//       return true;
//     }
//     return false;
//   };

//   const handleIsPracticeEnglishRouteActive = () => {
//     if (
//       tab === "/test/practice/English Reading" ||
//       tab === "/test/practice/English Writing"
//     ) {
//       return true;
//     }
//     return false;
//   };
//   const handleIsMainPracticeRouteActiveForAdmin = () => {
//     if (
//       tab === "/admin/test/practice/English Reading" ||
//       tab === "/admin/test/practice/English Writing" ||
//       tab === "/admin/test/practice/Maths"
//     ) {
//       return true;
//     }
//     return false;
//   };

//   const handleIsPracticeEnglishRouteActiveForAdmin = () => {
//     if (
//       tab === "/admin/test/practice/English Reading" ||
//       tab === "/admin/test/practice/English Writing"
//     ) {
//       return true;
//     }
//     return false;
//   };
//   return (
//     <>
//       {!isMobile ? (
//         <div className="Sidecontainer">
//           <div
//             style={{
//               display: "flex",
//               alignItems: "baseline",
//             }}
//           >
//             <div className="sidebarHeader">
//               RVGO {auth.type === "admin" ? "ADMIN" : "USER"}
//               {/* BUZZAI */}
//             </div>
//           </div>
//           <div className="routesContainer">
//             <div className="route">
//               {/* <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="100"
//                 height="100"
//                 viewBox="0,0,300,150"
//                 style={{ fill: "#FFFFFF" }}
//                 className="routeIcon"
//               >
//                 <g
//                   fill="#ffffff"
//                   fill-rule="nonzero"
//                   stroke="none"
//                   stroke-width="1"
//                   stroke-linecap="butt"
//                   stroke-linejoin="miter"
//                   stroke-miterlimit="10"
//                   stroke-dasharray=""
//                   stroke-dashoffset="0"
//                   font-family="none"
//                   font-weight="none"
//                   font-size="none"
//                   text-anchor="none"
//                 >
//                   <g transform="scale(8,8)">
//                     <path d="M3.5,10h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5zM28.5,15h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5zM28.5,23h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5z"></path>
//                   </g>
//                 </g>
//               </svg> */}
//               <img
//                 width="20"
//                 height="20"
//                 src="https://img.icons8.com/ios-filled/50/FFFFFF/top-menu.png"
//                 alt="top-menu"
//               />
//               {auth && auth?.type === "admin" ? (
//                 <div
//                   className="routeName"
//                   onClick={() => {
//                     handleNavigation("/admin/dashboard");
//                   }}
//                   style={tab === "/admin/dashboard" ? { color: "white" } : {}}
//                 >
//                   Dashboard
//                 </div>
//               ) : (
//                 <div
//                   className="routeName"
//                   onClick={() => {
//                     handleNavigation("/user/dashboard");
//                   }}
//                   style={
//                     tab === "/user/dashboard"
//                       ? { color: "white" }
//                       : { color: "rgb(163, 163, 254)" }
//                   }
//                 >
//                   Dashboard
//                 </div>
//               )}
//             </div>

//             <div className="route">
//               <img
//                 width="60"
//                 height="60"
//                 src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
//                 alt="external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev"
//                 className="routeIcon"
//               />
//               {auth && auth.type === "admin" ? (
//                 <div className="routeName">
//                   <div
//                     style={{
//                       color: handleIsMainPracticeRouteActiveForAdmin()
//                         ? "white"
//                         : "rgb(163, 163, 254)",
//                     }}
//                   >
//                     Practice Tests
//                   </div>
//                   <div className="subRouteName">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "flex-start",
//                         alignItems: "center",
//                         textAlign: "center",
//                       }}
//                     >
//                       <div>
//                         <img
//                           width="20"
//                           height="20"
//                           src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                           alt="chevron-right"
//                         />
//                       </div>
//                       <div
//                         style={{
//                           // marginTop:
//                           //   auth && auth?.type !== "admin" ? "-10%" : "",
//                           color: handleIsPracticeEnglishRouteActiveForAdmin()
//                             ? "white"
//                             : "rgb(163, 163, 254)",
//                         }}
//                       >
//                         English
//                       </div>
//                     </div>
//                     <div className="nestedRouteContainer">
//                       <div
//                         className="nestedRoute"
//                         onClick={() => {
//                           handleNavigation(
//                             "/admin/test/practice",
//                             "English Reading"
//                           );
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="15"
//                             height="15"
//                             style={{ opacity: 0.5 }}
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             marginTop: "2%",
//                             color:
//                               tab === "/admin/test/practice/English Reading"
//                                 ? "white"
//                                 : "rgb(163, 163, 254)",
//                           }}
//                         >
//                           Reading
//                         </div>
//                       </div>

//                       <div
//                         className="nestedRoute"
//                         onClick={() => {
//                           handleNavigation(
//                             "/admin/test/practice",
//                             "English Writing"
//                           );
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="15"
//                             height="15"
//                             style={{ opacity: 0.5 }}
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             marginTop: "2%",
//                             color:
//                               tab === "/admin/test/practice/English Writing"
//                                 ? "white"
//                                 : "rgb(163, 163, 254)",
//                           }}
//                         >
//                           Writing
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "flex-start",
//                         alignItems: "center",
//                         textAlign: "center",
//                       }}
//                       onClick={() => {
//                         handleNavigation("/admin/test/practice", "Maths");
//                       }}
//                     >
//                       <div>
//                         <img
//                           width="20"
//                           height="20"
//                           src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                           alt="chevron-right"
//                         />
//                       </div>
//                       <div
//                         style={{
//                           color:
//                             tab === "/admin/test/practice/Maths"
//                               ? "white"
//                               : "rgb(163, 163, 254)",
//                         }}
//                       >
//                         Maths
//                       </div>
//                     </div>
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "flex-start",
//                         alignItems: "center",
//                         textAlign: "center",
//                       }}
//                       onClick={() => {
//                         handleNavigation(
//                           "/admin/test/practice",
//                           "Miscellaneous"
//                         );
//                       }}
//                     >
//                       <div>
//                         <img
//                           width="20"
//                           height="20"
//                           src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                           alt="chevron-right"
//                         />
//                       </div>
//                       <div
//                         style={{
//                           color:
//                             tab === "/admin/test/practice/Miscellaneous"
//                               ? "white"
//                               : "rgb(163, 163, 254)",
//                         }}
//                       >
//                         Miscellaneous
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="routeName">
//                     <div
//                       style={{
//                         color: handleIsMainPracticeRouteActive()
//                           ? "white"
//                           : "rgb(163, 163, 254)",
//                       }}
//                     >
//                       Practice Tests
//                     </div>
//                     <div className="subRouteName">
//                       <div
//                         style={{
//                           display: "flex",

//                           justifyContent: "flex-start",
//                           alignItems: "center",
//                           textAlign: "center",
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="20"
//                             height="20"
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             color: handleIsPracticeEnglishRouteActive()
//                               ? "white"
//                               : "rgb(163, 163, 254)",
//                           }}
//                         >
//                           English
//                         </div>
//                       </div>
//                       <div className="nestedRouteContainer">
//                         <div
//                           className="nestedRoute"
//                           onClick={() => {
//                             handleNavigation(
//                               "/test/practice",
//                               "English Reading"
//                             );
//                           }}
//                         >
//                           <div>
//                             <img
//                               width="15"
//                               height="15"
//                               style={{ opacity: 0.5 }}
//                               src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                               alt="chevron-right"
//                             />
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "2%",
//                               color:
//                                 tab === "/test/practice/English Reading"
//                                   ? "white"
//                                   : "rgb(163, 163, 254)",
//                             }}
//                           >
//                             Reading
//                           </div>
//                         </div>

//                         <div
//                           className="nestedRoute"
//                           onClick={() => {
//                             handleNavigation(
//                               "/test/practice",
//                               "English Writing"
//                             );
//                           }}
//                         >
//                           <div>
//                             <img
//                               width="15"
//                               height="15"
//                               style={{ opacity: 0.5 }}
//                               src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                               alt="chevron-right"
//                             />
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "2%",
//                               color:
//                                 tab === "/test/practice/English Writing"
//                                   ? "white"
//                                   : "rgb(163, 163, 254)",
//                             }}
//                           >
//                             Writing
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "flex-start",
//                           alignItems: "center",
//                           textAlign: "center",
//                         }}
//                         onClick={() => {
//                           handleNavigation("/test/practice", "Maths");
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="20"
//                             height="20"
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             color:
//                               tab === "/test/practice/Maths"
//                                 ? "white"
//                                 : "rgb(163, 163, 254)",
//                           }}
//                         >
//                           Maths
//                         </div>
//                       </div>
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "flex-start",
//                           alignItems: "center",
//                           textAlign: "center",
//                         }}
//                         onClick={() => {
//                           handleNavigation("/test/practice", "Miscellaneous");
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="20"
//                             height="20"
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             color:
//                               tab === "/test/practice/Miscellaneous"
//                                 ? "white"
//                                 : "rgb(163, 163, 254)",
//                           }}
//                         >
//                           Miscellaneous
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//             <div
//               style={{ marginLeft: "0%" }}
//               className="route"
//               onClick={() => {
//                 auth && auth.type === "admin"
//                   ? handleNavigation("/admin/test/mock")
//                   : handleNavigation("/test/mock");
//               }}
//             >
//               <div>
//                 {/* <img
//                   src="https://img.icons8.com/hatch/64/FFFFFF/quick-mode-on.png"
//                   alt="quick-mode-on"
//                   className="routeIconMock"
//                 /> */}
//                 <img
//                   width="23"
//                   height="23"
//                   src="https://img.icons8.com/ios-filled/50/FFFFFF/test-folder.png"
//                   alt="test-folder"
//                   className="routeIconMockTest"
//                 />
//               </div>
//               <div
//                 className="routeName"
//                 style={{
//                   color:
//                     tab === "/test/mock" || tab === "/admin/test/mock"
//                       ? "white"
//                       : "rgb(163, 163, 254)",
//                 }}
//               >
//                 Mock Tests
//               </div>
//             </div>
//             <div
//               style={{ marginLeft: "0%" }}
//               className="route"
//               onClick={() => {
//                 auth && auth.type === "admin"
//                   ? handleNavigation("/admin/test/diagnostic")
//                   : handleNavigation("/test/diagnostic");
//               }}
//             >
//               <div>
//                 <img
//                   width="25"
//                   height="25"
//                   src="https://img.icons8.com/ios-filled/50/FFFFFF/test.png"
//                   alt="test"
//                 />
//                 {/* <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   x="0px"
//                   y="0px"
//                   width="100"
//                   height="100"
//                   viewBox="0,0,256,256"
//                   style={{ fill: "#FFFFFF" }}
//                   className="routeIconMock"
//                 >
//                   <g
//                     fill="#ffffff"
//                     fill-rule="nonzero"
//                     stroke="none"
//                     stroke-width="1"
//                     stroke-linecap="butt"
//                     stroke-linejoin="miter"
//                     stroke-miterlimit="10"
//                     stroke-dasharray=""
//                     stroke-dashoffset="0"
//                     font-family="none"
//                     font-weight="none"
//                     font-size="none"
//                     text-anchor="none"
//                     // style={{mix-blend-mode: "normal"}}
//                   >
//                     <g transform="scale(10.66667,10.66667)">
//                       <path d="M12,2c-5.514,0 -10,4.486 -10,10c0,2.757 1.12164,5.25736 2.93164,7.06836l1.41406,-1.41406c-1.449,-1.448 -2.3457,-3.4483 -2.3457,-5.6543c0,-4.411 3.589,-8 8,-8c4.411,0 8,3.589 8,8c0,2.206 -0.8967,4.2063 -2.3457,5.6543l1.41406,1.41406c1.81,-1.811 2.93164,-4.31136 2.93164,-7.06836c0,-5.514 -4.486,-10 -10,-10zM15.29297,7.29297l-5.29297,4.70703l2,2l4.70703,-5.29297z"></path>
//                     </g>
//                   </g>
//                 </svg> */}
//               </div>
//               <div
//                 className="routeName"
//                 style={{
//                   color:
//                     tab === "/test/diagnostic" ||
//                     tab === "/admin/test/diagnostic"
//                       ? "white"
//                       : "rgb(163, 163, 254)",
//                 }}
//               >
//                 Diagnostic Tests
//               </div>
//             </div>
//             {auth && auth.type === "admin" && (
//               <>
//                 <div
//                   onClick={() => {
//                     handleNavigation("/admin/test/upload");
//                   }}
//                   className="route"
//                 >
//                   <img
//                     className="routeIconMock"
//                     src="https://img.icons8.com/sf-black-filled/64/FFFFFF/upload.png"
//                     alt="upload"
//                   />
//                   <div
//                     className="routeNameMock"
//                     style={{
//                       color: tab === "/admin/test/upload" ? "white" : "",
//                     }}
//                   >
//                     Upload Tests
//                   </div>
//                 </div>
//                 <div
//                   onClick={() => {
//                     handleNavigation("/admin/access/questions/database");
//                   }}
//                   className="route"
//                 >
//                   <img
//                     className="routeIconMock"
//                     src="https://img.icons8.com/puffy-filled/32/FFFFFF/accept-database.png"
//                     alt="upload"
//                   />
//                   <div
//                     className="routeNameMock"
//                     style={{
//                       color:
//                         tab === "/admin/access/questions/database"
//                           ? "white"
//                           : "",
//                     }}
//                   >
//                     Question Database
//                   </div>
//                 </div>
//               </>
//             )}

//             <div className="route">
//               {auth && auth.type === "admin" ? (
//                 <>
//                   <img
//                     width="50"
//                     height="50"
//                     style={{
//                       height: "2vw",
//                       width: "2vw",
//                     }}
//                     className="routeIcon"
//                     src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/64/FFFFFF/external-user-interface-kiranshastry-solid-kiranshastry.png"
//                     alt="external-user-interface-kiranshastry-solid-kiranshastry"
//                   />
//                   <div
//                     className="routeNameMock"
//                     style={
//                       tab === "/admin/access/users" ? { color: "white" } : {}
//                     }
//                     onClick={() => {
//                       handleNavigation("/admin/access/users");
//                     }}
//                   >
//                     Users
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <img
//                     width="50"
//                     height="50"
//                     style={{
//                       height: "2vw",
//                       width: "2vw",
//                     }}
//                     className="routeIcon"
//                     src="https://img.icons8.com/fluency-systems-filled/48/FFFFFF/positive-dynamic.png"
//                     alt="external-user-interface-kiranshastry-solid-kiranshastry"
//                   />
//                   <div
//                     className="routeNameMock"
//                     style={
//                       tab === "/user/tests/analysis" ? { color: "white" } : {}
//                     }
//                     onClick={() => {
//                       dispatch(setTab("/user/tests/analysis"));
//                       navigate("/user/tests/analysis", {
//                         state: { user: auth.data, filter: "analysis" },
//                       });
//                     }}
//                   >
//                     My Analysis
//                   </div>
//                 </>
//               )}
//             </div>
//             <div
//               onClick={() => {
//                 navigate("/auth");
//                 dispatch(setAuth(null));
//               }}
//               className="route logout"
//               style={auth && auth.type === "admin" ? { marginTop: "0%" } : {}}
//             >
//               <img
//                 style={
//                   !isMobile
//                     ? {
//                         height: "2vw",
//                         width: "2vw",
//                       }
//                     : {}
//                 }
//                 width="30"
//                 height="30"
//                 src="https://img.icons8.com/external-anggara-glyph-anggara-putra/32/FFFFFF/external-logout-social-media-interface-anggara-glyph-anggara-putra.png"
//                 alt="logout-rounded-left"
//                 className="routeIcon"
//               />

//               <div className="routeName logoutText">Logout</div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <div
//             className="Sidecontainer"
//             style={{ display: sideBarVisible ? "block" : "none" }}
//           >
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "baseline",
//                 borderBottom: "2px solid white",
//               }}
//             >
//               <div className="sidebarHeader">
//                 {" "}
//                 RVGO {auth.type === "admin" ? "ADMIN" : "USER"}
//               </div>

//               <svg
//                 onClick={() => {
//                   setSideBarVisible(!sideBarVisible);
//                 }}
//                 xmlns="http://www.w3.org/2000/svg"
//                 x="0px"
//                 y="0px"
//                 width="50"
//                 height="50"
//                 viewBox="0,0,300,150"
//                 style={{
//                   fill: "#FFFFFF",
//                   position: "absolute",
//                   right: "2%",
//                   cursor: "pointer",
//                 }}
//               >
//                 <g
//                   fill="#ffffff"
//                   fill-rule="nonzero"
//                   stroke="none"
//                   stroke-width="1"
//                   stroke-linecap="butt"
//                   stroke-linejoin="miter"
//                   stroke-miterlimit="10"
//                   stroke-dasharray=""
//                   stroke-dashoffset="0"
//                   font-family="none"
//                   font-weight="none"
//                   font-size="none"
//                   text-anchor="none"
//                 >
//                   <g transform="scale(3.55556,3.55556)">
//                     <path d="M19,15c-1.023,0 -2.04812,0.39087 -2.82812,1.17188c-1.562,1.562 -1.562,4.09425 0,5.65625l14.17188,14.17188l-14.17187,14.17188c-1.562,1.562 -1.562,4.09425 0,5.65625c0.78,0.78 1.80513,1.17188 2.82813,1.17188c1.023,0 2.04812,-0.39088 2.82813,-1.17187l14.17188,-14.17187l14.17188,14.17188c1.56,1.562 4.09525,1.562 5.65625,0c1.563,-1.563 1.563,-4.09325 0,-5.65625l-14.17187,-14.17187l14.17188,-14.17187c1.562,-1.562 1.562,-4.09425 0,-5.65625c-1.56,-1.561 -4.09625,-1.562 -5.65625,0l-14.17187,14.17188l-14.17187,-14.17187c-0.78,-0.78 -1.80513,-1.17187 -2.82812,-1.17187z"></path>
//                   </g>
//                 </g>
//               </svg>
//             </div>
//             <div className="routesContainer">
//               <div className="route">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   x="0px"
//                   y="0px"
//                   width="100"
//                   height="100"
//                   viewBox="0,0,300,150"
//                   style={{ fill: "#FFFFFF" }}
//                   className="routeIcon"
//                 >
//                   <g
//                     fill="#ffffff"
//                     fill-rule="nonzero"
//                     stroke="none"
//                     stroke-width="1"
//                     stroke-linecap="butt"
//                     stroke-linejoin="miter"
//                     stroke-miterlimit="10"
//                     stroke-dasharray=""
//                     stroke-dashoffset="0"
//                     font-family="none"
//                     font-weight="none"
//                     font-size="none"
//                     text-anchor="none"
//                   >
//                     <g transform="scale(8,8)">
//                       <path d="M3.5,10h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5zM28.5,15h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5zM28.5,23h-25c-0.828,0 -1.5,0.672 -1.5,1.5c0,0.828 0.672,1.5 1.5,1.5h25c0.828,0 1.5,-0.672 1.5,-1.5c0,-0.828 -0.672,-1.5 -1.5,-1.5z"></path>
//                     </g>
//                   </g>
//                 </svg>
//                 {auth && auth?.type === "admin" ? (
//                   <div
//                     className="routeName"
//                     onClick={() => {
//                       handleNavigation("/admin/dashboard");
//                     }}
//                     style={tab === "/admin/dashboard" ? { color: "white" } : {}}
//                   >
//                     Dashboard
//                   </div>
//                 ) : (
//                   <div
//                     className="routeName"
//                     onClick={() => {
//                       handleNavigation("/user/dashboard");
//                     }}
//                     style={
//                       tab === "/user/dashboard"
//                         ? { color: "white" }
//                         : { color: "rgb(255, 170, 174)" }
//                     }
//                   >
//                     Dashboard
//                   </div>
//                 )}
//               </div>

//               <div className="route">
//                 <img
//                   width="60"
//                   height="60"
//                   src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/60/FFFFFF/external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev.png"
//                   alt="external-exam-online-learning-vitaliy-gorbachev-fill-vitaly-gorbachev"
//                   className="routeIcon"
//                 />
//                 {auth && auth.type === "admin" ? (
//                   <div className="routeName">
//                     <div
//                       style={{
//                         color: handleIsMainPracticeRouteActiveForAdmin()
//                           ? "white"
//                           : "white",
//                       }}
//                     >
//                       Practice Tests
//                     </div>
//                     <div className="subRouteName">
//                       <div
//                         style={{
//                           display: "flex",
//                           justifyContent: "flex-start",
//                           alignItems: "center",
//                           textAlign: "center",
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="20"
//                             height="20"
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             // marginTop: "2%",
//                             color: handleIsPracticeEnglishRouteActiveForAdmin()
//                               ? "white"
//                               : "white",
//                           }}
//                         >
//                           English
//                         </div>
//                       </div>
//                       <div className="nestedRouteContainer">
//                         <div
//                           className="nestedRoute"
//                           onClick={() => {
//                             handleNavigation(
//                               "/admin/test/practice",
//                               "English Reading"
//                             );
//                           }}
//                         >
//                           <div>
//                             <img
//                               width="15"
//                               height="15"
//                               style={{ opacity: 0.5 }}
//                               src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                               alt="chevron-right"
//                             />
//                           </div>
//                           <div
//                             style={{
//                               // marginTop: "2%",
//                               color:
//                                 tab === "/admin/test/practice/English Reading"
//                                   ? "white"
//                                   : "white",
//                             }}
//                           >
//                             Reading
//                           </div>
//                         </div>

//                         <div
//                           className="nestedRoute"
//                           onClick={() => {
//                             handleNavigation(
//                               "/admin/test/practice",
//                               "English Writing"
//                             );
//                           }}
//                         >
//                           <div>
//                             <img
//                               width="15"
//                               height="15"
//                               style={{ opacity: 0.5 }}
//                               src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                               alt="chevron-right"
//                             />
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "2%",
//                               color:
//                                 tab === "/admin/test/practice/English Writing"
//                                   ? "white"
//                                   : "white",
//                             }}
//                           >
//                             Writing
//                           </div>
//                         </div>
//                       </div>
//                       <div
//                         style={{ display: "flex" }}
//                         onClick={() => {
//                           handleNavigation("/admin/test/practice", "Maths");
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="20"
//                             height="20"
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             color:
//                               tab === "/admin/test/practice/Maths"
//                                 ? "white"
//                                 : "white",
//                           }}
//                         >
//                           Maths
//                         </div>
//                       </div>
//                       <div
//                         style={{ display: "flex" }}
//                         onClick={() => {
//                           handleNavigation(
//                             "/admin/test/practice",
//                             "Miscellaneous"
//                           );
//                         }}
//                       >
//                         <div>
//                           <img
//                             width="20"
//                             height="20"
//                             src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                             alt="chevron-right"
//                           />
//                         </div>
//                         <div
//                           style={{
//                             color:
//                               tab === "/admin/test/practice/Miscellaneous"
//                                 ? "white"
//                                 : "white",
//                           }}
//                         >
//                           Miscellaneous
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <div className="routeName">
//                       <div
//                         style={{
//                           color: handleIsMainPracticeRouteActive()
//                             ? "white"
//                             : "white",
//                         }}
//                       >
//                         Practice Tests
//                       </div>
//                       <div className="subRouteName">
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent: "flex-start",
//                             alignItems: "center",
//                             textAlign: "center",
//                           }}
//                         >
//                           <div>
//                             <img
//                               width="20"
//                               height="20"
//                               src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                               alt="chevron-right"
//                             />
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "2%",
//                               color: handleIsPracticeEnglishRouteActive()
//                                 ? "white"
//                                 : "white",
//                             }}
//                           >
//                             English
//                           </div>
//                         </div>
//                         <div className="nestedRouteContainer">
//                           <div
//                             className="nestedRoute"
//                             onClick={() => {
//                               handleNavigation(
//                                 "/test/practice",
//                                 "English Reading"
//                               );
//                             }}
//                           >
//                             <div>
//                               <img
//                                 width="15"
//                                 height="15"
//                                 style={{ opacity: 0.5 }}
//                                 src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                                 alt="chevron-right"
//                               />
//                             </div>
//                             <div
//                               style={{
//                                 marginTop: "2%",
//                                 color:
//                                   tab === "/test/practice/English Reading"
//                                     ? "white"
//                                     : "white",
//                               }}
//                             >
//                               Reading
//                             </div>
//                           </div>

//                           <div
//                             className="nestedRoute"
//                             onClick={() => {
//                               handleNavigation(
//                                 "/test/practice",
//                                 "English Writing"
//                               );
//                             }}
//                           >
//                             <div>
//                               <img
//                                 width="15"
//                                 height="15"
//                                 style={{ opacity: 0.5 }}
//                                 src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                                 alt="chevron-right"
//                               />
//                             </div>
//                             <div
//                               style={{
//                                 marginTop: "2%",
//                                 color:
//                                   tab === "/test/practice/English Writing"
//                                     ? "white"
//                                     : "white",
//                               }}
//                             >
//                               Writing
//                             </div>
//                           </div>
//                         </div>
//                         <div
//                           style={{ display: "flex" }}
//                           onClick={() => {
//                             handleNavigation("/test/practice", "Maths");
//                           }}
//                         >
//                           <div>
//                             <img
//                               width="20"
//                               height="20"
//                               src="https://img.icons8.com/sf-black-filled/64/FFFFFF/chevron-right.png"
//                               alt="chevron-right"
//                             />
//                           </div>
//                           <div
//                             style={{
//                               marginTop: "2%",
//                               color:
//                                 tab === "/test/practice/Maths"
//                                   ? "white"
//                                   : "white",
//                             }}
//                           >
//                             Maths
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <div
//                 className="route"
//                 onClick={() => {
//                   auth && auth.type === "admin"
//                     ? handleNavigation("/admin/test/mock")
//                     : handleNavigation("/test/mock");
//                 }}
//                 style={{ marginLeft: "-2%" }}
//               >
//                 <div>
//                   <img
//                     src="https://img.icons8.com/hatch/64/FFFFFF/quick-mode-on.png"
//                     alt="quick-mode-on"
//                     className="routeIconMock"
//                   />
//                 </div>
//                 <div
//                   className="routeName"
//                   style={{
//                     color:
//                       tab === "/test/mock" || tab === "/admin/test/mock"
//                         ? "white"
//                         : "white",
//                   }}
//                 >
//                   Mock Tests
//                 </div>
//               </div>
//               <div
//                 className="route"
//                 onClick={() => {
//                   auth && auth.type === "admin"
//                     ? handleNavigation("/admin/test/diagnostic", "diagnostic")
//                     : handleNavigation("/test/diagnostic", "diagnostic");
//                 }}
//                 style={{ marginLeft: "-2%" }}
//               >
//                 <div>
//                   <img
//                     src="https://img.icons8.com/hatch/64/FFFFFF/quick-mode-on.png"
//                     alt="quick-mode-on"
//                     className="routeIconMock"
//                   />
//                 </div>
//                 <div
//                   className="routeName"
//                   style={{
//                     color:
//                       tab === "/test/diagnostic" ||
//                       tab === "/admin/test/diagnostic"
//                         ? "white"
//                         : "white",
//                   }}
//                 >
//                   Diagnostic Tests
//                 </div>
//               </div>
//               {auth && auth.type === "admin" && (
//                 <>
//                   <div
//                     onClick={() => {
//                       handleNavigation("/admin/test/upload");
//                     }}
//                     className="route"
//                   >
//                     <img
//                       className="routeIconMock"
//                       src="https://img.icons8.com/sf-black-filled/64/FFFFFF/upload.png"
//                       alt="upload"
//                     />
//                     <div
//                       className="routeName"
//                       style={{
//                         color: tab === "/admin/test/upload" ? "white" : "",
//                       }}
//                     >
//                       Upload Tests
//                     </div>
//                   </div>
//                   <div
//                     onClick={() => {
//                       handleNavigation("/admin/access/questions/database");
//                     }}
//                     className="route"
//                   >
//                     <img
//                       className="routeIconMock"
//                       src="https://img.icons8.com/ios-filled/50/FFFFFF/big-data.png"
//                       alt="upload"
//                     />
//                     <div
//                       className="routeName"
//                       style={{
//                         color:
//                           tab === "/admin/access/questions/database"
//                             ? "white"
//                             : "",
//                       }}
//                     >
//                       Question Database
//                     </div>
//                   </div>
//                 </>
//               )}

//               <div className="route">
//                 {auth && auth.type === "admin" ? (
//                   <>
//                     <img
//                       className="routeIcon"
//                       src="https://img.icons8.com/sf-regular/48/FFFFFF/admin-settings-male.png"
//                       alt="admin-settings-male"
//                       // className="routeIcon"
//                     />
//                     <div
//                       className="routeName"
//                       style={
//                         tab === "/admin/access/users" ? { color: "white" } : {}
//                       }
//                       onClick={() => {
//                         handleNavigation("/admin/access/users");
//                       }}
//                     >
//                       Users
//                     </div>
//                   </>
//                 ) : (
//                   <></>
//                 )}
//               </div>
//               <div
//                 onClick={() => {
//                   navigate("/auth");
//                   dispatch(setAuth(null));
//                 }}
//                 className="logout route"
//                 style={auth && auth.type === "admin" ? { marginTop: "5%" } : {}}
//               >
//                 <img
//                   width="50"
//                   height="50"
//                   style={{ display: "block" }}
//                   src="https://img.icons8.com/ios-filled/50/FFFFFF/logout-rounded-left.png"
//                   alt="logout-rounded-left"
//                   className="routeIcon"
//                 />
//                 <div className="routeName logoutText">Logout</div>
//               </div>
//             </div>
//           </div>
//           <div className="menuIconContainer">
//             <img
//               onClick={() => {
//                 setSideBarVisible(!sideBarVisible);
//               }}
//               className="menuIcon"
//               src="https://img.icons8.com/ios-filled/50/4D4D4D/menu-squared-2.png"
//               alt="menu-squared-2"
//             />
//           </div>
//         </div>
//       )}
//       <Outlet />
//     </>
//   );
// };

// export default CustomSidebar;

// Modern animated sidebar with preserved navigation logic
// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router";
// import { useDispatch, useSelector } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";
// import { setAuth, setTab } from "../../Redux/Store";
// import { useMediaQuery } from "../../Custom_hooks/Custom";
// import {
//   Home,
//   BookOpen,
//   ClipboardList,
//   TestTube,
//   Upload,
//   Database,
//   Users,
//   LogOut,
//   Menu,
//   ChevronRight,
// } from "lucide-react";

// const SidebarItem = ({ icon: Icon, label, active, onClick, children }) => (
//   <div>
//     <motion.div
//       whileHover={{ x: 6 }}
//       onClick={onClick}
//       className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
//         active ? "bg-[#333F6B] text-white" : "text-gray-300 hover:bg-white/5"
//       }`}
//     >
//       <Icon size={20} />
//       <span className="text-sm font-medium">{label}</span>
//     </motion.div>
//     {children}
//   </div>
// );

// const SubItem = ({ label, active, onClick }) => (
//   <motion.div
//     whileHover={{ x: 6 }}
//     onClick={onClick}
//     className={`ml-8 mt-1 px-3 py-2 rounded-lg cursor-pointer text-sm flex items-center gap-2 ${
//       active ? "text-white" : "text-gray-400 hover:text-white"
//     }`}
//   >
//     <ChevronRight size={14} />
//     {label}
//   </motion.div>
// );

// const CustomSidebar = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const [open, setOpen] = useState(!isMobile);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const tab = useSelector((state) => state.user.Tab);
//   const auth = useSelector((state) => state.user.auth);

//   useEffect(() => {
//     if (isMobile) setOpen(false);
//   }, [tab, isMobile]);

//   const go = (path, filter) => {
//     dispatch(setTab(filter ? `${path}/${filter}` : path));
//     navigate(path, { state: { filter } });
//   };

//   const isAdmin = auth?.type === "admin";

//   return (
//     <div className="flex">
//       <AnimatePresence>
//         {open && (
//           <motion.aside
//             initial={{ x: -260 }}
//             animate={{ x: 0 }}
//             exit={{ x: -260 }}
//             transition={{ type: "spring", stiffness: 260, damping: 25 }}
//             className="w-64 min-h-screen bg-[#0F1224] p-4 fixed md:static z-50"
//           >
//             <div className="text-white font-bold text-xl mb-6">
//               RVGO {isAdmin ? "ADMIN" : "USER"}
//             </div>

//             <SidebarItem
//               icon={Home}
//               label="Dashboard"
//               active={tab.includes("dashboard")}
//               onClick={() =>
//                 go(isAdmin ? "/admin/dashboard" : "/user/dashboard")
//               }
//             />

//             <SidebarItem
//               icon={BookOpen}
//               label="Practice Tests"
//               active={tab.includes("practice")}
//             >
//               <SubItem
//                 label="English Reading"
//                 active={tab.includes("English Reading")}
//                 onClick={() =>
//                   go(
//                     isAdmin ? "/admin/test/practice" : "/test/practice",
//                     "English Reading"
//                   )
//                 }
//               />
//               <SubItem
//                 label="English Writing"
//                 active={tab.includes("English Writing")}
//                 onClick={() =>
//                   go(
//                     isAdmin ? "/admin/test/practice" : "/test/practice",
//                     "English Writing"
//                   )
//                 }
//               />
//               <SubItem
//                 label="Maths"
//                 active={tab.includes("Maths")}
//                 onClick={() =>
//                   go(
//                     isAdmin ? "/admin/test/practice" : "/test/practice",
//                     "Maths"
//                   )
//                 }
//               />
//               <SubItem
//                 label="Miscellaneous"
//                 active={tab.includes("Miscellaneous")}
//                 onClick={() =>
//                   go(
//                     isAdmin ? "/admin/test/practice" : "/test/practice",
//                     "Miscellaneous"
//                   )
//                 }
//               />
//             </SidebarItem>

//             <SidebarItem
//               icon={ClipboardList}
//               label="Mock Tests"
//               active={tab.includes("mock")}
//               onClick={() => go(isAdmin ? "/admin/test/mock" : "/test/mock")}
//             />

//             <SidebarItem
//               icon={TestTube}
//               label="Diagnostic Tests"
//               active={tab.includes("diagnostic")}
//               onClick={() =>
//                 go(isAdmin ? "/admin/test/diagnostic" : "/test/diagnostic")
//               }
//             />

//             {isAdmin && (
//               <>
//                 <SidebarItem
//                   icon={Upload}
//                   label="Upload Tests"
//                   active={tab.includes("upload")}
//                   onClick={() => go("/admin/test/upload")}
//                 />
//                 <SidebarItem
//                   icon={Database}
//                   label="Question Database"
//                   active={tab.includes("database")}
//                   onClick={() => go("/admin/access/questions/database")}
//                 />
//                 <SidebarItem
//                   icon={Users}
//                   label="Users"
//                   active={tab.includes("/admin/access/users")}
//                   onClick={() => go("/admin/access/users")}
//                 />
//               </>
//             )}

//             <SidebarItem
//               icon={LogOut}
//               label="Logout"
//               onClick={() => {
//                 dispatch(setAuth(null));
//                 navigate("/auth");
//               }}
//             />
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {isMobile && (
//         <button
//           onClick={() => setOpen((v) => !v)}
//           className="fixed top-4 left-4 z-50 bg-[#333F6B] text-white p-2 rounded-xl"
//         >
//           <Menu />
//         </button>
//       )}

//       <main className="flex-1 md:ml-64">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// Modern animated sidebar with 100vh height & foldable Practice Tests
// Modern animated sidebar with 100vh height & foldable Practice Tests
// Modern animated sidebar with 100vh height & foldable Practice Tests
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { setAuth, setTab } from "../../Redux/Store";
import { useMediaQuery } from "../../Custom_hooks/Custom";
import {
  Home,
  BookOpen,
  ClipboardList,
  TestTube,
  Upload,
  Database,
  Users,
  LogOut,
  Menu,
  ChevronRight,
  CircleUserRound,
} from "lucide-react";

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  onClick,
  rightIcon,
  children,
}) => (
  <div>
    <motion.div
      whileHover={{ x: 6 }}
      onClick={onClick}
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
        active ? "bg-[#333F6B] text-white" : "text-gray-300 hover:bg-white/5"
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={20} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {rightIcon}
    </motion.div>
    {children}
  </div>
);

const SubItem = ({ label, active, onClick }) => (
  <motion.div
    whileHover={{ x: 6 }}
    onClick={onClick}
    className={`ml-10 mt-1 px-3 py-3 md:py-2 rounded-lg cursor-pointer text-sm flex items-center gap-2 ${
      active ? "text-white" : "text-gray-400 hover:text-white"
    }`}
  >
    <ChevronRight size={14} />
    {label}
  </motion.div>
);

// const CustomSidebar = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const [open, setOpen] = useState(!isMobile);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const tab = useSelector((state) => state.user.Tab);
//   const auth = useSelector((state) => state.user.auth);

//   const [practiceOpen, setPracticeOpen] = useState(tab.includes("practice"));

//   useEffect(() => {
//     if (isMobile) setOpen(false);
//     if (tab.includes("practice")) setPracticeOpen(true);
//   }, [tab, isMobile]);

//   const go = (path, filter) => {
//     dispatch(setTab(filter ? `${path}/${filter}` : path));
//     navigate(path, { state: { filter } });
//   };

//   const isAdmin = auth?.type === "admin";

//   return (
//     <div className="flex">
//       <AnimatePresence>
//         {open && (
//           <motion.aside
//             initial={{ x: -260 }}
//             animate={{ x: 0 }}
//             exit={{ x: -260 }}
//             transition={{ type: "spring", stiffness: 260, damping: 25 }}
//             className="w-[20%] min-w-[20%] max-w-[20%] flex-shrink-0 h-screen bg-[#0F1224] fixed md:static z-50 flex flex-col"
//           >
//             {/* Header */}
//             <div className="text-white font-bold text-xl p-4 border-b border-white/10">
//               RVGO {isAdmin ? "ADMIN" : "USER"}
//             </div>

//             {/* Scrollable Menu */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-1">
//               <SidebarItem
//                 icon={Home}
//                 label="Dashboard"
//                 active={tab.includes("dashboard")}
//                 onClick={() =>
//                   go(isAdmin ? "/admin/dashboard" : "/user/dashboard")
//                 }
//               />

//               <SidebarItem
//                 icon={BookOpen}
//                 label="Practice Tests"
//                 active={tab.includes("practice")}
//                 onClick={() => setPracticeOpen((v) => !v)}
//                 rightIcon={
//                   <motion.div
//                     animate={{ rotate: practiceOpen ? 90 : 0 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     <ChevronRight size={16} />
//                   </motion.div>
//                 }
//               >
//                 <AnimatePresence>
//                   {practiceOpen && (
//                     <motion.div
//                       initial={{ height: 0, opacity: 0 }}
//                       animate={{ height: "auto", opacity: 1 }}
//                       exit={{ height: 0, opacity: 0 }}
//                       transition={{ duration: 0.25, ease: "easeInOut" }}
//                       className="overflow-hidden"
//                     >
//                       <SubItem
//                         label="English Reading"
//                         active={tab.includes("English Reading")}
//                         onClick={() =>
//                           go(
//                             isAdmin ? "/admin/test/practice" : "/test/practice",
//                             "English Reading"
//                           )
//                         }
//                       />
//                       <SubItem
//                         label="English Writing"
//                         active={tab.includes("English Writing")}
//                         onClick={() =>
//                           go(
//                             isAdmin ? "/admin/test/practice" : "/test/practice",
//                             "English Writing"
//                           )
//                         }
//                       />
//                       <SubItem
//                         label="Maths"
//                         active={tab.includes("Maths")}
//                         onClick={() =>
//                           go(
//                             isAdmin ? "/admin/test/practice" : "/test/practice",
//                             "Maths"
//                           )
//                         }
//                       />
//                       <SubItem
//                         label="Miscellaneous"
//                         active={tab.includes("Miscellaneous")}
//                         onClick={() =>
//                           go(
//                             isAdmin ? "/admin/test/practice" : "/test/practice",
//                             "Miscellaneous"
//                           )
//                         }
//                       />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </SidebarItem>

//               <SidebarItem
//                 icon={ClipboardList}
//                 label="Mock Tests"
//                 active={tab.includes("mock")}
//                 onClick={() => go(isAdmin ? "/admin/test/mock" : "/test/mock")}
//               />

//               <SidebarItem
//                 icon={TestTube}
//                 label="Diagnostic Tests"
//                 active={tab.includes("diagnostic")}
//                 onClick={() =>
//                   go(isAdmin ? "/admin/test/diagnostic" : "/test/diagnostic")
//                 }
//               />

//               {isAdmin && (
//                 <>
//                   <SidebarItem
//                     icon={Upload}
//                     label="Upload Tests"
//                     active={tab.includes("upload")}
//                     onClick={() => go("/admin/test/upload")}
//                   />
//                   <SidebarItem
//                     icon={Database}
//                     label="Question Database"
//                     active={tab.includes("database")}
//                     onClick={() => go("/admin/access/questions/database")}
//                   />
//                   <SidebarItem
//                     icon={Users}
//                     label="Users"
//                     active={tab.includes("/admin/access/users")}
//                     onClick={() => go("/admin/access/users")}
//                   />
//                 </>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="p-4 border-t border-white/10">
//               <SidebarItem
//                 icon={LogOut}
//                 label="Logout"
//                 onClick={() => {
//                   dispatch(setAuth(null));
//                   navigate("/auth");
//                 }}
//               />
//             </div>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {isMobile && (
//         <button
//           onClick={() => setOpen((v) => !v)}
//           className="fixed top-4 left-4 z-50 bg-[#333F6B] text-white p-2 rounded-xl"
//         >
//           <Menu />
//         </button>
//       )}

//       <main className="flex-1 md:ml-[0%]">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default CustomSidebar;

const CustomSidebar = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(!isMobile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tab = useSelector((state) => state.user.Tab);
  const auth = useSelector((state) => state.user.auth);

  const [practiceOpen, setPracticeOpen] = useState(tab.includes("practice"));

  useEffect(() => {
    if (isMobile) setOpen(false);
    if (tab.includes("practice")) setPracticeOpen(true);
  }, [tab, isMobile]);

  const go = (path, filter) => {
    dispatch(setTab(filter ? `${path}/${filter}` : path));
    navigate(path, { state: { filter } });
  };

  const isAdmin = auth?.type === "admin";

  return (
    <div className={`flex `}>
      {isMobile && (
        <button
          onClick={() => setOpen((v) => !v)}
          className={`absolute top-4 left-4 z-50 bg-[#333F6B] text-white p-2 rounded-xl ${
            open ? "shiftMenu" : "reshiftMenu"
          }`}
        >
          <Menu />
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: isMobile ? -300 : 0 }}
            animate={{ x: 0 }}
            exit={{ x: isMobile ? -300 : 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className={`
              bg-[#0F1224] flex flex-col
              ${
                isMobile
                  ? "w-4/5 fixed top-0 left-0 h-screen z-40"
                  : "w-[20%] min-w-[20%] max-w-[20%] flex-shrink-0 h-screen md:static"
              }
            `}
          >
            {/* {isMobile && <div className="h-16" />}{" "} */}

            <div
              style={{
                justifyContent: "left",
                alignItems: "center",
                textAlign: "center",
              }}
              className=" flex text-white font-bold text-xl p-4 border-b border-white/10 "
            >
              <CircleUserRound />
              &nbsp; {isAdmin ? "ADMIN PANEL" : "STUDENT PANEL"}
            </div>
            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <SidebarItem
                icon={Home}
                label="Dashboard"
                active={tab.includes("dashboard")}
                onClick={() =>
                  go(isAdmin ? "/admin/dashboard" : "/user/dashboard")
                }
              />

              <SidebarItem
                icon={BookOpen}
                label="Practice Tests"
                active={tab.includes("practice")}
                onClick={() => setPracticeOpen((v) => !v)}
                rightIcon={
                  <motion.div
                    animate={{ rotate: practiceOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                }
              >
                <AnimatePresence>
                  {practiceOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <SubItem
                        label="English Reading"
                        active={tab.includes("English Reading")}
                        onClick={() =>
                          go(
                            isAdmin ? "/admin/test/practice" : "/test/practice",
                            "English Reading"
                          )
                        }
                      />
                      <SubItem
                        label="English Writing"
                        active={tab.includes("English Writing")}
                        onClick={() =>
                          go(
                            isAdmin ? "/admin/test/practice" : "/test/practice",
                            "English Writing"
                          )
                        }
                      />
                      <SubItem
                        label="Maths"
                        active={tab.includes("Maths")}
                        onClick={() =>
                          go(
                            isAdmin ? "/admin/test/practice" : "/test/practice",
                            "Maths"
                          )
                        }
                      />
                      <SubItem
                        label="Miscellaneous"
                        active={tab.includes("Miscellaneous")}
                        onClick={() =>
                          go(
                            isAdmin ? "/admin/test/practice" : "/test/practice",
                            "Miscellaneous"
                          )
                        }
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </SidebarItem>

              <SidebarItem
                icon={ClipboardList}
                label="Mock Tests"
                active={tab.includes("mock")}
                onClick={() => go(isAdmin ? "/admin/test/mock" : "/test/mock")}
              />

              <SidebarItem
                icon={TestTube}
                label="Diagnostic Tests"
                active={tab.includes("diagnostic")}
                onClick={() =>
                  go(isAdmin ? "/admin/test/diagnostic" : "/test/diagnostic")
                }
              />
              {!isAdmin && (
                <SidebarItem
                  icon={ClipboardList}
                  label="My Analysis"
                  active={tab === "/user/tests/analysis"}
                  onClick={() => {
                    dispatch(setTab("/user/tests/analysis"));
                    navigate("/user/tests/analysis", {
                      state: { user: auth.data, filter: "analysis" },
                    });
                  }}
                />
              )}

              {isAdmin && (
                <>
                  <SidebarItem
                    icon={Upload}
                    label="Upload Tests"
                    active={tab.includes("upload")}
                    onClick={() => go("/admin/test/upload")}
                  />
                  <SidebarItem
                    icon={Database}
                    label="Question Database"
                    active={tab.includes("database")}
                    onClick={() => go("/admin/access/questions/database")}
                  />
                  <SidebarItem
                    icon={Users}
                    label="Users"
                    active={tab.includes("/admin/access/users")}
                    onClick={() => go("/admin/access/users")}
                  />
                </>
              )}
            </div>
            {/* Footer */}
            <div className="p-4 border-t border-white/10">
              <SidebarItem
                icon={LogOut}
                label="Logout"
                onClick={() => {
                  dispatch(setAuth(null));
                  navigate("/auth");
                }}
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <main className="flex-1 md:ml-[0%]">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomSidebar;
