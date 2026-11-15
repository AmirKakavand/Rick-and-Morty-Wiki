import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Wellfleet } from "next/font/google";

export const metadata: Metadata = {
  title: "Rick & Morty Wiki",
  description:
    "Explore all the different characters of the popular Rick and Morty Show",
  other: {
    "color-scheme": "only dark",
    "supported-color-schemes": "dark",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F19",
  colorScheme: "only dark",
};

const wellfleet = Wellfleet({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "only dark" }}>
      <head>
        <meta name="color-scheme" content="only dark" />
        <meta name="supported-color-schemes" content="dark" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Wellfleet:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{ fontFamily: "Wellfleet, sans-serif", colorScheme: "only dark" }}
        className={wellfleet.className}
      >
        {children}
      </body>
    </html>
  );
}