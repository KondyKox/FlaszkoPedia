import { User } from "next-auth";
import { useEffect, useState } from "react";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users.");

      const data: User[] = await res.json();
      setUsers(data);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return { users, loading };
};
