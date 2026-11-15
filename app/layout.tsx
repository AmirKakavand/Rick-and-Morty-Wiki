import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rick & Morty Wiki",
  description:
    "Explore all the different characters of the popular Rick and Morty Show",
  other: {
    "color-scheme": "light only",
    "supported-color-schemes": "light",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0F19",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light only" }}>
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        style={{
          fontFamily: '"Wellfleet", cursive, sans-serif',
          colorScheme: "light only",
        }}
      >
        {children}
      </body>
    </html>
  );
}