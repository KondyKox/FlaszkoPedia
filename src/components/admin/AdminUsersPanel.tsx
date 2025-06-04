import { useUsers } from "@/hooks/useUsers";
import LoadingText from "../loading/LoadingText";

const AdminUsersPanel = () => {
  const { users, loading } = useUsers();

  if (loading) return <LoadingText />;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="sub-header">Lista użytkowników</h2>
      <ul className="space-y-2 w-full overflow-y-auto max-h-[500px] pr-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="bg-secondary text-primary rounded-lg p-2 flex justify-between items-center"
          >
            <span>
              {user.email}{" "}
              <span
                className={`${
                  user.role === "admin"
                    ? "text-red-500 font-semibold"
                    : "text-blue-500"
                }`}
              >
                ({user.role})
              </span>
            </span>
            <button className="btn btn-primary">Zmień rolę</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsersPanel;
