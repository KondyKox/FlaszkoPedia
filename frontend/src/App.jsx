import ItemList from "./components/ItemList";
import Header from "./components/Header";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState("");

  return (
    <main className="flex flex-col justify-center items-center gap-8 pb-10">
      <Header setSearch={setSearch} />
      <ItemList search={search} />
    </main>
  );
}
