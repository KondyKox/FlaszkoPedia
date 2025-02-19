import { LinkIcon } from "@heroicons/react/24/outline";

const Footer = () => {
  return (
    <footer className="overline-custom w-full flex flex-col justify-center items-center text-center px-2 my-4">
      <h6 className="text-2xl">
        <a
          href="https://github.com/KondyKox/FlaszkoPedia"
          target="blank"
          className="flex justify-center items-center gap-2 transition-colors duration-300 ease-in-out hover:text-button"
        >
          FlaszkoPedia
          <LinkIcon className="w-6 h-6" />
        </a>
      </h6>
      <span className="font-bold text-slate-400">
        Od lat najlepsza porównywarka cen wódki w Polsce
      </span>
    </footer>
  );
};

export default Footer;
