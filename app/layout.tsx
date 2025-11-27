import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import ForegroundLeaves from "@/components/ForegroundLeaves";
import Navbar from "@/components/Navbar";
import { CursorContextProvider } from "@/context/CursorContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Raja Ampat | The Crown Jewel",
  description: "An immersive journey into the heart of marine biodiversity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased bg-background overflow-hidden h-screen`}>
        <CursorContextProvider>
            <CustomCursor />
            <ForegroundLeaves />
            <Navbar />
            <main className="relative z-10 h-full">
                {children}
            </main>
        </CursorContextProvider>
      </body>
    </html>
  );
}