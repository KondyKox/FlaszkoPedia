// import { LinkIcon } from "@heroicons/react/24/outline";
// import Link from "next/link";

const Footer = () => {
  return (
    <footer className="overline-custom w-full flex flex-col justify-center items-center text-center px-2 my-4 sticky bottom-0">
      <h6 className="text-2xl">
        {/* Link to GitHub repo */}
        {/* <Link
          href="https://github.com/KondyKox/FlaszkoPedia"
          target="blank"
          className="flex justify-center items-center gap-2 transition-colors duration-300 ease-in-out hover:text-button"
        >
          FlaszkoPedia
          <LinkIcon className="w-6 h-6" />
        </Link> */}
        FlaszkoPedia
      </h6>
      <span className="font-bold text-slate-400">
        Od lat najlepsza porównywarka cen wódki w Polsce
      </span>
    </footer>
  );
};

export default Footer;
