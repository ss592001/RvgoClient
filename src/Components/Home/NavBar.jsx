// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   Link,
//   Button,
// } from "@nextui-org/react";
// import logo from "../../images/logo.png";
// export default function NavBar() {
//   return (
//     <div className="navBarContainer" >
//       <div>
//         <img src={logo} alt="logo" className="logo" />
//       </div>
//       {/* <button className="mainLoginButton" type="submit">
//         LOGIN
//       </button> */}
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  HoveredLink,
  Menu,
  MenuItem,
  ProductItem,
} from "@/components/ui/navbar-menu";
import { useMediaQuery } from "Components/Custom_hooks/Custom";
import logo from "../../images/logo.png";
import { Button } from "@/components/ui/moving-border";
import { useNavigate } from "react-router";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
export function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const isMobile = useMediaQuery("(max-width:430px)");
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`fixed top-10 inset-x-0 max-w-6xl mx-auto z-50 ${className}`}
      >
        <Menu setActive={setActive}>
          {/* <img src={logo} alt="logo" className="logo" /> */}

          <MenuItem setActive={setActive} active={active} item={"Helios"}>
            <div className="flex flex-col space-y-4 text-sm z-9999">
              <img src={logo} alt="logo" className="logo" />
            </div>
          </MenuItem>

          <MenuItem setActive={setActive} active={active} item="Services">
            <div className="flex flex-col space-y-4 text-sm z-9999">
              <HoveredLink href="/web-dev">Web Development</HoveredLink>
              <HoveredLink href="/interface-design">
                Interface Design
              </HoveredLink>
              <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
              <HoveredLink href="/branding">Branding</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem
            setActive={setActive}
            active={active}
            item="Products"
            className={"leftAlign"}
          >
            <div
              className={`text-sm grid grid-cols-${isMobile ? 1 : 2} gap-${
                isMobile ? 10 : 10
              } p-4 z-9999`}
            >
              <ProductItem
                title="Practice Tests"
                href="https://algochurn.com"
                src="https://assets.aceternity.com/demos/algochurn.webp"
                description="Prepare for tech interviews like never before."
              />
              <ProductItem
                title="Mock Tests"
                href="https://tailwindmasterkit.com"
                src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
                description="Production ready Tailwind css components for your next project"
              />
              <ProductItem
                title="Live Classes"
                href="https://gomoonbeam.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
                description="Never write from scratch again. Go from idea to blog in minutes."
              />
              <ProductItem
                title={"Training"}
                href="https://userogue.com"
                src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
                description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
              />
            </div>
          </MenuItem>
          {!isMobile && (
            <MenuItem setActive={setActive} active={active} item="About Us">
              <div className="flex flex-col space-y-4 text-sm z-9999">
                <HoveredLink href="/web-dev">Web Development</HoveredLink>
                <HoveredLink href="/interface-design">
                  Interface Design
                </HoveredLink>
                <HoveredLink href="/seo">
                  Search Engine Optimization
                </HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink>
              </div>
            </MenuItem>
          )}
          {!isMobile && (
            <MenuItem setActive={setActive} active={active} item="Contact Us">
              <div className="flex flex-col space-y-4 text-sm z-9999">
                <HoveredLink href="/hobby">Hobby</HoveredLink>
                <HoveredLink href="/individual">Individual</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                <HoveredLink href="/enterprise">Enterprise</HoveredLink>
              </div>
            </MenuItem>
          )}
          {/* {isMobile && ( */}
          <MenuItem
            setActive={setActive}
            active={active}
            item={
              <div
                style={{ color: "purple" }}
                onClick={() => {
                  console.log("hhhh");
                  navigate("/auth");
                }}
              >
                Login
              </div>
            }
          >
            <div className="flex flex-col space-y-4 text-sm z-9999">
              <HoveredLink href="/hobby">Hobby</HoveredLink>
              <HoveredLink href="/individual">Individual</HoveredLink>
              <HoveredLink href="/team">Team</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
          {/* )} */}
        </Menu>
      </div>
    </>
  );
}
