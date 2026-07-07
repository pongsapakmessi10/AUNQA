import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "เค้าโครงรายวิชา",
  description: "เค้าโครงรายวิชาและผลลัพธ์การเรียนรู้ที่คาดหวัง",
};

import { FormProvider } from "./FormContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="bg-gray-100 min-h-screen text-gray-900">
        <FormProvider>
          <main className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </main>
        </FormProvider>
      </body>
    </html>
  );
}
