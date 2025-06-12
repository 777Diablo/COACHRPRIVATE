"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "@/components/Header/ThemeToggler";
import menuData, { type Menu } from "@/components/Header/menuData";
import { useSession } from "next-auth/react";
import UserMenu from "@/components/Header/UserMenu";
import { motion } from "framer-motion";

const PrivateHeader = () => {
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data, status } = useSession();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const usePathName = usePathname();

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const headerVariants = {
    hidden: { y: -100 },
    visible: { y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  const submenuVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  };

  const mobileMenuVariants = {
    hidden: { x: "100%" },
    visible: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  };

  return (
    <>
      <header className="fixed top-0 z-10 w-full bg-background shadow-sm">
        <div className="flex">
          <div className="w-[245px] p-4 text-xl">
            CoachR
          </div>
          <div className="container">
           <div className="relative -mx-4 flex items-center justify-between">
           <div className="flex w-full items-center justify-between">
              <div className="w-60"></div>
              <div className="flex items-center justify-end">
                {status === "loading" ? (
                  <div className="border-t-1 h-6 w-6 animate-spin rounded-full border-b border-primary"></div>
                ) : data?.user ? (
                  <UserMenu user={data.user} />
                ) : (
                  <>
                    <Link
                      href="/signin"
                      className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 dark:text-white md:block"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="ease-in-up hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white shadow-btn transition duration-300 hover:bg-opacity-90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
           </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default PrivateHeader;
