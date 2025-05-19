import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import Image from "next/image";

const Contact = () => {
  return (
    <Layout>
      <div className="pt-[6rem] pb-[2rem] px-[2rem] w-full flex gap-6 ">
        <Card className="w-full h-[calc(100vh-8rem)] ">
          <div className="px-[2rem] h-full py-[2rem] flex flex-col">
            <div className=" w-full h-full flex items-center gap-4">
              <div className="w-[60%] z-10 flex flex-col gap-[1rem] h-full ">
                <span
                  style={{
                    color: "var(--resume-foreground)",
                  }}
                  className="text-[2rem] "
                >
                  Get In Touch!
                </span>

                <div>
                  <div className="w-full flex flex-col ">
                    <label
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="h-[3rem] w-full rounded-[8px] glass-card px-3 border border-gray-300"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <label
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="text"
                      className="h-[3rem] w-full rounded-[8px] glass-card px-3 border border-gray-300"
                    />
                  </div>

                  <div className="w-full flex flex-col mb-[1rem]">
                    <label
                      style={{
                        color: "var(--resume-foreground)",
                      }}
                    >
                      Message
                    </label>
                    <textarea className="w-full py-1 min-h-[7rem] rounded-[8px] glass-card px-3 border border-gray-300" />
                  </div>

                  <button className="px-3 py-2 cursor-pointer hover:scale-102 bg-[#a2bdf2] rounded-[8px]  ">
                    <span className="text-black">Send Message</span>
                  </button>
                </div>
              </div>
              <div className="relative w-[40%] h-full flex items-center justify-center">
                <Image
                  src="/images/me.png"
                  alt="me"
                  width={200}
                  height={200}
                  className="scale-x-[-1] absolute top-[10%]"
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Contact;
