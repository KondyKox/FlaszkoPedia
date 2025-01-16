import ItemList from "./components/ItemList";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <main className="flex flex-col justify-center items-center gap-8 w-full">
      <Header />
      <ItemList />
      <Footer />
    </main>
  );
}
