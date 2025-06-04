import { useVodkas } from "@/hooks/useVodkas";
import LoadingText from "../loading/LoadingText";

const AdminVodkaPanel = () => {
  const { vodkas, loading } = useVodkas();

  if (loading) return <LoadingText />;

  return (
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
              <button className="btn btn-danger">🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminVodkaPanel;
