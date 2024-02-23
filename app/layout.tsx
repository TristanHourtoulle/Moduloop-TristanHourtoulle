import type { Metadata } from "next";
import "@styles/globals.css";
import Header from "@components/Header";


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="mb-10" style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Header />
        </div>
        {children}
      </body>
    </html>
  );
}
