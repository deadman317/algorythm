"use client";

import Link from "next/link";
import Image from "next/image";
import Theme from "./Theme";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];
const Navbar = () => {
  const pathname = usePathname();
  return (
    <header className="inset-x-0 top-0 my-2 rounded-2xl bg-primary bg-opacity-70">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
          <Link href="/" className="flex items-center gap-x-4 ">
            <Image
              className="h-8 w-8"
              src="/logo.png"
              alt="Algorythm"
              width={120}
              height={120}
              priority={true}
            />
            <span className="text-2xl font-semibold">AlgoRythm</span>
          </Link>
        </div>
        <div className="flex gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathname === item.href ? "text-green-300" : ""
              } text-lg font-medium leading-6`}
            >
              {item.name}
            </Link>
          ))}
          <Theme />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
