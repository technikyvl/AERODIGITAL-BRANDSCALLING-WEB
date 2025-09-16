'use client'
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <>
      <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800" id="about">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="relative">
                <Image
                  src={"/images/about.jpg"}
                  className="rounded-lg shadow-lg relative"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }} // optional
                />
                <div className="absolute bottom-2/4 translate-y-2/4 start-0 end-0 text-center">
                  <Link
                    href="#"
                    scroll={false}
                    onClick={()=>setOpen(!isOpen)}
                    className="lightbox h-20 w-20 rounded-full shadow-lg shadow-slate-100 dark:shadow-slate-800 inline-flex items-center justify-center bg-white dark:bg-slate-900 text-orange-600 cursor-pointer"
                  >
                    <i className="mdi mdi-play inline-flex items-center justify-center text-2xl"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* end col */}

            <div className="lg:col-span-7">
              <div className="lg:ms-7">
                <h6 className="text-orange-600 text-base font-medium uppercase mb-2">
                  Who We Are ?
                </h6>
                <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">
                  Our Company Story
                </h3>

                <p className="text-slate-400 max-w-2xl">
                  Start working with Upwind that can provide everything you need
                  to generate awareness, drive traffic, connect. Dummy text is
                  text that is used in the publishing industry or by web
                  designers to occupy the space which will later be filled with
                  real content. This is required when, for example, the final
                  text is not yet available. Dummy texts have been in use by
                  typesetters since the 16th century.
                </p>

                <div className="relative mt-10">
                  <Link
                    href="#portfolio"
                    className="btn bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-md"
                  >
                    View Portfolio
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End --> */}
      {isOpen && 
        <div className="flex bg-[#00000099] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-1 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-xs dark:bg-gray-700">
                    <div className="flex items-center justify-between p-1 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <button type="button" onClick={()=>setOpen(!isOpen)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-1 md:p-1 space-y-4">
                        <iframe width="100%" height="400" src="https://www.youtube.com/embed/yba7hPeTSjk?playlist=yba7hPeTSjk&loop=1"></iframe>
                    </div>
                </div>
            </div>
        </div>
      }
    </>
  );
}
