// import React from 'react'
// import PricingSection from './PricingSection'

// const page = () => {
//   return (


//     <div className="container pt-[150px]">
//         <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]  justify-center">
//           <div className="md:w-10/12 lg:w-8/12 xl:w-8/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full ">
//             <div className="section-title text-center mb--70 mb-[70px] lg:mb-[60px] md:mb-[50px] ">
//               <h2 className="s-52 w-700 text-[3.25rem] lg:text-[3rem] md:text-[2.79411rem] sm:text-[2.375rem] xsm:text-[2.0625rem] font-bold tracking-[-0.5px] leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] dark:text-gray-100">Simple, Flexible Pricing</h2>
//               <div className="toggle-btn ext-toggle-btn text-center toggle-btn-md mt-[30px]">
//                 <span className="toggler-txt text-[1.1rem] font-normal leading-9 lg:text-[1.0625rem] lg:leading-8 md:text-[1rem] md:leading-8 sm:text-[1.15rem] xsm:text-[1.15rem] dark:text-gray-300">Billed monthly</span>
//                 <label className="switch-wrap min-w-[65px] h-[36px] mx-[8px] my-0 lg:mx-1.5 lg:my-0 md:mx-1.5 md:my-0 relative inline-block align-middle lg:min-w-[50px] lg:h-[30px] md:min-w-[50px] md:h-[30px]">
//                   {/* <input className="hidden" type="checkbox" id="checbox" onclick="check()" /> */}
//                   <span className="switcher bg--grey switcher--theme bg-[#ccc] border-2 border-solid border-[#ccc] before:bg-white before:shadow-[0_1px_1px_0_#aaa] before:left-[4px] before:bottom-[3.5px] h-[36px] pl-[40px] pr-[20px] py-0 rounded-[36px] before:w-[26px] before:h-[26px] lg:pl-[30px] lg:pr-[10px] lg:py-0 lg:rounded-[32px] md:h-[32px] md:pl-[30px] md:pr-[10px] md:py-0 block cursor-pointer text-white text-[0.925rem] font-medium relative [transition:all_150ms_ease-in-out] before:absolute before:content-['_'] before:[transition:all_450ms_ease-in-out] before:rounded-[50%] lg:text-[0.9rem] lg:h-[32px] lg:before:w-[22px] lg:before:h-[22px] lg:before:left-[4px] lg:before:bottom-[3px] md:before:w-[22px] md:before:h-[22px] md:before:left-[4px] md:before:bottom-[3px] md:text-[0.85rem]">
//                     <span className="show-annual hidden leading-9 lg:leading-8 md:leading-8" />
//                     <span className="show-monthly block leading-9 lg:leading-8 md:leading-8" />
//                   </span>
//                 </label>
//                 <span className="toggler-txt text-[1.1rem] font-normal leading-9 lg:text-[1.0625rem] lg:leading-8 md:text-[1rem] md:leading-8 sm:text-[1.15rem] xsm:text-[1.15rem] dark:text-gray-300">Billed yearly</span>
//                 <p className="color--theme tracking-[-0.25px] mt-[10px] mb-0">Save up to 35% with yearly billing</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="pricing-1-wrapper">
//           <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]  row-cols-1 row-cols-md-3">
//             <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
//               <div id="pt--1-1" className="p-table pricing-1-table pt-[50px] pb-[45px] px-[38px] lg:pt-[40px] lg:pb-[35px] lg:px-[25px] md:pt-[30px] md:pb-[25px] md:px-[25px] sm:pt-[35px] sm:pb-[40px] sm:px-[30px] xsm:px-[40px] xsm:py-[35px] bg-white block-shadow rounded-[12px] wow fadeInUp mb-[50px] lg:mb-[40px] md:mb-[35px] sm:mb-[40px] xsm:mb-[40px] shadow-[0_4px_12px_0_rgba(0,0,0,0.08)]" style={{visibility: 'visible', animationName: 'fadeInUp'}}>
//                 <div className="pricing-table-header relative">
//                   <h5 className="s-24 w-700 text-[1.5rem] font-bold mb--30 mb-[30px] lg:mb-[25px] md:mb-[20px] sm:text-[1.6875rem] xsm:text-[1.5625rem] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">Starter</h5>
//                   <div className="price">
//                     <sup className="text-black text-[2.05rem] font-semibold top-[-5px] tracking-[-1px] right-[2px] font-Jakarta lg:text-[2rem] lg:right-[2px] lg:-top-1 md:text-[2.125rem] md:-top-[2px] sm:text-[2.15rem] sm:-top-1 xsm:text-[2rem] xsm:top-[-5px]">$</sup>								
//                     <span className="text-black text-[3rem] leading-none font-semibold tracking-[-2px] font-Jakarta lg:text-[2.85rem] lg:tracking-[-1.5px] md:text-[2.45rem] md:tracking-[-1.5px] sm:text-[2.875rem] sm:tracking-[-1.5px] xsm:text-[2.75rem]">0</span>
//                     <sup className="validity color--grey tracking-[-1px] right-[2px] text-[1.4rem] font-normal left-0 -top-[2px] font-Jakarta lg:text-[1.45rem] md:text-[1.2rem] sm:text-[1.4375rem] xsm:text-[1.3125rem]">&nbsp;/ forever</sup>
//                     <p className="color--grey my-[25px] lg:mt-[20px] lg:mb-[15px] md:text-[0.9075rem] md:my-[14px]">For professionals getting started with smaller projects.</p>
//                   </div>
//                   <a href="#" className="pt--btn btn  !rounded-[4px]  btn--theme hover--theme">Get started - it's free</a>
//                   <p className="p-sm btn-txt m-[14px_0_0_0] md:text-sm sm:mt-3 sm:mb-0 sm:mx-0 xsm:mt-3 xsm:mb-0 xsm:mx-0 text-center color--grey">No credit card required</p>
//                 </div>
//                 <ul className="pricing-features text-black ico-10 ico--green  mt-[25px] ">
//                   <li className="px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> 2 free projects</p>
//                   </li>
//                   <li className="px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> 1 GB of cloud storage</p>
//                   </li>
//                   <li className="px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> For personal use</p>
//                   </li>
//                   <li className="disabled-option px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Weekly data backup</p>
//                   </li>
//                   <li className="disabled-option px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> No Ads. No trackers</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> 12/5 email support</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
//               <div id="pt--1-2" className="p-table pricing-1-table pt-[50px] pb-[45px] px-[38px] lg:pt-[40px] lg:pb-[35px] lg:px-[25px] md:pt-[30px] md:pb-[25px] md:px-[25px] sm:pt-[35px] sm:pb-[40px] sm:px-[30px] xsm:px-[40px] xsm:py-[35px] bg-white block-shadow rounded-[12px] wow fadeInUp mb-[50px] lg:mb-[40px] md:mb-[35px] sm:mb-[40px] xsm:mb-[40px] shadow-[0_4px_12px_0_rgba(0,0,0,0.08)]" style={{visibility: 'visible', animationName: 'fadeInUp'}}>
//                 <div className="pricing-table-header relative">
//                   <h5 className="s-24 text-[1.5rem] mb--30 mb-[30px] lg:mb-[25px] md:mb-[20px] sm:text-[1.6875rem] xsm:text-[1.5625rem] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">Basic</h5>
//                   <div className="price">
//                     <div className="price2" style={{display: 'block'}}>
//                       <sup className="text-black text-[2.05rem] font-semibold top-[-5px] tracking-[-1px] right-[2px] font-Jakarta lg:text-[2rem] lg:right-[2px] lg:-top-1 md:text-[2.125rem] md:-top-[2px] sm:text-[2.15rem] sm:-top-1 xsm:text-[2rem] xsm:top-[-5px]">$</sup>								
//                       <span className="text-black text-[3rem] leading-none font-semibold tracking-[-2px] font-Jakarta lg:text-[2.85rem] lg:tracking-[-1.5px] md:text-[2.45rem] md:tracking-[-1.5px] sm:text-[2.875rem] sm:tracking-[-1.5px] xsm:text-[2.75rem]">16.99</span>
//                       <sup className="validity color--grey tracking-[-1px] right-[2px] text-[1.4rem] font-normal left-0 -top-[2px] font-Jakarta lg:text-[1.45rem] md:text-[1.2rem] sm:text-[1.4375rem] xsm:text-[1.3125rem]">&nbsp;/ mo</sup>
//                     </div>
//                     <div className="price1" style={{display: 'none'}}>
//                       <sup className="text-black text-[2.05rem] font-semibold top-[-5px] tracking-[-1px] right-[2px] font-Jakarta lg:text-[2rem] lg:right-[2px] lg:-top-1 md:text-[2.125rem] md:-top-[2px] sm:text-[2.15rem] sm:-top-1 xsm:text-[2rem] xsm:top-[-5px]">$</sup>								
//                       <span className="text-black text-[3rem] leading-none font-semibold tracking-[-2px] font-Jakarta lg:text-[2.85rem] lg:tracking-[-1.5px] md:text-[2.45rem] md:tracking-[-1.5px] sm:text-[2.875rem] sm:tracking-[-1.5px] xsm:text-[2.75rem]">142.75</span>
//                       <sup className="validity color--grey tracking-[-1px] right-[2px] text-[1.4rem] font-normal left-0 -top-[2px] font-Jakarta lg:text-[1.45rem] md:text-[1.2rem] sm:text-[1.4375rem] xsm:text-[1.3125rem]">&nbsp;/ yr</sup>
//                       <div className="pricing-discount bg--yellow-400 text-black rounded-[36px] absolute right-[-5px] px-[13px] py-[7px] -top-[2px] lg:px-[13px] lg:py-[7px] lg:right-0 lg:-top-[2px] md:right-[-3px] md:px-[9px] md:py-[5px] md:-top-3 xsm:px-[13px] xsm:py-[7px] xsm:right-0 xsm:-top-1">
//                         <h6 className="s-17 text-[0.915rem] !leading-none mb-0 md:text-[0.8rem] xsm:text-[0.9375rem] font-Jakarta">Save 30%</h6>
//                       </div>
//                     </div>
//                     <p className="color--grey my-[25px] lg:mt-[20px] lg:mb-[15px] md:text-[0.9075rem] md:my-[14px]">For personal use or small teams with simple workflows.</p>
//                   </div>

//                   <a href="#" className="pt--btn btn  !rounded-[4px]  btn--theme hover--theme">Start 14-day trial</a>
//                   <p className="p-sm btn-txt m-[14px_0_0_0] md:text-sm sm:mt-3 sm:mb-0 sm:mx-0 xsm:mt-3 xsm:mb-0 xsm:mx-0 text-center color--grey">7-Day Money Back Guarantee</p>
//                 </div>

//                 <ul className="pricing-features text-black ico-10 ico--green  mt-[25px] ">
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Up to 250 projects</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> 15 GB of Cloud Storage</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Shared team workspace</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Daily data backup</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> No Ads. No trackers</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> 12/7 email support</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
            

//             <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
//               <div id="pt--1-3" className="p-table pricing-1-table pt-[50px] pb-[45px] px-[38px] lg:pt-[40px] lg:pb-[35px] lg:px-[25px] md:pt-[30px] md:pb-[25px] md:px-[25px] sm:pt-[35px] sm:pb-[40px] sm:px-[30px] xsm:px-[40px] xsm:py-[35px] bg-white block-shadow rounded-[12px] wow fadeInUp mb-[50px] lg:mb-[40px] md:mb-[35px] sm:mb-[40px] xsm:mb-[40px] shadow-[0_4px_12px_0_rgba(0,0,0,0.08)]" style={{visibility: 'visible', animationName: 'fadeInUp'}}>
//                 <div className="pricing-table-header relative">
//                   <h5 className="s-24 text-[1.5rem] mb--30 mb-[30px] lg:mb-[25px] md:mb-[20px] sm:text-[1.6875rem] xsm:text-[1.5625rem] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">Advanced</h5>
//                   <div className="price">
//                     <div className="price2" style={{display: 'block'}}>
//                       <sup className="text-black text-[2.05rem] font-semibold top-[-5px] tracking-[-1px] right-[2px] font-Jakarta lg:text-[2rem] lg:right-[2px] lg:-top-1 md:text-[2.125rem] md:-top-[2px] sm:text-[2.15rem] sm:-top-1 xsm:text-[2rem] xsm:top-[-5px]">$</sup>								
//                       <span className="text-black text-[3rem] leading-none font-semibold tracking-[-2px] font-Jakarta lg:text-[2.85rem] lg:tracking-[-1.5px] md:text-[2.45rem] md:tracking-[-1.5px] sm:text-[2.875rem] sm:tracking-[-1.5px] xsm:text-[2.75rem]">24.99</span>
//                       <sup className="validity color--grey tracking-[-1px] right-[2px] text-[1.4rem] font-normal left-0 -top-[2px] font-Jakarta lg:text-[1.45rem] md:text-[1.2rem] sm:text-[1.4375rem] xsm:text-[1.3125rem]">&nbsp;/ mo</sup>
//                     </div>
//                     <div className="price1" style={{display: 'none'}}>
//                       <sup className="text-black text-[2.05rem] font-semibold top-[-5px] tracking-[-1px] right-[2px] font-Jakarta lg:text-[2rem] lg:right-[2px] lg:-top-1 md:text-[2.125rem] md:-top-[2px] sm:text-[2.15rem] sm:-top-1 xsm:text-[2rem] xsm:top-[-5px]">$</sup>								
//                       <span className="text-black text-[3rem] leading-none font-semibold tracking-[-2px] font-Jakarta lg:text-[2.85rem] lg:tracking-[-1.5px] md:text-[2.45rem] md:tracking-[-1.5px] sm:text-[2.875rem] sm:tracking-[-1.5px] xsm:text-[2.75rem]">194.99</span>
//                       <sup className="validity color--grey tracking-[-1px] right-[2px] text-[1.4rem] font-normal left-0 -top-[2px] font-Jakarta lg:text-[1.45rem] md:text-[1.2rem] sm:text-[1.4375rem] xsm:text-[1.3125rem]">&nbsp;/ yr</sup>
//                       <div className="pricing-discount bg--yellow-400 text-black rounded-[36px] absolute right-[-5px] px-[13px] py-[7px] -top-[2px] lg:px-[13px] lg:py-[7px] lg:right-0 lg:-top-[2px] md:right-[-3px] md:px-[9px] md:py-[5px] md:-top-3 xsm:px-[13px] xsm:py-[7px] xsm:right-0 xsm:-top-1">
//                         <h6 className="s-17 text-[0.915rem] !leading-none mb-0 md:text-[0.8rem] xsm:text-[0.9375rem] font-Jakarta">Save 35%</h6>
//                       </div>
//                     </div>
//                     <p className="color--grey my-[25px] lg:mt-[20px] lg:mb-[15px] md:text-[0.9075rem] md:my-[14px]">For growing teams that need more services and flexibility.</p>
//                   </div>
//                   <a href="#" className="pt--btn btn  !rounded-[4px]  btn--theme hover--theme">Upgrade your plan</a>
//                   <p className="p-sm btn-txt m-[14px_0_0_0] md:text-sm sm:mt-3 sm:mb-0 sm:mx-0 xsm:mt-3 xsm:mb-0 xsm:mx-0 text-center color--grey">7-Day Money Back Guarantee</p>
//                 </div>
//                 <ul className="pricing-features text-black ico-10 ico--green  mt-[25px] ">
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Everything in Basic</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Private cloud hosting</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Custom security</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Advanced user permissions</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> Multi-team management</p>
//                   </li>
//                   <li className=" px-[8px] py-[11px] md:px-0 md:py-1.5 sm:px-[8px] sm:py-[10px] xsm:px-[8px] xsm:py-[10px]">
//                     <p><span className="flaticon-check" /> 24/7 Email Support</p>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//         <PricingSection/>

//         <div >
//         <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]  justify-center">
//           <div className="md:w-10/12 lg:w-9/12 xl:w-9/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
//             <div className="section-title text-center mb--70 mb-[70px] lg:mb-[60px] md:mb-[50px]">
//               <h2 className="s-52 w-700 text-[3.25rem] lg:text-[3rem] md:text-[2.79411rem] sm:text-[2.375rem] xsm:text-[2.0625rem] font-bold tracking-[0] mb-0 xsm:px-[1%] xsm:py-0 leading-[1.25] font-Jakarta sm:leading-[1.35] xsm:leading-[1.35] dark:text-gray-100">Compare Our Plans</h2>
//               <p className="p-xl mt-[18px] mb-0 lg:mt-[15px] md:mt-3 sm:mt-[14px] xsm:text-[1.125rem] xsm:mt-[14px] dark:text-gray-300">Complete list of features available in our pricing plans</p>
//             </div>
//           </div>
//         </div>
//         <div className="comp-table wow fadeInUp" style={{visibility: 'visible', animationName: 'fadeInUp'}}>
//           <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]">
//             <div className="flex-[0_0_auto] w-full max-w-full px-[calc(0.5*_1.5rem)]">
//               <div className="table-responsive mb-[50px] lg:mb-[45px] md:mb-[30px] overflow-x-auto">
//                 <table className="table text-center w-full">
//                   <thead className="align-bottom">
//                     <tr>
//                       <th className="text-[1.15rem] font-semibold font-Jakarta lg:text-[1.1rem] md:text-[1rem] sm:text-[0.975rem] xsm:text-[0.9375rem] border-[#ccc]" style={{width: '34%'}} />
//                       <th className="text-[1.15rem] font-semibold font-Jakarta lg:text-[1.1rem] md:text-[1rem] sm:text-[0.975rem] xsm:text-[0.9375rem] border-[#ccc]" style={{width: '22%'}}>Starter</th>
//                       <th className="text-[1.15rem] font-semibold font-Jakarta lg:text-[1.1rem] md:text-[1rem] sm:text-[0.975rem] xsm:text-[0.9375rem] border-[#ccc]" style={{width: '22%'}}>Basic</th>
//                       <th className="text-[1.15rem] font-semibold font-Jakarta lg:text-[1.1rem] md:text-[1rem] sm:text-[0.975rem] xsm:text-[0.9375rem] border-[#ccc]" style={{width: '22%'}}>Premium</th>
//                     </tr>
//                   </thead>
//                   <tbody className="[vertical-align:inherit]">
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Available Projects</th>
//                       <td className="text-black">Up to 2</td>
//                       <td className="text-black">Up to 250</td>
//                       <td className="text-black">Unlimited</td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Available Storage</th>
//                       <td className="text-black">2Gb</td>
//                       <td className="text-black">50Gb</td>
//                       <td className="text-black">350Gb</td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Private Cloud Hosting</th>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">User Permissions</th>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Direct Integrations</th>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Reusable Components</th>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Data Backup</th>
//                       <td className="text-black">Weekly</td>
//                       <td className="text-black">Daily</td>
//                       <td className="text-black">Daily</td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">No Ads. No Trackers</th>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Advanced Security</th>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Shared Team Workspace</th>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className=" bg-white [transition:all_350ms_ease-in-out] hover:bg-[#f7f7f9]">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Team Management</th>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-15 disabled-option"><span className="flaticon-cancel relative leading-[24px] -top-[2px]" /></td>
//                       <td className="ico-20 color--theme"><span className="flaticon-check" /></td>
//                     </tr>
//                     <tr className="table-last-tr">
//                       <th scope="row" className="text-start text-[1rem] font-semibold font-Jakarta lg:text-[1rem] md:text-[0.9375rem] sm:text-[0.95rem] xsm:text-[0.915rem] xsm:leading-tight [border-bottom:1px_solid_#ccc]">Customer Support</th>
//                       <td className="text-black">Limited</td>
//                       <td className="text-black">Basic</td>
//                       <td className="text-black">Priority</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="comp-table-payment">
//           <div className="flex flex-wrap mx-[calc(-0.5*_1.5rem)]  row-cols-1 row-cols-md-3">
//             <div className="col md:w-4/12 lg:w-5/12 xl:w-5/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full">
//               <div id="pbox-1" className="pbox mb-[40px] lg:mb-[30px] md:mb-[30px] wow fadeInUp" style={{visibility: 'hidden', animationName: 'none'}}>
//                 <h6 className="s-18 w-700 text-[1.125rem] lg:text-[1.125rem] sm:text-[1.4375rem] xsm:text-[1.3125rem] font-bold mb-[20px] lg:mb-[14px] md:text-[1.15rem] md:mb-[14px] sm:mb-[15px] xsm:mb-[15px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">Accepted Payment Methods</h6>
//                 <ul className="payment-icons ico-45 mt-[25px]">
//                   <li className=" inline-block align-top clear-none m-0 pr-[5px] last:pr-0 md:pr-0.5"><img className=" w-auto max-w-[inherit] max-h-[32px] lg:max-h-[32px] md:max-h-[26px] sm:max-h-[32px] xsm:max-h-[30px]" src="images/png_icons/visa.png" alt="payment-icon" /></li>
//                   <li className=" inline-block align-top clear-none m-0 pr-[5px] last:pr-0 md:pr-0.5"><img className=" w-auto max-w-[inherit] max-h-[32px] lg:max-h-[32px] md:max-h-[26px] sm:max-h-[32px] xsm:max-h-[30px]" src="images/png_icons/am.png" alt="payment-icon" /></li>
//                   <li className=" inline-block align-top clear-none m-0 pr-[5px] last:pr-0 md:pr-0.5"><img className=" w-auto max-w-[inherit] max-h-[32px] lg:max-h-[32px] md:max-h-[26px] sm:max-h-[32px] xsm:max-h-[30px]" src="images/png_icons/discover.png" alt="payment-icon" /></li>
//                   <li className=" inline-block align-top clear-none m-0 pr-[5px] last:pr-0 md:pr-0.5"><img className=" w-auto max-w-[inherit] max-h-[32px] lg:max-h-[32px] md:max-h-[26px] sm:max-h-[32px] xsm:max-h-[30px]" src="images/png_icons/paypal.png" alt="payment-icon" /></li>
//                   <li className=" inline-block align-top clear-none m-0 pr-[5px] last:pr-0 md:pr-0.5"><img className=" w-auto max-w-[inherit] max-h-[32px] lg:max-h-[32px] md:max-h-[26px] sm:max-h-[32px] xsm:max-h-[30px]" src="images/png_icons/jcb.png" alt="payment-icon" /></li>
//                   <li className=" inline-block align-top clear-none m-0 pr-[5px] last:pr-0 md:pr-0.5"><img className=" w-auto max-w-[inherit] max-h-[32px] lg:max-h-[32px] md:max-h-[26px] sm:max-h-[32px] xsm:max-h-[30px]" src="images/png_icons/shopify.png" alt="payment-icon" /></li>
//                 </ul>
//               </div>
//             </div>
//             <div className="col md:w-4/12 lg:w-4/12 xl:w-4/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full ">
//               <div id="pbox-2" className="pbox  mb-[40px] lg:mb-[30px] md:mb-[30px]  wow fadeInUp" style={{visibility: 'hidden', animationName: 'none'}}>
//                 <h6 className="s-18 w-700 text-[1.125rem] lg:text-[1.125rem] sm:text-[1.4375rem] xsm:text-[1.3125rem] font-bold mb-[20px] lg:mb-[14px] md:text-[1.15rem] md:mb-[14px] sm:mb-[15px] xsm:mb-[15px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">Money Back Guarantee</h6>
//                 <p className=" mb-0 lg:text-[0.965rem]">Explore Martex Premium for 14 days. If it’s not a perfect fit, receive a full refund.</p>
//               </div>
//             </div>
//             <div className="col md:w-4/12 lg:w-3/12 xl:w-3/12 w-full flex-[0_0_auto] px-[calc(0.5*_1.5rem)] max-w-full ">
//               <div id="pbox-3" className="pbox  mb-[40px] lg:mb-[30px] md:mb-[30px]  wow fadeInUp" style={{visibility: 'hidden', animationName: 'none'}}>
//                 <h6 className="s-18 w-700 text-[1.125rem] lg:text-[1.125rem] sm:text-[1.4375rem] xsm:text-[1.3125rem] font-bold mb-[20px] lg:mb-[14px] md:text-[1.15rem] md:mb-[14px] sm:mb-[15px] xsm:mb-[15px] leading-[1.35] font-Jakarta sm:leading-[1.4] xsm:leading-[1.4]">SSL Encrypted Payment</h6>
//                 <p className=" mb-0 lg:text-[0.965rem]">Your information is protected by 256-bit SSL encryption.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>



//       </div>
//   )
// }

// export default page

'use client';

import { motion } from 'framer-motion';
import PricingHero from './PricingHero';
import PricingPlans from './PricingPlans';
import PricingFAQ from './PricingFaq';

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-20"
      >
        <PricingHero />
        <PricingPlans />
        {/* <PricingFAQ /> */}
      </motion.div>
    </main>
  );
}