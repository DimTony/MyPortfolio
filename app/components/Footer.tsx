import Link from "next/link";
import { footerIconsList } from "../constants";

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      className="w-full flex-center flex-col md:gap-10 gap-7  py-10"
    >
      <div>
        <div
          // src="var(--logo-image)"
          style={{
            backgroundImage: "var(--logo-image)",
            backgroundSize: "cover",
          }}
          // alt="logo"
          className="w-7 h-7 object-cover object-center"
        />
      </div>
      <div className="flex items-center md:gap-16 gap-8">
        {footerIconsList.map((icon, index) => (
          <Link key={index} href={icon.href}>
            <div className="cursor-pointer hover:-translate-y-2 transition-all duration-700">
              <img
                src={icon.icon}
                alt={icon.name}
                className="md:size-10 size-8"
              />
            </div>
          </Link>
        ))}
      </div>
      <p className="font-regular md:text-lg text-sm">
        2025 © All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
