import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton, SignOutButton } from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";
import Menu from "./Menu";

const LeftSidebar = () => {
  return (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[350px] pr-20 custom-scrollbar">
      <Link href="/">
        <Image className="flex-center" src="/logo.svg" alt="logo" width={200} height={200} />
      </Link>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
          <Link href="/">
            <Image
              src="/profile1 (2).jpeg"
              alt="profile"
              width={70}
              height={70}
              className="rounded-full"
            />
          </Link>
          <p className="text-small-bold">Pedro alonso</p>
        </div>
        <div className="flex text-light-1 justify-between">
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">1</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
        </div>
        <hr />

        <Menu />

        <hr />

        <div className="flex gap-4 items-center">
          <UserButton />
          <p className="text-light-1 text-body-bold">Manage Account</p>
        </div>
        
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer gap-4 items-center">
              <Logout sx={{ color: "white", fontSize: "32px" }} />
              <p className="text-body-bold text-light-1">Log Out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};
export default LeftSidebar;
