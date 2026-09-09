import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { NextAuthProvider } from "@/components/NextAuthProvider";
import { CartProvider } from "@/components/CartContext";
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: "India Digital Creatives",
  description: "India Digital Creatives Storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&amp;family=Space+Grotesk:wght@400..700&amp;family=Syne:wght@400..800&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-fixed min-h-screen flex flex-col">
        <NextTopLoader color="#E1FF01" showSpinner={false} height={3} shadow="0 0 10px #E1FF01,0 0 5px #E1FF01" />
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <CartProvider>
              {children}
            </CartProvider>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
