"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Bars3Icon, UserIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery(1024);
  const { data: session, status } = useSession();

  return (
    <nav
      className={`flex justify-center items-center py-2 px-4 w-full z-40 !sticky top-0 bg-primary text-center ${
        !isMobile ? "underline-custom" : ""
      }`}
    >
      {/* Hamburger Menu Button (Mobile) */}
      <button
        className="fixed top-5 right-5 z-10 lg:hidden text-secondary bg-primary rounded-lg focus:outline-none"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Bars3Icon className="h-8 w-8" />
      </button>

      {/* Desktop Menu */}
      <div className="w-full md:max-w-xl lg:max-w-2xl xl:max-w-6xl hidden lg:flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            loading="lazy"
            className="w-32 drop-shadow-logo"
          />
        </Link>
        <div className="flex justify-center items-center gap-4">
          <Link href={"/"} className="link">
            Strona główna
          </Link>
          <Link href={"/vodkas"} className="link">
            Porównywarka cen
          </Link>
          <Link href={"/about"} className="link">
            O nas
          </Link>
        </div>

        <Link
          href={`${status === "authenticated" ? "/user" : "/auth"}`}
          className="cursor-pointer rounded-full p-2 transition-colors duration-300 ease-in-out hover:bg-button hover:text-primary hover:drop-shadow-logo"
        >
          <UserIcon className="w-10 h-10" />
        </Link>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-primary flex flex-col justify-center items-center gap-4 lg:hidden">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={64}
            height={64}
            loading="lazy"
            className="w-44 drop-shadow-logo"
          />
          <div className="underline-custom flex flex-col justify-center items-center">
            <Link
              href={"/"}
              className="link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Strona główna
            </Link>
            <Link
              href={"/vodkas"}
              className="link"
              onClick={() => setMobileMenuOpen(false)}
            >
              Porównywarka cen
            </Link>
            <Link
              href={"/about"}
              className="link"
              onClick={() => setMobileMenuOpen(false)}
            >
              O nas
            </Link>
          </div>

          <Link
            href={`${status === "authenticated" ? "/user" : "/auth"}`}
            className="cursor-pointer rounded-full p-2 transition-colors duration-300 ease-in-out hover:bg-button hover:text-primary hover:drop-shadow-logo"
          >
            <UserIcon className="w-10 h-10" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
