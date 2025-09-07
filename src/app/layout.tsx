import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import WhatsAppButton from "@/components/ui/WhatsAppButton"; // ✅ Import added
import { CartDrawerProvider } from "@/components/ui/CartDrawerContext";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Yuricart",
    absolute: "Yuricart",
  },
  description:
    "Shop smart, save big – Discover electronics without breaking the bank.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={lora.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <CartDrawerProvider>
              <Navbar />
              {children}
              <Footer />
            </CartDrawerProvider>
          </ReactQueryProvider>
          <Toaster />
          <WhatsAppButton /> {/* ✅ Floating WhatsApp added */}
        </ThemeProvider>
      </body>
    </html>
  );
}
