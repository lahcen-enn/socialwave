import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";

export const metadata = {
  title: "Social Wave",
  description: "Next 14 Social Media App",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={`${inter.className} bg-Slate flex justify-center items-center h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
