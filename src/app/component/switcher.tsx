// @ts-nocheck 
"use client"
import React, {useEffect, useState} from 'react'; 
import { FaMoon } from "react-icons/fa";
import { FiArrowUp, FiSun } from "react-icons/fi";
import Link from "next/link";
export default function Switcher() {
  const [visible, setVisible] = useState(false) 

  const toggleVisible = () => { 
    const scrolled = document.documentElement.scrollTop; 
    if (scrolled > 300){ 
      setVisible(true) 
    }  
    else if (scrolled <= 300){ 
      setVisible(false) 
    } 
  }; 
  
  const scrollToTop = () =>{ 
    window.scrollTo({ 
      top: 0,  
      behavior: 'smooth'
      /* you can also use 'auto' behaviour 
         in place of 'smooth' */
    }); 
  }; 

  useEffect(()=>{
    window.addEventListener('scroll', toggleVisible); 
    return()=>{
      window.removeEventListener('scroll', toggleVisible); 
    }
  })
  

  const changeMode = (mode, event) => {
    switch (mode) {
      case "mode":
        if (document.documentElement.className.includes("dark")) {
          document.documentElement.className = "light";
        } else {
          document.documentElement.className = "dark";
        }
        break;
      case "layout":
        if (event.target?.innerText === "LTR") {
          document.documentElement.dir = "ltr";
        } else {
          document.documentElement.dir = "rtl";
        }
        break;

      default:
        break;
    }
  };

  return (
    <>
      {/* <!-- Switcher --> */}
      <div className="fixed top-1/4 -right-2 z-3">
        <span className="relative inline-block rotate-90">
          <input
            type="checkbox"
            className="checkbox opacity-0 absolute"
            id="chk"
            onClick={(event) => changeMode("mode", event)}
          />
          <label
            className="label bg-slate-900 dark:bg-white shadow-smdark:shadow-gray-800 cursor-pointer rounded-full flex justify-between items-center p-1 w-14 h-8"
            htmlFor="chk"
          >
            <FaMoon width="20px" className=" text-yellow-500" />
            <FiSun width="20px" className=" text-yellow-500" />
            <span className="ball bg-white dark:bg-slate-900 rounded-full absolute top-[2px] left-[2px] w-7 h-7"></span>
          </label>
        </span>
      </div>
      {/* <!-- Switcher --> */}

      {/* <!-- LTR & RTL Mode Code --> */}
      <div className="fixed top-1/3 -right-3 z-50">
        <Link href="#" id="switchRtl">
          <span
            className="py-1 px-3 relative inline-block cursor-pointer rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow-smdark:shadow-gray-800 font-semibold rtl:block ltr:hidden"
            onClick={(event) => changeMode("layout", event)}
          >
            LTR
          </span>
          <span
            className="py-1 px-3 relative inline-block cursor-pointer rounded-t-md -rotate-90 bg-white dark:bg-slate-900 shadow-md dark:shadow-smdark:shadow-gray-800 font-semibold ltr:block rtl:hidden"
            onClick={(event) => changeMode("layout", event)}
          >
            RTL
          </span>
        </Link>
      </div>
      {/* <!-- LTR & RTL Mode Code --> */}
      <Link href="#" onClick={()=>scrollToTop()} id="back-to-top" className="back-to-top fixed items-center justify-center text-lg rounded-full z-10 bottom-5 end-5 h-9 w-9 text-center bg-orange-600 text-white leading-9"  style={{display: visible ? 'inline-flex' : 'none'}}><FiArrowUp className=""/></Link>
    </>
  );
}
