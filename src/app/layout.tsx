import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ReduxProvider from "@/redux/provider/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Ubhayam",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.className} antialiased bg-gradient-to-b from-[#eff5e6] to-[#f6f6f6]` }>
        <Toaster position="bottom-right" richColors />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
