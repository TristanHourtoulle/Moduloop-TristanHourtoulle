import Header from "@components/Header";
import { NextUIProvider } from "@nextui-org/react";
import "@styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

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
      <body className="min-h-[100vh] w-full bg-[#F6F6F6] px-[5%] p-0">
        <div
          className="mb-3 md:mb-10 lg:mb-10"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Header />
        </div>
        <div className="">
          <Toaster
            richColors
            position="top-center"
            expand={false}
            className="max-w-[300px]"
          />
          <NextUIProvider className="pb-10">{children}</NextUIProvider>
        </div>
      </body>
    </html>
  );
}
