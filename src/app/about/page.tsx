import { FAQ } from "@/constants/faq";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "O nas – Flaszkopedia",
  description:
    "Dowiedz się więcej o projekcie Flaszkopedia. Kto za tym stoi, jaka jest misja i jak się z nami skontaktować.",
};

const AboutPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEWA KOLUMNA - OPIS */}
        <article className="space-y-4 animate-slide-right">
          <header className="flex flex-col items-center space-y-2">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={96}
              height={96}
              priority
              className="drop-shadow-logo"
            />
            <h1 className="header whitespace-nowrap text-center">
              O Flaszkopedii
            </h1>
          </header>

          <p className="text-gray-700">
            <strong>Flaszkopedia</strong> to niezależny projekt, który powstał z
            potrzeby serca (i portfela) – żeby <strong>porównać ceny</strong>{" "}
            wódek w różnych sklepach i <strong>nie przepłacać</strong>. Tworzony
            przez jedną osobę, ale z myślą o wszystkich miłośnikach
            wysokoprocentowych trunków.
          </p>
          <p className="text-gray-700">
            Naszym celem jest dostarczanie użytkownikom aktualnych i rzetelnych
            informacji o dostępnych na rynku wódkach, ich cenach i opiniach.
            Wierzymy, że każdy powinien mieć dostęp do przejrzystych danych,
            zanim zdecyduje się na zakup.
          </p>
          <p className="text-gray-700">
            Za <strong>Flaszkopedią</strong> stoi jedna osoba – zwykły wieśniak,
            który uważa, że czysta wódka to fundament udanego weekendu. Jeśli
            tak jak ja polujesz na najlepszą cenę ulubionego trunku –{" "}
            <strong>ta strona jest właśnie dla Ciebie</strong>!
          </p>
        </article>

        {/* PRAWA KOLUMNA - FAQ */}
        <article className="space-y-4 bg-button p-6 rounded-xl text-primary shadow-md animate-slide-left">
          <h2 className="sub-header-secondary">FAQ</h2>
          <div className="space-y-2">
            {FAQ.map((faq, index) => (
              <details
                key={index}
                className="border px-4 py-2 rounded-md transition-all duration-300 open:bg-secondary/80"
              >
                <summary className="font-medium cursor-pointer">
                  {faq.question}
                </summary>
                <div className="overflow-hidden transition-all duration-300 mt-2">
                  <p className="text-sm text-golden">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default AboutPage;
