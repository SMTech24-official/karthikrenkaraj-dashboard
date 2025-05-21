"use client";
import logo from "../../../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaRegUserCircle } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { removeCookie } from "@/utils/setCookies";

const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const { data } = useGetMeQuery(undefined);
  const router = useRouter();

  const userData = data?.data;

  const navLinks = [
    {
      path: "/",
      name: "Temple",
    },
    {
      path: "/product",
      name: "Product",
    },
    {
      path: "/cause",
      name: "Cause",
    },
    {
      path: "/order",
      name: "Order",
    },
    {
      path: "/user",
      name: "User",
    },
    {
      path: "/setting",
      name: "Setting",
    },
  ];

  const handleNavLinkClick = () => {
    setIsSheetOpen(false);
  };

  const handleLolgout = () => {
    dispatch(logout());
    removeCookie("token");
    router.push("/login");
  };
  return (
    <div className="flex justify-between items-center gap-3 relative z-40">
      {/* small device menu */}
      <div className="md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <HiMenuAlt1 className="text-2xl cursor-pointer text-secondary" />
          </SheetTrigger>
          <SheetContent side="left" className=" bg-secondary ">
            <SheetHeader>
              <SheetTitle className="text-lg">Navigation</SheetTitle>
            </SheetHeader>

            <nav className="mt-5">
              <ul className="space-y-2 flex flex-col z-40">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={`${link.path}`}
                    className={`${
                      pathName === `${link.path}`
                        ? "bg-primary text-black px-5 py-2 rounded-3xl"
                        : "text-white"
                    } hover:bg-primary hover:text-black px-5 py-2 rounded-3xl duration-300`}
                    onClick={handleNavLinkClick}
                  >
                    {link.name}
                  </Link>
                ))}
              </ul>
            </nav>
            <SheetClose asChild>
              <Button variant="outline" className="mt-5 w-full">
                Close
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>

      <div className="md:w-32 w-20">
        <Image src={logo} height={60} width={60} alt="logo" />
      </div>

      {/* larg device menu  */}
      <div className="bg-secondary px-3 py-4 rounded-full md:flex hidden justify-center items-center">
        <ul className="lg:space-x-5 space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={`${link.path}`}
              className={`${
                pathName === `${link.path}`
                  ? "bg-primary text-black px-5 py-2 rounded-3xl"
                  : "text-white"
              } hover:bg-primary hover:text-black px-5 py-2 rounded-3xl duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </div>

      {userData ? (
        <div className="flex gap-3">
          <div className=" flex gap-2 items-center md:px-4 px-2 md:py-2 py-[2px] rounded-full bg-white">
            {userData?.profileImage ? (
              <Image
                src={userData?.profileImage}
                height={1000}
                width={1000}
                alt="profile"
                className="rounded-full md:w-9 w-6 md:h-9 h-6"
              />
            ) : (
              <FaRegUserCircle className="md:text-4xl text-2xl rounded-full" />
            )}
            <div className="">
              <p className="text-sm">{userData?.fullName}</p>
              <p className="font-medium text-sm">{userData?.role}</p>
            </div>
          </div>
          <button
            onClick={handleLolgout}
            className="bg-primary px-8 py-3 rounded-full hover:bg-white duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link href={"/login"}>
          <button className="bg-primary px-8 py-3 rounded-full hover:bg-white duration-300">
            Login
          </button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
