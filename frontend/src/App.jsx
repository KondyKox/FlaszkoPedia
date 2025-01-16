import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Vodkas from "./pages/Vodkas";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="flex flex-col justify-center items-center gap-8 w-full">
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/vodkas" element={<Vodkas />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}
