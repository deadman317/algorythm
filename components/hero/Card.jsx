import React from "react";
import Image from "next/image";
import Link from "next/link";

const navigation = [
  { name: "Sorting Visualizer", href: "/sort" },
  { name: "Path Finder", href: "/pathfinder" },
  { name: "Search Visualizer", href: "/search" },
];

const Card = () => {
  return (
    <div className="container mx-auto my-12 px-4 md:px-12">
      <div className="-mx-1 flex flex-wrap justify-center lg:-mx-4">
        {navigation.map((item) => (
          <div className="my-1 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4">
            <Link key={item.name} href={item.href}>
              <article className="overflow-hidden rounded-lg bg-primary bg-opacity-10 shadow-lg">
                <Image
                  alt="Placeholder"
                  width={500}
                  height={500}
                  className="block h-auto w-full"
                  src="/image-1.jpg"
                  priority={true}
                />

                <header className="flex items-center justify-center p-2 leading-tight md:p-4">
                  <h1 className="text-lg">{item.name}</h1>
                </header>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
