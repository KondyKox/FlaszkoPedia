import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import { VodkasProvider } from "@/context/VodkasContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { FeedbackProvider } from "@/context/FeedbackContext";

export const metadata: Metadata = {
  title: "Flaszkopedia – Porównywarka cen wódki",
  description:
    "Flaszkopedia to porównywarka cen alkoholu. Znajdź najtańszą flaszkę i porównaj ceny w sklepach.",
  keywords: [
    "flaszkopedia",
    "wódka",
    "porównywarka cen",
    "alkohol",
    "ranking alkoholi",
  ],
  metadataBase: new URL("https://flaszkopedia.vercel.app"), // później podmień na swoją domenę
  openGraph: {
    title: "Flaszkopedia",
    description: "Porównuj ceny wódki w sklepach – szybko i przejrzyście.",
    url: "https://flaszkopedia.vercel.app",
    siteName: "Flaszkopedia",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flaszkopedia - porównywarka cen wódki",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flaszkopedia",
    description: "Znajdź najlepszą i najtańszą wódkę.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GDEMHH03NC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-GDEMHH03NC');
      `}
        </Script>
      </head>
      <body>
        <Providers>
          <Navbar />
          <VodkasProvider>
            <FeedbackProvider>
              <FavoritesProvider>
                <main className="flex flex-col justify-center items-center p-4 mb-10 min-h-screen">
                  {children}
                  <Analytics />
                </main>
              </FavoritesProvider>
            </FeedbackProvider>
          </VodkasProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
