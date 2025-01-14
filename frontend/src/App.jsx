import ItemList from "./components/ItemList";
import Header from "./components/Header";

export default function App() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 pb-10 w-full">
      <Header />
      <ItemList />
    </main>
  );
}
