import type { Metadata } from "next";
import Head from "next/head"
import "./globals.css";


export const metadata: Metadata = {
  title: "Rick & Morty Wiki",
  description: "Explore all the different characters of the popular Rick and Morty Show",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
      <body style={{fontFamily: "Wellfleet, sans-serif"}} className="max-w-screen">{children}</body>
    </html>
  );
}
