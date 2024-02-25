import { ClerkProvider } from "@clerk/nextjs";
import "../globals.css";
import { Inter } from "next/font/google";


import LeftSidebar from "@components/layout/LeftSidebar";
import Topbar from "@components/layout/Topbar";
import MainContainer from "@components/layout/MainContainer";
import BottomBar from "@components/layout/BottomBar";
import RightSidebar from "@components/layout/RightSideBar";

export const metadata = {
  title: "Social Wave",
  description: " Next 14 Social media app ",
};
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-purple-2 text-light-1`}>
          <main className="flex flex-row">
            <LeftSidebar />
            <MainContainer>
              {children}
            </MainContainer>
            <RightSidebar />
          </main>
          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
