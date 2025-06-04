"use client";

import AdminUsersPanel from "@/components/admin/AdminUsersPanel";
import AdminVodkaPanel from "@/components/admin/AdminVodkaPanel";
import LoadingOverlay from "@/components/loading/LoadingOverlay";
import { ADMIN_TABS } from "@/constants/admin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(ADMIN_TABS[0].id);

  useEffect(() => {
    if (!session || session.user.role !== "admin") router.replace("/");
  }, [session, status, router]);

  if (status === "loading")
    return <LoadingOverlay message="Wczytuję panel admina" />;

  return (
    <section className="flex flex-col md:flex-row md:p-6 justify-between w-full items-stretch gap-4">
      <aside className="bg-button py-8 px-4 rounded-xl">
        <div className="flex flex-col justify-center items-center gap-2 text-primary">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`btn flex-1 w-full border-none hover:bg-secondary ${
                activeTab === tab.id ? "bg-gradient-secondary font-bold" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex gap-2 w-full justify-between items-center py-2">
                <tab.icon className="w-8 h-8" />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      <aside className="bg-akcent p-4 rounded-xl flex-1">
        {activeTab === "users" && <AdminUsersPanel />}
        {activeTab === "vodkas" && <AdminVodkaPanel />}
      </aside>
    </section>
  );
};

export default AdminPage;
