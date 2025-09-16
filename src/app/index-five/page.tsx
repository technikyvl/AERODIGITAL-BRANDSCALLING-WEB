
import Image from "next/image";
import Link from "next/link";


import Services from "../component/services";
import About from "../component/about";
import Pricing from "../component/pricing";
import Blog from "../component/blog";
import Contact from "../component/contact";
import Footer from "../component/footer";
import Portfolio from "../component/portfolio";
import Review from "../component/testimonial";
import Switcher from "../component/switcher";
import Navbar from "../component/navbar";

function Index_three() {
  return (
    <>
          <Navbar navdark={true}/>
          <section
            className="py-36 md:h-auto md:py-0 flex items-center relative bg-orange-600/5 dark:bg-orange-600/10"
            id="home"
          >
            <div className="container relative">
              <div className="grid grid-cols-1 text-center mt-0 md:mt-12 pt-0 md:pt-12">
                <div className="mt-28">
                  <div>
                    <h4 className="lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium mb-7 position-relative dark:text-white">
                      Unique and bold functionality
                    </h4>

                    <p className="text-slate-600 dark:text-white/70 opacity-50 mb-0 max-w-2xl !text-lg mx-auto">
                      Launch your campaign and benefit from our expertise on
                      designing and managing conversion centered Tailwind CSS
                      html page.
                    </p>

                    <div className="relative mt-10">
                      <Link
                        href="#"
                        className="btn bg-orange-600 hover:bg-orange-700 border-orange-600 hover:border-orange-700 text-white rounded-md"
                      >
                        Start Free Trail !
                      </Link>
                    </div>
                  </div>
                  <Image
                    src="/images/bg/laptop.png"
                    alt=""
                    width={1200}
                    height={700}
                    className="relative mt-16"
                  />
                </div>
              </div>
            </div>
          </section>

          <About />

          <Services />

          <Portfolio />

          <Review />

          <Pricing />

          <Blog />

          <Contact />

          <Footer />

          <Switcher />
    </>
  );
}

export default Index_three;
