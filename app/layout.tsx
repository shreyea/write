import "./globals.css";
import Navbar from "./components/Navbar";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "WRITE - Your Vibe. Your Tribe.",
  description: "Share daily updates with those who matter most. A private social network for genuine connections with your trusted circle.",
  keywords: ["social network", "private posts", "friends", "daily updates", "connections"],
  authors: [{ name: "WRITE Team" }],
  creator: "WRITE",
  publisher: "WRITE",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://write-app.com'),
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
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
     <body className="min-h-screen bg-[#050505] text-[#FEFBF3]">
        {user && <Navbar />}
        {children}
      </body>
    </html>
  );
}
