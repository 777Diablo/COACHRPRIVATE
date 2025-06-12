"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

const Footer = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <>
  
      <footer className="footer xsm:pb-[30px] pb-[50px] pt-[100px] sm:pb-[30px] md:pb-[25px] md:pt-[70px] lg:pb-[35px] lg:pt-[80px] bg-background">
        <div className="container">
          <div className="mx-[calc(-0.5*_1.5rem)] flex flex-wrap">

            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] xl:w-3/12">
              <div className="footer-info mb-[40px] lg:mb-[50px]">
              <Link href="/" className="mb-8 inline-block">
                  <Image
                    src="/images/logo/logo_pink.png"
                    alt="logo"
                    className="w-full dark:hidden"
                    width={140}
                    height={30}
                  />
                  <Image
                    src="/images/logo/logo_pink.png"
                    alt="logo"
                    className="hidden w-full dark:block"
                    width={140}
                    height={30}
                  />
                </Link>
              </div>
            </div>

            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] sm:w-4/12 md:w-4/12 lg:w-3/12 xl:w-2/12">
              <div className="footer-links fl-1 mb-[40px]">
                <h6 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Company
                </h6>
                <ul className="foo-links clearfix">
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      <Link href="/about">About Us</Link>
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      <Link href="/blogs">Our Blog</Link>
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      <Link href="/contact">Contact Us</Link>
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      <Link href="/faq">Faq</Link>
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] sm:w-4/12 md:w-4/12 lg:w-2/12 xl:w-2/12">
              <div className="footer-links fl-2 mb-[40px]">
                <h6 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Product
                </h6>
                <ul className="foo-links clearfix">
                  
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      {/* <Link href="/whats-new">Mock Interview</Link> */}
                      Mock Interview
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      {/* <Link href="/pricing">Pricing</Link> */}
                      {/* Mock Interview-with psychometrics */}
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      {/* <Link href="/help-center">Help Center</Link> */}
                      ATS Friendly Resume
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      {/* <Link href="/help-center">Help Center</Link> */}
                      Career Success Coaching
                    </p>
                  </li>
                  <li className="clear-none m-0 block w-auto p-0 align-top">
                    <p className="mb-[10px] font-normal md:mb-[8px]">
                      {/* <Link href="/integration">Mock Interview-Video Based</Link> */}
                      Mock Interview-Video Based
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="sm:w-4/12 md:w-4/12 lg:w-3/12 xl:w-2/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
              <div className="footer-links mb-[40px] fl-3 lg:pl-[28%]">
                <h6 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Legal</h6>
                <ul className="foo-links clearfix">
                  <li className=" w-auto block align-top clear-none m-0 p-0">
                    <p className=" font-normal mb-[10px] md:mb-[8px]">
                      <Link href="/terms">Terms of Use</Link>
                    </p>
                  </li>
                  <li className=" w-auto block align-top clear-none m-0 p-0">
                    <p className=" font-normal mb-[10px] md:mb-[8px]">
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </p>
                  </li>
                  <li className=" w-auto block align-top clear-none m-0 p-0">
                    <p className=" font-normal mb-[10px] md:mb-[8px]">
                      <Link href="/refund-policy">Refund Policy</Link>
                    </p>
                  </li>
                  <li className=" w-auto block align-top clear-none m-0 p-0">
                    <p className=" font-normal mb-[10px] md:mb-[8px]">
                      {/* <Link href="/site-map">Site Map</Link> */}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] sm:w-10/12 md:w-8/12 lg:w-4/12 xl:w-3/12">
              <div className="footer-form xsm:mr-[5%] mb-[20px] sm:mr-[5%] lg:pl-[5%]">
                <h6 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
                  Follow the Best
                </h6>
                <form className="newsletter-form" noValidate>
                  <div className="input-group r-06 relative flex w-full flex-wrap items-stretch rounded-[6px] border border-solid border-transparent bg-[#f4f4f4] px-[2px] py-[9px]">
                    <input
                      type="email"
                      className="form-control xsm:text-[1.1rem] xsm:h-[34px] relative m-0 block h-[32px] w-[1%] min-w-0 flex-auto rounded-br-[6px] rounded-tr-[6px] border-[none] bg-transparent p-[0_10px] text-[1rem] font-normal !leading-[1.5] text-[#666] shadow-none placeholder:text-[#6c757d] focus:border-[none] focus:shadow-none focus:[outline:0] sm:h-[32px] sm:text-[1.0625rem] md:h-[28px] lg:h-[28px]"
                      placeholder="Email Address"
                      required
                      id="s-email"
                      name="EMAIL"
                    />
                    <span className="input-group-btn ico-15">
                      <button
                        type="submit"
                        className="btn color--theme xsm:h-[34px] relative z-[2] h-[32px] !p-[0_10px] sm:h-[32px] md:h-[28px] lg:h-[28px]"
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                      </button>
                    </span>
                  </div>
                  <label htmlFor="s-email" className="form-notification" />
                </form>
              </div>
            </div>

          </div>

          <hr className="xsm:mt-[5px] xsm:mb-[30px] mb-[50px] mt-[30px] sm:mb-[30px] sm:mt-[15px] md:mb-[25px] md:mt-[5px] lg:lg:mb-[35px] lg:mt-[10px]" />

          <div className="bottom-footer">
            <div className="row-cols-1 row-cols-md-2 mx-[calc(-0.5*_1.5rem)] flex flex-wrap items-center">
              <div className="w-full max-w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] md:w-6/12 lg:w-6/12 xl:w-6/12">
                <div className="footer-copyright">
                  <p className="p-sm mb-0">
                    {/* © 2025 HidsTech. <span>All Rights Reserved</span> */}
                    ©  <span>Coachr People Advisory Services Pvt. Ltd</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
