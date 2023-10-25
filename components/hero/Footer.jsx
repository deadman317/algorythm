import React from "react";
import Image from "next/image";
import Link from "next/link";

const icons = [
  {
    name: "github",
    src: "/github.svg",
    href: "https://github.com/deadman317/",
  },
  {
    name: "leetcode",
    src: "/leetcode.svg",
    href: "https://leetcode.com/deadman317/",
  },
  {
    name: "linkedin",
    src: "/linkedin.svg",
    href: "https://www.linkedin.com/in/amirul-hasan-4a443a264/",
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
            <Link key={icon.name} href={icon.href}>
              <Image
                key={icon.name}
                src={icon.src}
                alt={icon.name}
                width={0}
                height={0}
                className="h-auto w-6 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
