import { useVodkas } from "@/hooks/useVodkas";
import LoadingText from "../loading/LoadingText";
import { useState } from "react";
import Modal from "../modal/Modal";
import { Vodka } from "@/types/VodkaProps";
import ConfirmDelete from "../modal/confirm-delete";

const AdminVodkaPanel = () => {
  const { vodkas, loading, refreshVodkas } = useVodkas();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedVodka, setSelectedVodka] = useState<Vodka | null>(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVodka(null);
  };

  // Delete vodka
  const confirmDeleteVodka = (vodka: Vodka) => {
    if (!vodka) return;

    setIsModalOpen(true);
    setSelectedVodka(vodka);
  };

  if (loading) return <LoadingText />;

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="sub-header">Zarządzanie wódkami</h2>
        <ul className="space-y-2 w-full overflow-y-auto max-h-[500px] pr-2">
          {vodkas.map((vodka) => (
            <li
              key={vodka._id}
              className="bg-secondary text-primary rounded-lg p-2 flex justify-between items-center"
            >
              {vodka.name}
              <div className="flex gap-2">
                <button className="btn btn-secondary">✏️</button>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDeleteVodka(vodka)}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedVodka={selectedVodka}
        setSelectedVodka={setSelectedVodka}
      />
    </>
  );
};

export default AdminVodkaPanel;
