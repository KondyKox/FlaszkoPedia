import { ModalProps } from "@/types/ModalProps";
import { XMarkIcon } from "@heroicons/react/16/solid";

const Modal = ({
  isOpen,
  onClose,
  children,
}: ModalProps & { children: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 w-full bg-slate-900 bg-opacity-70">
      <div
        className="group rounded-lg py-10 px-4 md:px-8 mx-4 w-full md:w-2/3 lg:w-1/2 flex flex-col justify-center items-center
                    transition-all duration-300 ease-in-out relative bg-gradient-secondary max-h-screen overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="btn absolute top-4 right-4 border-none"
        >
          <XMarkIcon className="w-8 h-8 font-bold text-primary hover:text-red-500 transition-colors duration-300 ease-in-out" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
