"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData, { type Menu } from "./menuData";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";
import ProductsDropdown from "@/app/(public)/components/navigation/Productsnavigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data, status } = useSession();

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

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

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  // const usePathName = usePathname();

  const pathName = usePathname();

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
      <motion.header
        variants={headerVariants}
        // initial="hidden"
        // animate={sticky ? "visible" : "hidden"}
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition dark:bg-gray-dark dark:shadow-sticky-dark"
            : "absolute bg-transparent"
        }`}
      >
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${
                  sticky ? "py-5 lg:py-2" : "py-5"
                } `}
              >
                <Image
                  src="/images/logo/logo_pink.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="w-full dark:hidden"
                />
                <Image
                  src="/images/logo/logo_pink.png"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
              </Link>
            </div>

            <div className="hidden w-full items-center justify-between px-4 lg:flex">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <motion.nav
                  id="navbarCollapse"
                  variants={navbarVariants}
                  initial="hidden"
                  animate="visible"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block max-h-[500px] overflow-auto lg:flex lg:max-h-none lg:space-x-12 lg:overflow-visible">
                    <ProductsDropdown />
                    {menuData.map((menuItem, index) => (
                      <React.Fragment key={index}>
                        <li className="group relative">
                          {menuItem.path ? (
                            <Link
                              href={menuItem.path}
                              className={`flex py-2 text-base text-foreground/80 lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                                pathName === menuItem.path
                                  ? "text-primary dark:text-white"
                                  : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                              }`}
                            >
                              {menuItem.title.replace(/\bAnd\b/g, "&")}
                            </Link>
                          ) : (
                            <>
                              <p
                                onClick={() => handleSubmenu(index)}
                                className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                              >
                                {menuItem.title.replace(/\bAnd\b/g, "&")}
                                <span className="pl-3">
                                  <motion.button
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="rounded-full bg-gray-200 p-2 dark:bg-gray-800"
                                  >
                                    <svg
                                      width="25"
                                      height="24"
                                      viewBox="0 0 25 24"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </motion.button>
                                </span>
                              </p>

                              <motion.div
                                variants={submenuVariants}
                                initial="hidden"
                                animate={
                                  openIndex === index ? "visible" : "hidden"
                                }
                                className="submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full"
                              >
                                {menuItem?.submenu?.map(
                                  (submenuItem: Menu, idx: number) => (
                                    <Link
                                      href={submenuItem?.path ?? "/"}
                                      key={idx}
                                      className="block rounded py-2.5 text-sm text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:px-3"
                                    >
                                      {submenuItem?.title.replace(
                                        /\bAnd\b/g,
                                        "&",
                                      )}
                                    </Link>
                                  ),
                                )}
                              </motion.div>
                            </>
                          )}
                        </li>
                      </React.Fragment>
                    ))}
                  </ul>
                </motion.nav>
              </div>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
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
                      Log In
                    </Link>
                    <Link
                      href="/signup"
                      className="hidden rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90 md:block"
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
            <div className="flex w-full items-center justify-between px-4 lg:hidden">
              {/* Mobile Menu Button */}
              <div>
                <button
                  onClick={navbarToggleHandler}
                  className="absolute right-4 top-1/2 z-50 block translate-y-[-50%] rounded-lg p-3 ring-primary focus:ring-2"
                >
                  <div className="space-y-2">
                    <span
                      className={`block h-0.5 w-8 bg-foreground transition-transform duration-300 ${
                        navbarOpen ? "translate-y-1.5 rotate-45" : ""
                      }`}
                    />
                    <span
                      className={`block h-0.5 w-8 bg-foreground transition-opacity duration-300 ${
                        navbarOpen ? "opacity-0" : ""
                      }`}
                    />
                    <span
                      className={`block h-0.5 w-8 bg-foreground transition-transform duration-300 ${
                        navbarOpen ? "-translate-y-1.5 -rotate-45" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Backdrop for Mobile */}
                {navbarOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={navbarToggleHandler}
                  />
                )}

                {/* Mobile Navigation Content */}
                <motion.nav
                  initial={false}
                  animate={navbarOpen ? "open" : "closed"}
                  className={`fixed right-0 top-0 z-50 h-screen w-[300px] bg-background/95 backdrop-blur-lg transition-transform duration-300 dark:bg-dark ${
                    navbarOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="flex h-full flex-col">
                    {/* Close Button */}
                    <button
                      onClick={navbarToggleHandler}
                      className="absolute right-4 top-4 p-2"
                    >
                      <X className="h-6 w-6 text-foreground" />
                    </button>

                    {/* Navigation Items */}
                    <ul className="mt-16 flex-1 space-y-4 overflow-y-auto px-6">
                      <ProductsDropdown />
                      {menuData.map((menuItem, index) => (
                        <React.Fragment key={index}>
                          <li className="group relative">
                            {menuItem.path ? (
                              <Link
                                href={menuItem.path}
                                className={`flex items-center py-3 text-lg font-medium transition-colors hover:text-primary ${
                                  pathName === menuItem.path
                                    ? "text-primary"
                                    : "text-foreground/80"
                                }`}
                                onClick={() => setNavbarOpen(false)}
                              >
                                {menuItem.title.replace(/\bAnd\b/g, "&")}
                              </Link>
                            ) : (
                              <>
                                <div className="flex items-center justify-between">
                                  <p
                                    onClick={() => handleSubmenu(index)}
                                    className="flex cursor-pointer items-center py-3 text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                                  >
                                    {menuItem.title.replace(/\bAnd\b/g, "&")}
                                  </p>
                                  <ChevronDown
                                    className={`h-5 w-5 transform transition-transform ${
                                      openIndex === index ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>

                                <motion.div
                                  variants={submenuVariants}
                                  initial="hidden"
                                  animate={
                                    openIndex === index ? "visible" : "hidden"
                                  }
                                  className="ml-4 border-l-2 border-border/20 pl-4"
                                >
                                  {menuItem?.submenu?.map(
                                    (submenuItem: any, idx: number) => (
                                      <Link
                                        href={submenuItem?.path ?? "/"}
                                        key={idx}
                                        className="block py-2.5 text-foreground/70 transition-colors hover:text-primary"
                                        onClick={() => setNavbarOpen(false)}
                                      >
                                        {submenuItem?.title.replace(
                                          /\bAnd\b/g,
                                          "&",
                                        )}
                                      </Link>
                                    ),
                                  )}
                                </motion.div>
                              </>
                            )}
                          </li>
                        </React.Fragment>
                      ))}
                    </ul>

                    {/* Mobile Auth Section */}
                    <div className="border-t p-6">
                      {status === "loading" ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-primary" />
                      ) : data?.user ? (
                        <UserMenu user={data.user} />
                      ) : (
                        <Link
                          href="/signin"
                          className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                          onClick={() => setNavbarOpen(false)}
                        >
                          Log In
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.nav>
              </div>

              {/* Mobile Header Auth (Optional) */}
              <div className="flex items-center justify-end pr-16">
                <ThemeToggler />
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
