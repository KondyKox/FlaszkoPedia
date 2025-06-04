import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { VodkasProvider } from "@/context/VodkasContext";
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <title>FlaszkoPedia</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Porównywarka cen wódki." />
      <meta
        name="keywords"
        content="wódka, porównywarka cen, porównywarka cen wódki, ceny wódki"
      />
      <body>
        <Providers>
          <Navbar />
          <VodkasProvider>
            <FavoritesProvider>
              <main className="flex flex-col justify-center items-center p-4 mb-10 min-h-screen">
                {children}
              </main>
            </FavoritesProvider>
          </VodkasProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
