import "./globals.css";
import Navbar from "./components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Metadata, Viewport } from "next";
import NavbarWrapper from "./components/NavbarWrapper";

export const metadata: Metadata = {
  title: "WRITE - Your Vibe. Your Tribe.",
  description: "Share daily updates with those who matter most. A private social network for genuine connections with your trusted circle.",
  keywords: ["social network", "private posts", "friends", "daily updates", "connections"],
  authors: [{ name: "WRITE Team" }],
  creator: "WRITE",
  publisher: "WRITE",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://write-app.com'),
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'WRITE',
  },
  openGraph: {
    type: "website",
    title: "WRITE - Your Vibe. Your Tribe.",
    description: "Share daily updates with those who matter most",
    siteName: "WRITE",
  },
  twitter: {
    card: "summary_large_image",
    title: "WRITE - Your Vibe. Your Tribe.",
    description: "Share daily updates with those who matter most",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#A5B4FC" />
      </head>
     <body className="min-h-screen bg-[#050505] text-[#FEFBF3]">
        <NavbarWrapper />
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('ServiceWorker registration successful');
                  },
                  function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `
        }} />
      </body>
    </html>
  );
}
