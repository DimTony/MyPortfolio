"use client";

import {
  Hero,
  About,
  TechStack,
  Projects,
  Testimonials,
  Contact,
  Footer,
  Loader,
  NavBar,
} from "@/app/sections";
import SideBar from "./components/SideBar";
import Menu from "./sections/Menu";

export default function Home() {
  return (
    <>
      <div
        // className=""
        
        style={{
          backgroundColor: "var(--pagebackground)",
          color: "var(--foreground)",
        }}
      >
        {/* <Loader />
        <NavBar />
        <SideBar /> */}
        <Hero />
        {/* <About /> */}
        <Menu />
        <TechStack />
        {/* <Projects /> */}
        {/* <Testimonials /> */}
        {/* <Contact /> */}
        <Footer />
      </div>
    </>
  );
}
