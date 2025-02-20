"use client";

import { ScaleIcon, SparklesIcon, StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [logoFade, setLogoFade] = useState<boolean>(false);
  const [descriptionFade, setDescriptionFade] = useState<boolean>(false);
  const [visibleDivs, setVisibleDivs] = useState<{ [key: number]: boolean }>(
    {}
  ); // Fade for divs
  const divRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setDivRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) divRefs.current[index] = el;
  };

  // Fade for header
  useEffect(() => {
    setTimeout(() => setLogoFade(true), 700);
    setTimeout(() => setDescriptionFade(true), 1400);
  }, []);

  // Fade for divs in section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleDivs((prev) => ({ ...prev, [index]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    divRefs.current.forEach((div) => {
      if (div) observer.observe(div);
    });

    return () => {
      divRefs.current.forEach((div) => {
        if (div) observer.unobserve(div);
      });
    };
  }, []);

  return (
    <>
      <header className="flex flex-col justify-center items-center w-full md:h-[calc(100vh-6rem)]">
        <div
          className={`flex flex-col justify-center items-center relative transition-opacity duration-500 ease-in-out ${
            logoFade ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="header absolute opacity-30 top-1/2 -translate-y-1/2">
            FlaszkoPedia
          </h1>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={128}
            height={128}
            priority
            className="w-64 md:w-1/2 lg:w-2/3 xl:w-5/6 drop-shadow-logo"
          />
          <p
            className={`font-bold text-slate-400 text-sm md:text-xl lg:text-3xl transition-opacity duration-500 ease-in-out ${
              descriptionFade ? "opacity-100" : "opacity-0"
            }`}
          >
            Porównywarka cen wódki
          </p>
        </div>
      </header>

      <section
        className={`flex flex-col items-center justify-center gap-4 p-2 w-full md:w-3/4 xl:w-1/2 transition-all duration-700 ease-out ${
          visibleDivs ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          ref={(el) => setDivRefs(el, 0)}
          data-index="0"
          className={`flex flex-col items-center justify-center gap-8 py-12 px-4 bg-button text-golden rounded-lg w-full transition-opacity duration-700 ease-out ${
            visibleDivs[0] ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="sub-header-secondary">
            Dlaczego warto korzystać z FlaszkoPedi?
          </h2>
          <ul className="flex flex-col md:flex-row gap-8 md:gap-16 items-stretch">
            <li className="flex flex-col items-center text-center flex-1 w-full h-full">
              <ScaleIcon className="w-16 h-16 text-primary mb-4" />
              <p className="text-sm md:text-lg font-semibold">Porównuj ceny</p>
              <p className="text-xs md:text-sm text-slate-200">
                Znajdź najtańsze oferty w sklepach.
              </p>
            </li>
            <li className="flex flex-col items-center text-center flex-1 w-full h-full">
              <StarIcon className="w-16 h-16 text-primary mb-4" />
              <p className="text-sm md:text-lg font-semibold">Podziwiaj</p>
              <p className="text-xs md:text-sm text-slate-200">
                Bo ta aplikacja jest doskonała.
              </p>
            </li>
            <li className="flex flex-col items-center text-center flex-1 w-full h-full">
              <SparklesIcon className="w-16 h-16 text-primary mb-4" />
              <p className="text-sm md:text-lg font-semibold">Zdrówko 🍻</p>
              <p className="text-xs md:text-sm text-slate-200">
                Bo co to za dzień bez wódki czy browara?
              </p>
            </li>
          </ul>
        </div>

        <div
          ref={(el) => setDivRefs(el, 1)}
          data-index="1"
          className={`flex flex-col items-center justify-center gap-2 py-12 px-4 bg-gray-300 rounded-lg w-full transition-opacity duration-700 ease-out delay-300 ${
            visibleDivs[1] ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="sub-header">Zacznij teraz!</h2>
          <Link href="/vodkas" className="link">
            Porównaj ceny wybranej wódki
          </Link>
        </div>
      </section>
    </>
  );
}
