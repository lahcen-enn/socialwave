"use client";
import { useState } from 'react';
import { Add, Logout, Search } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const Topbar = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="relative">
        <input
          type="text"
          className="search-bar"
          placeholder="Search posts, people, ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          className="search-icon"
          onClick={() => router.push(`/search/posts/${search}`)}
        />
      </div>
      <button
        className="create-post-btn"
        onClick={() => router.push("/create-post")}
      >
        <Add /> <p>Create A Post</p>
      </button>
      <div className="flex gap-3 ">
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer  items-center md:hidden">
              <Logout sx={{ color: "white", fontSize: "32px" }} />
            </div>
          </SignOutButton>
        </SignedIn>
        <Link href="/">
            <Image
              src="/profile1 (2).jpeg"
              alt="profile"
              width={60}
              height={40}
              className="rounded-full md:hidden"
            />
          
        </Link>
      </div>
    </div>
  );
};

export default Topbar;
