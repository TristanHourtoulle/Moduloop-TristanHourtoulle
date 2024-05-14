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
      <body className="min-h-[100vh]">
        <div
          className="mb-10"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Header />
        </div>
        <Toaster richColors position="top-center" expand={false} />
        <NextUIProvider className="pb-10">{children}</NextUIProvider>
      </body>
    </html>
  );
}
