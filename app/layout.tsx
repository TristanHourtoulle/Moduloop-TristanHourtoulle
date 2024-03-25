import Header from "@components/Header";
import "@styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Moduloop - Outil",
  description:
    "Calculer l'impact environnemental de votre projet de construction avec Moduloop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/icons/logoImage.svg" />
      </head>
      <body>
        <div
          className="mb-10"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
