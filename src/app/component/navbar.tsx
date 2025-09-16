// @ts-nocheck
'use client'
import React, { useEffect, useState } from "react";
import {  Link as Link2, scrollSpy } from "react-scroll";
import Link from "next/link";

import { FaGithub,FaTwitter,FaInstagram  } from "react-icons/fa";



export default function Navbar({navdark}:{navdark:boolean}){
  const [isOpen, setMenu] = useState(true);
  
  useEffect(()=>{
    window.addEventListener("scroll", windowScroll);
    window.scrollTo(0, 0);
    scrollSpy.update();
    return()=>{
      window.removeEventListener( 'scroll', windowScroll )
    }

  },[])

  const toggleMenu = () => {
    setMenu(!isOpen)
  }

    function windowScroll() {
        const navbar = document.getElementById("navbar");
        if (
          document.body.scrollTop >= 50 ||
          document.documentElement.scrollTop >= 50
        ) {
          navbar.classList.add("is-sticky");
        } else {
          navbar.classList.remove("is-sticky");
        }
      }
    return(
        <>
        <nav className="navbar" id="navbar">
          <div className="container flex flex-wrap items-center justify-end">
            {navdark && (

                <Link className="navbar-brand" href="/">
                    <span>
                        <img src="/images/logo-dark.png" className="inline-block dark:hidden" alt="" />
                        <img src="/images/logo-light.png" className="hidden dark:inline-block" alt="" />
                    </span>
                </Link>
            )}
            {!navdark && (

                <Link className="navbar-brand" href="/">
                <span className="inline-block dark:hidden">
                    <img src="/images/logo-dark.png" className="l-dark" alt="" />
                    <img src="/images/logo-light.png" className="l-light" alt="" />
                </span>
                <img src="/images/logo-light.png" className="hidden dark:inline-block" alt=""/>
                </Link>
            )}

            <div className="nav-icons flex items-center lg_992:order-2 ms-auto">
                {navdark && (
                     <ul className="list-none menu-social mb-0">
                        <li className="inline ms-1">
                            <Link href="#" className="btn btn-sm btn-icon rounded-full bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white">
                                <FaGithub className=""></FaGithub>
                            </Link>
                        </li>
                     <li className="inline ms-1">
                         <Link href="#" className="btn btn-sm btn-icon rounded-full bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white">
                                <FaTwitter className=""></FaTwitter>
                         </Link>
                     </li>
                     <li className="inline ms-1">
                         <Link href="#" className="btn btn-sm btn-icon rounded-full bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white">
                                <FaInstagram  className=""></FaInstagram>
                         </Link>
                     </li>
                 </ul>
                )}
                {!navdark && (
                    <ul className="list-none menu-social mb-0">
                    <li className="inline ms-1">
                        <Link href="#">
                        <span className="login-btn-primary">
                            <span className="btn btn-sm btn-icon rounded-full bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white">
                            <FaGithub className=""></FaGithub>
                            </span>
                        </span>
                        <span className="login-btn-light">
                            <span className="btn btn-sm btn-icon rounded-full bg-gray-50 hover:bg-gray-200 text-slate-900 dark:text-white dark:bg-slate-900 dark:hover:bg-gray-700 hover:border-gray-100 dark:border-gray-700 dark:hover:border-gray-700">
                            <FaGithub className=""></FaGithub>
                            </span>
                        </span>
                        </Link>
                    </li>
                    <li className="inline ms-1">
                        <Link href="#">
                        <span className="login-btn-primary">
                            <span className="btn btn-sm btn-icon rounded-full bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white">
                            <FaTwitter className=""></FaTwitter>
                            </span>
                        </span>
                        <span className="login-btn-light">
                            <span className="btn btn-sm btn-icon rounded-full bg-gray-50 hover:bg-gray-200 text-slate-900 dark:text-white dark:bg-slate-900 dark:hover:bg-gray-700 hover:border-gray-100 dark:border-gray-700 dark:hover:border-gray-700">
                            <FaTwitter className=""></FaTwitter>
                            </span>
                        </span>
                        </Link>
                    </li>
                    <li className="inline ms-1">
                        <Link href="#">
                        <span className="login-btn-primary">
                            <span className="btn btn-sm btn-icon rounded-full bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white">
                            <FaInstagram  className=""></FaInstagram>
                            </span>
                        </span>
                        <span className="login-btn-light">
                            <span className="btn btn-sm btn-icon rounded-full bg-gray-50 hover:bg-gray-200 text-slate-900 dark:text-white dark:bg-slate-900 dark:hover:bg-gray-700 hover:border-gray-100 dark:border-gray-700 dark:hover:border-gray-700">
                            <FaInstagram  className=""></FaInstagram>
                            </span>
                        </span>
                        </Link>
                    </li>
                    </ul>
                )}
              <button
                type="button"
                className="collapse-btn inline-flex items-center ms-3 text-dark dark:text-white lg_992:hidden"
                onClick={toggleMenu}
              >
                <span className="sr-only">Navigation Menu</span>
                <i className="mdi mdi-menu mdi-24px"></i>
              </button>
            </div>

            <div
              className={`${isOpen === true ? 'hidden' : 'block'} navigation lg_992:order-1 lg_992:flex`}
              id="menu-collapse"
            >
              <ul className={`navbar-nav ${navdark ? '' : 'nav-light'}`} id="navbar-navlist">
                <Link2
                  className="nav-item"
                  to="home"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Home</span>
                </Link2>
                <Link2
                  className="nav-item"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                  to="about"
                >
                  <span className="nav-link">About us</span>
                </Link2>
                <Link2
                  className="nav-item"
                  to="features"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Services</span>
                </Link2>
                <Link2
                  className="nav-item"
                  to="portfolio"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Portfolio</span>
                </Link2>
                <Link2
                  className="nav-item"
                  to="testi"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Review</span>
                </Link2>
                <Link2
                  className="nav-item"
                  to="pricing"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Pricing</span>
                </Link2>
                <Link2
                  className="nav-item"
                  to="blog"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Blog</span>
                </Link2>
                <Link2
                  className="nav-item"
                  to="contact"
                  activeclassname="active"
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <span className="nav-link">Contact us</span>
                </Link2>
              </ul>
            </div>
          </div>
        </nav>
        </>
    )
}   