import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Inter } from "next/font/google";


import LeftSidebar from "@components/layout/LeftSidebar";
import MainContainer from "@components/layout/MainContainer";
import BottomBar from "@components/layout/BottomBar";

export const metadata = {
  title: "Social Wave",
  description: " Next 14 Social media app ",
  
};
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-Slate text-light-1`}>
          <main className="flex flex-row">
            <LeftSidebar />
            <MainContainer>
              {children}
            </MainContainer>
            
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
    
  );
}
