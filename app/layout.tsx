import type { Metadata } from "next";
import Head from "next/head";
import "./globals.css";
import { Wellfleet } from "next/font/google";

export const metadata: Metadata = {
  title: "Rick & Morty Wiki",
  description:
    "Explore all the different characters of the popular Rick and Morty Show",
};

const wellfleet = Wellfleet({
  weight: '400',
  subsets: ['latin'],
});

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Wellfleet:wght@400&display=swap" rel="stylesheet" />
      </Head>
      <body
        style={{ fontFamily: "Wellfleet, sans-serif" }}
        className={wellfleet.className}
      >
        {children}
      </body>
    </html>
  );
}
