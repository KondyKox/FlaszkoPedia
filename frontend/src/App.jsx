import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Vodkas from "./pages/Vodkas";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>
      <Navbar />
      <main className="flex flex-col justify-center items-center gap-8 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vodkas" element={<Vodkas />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}
