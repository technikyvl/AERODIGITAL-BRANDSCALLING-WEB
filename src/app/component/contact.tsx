import React from "react";

import { FiPhone,FiMail,FiMapPin  } from "react-icons/fi";

export default function Contact() {
    return (
        <>
            {/* Start */}
            <section className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800" id="contact">
                <div className="container">
                    <div className="grid grid-cols-1 pb-8 text-center">
                        <h6 className="text-orange-600 text-base font-medium uppercase mb-2">Contact us</h6>
                        <h3 className="mb-4 md:text-2xl text-xl font-medium dark:text-white">Get In Touch !</h3>

                        <p className="text-slate-400 max-w-xl mx-auto">Launch your campaign and benefit from our expertise on designing and managing conversion centered Tailwind CSS html page.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-2 mt-8 items-center gap-6">
                        <div className="lg:col-span-8">
                            <div className="p-6 rounded-md shadow-sm bg-white dark:bg-slate-900">
                                <form>
                                    <div className="grid lg:grid-cols-12 lg:gap-6">
                                        <div className="lg:col-span-6 mb-5">
                                            <input name="name" id="name" type="text" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-orange-600/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none" placeholder="Name :" />
                                        </div>

                                        <div className="lg:col-span-6 mb-5">
                                            <input name="email" id="email" type="email" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-orange-600/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none" placeholder="Email :" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1">
                                        <div className="mb-5">
                                            <input name="subject" id="subject" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-orange-600/50 dark:bg-slate-900 dark:text-slate-200 rounded h-10 outline-none" placeholder="Subject :" />
                                        </div>

                                        <div className="mb-5">
                                            <textarea name="comments" id="comments" className="form-input w-full py-2 px-3 border border-gray-200 dark:border-gray-800 focus:ring-0 focus:border-orange-600/50 dark:bg-slate-900 dark:text-slate-200 rounded outline-none textarea h-28" placeholder="Message :"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" id="submit" name="send" className="btn bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-md h-11 justify-center flex items-center">Send Message</button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="lg:ms-8">
                                <div className="flex">
                                    <div className="icons text-center mx-auto">
                                        <FiPhone className="rounded text-2xl dark:text-white mb-0"/>
                                    </div>

                                    <div className="flex-1 ms-6">
                                        <h5 className="text-lg dark:text-white mb-2 font-medium">Phone</h5>
                                        <a href="tel:+152534-468-854" className="text-slate-400">+152 534-468-854</a>
                                    </div>
                                </div>

                                <div className="flex mt-4">
                                    <div className="icons text-center mx-auto">
                                       <FiMail  className="rounded text-2xl dark:text-white mb-0"/>
                                    </div>

                                    <div className="flex-1 ms-6">
                                        <h5 className="text-lg dark:text-white mb-2 font-medium">Email</h5>
                                        <a href="mailto:contact@example.com" className="text-slate-400">contact@example.com</a>
                                    </div>
                                </div>

                                <div className="flex mt-4">
                                    <div className="icons text-center mx-auto">
                                        <FiMapPin className="rounded text-2xl dark:text-white mb-0"/>
                                    </div>

                                    <div className="flex-1 ms-6">
                                        <h5 className="text-lg dark:text-white mb-2 font-medium">Location</h5>
                                        <p className="text-slate-400 mb-2">C/54 Northwest Freeway, Suite 558, Houston, USA 485</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

}
