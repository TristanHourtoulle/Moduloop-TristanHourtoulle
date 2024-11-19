import Header from "@components/Header";
import { NextUIProvider } from "@nextui-org/react";
import "@styles/globals.css";
import Provider from "@utils/Provider";
import type { Metadata } from "next";
import { Toaster } from "sonner";

// export const dynamic = "force-dynamic"; // Permet un comportement dynamique pour les routes
// export const revalidate = 60; // Revalidation toutes les 60 secondes
// export const runtime = "nodejs";

export const metadata: Metadata = {
  title: "Moduloop - Impact",
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
        <link rel="icon" href="/icons/logoImage.png" />
      </head>
      <body
        className="min-h-[100vh] w-full bg-[#F6F6F6] px-[5%] p-0"
        suppressHydrationWarning={true} // Utile pour éviter des erreurs lors de l'hydratation
      >
        <div
          className="mb-3 md:mb-10 lg:mb-10"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Header />
        </div>
        <div>
          <Toaster
            richColors
            position="top-center"
            expand={false}
            className="w-full text-xl"
          />
          <NextUIProvider className="pb-10">
            <Provider>{children}</Provider>
          </NextUIProvider>
        </div>
      </body>
    </html>
  );
}
