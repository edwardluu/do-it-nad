import type { Metadata } from "next";
import { Rubik_Distressed } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Web3Provider } from "@/provider/Web3Provider";
import Header from "@/components/layout/header-app";
import "./globals.css";

const rubikDistressed = Rubik_Distressed({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Do it Nad",
  description: "Rock paper scissors",
  openGraph: {
    title: "Do it Nad",
    description: "Rock paper scissors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  function calculateDaysFromToday() {
    const timeDifference =
      new Date("2025-10-10").getTime() - new Date().getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference || 0;
  }

  return (
    <html lang="en">
      <Web3Provider>
        <body
          className={`${rubikDistressed.className} antialiased flex flex-col items-center `}
        >
          <div className="w-full flex items-center flex-col container bg-[#f8f4ef] z-10 rounded px-4">
            <Header />
            <div className="w-full overflow-hidden whitespace-nowrap">
              <p className="inline-block text-pink-500 text-2xl mt-1 animate-[marquee_10s_linear_infinite]">
                DoItNad will officially shut down after{" "}
                {calculateDaysFromToday()} days, 🏆 TOP 10 will receive 50 MON TESTNET
                as a special prize.
              </p>
            </div>
            <div className="h-[calc(100vh-80px)]  w-full flex flex-col container py-10">
              {children}
              <Analytics />
            </div>
          </div>
        </body>
      </Web3Provider>
    </html>
  );
}
