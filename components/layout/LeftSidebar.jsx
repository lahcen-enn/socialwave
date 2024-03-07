"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, UserButton, SignOutButton , useUser} from "@clerk/nextjs";
import { Logout } from "@mui/icons-material";
import Menu from "./Menu";
import Loader from "@components/Loader";

const LeftSidebar = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  
  const getUser = async () => {
    const response = await fetch(`/api/user/${user.id}`);
    const data = await response.json();
    setUserData(data);
    setLoading(false);
  };
  
  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);
  
  return loading || !isLoaded ? <Loader /> : (
    <div className="h-screen left-0 top-0 sticky overflow-auto px-10 py-6 flex flex-col gap-6 max-md:hidden 2xl:w-[350px] pr-20 custom-scrollbar">
      <Link href="/">
        <Image className="flex-center mt-4" src="/assets/logo.png" alt="logo" width={400} height={400}  />
      </Link>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2 items-center text-light-1">
        <Link href={`/profile/${userData._id}/posts`}>
            <Image
              src={userData?.profilePhoto}
              alt="profile photo"
              width={80}
              height={80}
              quality={100}
              className="rounded-full  border-2 border-white "
            />
          </Link>
          <p className="text-small-bold mt-3">{userData?.firstName} {userData?.lastName}</p>
        </div>
        <div className="flex text-light-1 justify-between mt-3">
          <div className="flex flex-col items-center ">
            <p className="text-base-bold">{userData?.posts?.length}</p>
            <p className="text-tiny-medium">Posts</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.followers?.length}</p>
            <p className="text-tiny-medium">followers</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-base-bold">{userData?.following?.length}</p>
            <p className="text-tiny-medium">following</p>
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
