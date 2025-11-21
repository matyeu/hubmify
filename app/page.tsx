"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import PreviewVideo from "./components/PreviewVideo";
import Footer from "./components/Footer";
import FAQSection from "./components/FAQSection";
import { SvgWFull, SvgWFull2, SvgW12H12TextWhite60 } from "./components/SVGs";

export default function Home() {
  const user = undefined;

  return (
    <>
      <Navbar user={user} />
      <div className="p-4 lg:p-6">
        {/* Hero Section */}
        <section className="px-8 pb-12 lg:pb-52 w-full rounded-[45px] relative z-1 overflow-hidden bg-gradient-linear mx-auto">
          <div className="!absolute !z-1 background__noisy"></div>
          <div className="relative z-[20] w-full max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:gap-8 py-24 h-full lg:py-52">
            <h1 className="text-white text-4xl lg:text-7xl font-bold text-left lg:text-center font-title">
              <span className="whitespace-nowrap">
                All your{" "}
                <span className="font-italic italic font-extralight">
                  projects
                </span>{" "}
                in one.
              </span>
              <br />
              Made with{" "}
              <span className="font-italic italic font-extralight">love</span>.
            </h1>
            <p className="font-sans text-white/80 text-lg lg:text-2xl text-left lg:text-center max-lg:max-w-sm">
              Add your socials, works and projects and build your site in
              seconds. <br />
            </p>
            <div className="group lg:mx-auto w-full lg:max-w-lg relative">
              <div className="bg-white/20 w-full transition-all duration-200 border border-white/20 group-focus-within:border-opacity-30 rounded-full relative overflow-hidden flex flex-row items-center justify-between gap-3 pl-6 pr-2 py-2 group-focus-within:ring-4 group-focus-within:ring-dark-100 group-focus-within:ring-opacity-10">
                <div className="flex items-center justify-start text-lg font-semibold lg:-translate-y-[1px] w-full">
                  <p className="text-dark-100">
                    hubmify.com<span className="text-white/60">/</span>
                  </p>
                  <input
                    type="text"
                    placeholder="your-name"
                    className="bg-transparent outline-none placeholder:text-white/60 text-white truncate w-full"
                    defaultValue=""
                  />
                </div>
                <div className="!flex">
                  <Link
                    href="/login"
                    className="w-auto max-w-max inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125"
                  >
                    <p className="font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full bg-black text-dark-100 px-5 py-3">
                      Start now
                      <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1 bg-[#2A6494]"></span>
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            className="absolute w-2/5 h-full bottom-0 left-0 object-cover opacity-10"
            style={{
              transform: "scaleX(-1)",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div
            className="absolute w-2/5 h-full bottom-0 right-0 object-cover opacity-30"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </section>

        {/* Preview Section */}
        <PreviewVideo />

        {/* Features Section */}
        <section
          id="features"
          className="max-w-7xl mx-auto relative lg:pt-32 z-1"
        >
          <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
            <div className="undefined p-[3px] bg-white/20 border border-white/20 inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer">
              <p className="font-sans uppercase text-xs font-semibold px-4 py-1.5 inline-block rounded-full z-1 bg-white text-black relative">
                Discover
                <span className="absolute right-0 top-0 h-full w-[40px] blur-lg -z-1 bg-[#C6E5FF]"></span>
              </p>
            </div>
            {/* SVG avec cercles concentriques */}
            <div
              className="w-full mx-auto max-w-5xl absolute top-24 left-1/2 -translate-x-1/2 -z-1 overflow-hidden"
              style={{ height: "50%", clipPath: "inset(0 0 50% 0)" }}
            >
              <SvgWFull />
            </div>
            <h2 className="font-title font-bold text-white text-3xl lg:text-5xl text-center">
              Features,{" "}
              <span className="italic font-italic font-extralight">
                features
              </span>{" "}
              <br />
              and features.
            </h2>
            <p className="font-sans text-lg lg:text-xl font-regular text-white/80 text-center">
              Create and publish your site faster with our features.
            </p>
            <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-8 mt-16">
              {/* Feature Card 1 */}
              <div className="w-full max-lg:max-w-lg max-lg:mx-auto group lg:col-span-2 flex flex-col rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative">
                <div className="px-12 pt-12 relative z-1 w-full">
                  <p className="text-white font-semibold text-xl">
                    Choose your custom url{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      from our 3 unique domains!
                    </span>
                  </p>
                </div>
                <div className="z-1 flex-1 flex flex-col gap-3 justify-center py-12 lg:py-6 overflow-hidden">
                  <div className="relative w-full overflow-hidden space-y-3">
                    {/* Ligne 1 */}
                    <div className="relative w-full overflow-hidden">
                      <ul className="flex flex-nowrap items-center gap-4 ribbon-animation__slideshow">
                        {[
                          "username.devart.bio",
                          "devart.bio/username",
                          "liste.bio/username",
                          "developpeur.bio/username",
                          "username.devart.bio",
                          "devart.bio/username",
                          "liste.bio/username",
                          "developpeur.bio/username",
                        ].map((url, i) => (
                          <li
                            key={`row1-${i}`}
                            className="rounded-full bg-gradient-to-br from-[#141416] to-[#1E1D21] px-5 py-3 font-sans text-sm font-bold text-gray-300 border border-white/5 whitespace-nowrap flex-shrink-0"
                          >
                            {url.includes("/") ? (
                              <>
                                <span className="opacity-60">
                                  {url.split("/")[0]}/
                                </span>
                                <span>{url.split("/")[1]}</span>
                              </>
                            ) : (
                              <>
                                <span className="opacity-60">
                                  {url.split(".")[0]}.
                                </span>
                                <span>{url.split(".").slice(1).join(".")}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Ligne 2 */}
                    <div className="relative w-full overflow-hidden">
                      <ul className="flex flex-nowrap items-center gap-4 ribbon-animation__slideshow-reversed">
                        {[
                          "devart.bio/username",
                          "liste.bio/username",
                          "developpeur.bio/username",
                          "username.devart.bio",
                          "devart.bio/username",
                          "liste.bio/username",
                          "developpeur.bio/username",
                          "username.devart.bio",
                        ].map((url, i) => (
                          <li
                            key={`row2-${i}`}
                            className="rounded-full bg-gradient-to-br from-white to-[#C6E5FF] px-5 py-3 font-sans text-sm font-bold text-gray-900 border border-white/5 whitespace-nowrap flex-shrink-0"
                          >
                            {url.includes("/") ? (
                              <>
                                <span className="opacity-60">
                                  {url.split("/")[0]}/
                                </span>
                                <span>{url.split("/")[1]}</span>
                              </>
                            ) : (
                              <>
                                <span className="opacity-60">
                                  {url.split(".")[0]}.
                                </span>
                                <span>{url.split(".").slice(1).join(".")}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Ligne 3 */}
                    <div className="relative w-full overflow-hidden">
                      <ul className="flex flex-nowrap items-center gap-4 ribbon-animation__slideshow">
                        {[
                          "liste.bio/username",
                          "developpeur.bio/username",
                          "username.devart.bio",
                          "devart.bio/username",
                          "liste.bio/username",
                          "developpeur.bio/username",
                          "username.devart.bio",
                          "devart.bio/username",
                        ].map((url, i) => (
                          <li
                            key={`row3-${i}`}
                            className="rounded-full bg-gradient-to-br from-[#141416] to-[#1E1D21] px-5 py-3 font-sans text-sm font-bold text-gray-300 border border-white/5 whitespace-nowrap flex-shrink-0"
                          >
                            {url.includes("/") ? (
                              <>
                                <span className="opacity-60">
                                  {url.split("/")[0]}/
                                </span>
                                <span>{url.split("/")[1]}</span>
                              </>
                            ) : (
                              <>
                                <span className="opacity-60">
                                  {url.split(".")[0]}.
                                </span>
                                <span>{url.split(".").slice(1).join(".")}</span>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 2 */}
              <div className="max-lg:max-w-lg max-lg:mx-auto group lg:col-span-2 rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative flex flex-col justify-between">
                <div className="px-12 pt-12 relative z-1">
                  <p className="text-white font-semibold text-xl">
                    Create your cards{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      from a long list of different social media and
                      applications.
                    </span>
                  </p>
                </div>

                <div className="px-4 relative pt-12 lg:pt-6 z-1">
                  <SvgWFull2 />
                  <div className="w-full h-full bg-[#00FFE0] blur-3xl -z-1 absolute bottom-0 left-0 transition-all duration-200 pointer-events-none opacity-0 group-hover:opacity-60"></div>
                </div>
              </div>

              {/* Feature Card 3 */}
              <div className="max-lg:max-w-lg max-lg:mx-auto group lg:col-span-2 rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative flex flex-col justify-between">
                <div className="px-12 pt-12 relative z-1">
                  <p className="text-white font-semibold text-xl">
                    Customize your theme{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      with our beautiful themes and templates.
                    </span>
                  </p>
                </div>
                <div className="px-4 relative pt-12 lg:pt-6 z-1">
                  <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
                    <p className="text-white/50 text-sm">Theme Preview</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Features Grid - 2x2 Layout */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
              {/* Feature Card 4 - Personalize your profile */}
              <div className="max-lg:max-w-lg max-lg:mx-auto group rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative flex flex-col justify-between">
                <div className="px-12 pt-12 relative z-1">
                  <p className="text-white font-semibold text-xl">
                    Personalize your profile{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      with custom colors, fonts, and layouts to match your
                      brand.
                    </span>
                  </p>
                </div>
                <div className="px-4 relative pt-12 lg:pt-6 z-1">
                  <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500"></div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500"></div>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 5 - Track your conversion */}
              <div className="max-lg:max-w-lg max-lg:mx-auto group rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative flex flex-col justify-between">
                <div className="px-12 pt-12 relative z-1">
                  <p className="text-white font-semibold text-xl">
                    Track your conversion{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      and monitor clicks, views, and engagement in real-time.
                    </span>
                  </p>
                </div>
                <div className="px-4 relative pt-12 lg:pt-6 z-1">
                  <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col gap-2 items-center">
                      <div className="text-white/80 text-2xl font-bold">
                        1,234
                      </div>
                      <div className="text-white/50 text-sm">Total Clicks</div>
                      <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-3/4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 6 - Stay up-to-date with */}
              <div className="max-lg:max-w-lg max-lg:mx-auto group rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative flex flex-col justify-between">
                <div className="px-12 pt-12 relative z-1">
                  <p className="text-white font-semibold text-xl">
                    Stay up-to-date with{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      notifications and updates about your profile performance.
                    </span>
                  </p>
                </div>
                <div className="px-4 relative pt-12 lg:pt-6 z-1">
                  <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="flex flex-col gap-2 items-center">
                      <SvgW12H12TextWhite60 />
                      <p className="text-white/50 text-sm">Real-time Updates</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feature Card 7 - See your statistics */}
              <div className="max-lg:max-w-lg max-lg:mx-auto group rounded-3xl border border-white/10 bg-[#1a1a1a] overflow-hidden relative flex flex-col justify-between">
                <div className="px-12 pt-12 relative z-1">
                  <p className="text-white font-semibold text-xl">
                    See your statistics{" "}
                    <span className="opacity-50 transition-all duration-200 group-hover:opacity-100">
                      with detailed analytics and insights about your audience.
                    </span>
                  </p>
                </div>
                <div className="px-4 relative pt-12 lg:pt-6 z-1">
                  <div className="w-full h-48 bg-white/5 rounded-lg flex items-center justify-center">
                    <div className="w-full px-6 flex flex-row gap-6 items-center justify-around">
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-white/60 text-xs lg:text-sm">
                          Visitors
                        </span>
                        <span className="text-white font-bold text-xl lg:text-2xl">
                          2,456
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-white/60 text-xs lg:text-sm">
                          Clicks
                        </span>
                        <span className="text-white font-bold text-xl lg:text-2xl">
                          1,234
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-white/60 text-xs lg:text-sm">
                          Conversion
                        </span>
                        <span className="text-white font-bold text-xl lg:text-2xl">
                          50.2%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            {
              question: "Is Hubmify free?",
              answer:
                "Yes, Hubmify offers a free plan with basic features. You can create your profile, add modules, and customize your theme. For advanced features like unlimited cards, analytics, and more themes, you can upgrade to our Pro plan.",
            },
            {
              question: "Can I connect multiple accounts?",
              answer:
                "Yes, you can connect multiple social media accounts and services to your Hubmify profile. This allows you to synchronize your content and display it all in one place.",
            },
            {
              question: "Can I create my own theme?",
              answer:
                "With the free plan, you can choose from a variety of pre-made themes. Pro members get access to all themes and more customization options. Custom theme creation is currently available for Pro members.",
            },
          ]}
        />

        {/* Community Section */}
        <section
          id="community"
          className="max-w-7xl mx-auto relative pt-16 pb-32 z-1"
        >
          <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
            <div className="undefined p-[3px] bg-white/20 border border-white/20 inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer">
              <p className="font-sans uppercase text-xs font-semibold px-4 py-1.5 inline-block rounded-full z-1 bg-white text-black relative">
                Trusted
                <span className="absolute right-0 top-0 h-full w-[40px] blur-lg -z-1 bg-[#C6E5FF]"></span>
              </p>
            </div>
            <h2 className="font-title font-bold text-white text-3xl lg:text-5xl text-center">
              Explore the{" "}
              <span className="italic font-italic font-extralight">
                portfolios
              </span>{" "}
              <br />
              of the community
            </h2>
            <p className="font-sans text-lg lg:text-xl font-regular text-white/80 text-center">
              Get an idea of what your profile could look like !
            </p>
            <div className="w-full mt-12 relative max-w-max z-1 flex flex-col items-center">
              <div className="flex items-center justify-center">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <a
                    key={i}
                    href="#"
                    className="-mr-6 relative group w-20 h-20 rounded-full p-[4px] bg-white/30 border border-white/30 hover:-translate-y-2 transition-all duration-200"
                  >
                    <div className="pointer-events-none object-cover !m-0 !p-0 object-top rounded-full w-full h-full relative bg-white/20"></div>
                  </a>
                ))}
              </div>
              <div className="w-full h-full bg-gradient-to-br from-white/20 to-stone-500 rounded-full blur-3xl absolute top-0 left-0 -z-1"></div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative pb-8">
          <section className="px-6 w-full rounded-t-[45px] relative z-1 overflow-hidden bg-gradient-linear mx-auto">
            <div className="!absolute !z-1 background__noisy"></div>
            <div className="relative z-[20] w-full max-w-3xl mx-auto grid grid-cols-1 gap-6 lg:gap-8 py-20 lg:pt-24 h-full lg:pb-36">
              <p className="text-white text-3xl lg:text-5xl font-bold text-left lg:text-center font-title">
                What are you waiting for?
                <br />
                Start now{" "}
                <span className="font-italic italic font-extralight">
                  for free
                </span>
                .
              </p>
              <div className="group lg:mx-auto w-full lg:max-w-lg relative">
                <div className="bg-white/20 w-full transition-all duration-200 border border-white/20 group-focus-within:border-opacity-30 rounded-full relative overflow-hidden flex flex-row items-center justify-between gap-3 pl-6 pr-2 py-2 group-focus-within:ring-4 group-focus-within:ring-dark-100 group-focus-within:ring-opacity-10">
                  <div className="flex items-center justify-start text-lg font-semibold lg:-translate-y-[1px] w-full">
                    <p className="text-dark-100">
                      hubmify.com<span className="text-white/60">/</span>
                    </p>
                    <input
                      type="text"
                      placeholder="your-name"
                      className="bg-transparent outline-none placeholder:text-white/60 text-white truncate w-full"
                      defaultValue=""
                    />
                  </div>
                  <div className="!flex">
                    <Link
                      href="/login"
                      className="w-auto max-w-max inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125"
                    >
                      <p className="font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full bg-black text-dark-100 px-5 py-3">
                        Start now
                        <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1 bg-[#2A6494]"></span>
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bg-gradient-to-t to-transparent from-body w-full h-full bottom-0 left-0 z-1 pointer-events-none"></div>
          </section>
          <Footer />
        </section>
      </div>
    </>
  );
}
