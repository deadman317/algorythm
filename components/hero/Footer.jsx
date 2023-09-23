import React from "react";
import Image from "next/image";

const icons = [
  {
    name: "github",
    src: "/github.svg",
    href: "#",
  },
  {
    name: "twitter",
    src: "/twitter.svg",
    href: "#",
  },
  {
    name: "linkedin",
    src: "/linkedin.svg",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer>
      <div>
        <hr className=" h-[2px] border-none bg-primary bg-opacity-30" />
      </div>
      <div className="flex items-center justify-between px-6 py-4 text-lg font-medium text-primary">
        <span>Copyright &copy; 2023 AlgoRythm. All Rights Reserved.</span>
        <div className="flex gap-x-4">
          {icons.map((icon) => (
            <Image
              key={icon.name}
              src={icon.src}
              alt={icon.name}
              width={0}
              height={0}
              className="h-auto w-6 cursor-pointer"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
