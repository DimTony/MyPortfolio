"use client";

import { Moon } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";
import Layout from "../components/Layout";

export default function ResumePage() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Layout>
      <div className="p-6 flex flex-col items-center gap-6">
        <div className="w-full flex justify-between items-center ">
          {/* <span
            style={
              {
                // color: "var(--experience-lin-g-bg)",
              }
            }
            className="text-3xl gradient-title font-bold"
          >
            My Resume
          </span> */}
          <div  />

          <div className="flex gap-[2rem] items-center w-fit ">
            {/* <Moon
            className=" cursor-pointer  "
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            fill="var(--moon-bg)"
          /> */}
            {/* <div
              className="w-6 h-6 bg-cover cursor-pointer"
              style={{ backgroundImage: "var(--theme-image)" }}
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
            /> */}
            <a
              href="/DIMOJIAKU_OBINNA_ANTHONY_2025_RESUME.pdf"
              download
              className=" inline-block  px-4 py-2 rounded hover:bg-blue-700 transition"
              style={{
                backgroundColor: "var(--linkedIn)",
                color: "var(--foreground)",
              }}
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* Embedded PDF viewer */}
        <iframe
          src="/DIMOJIAKU_OBINNA_ANTHONY_2025_RESUME.pdf"
          className="w-full  h-[80vh] border rounded-lg shadow-lg"
          title="Resume PDF Viewer"
        />

        {/* Download Button */}
        {/* <a
        href="/DIMOJIAKU_OBINNA_ANTHONY_2025_RESUME.pdf"
        download
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Download Resume
      </a> */}
      </div>
    </Layout>
  );
}
