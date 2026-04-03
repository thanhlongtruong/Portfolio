"use client";

export default function Footer() {
  return (
    <footer className="w-full lg:h-15 h-fit p-5 lg:mb-5 text-sm font-normal flex flex-wrap justify-between items-center border-t lg:border-0 lg:-skew-1">
      <p className="md:flex hidden">Copyright © 2025 Fruit</p>
      <p className="block md:hidden text-center w-full">©2025 Fruit</p>
      <p className="md:flex hidden">Built with Next.js & Tailwind CSS</p>
      <p className="block md:hidden text-center w-full">
        Next.js & Tailwind CSS
      </p>
    </footer>
  );
}
