import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Get me an Ocha - Fund your Projects with Ocha",
  description: "Crowd funding Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] text-white">
        <SessionWrapper>
          <Navbar />
          <div>{children}</div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
