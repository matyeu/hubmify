"use client";

import "./maintenance.css";
import Image from "next/image";
import { useState } from "react";
import Button from "../components/Button";

export default function MaintenancePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="bg-dark-700 maintenance-page min-h-screen w-full overflow-x-hidden relative z-1">
        <div id="background__noisy"></div>

        <nav className="px-6 font-action max-w-container mx-auto flex items-center justify-between py-8 absolute left-1/2 top-0 w-full -translate-x-1/2 z-[11]">
          <a
            className="text-dark-100 font-bold font-action text-xl"
            href="/maintenance"
          >
            hubmify.com
          </a>
          <Button
            variant="secondary"
            size="md"
            className="bg-white px-5 py-3.5 shadow-sm rounded-md text-discord-default font-semibold text-sm font-action items-center justify-center gap-3 transition-all duration-200 hover:-translate-y-1.5 hidden lg:flex opacity-50"
            disabled
            icon={
              <Image
                alt="Discord Logo"
                loading="lazy"
                width={20}
                height={20}
                src="/images/media/discord-blurple.svg"
                style={{ color: "transparent" }}
              />
            }
            iconPosition="left"
          >
            Access my account
          </Button>
          <Button
            onClick={toggleMenu}
            variant="ghost"
            size="sm"
            className="text-dark-100 lg:hidden p-0"
            aria-label="Toggle menu"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            }
          />
        </nav>

        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-dark-700 bg-opacity-30 backdrop-blur-2xl z-10 transition-all duration-200 flex items-center justify-center ${
            isMenuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
          onClick={closeMenu}
        >
          <div></div>
          <div className="w-full px-10" onClick={(e) => e.stopPropagation()}>
            <p className="text-dark-100/70 text-sm font-bold uppercase mb-5">
              Where to go?
            </p>
            <ul className="grid grid-cols-1 gap-5 w-full">
              <li className="relative w-full max-w-max opacity-50">
                <a
                  className="text-4xl font-bold bg-gradient-public bg-clip-text text-transparent relative"
                  href="/maintenance"
                >
                  Premium
                </a>
                <Image
                  alt="Premium"
                  loading="lazy"
                  width={18}
                  height={18}
                  src="/images/media/sparkle.svg"
                  className="absolute top-0 -right-4 object-cover pointer-events-none invert brightness-0"
                  style={{ color: "transparent" }}
                />
                <Image
                  alt="Premium"
                  loading="lazy"
                  width={18}
                  height={18}
                  src="/images/media/sparkle.svg"
                  className="absolute bottom-0 -left-5 object-cover pointer-events-none invert brightness-0"
                  style={{ color: "transparent" }}
                />
              </li>
              <li className="relative w-full max-w-max text-4xl font-bold text-white">
                Sign in
              </li>
            </ul>
            <div></div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-32 lg:gap-64 px-6">
          <div className="">
            <div className="rounded-full absolute w-screen 2xl:max-w-[100rem] left-1/2 -translate-x-1/2 h-1/3 -translate-y-1/2 bg-gradient-public blur-3xl sm:blur-[120px] lg:blur-[211px] -z-2"></div>

            <header className="w-full pt-32 pb-32 lg:pt-64 lg:pb-44 max-w-7xl mx-auto lg:grid grid-cols-1 gap-8 lg:gap-14 relative flex flex-col items-center justify-center">
              <div className="pointer-events-none select-none">
                <div
                  className="absolute -z-1 left-56 -top-8 pointer-events-none w-[300px] hidden lg:block"
                  style={{ opacity: 0, transform: "scale(0.5) translateZ(0)" }}
                >
                  <Image
                    alt="Discord"
                    loading="lazy"
                    width={390}
                    height={175}
                    src="/images/media/discord.svg"
                    className="w-full object-contain block rotate-12"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div
                  className="absolute -z-1 right-42 lg:right-60 -top-10 lg:top-6 pointer-events-none w-[170px]"
                  style={{ opacity: 0, transform: "scale(0.5) translateZ(0)" }}
                >
                  <div
                    className="dotlottie-container main -rotate-12"
                    lang="en"
                  >
                    <div
                      data-name="undefined"
                      role="figure"
                      className="animation"
                      style={{ position: "relative" }}
                    ></div>
                  </div>
                </div>
                <div
                  className="absolute -z-1 bottom-0 -right-24 pointer-events-none w-[300px] lg:right-0 hidden lg:block"
                  style={{ opacity: 0, transform: "scale(0.5) translateZ(0)" }}
                >
                  <div
                    className="dotlottie-container main -rotate-12"
                    lang="en"
                  >
                    <div
                      data-name="undefined"
                      role="figure"
                      className="animation"
                      style={{ position: "relative" }}
                    ></div>
                  </div>
                </div>
                <div
                  className="absolute -z-1 -left-20 bottom-44 top-1/2 pointer-events-none w-[160px] hidden lg:block"
                  style={{ opacity: 0, transform: "scale(0.5) translateZ(0)" }}
                >
                  <div
                    className="dotlottie-container main -rotate-12"
                    lang="en"
                  >
                    <div
                      data-name="undefined"
                      role="figure"
                      className="animation"
                      style={{ position: "relative" }}
                    ></div>
                  </div>
                </div>
                <div
                  className="absolute -z-1 bottom-20 right-0 translate-x-1/2 lg:translate-x-full lg:top-1/2 lg:-translate-y-1/2 pointer-events-none w-[110px] lg:w-[130px] hidden lg:block"
                  style={{ opacity: 0, transform: "scale(0.5) translateZ(0)" }}
                >
                  <Image
                    alt="Dribbble"
                    loading="lazy"
                    width={176}
                    height={176}
                    src="/images/media/dribbble.svg"
                    className="w-full object-contain block rotate-12 lg:rotate-6"
                    style={{ color: "transparent" }}
                  />
                </div>
                <div
                  className="absolute -z-1 left-0 -translate-x-1/2 lg:left-24 -rotate-12 lg:rotate-12 bottom-24 lg:bottom-0 pointer-events-none w-[110px] lg:w-[130px] hidden lg:block"
                  style={{ opacity: 0, transform: "scale(0.5) translateZ(0)" }}
                >
                  <img
                    alt="Metadata"
                    loading="lazy"
                    width={157}
                    height={157}
                    src="/images/meta.jpeg"
                    srcSet="/images/meta.jpeg 1x, /images/meta.jpeg 2x"
                    style={{ color: "transparent" }}
                  />
                </div>
              </div>

              <div className="max-w-5xl mx-auto grid grid-cols-1 gap-6 lg:gap-4 relative">
                <div className="badge-bientot-disponible max-w-max relative z-1 text-white font-action uppercase text-xs font-semibold px-4 py-2 rounded-full mx-auto">
                  Coming Soon
                </div>

                <h1 className="text-dark-100 font-black text-center text-4xl lg:text-[64px] leading-tight lg:leading-none">
                  Create your project <br></br>now in just a few clicks!
                </h1>

                <h2 className="text-dark-100 text-opacity-70 font-light font-sans text-center text-base lg:text-lg leading-tight">
                  Increase your visibility and boost your network thanks to
                  hubmify.com,
                  <br className="hidden lg:block" />
                  the project platform for developers.
                </h2>

                <h2 className="text-dark-100 font-light font-sans text-center text-lg leading-tight relative max-w-max mx-auto pr-3">
                  It&apos;s free, ad-free, and easy to use.
                </h2>
              </div>

              <div className="w-full">
                <div className="group mx-auto w-full max-w-3xl relative">
                  <div className="w-full mx-auto max-w-[600px] transition-all duration-200 border border-dark-200 group-focus-within:border-dark-100 group-focus-within:border-opacity-40 border-opacity-30 lg:border-opacity-60 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-3 p-4 lg:pl-6 lg:pr-3 lg:py-3 group-focus-within:ring-4 group-focus-within:ring-dark-100 group-focus-within:ring-opacity-10">
                    <div className="flex items-center justify-start text-lg font-semibold lg:-translate-y-[1px] w-full">
                      <p className="text-dark-200 opacity-60">hubmify.com/</p>
                      <input
                        type="text"
                        placeholder="your-project"
                        className="bg-transparent outline-none placeholder:text-dark-200 text-dark-100 truncate w-full"
                        defaultValue=""
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="lg"
                      disabled
                      className="!w-full lg:w-auto lg:max-w-max rounded-xl py-3 px-5 whitespace-nowrap text-sm relative z-1 overflow-hidden bg-button-primary bg-button-primary-disabled"
                    >
                      <span className="text-dark-100 font-action font-bold relative z-[2]">
                        Create my project
                      </span>
                    </Button>
                    <div className="bg-gradient-to-r from-dark-700 to-[rgba(0,0,0,.5)] backdrop-blur-lg -z-1 absolute top-0 left-0 h-full w-full opacity-50"></div>
                  </div>
                  <div className="absolute w-full">
                    <p className="text-white/70 font-action text-center mt-2.5 font-semibold hover:text-dark-100 cursor-pointer max-w-max mx-auto">
                      or connect me
                    </p>
                  </div>
                </div>
              </div>
            </header>
          </div>

          <div className="max-w-container mx-auto text-dark-100 flex-col-reverse lg:flex-row flex items-start justify-start gap-16 lg:gap-20 relative -z-1">
            <div className="w-full mx-auto lg:max-w-3xl grid grid-cols-1 gap-16 lg:gap-20">
              <div className="grid grid-cols-1 gap-3 text-center lg:text-left">
                <div className="relative">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 -translate-y-[35px] lg:left-0 text-6xl lg:text-7xl text-transparent bg-gradient-to-b font-bold from-dark-100 via-dark-300 to-dark-700 bg-clip-text font-sans">
                    01
                  </span>
                  <h2 className="relative text-dark-100 font-black text-3xl lg:text-4xl font-sans">
                    Choose your theme
                  </h2>
                </div>
                <p className="text-dark-200 text-base lg:text-lg font-light leading-loose max-w-2xl mx-auto lg:mx-0 lg:max-w-full whitespace-pre-line">
                  Choose from a selection of graphic themes and customize your
                  project to your image.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-center lg:text-left">
                <div className="relative">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 -translate-y-[35px] lg:left-0 text-6xl lg:text-7xl text-transparent bg-gradient-to-b font-bold from-dark-100 via-dark-300 to-dark-700 bg-clip-text font-sans">
                    02
                  </span>
                  <h2 className="relative text-dark-100 font-black text-3xl lg:text-4xl font-sans">
                    Add your networks
                  </h2>
                </div>
                <p className="text-dark-200 text-base lg:text-lg font-light leading-loose max-w-2xl mx-auto lg:mx-0 lg:max-w-full whitespace-pre-line">
                  Add your social networks and contact links so your visitors
                  can reach you easily. GitHub, Dribbble, Behance, Discord, and
                  many others are available!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 text-center lg:text-left">
                <div className="relative">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 lg:translate-x-0 -translate-y-[35px] lg:left-0 text-6xl lg:text-7xl text-transparent bg-gradient-to-b font-bold from-dark-100 via-dark-300 to-dark-700 bg-clip-text font-sans">
                    03
                  </span>
                  <h2 className="relative text-dark-100 font-black text-3xl lg:text-4xl font-sans">
                    Share your project
                  </h2>
                </div>
                <p className="text-dark-200 text-base lg:text-lg font-light leading-loose max-w-2xl mx-auto lg:mx-0 lg:max-w-full whitespace-pre-line">
                  Share your project on your social networks and boost your
                  visibility.
                </p>
              </div>
            </div>

            <div className="flex-1 lg:-translate-y-14 max-w-sm mx-auto lg:max-w-full">
              <div className="w-full object-contain hidden lg:block h-[600px]">
                <Image
                  alt="Themes"
                  loading="lazy"
                  width={682}
                  height={779}
                  src="/images/media/about.svg"
                  className="w-[120%]"
                  style={{ color: "transparent" }}
                />
              </div>
              <Image
                alt="About"
                loading="lazy"
                width={691}
                height={469}
                src="/images/media/about-xs.svg"
                className="w-full object-cover block lg:hidden"
                style={{ color: "transparent" }}
              />
            </div>

            <div className="rounded-full absolute w-[200px] h-[300px] lg:w-[400px] lg:h-[500px] bg-gradient-public blur-3xl sm:blur-[120px] lg:blur-[150px] -z-2 -right-20 translate-x-1/2 lg:translate-x-full top-20 lg:top-20 lg:bottom-0"></div>
          </div>

          <div className="relative h-[116px] w-full">
            <div className="flex absolute left-0 justify-center items-center h-full gap-8 w-[200%] animate-slide">
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Twitter"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/twitter.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Twitter</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Discord"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/discord.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Discord</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="GitHub"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/github.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">GitHub</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Behance"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/behance.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Behance</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Spotify"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/spotify.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Spotify</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="GitLab"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/gitlab.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">GitLab</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Dribbble"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/dribbble.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Dribbble</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Custom"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/custom.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Custom</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Metadata"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/metadata.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Metadata</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Twitter"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/twitter.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Twitter</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Discord"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/discord.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Discord</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="GitHub"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/github.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">GitHub</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Behance"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/behance.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Behance</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Spotify"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/spotify.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Spotify</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="GitLab"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/gitlab.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">GitLab</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Dribbble"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/dribbble.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Dribbble</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Custom"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/custom.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Custom</p>
                  </div>
                </div>
              </div>
              <div className="w-full h-full rounded-xl min-w-[250px] select-none border-[1px] border-dark-200 border-opacity-40">
                <div className="h-full text-white/80 w-full text-center align-middle flex flex-col justify-center rounded-xl bg-dark-700/20">
                  <div className="flex flex-row items-center align-middle gap-4 justify-center">
                    <Image
                      alt="Metadata"
                      loading="lazy"
                      width={12}
                      height={12}
                      src="/images/media/metadata.svg"
                      className="text-2xl w-8 h-8 opacity-60"
                      style={{ color: "transparent" }}
                    />
                    <p className="text-2xl">Metadata</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-full absolute w-[200px] h-[300px] lg:w-[400px] lg:h-[600px] bg-gradient-public blur-3xl sm:blur-[120px] lg:blur-[150px] -z-2 -left-20 -translate-x-1/3 lg:-translate-x-1/3 lg:-translate-y-1/2"></div>
          </div>

          <div className="max-w-2xl mx-auto text-dark-100 grid grid-cols-1 gap-10 relative -z-1">
            <h3 className="text-dark-100 font-black text-center text-4xl lg:text-[50px] leading-tight lg:leading-none">
              Discover the projects of the community
            </h3>
            <div className="flex items-center justify-center -space-x-6">
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                st
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-1 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                th
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-2 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                lu
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-3 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                ao
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-4 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                ov
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-5 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                se
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-6 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                ba
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-7 absolute w-full h-full"></div>
              </div>
              <div className="w-16 h-16 lg:w-20 lg:h-20 relative overflow-hidden rounded-full border-[6px] border-dark-700 flex items-center justify-center text-lg lg:text-2xl text-dark-100 font-action font-bold uppercase z-1">
                lu
                <div className="backdrop-blur w-full h-full -z-1 circle-gradient-8 absolute w-full h-full"></div>
              </div>
            </div>
            <div className="flex justify-center opacity-50">
              <Button
                variant="outline"
                size="lg"
                disabled
                className="border border-dark-100 border-opacity-20 rounded-xl py-3 px-5 whitespace-nowrap text-sm relative z-1 overflow-hidden bg-button-primary bg-button-primary-hover opacity-50"
              >
                <span className="text-dark-100 font-action font-bold relative z-[2]">
                  Explore the projects (coming soon)
                </span>
              </Button>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-dark-100 grid grid-cols-1 gap-10 relative pb-32 lg:pb-0">
            <h3 className="text-dark-100 font-black text-center text-3xl lg:text-[50px] leading-tight lg:leading-none">
              <span className="block text-5xl lg:text-[64px] mb-4">
                Conviced ?
              </span>{" "}
              Create your project now!
            </h3>
            <div className="group mx-auto w-full max-w-3xl relative">
              <div className="w-full mx-auto max-w-[600px] transition-all duration-200 border border-dark-200 group-focus-within:border-dark-100 group-focus-within:border-opacity-40 border-opacity-30 lg:border-opacity-60 rounded-3xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-3 p-4 lg:pl-6 lg:pr-3 lg:py-3 group-focus-within:ring-4 group-focus-within:ring-dark-100 group-focus-within:ring-opacity-10">
                <div className="flex items-center justify-start text-lg font-semibold lg:-translate-y-[1px] w-full">
                  <p className="text-dark-200 opacity-60">hubmify.com/</p>
                  <input
                    type="text"
                    placeholder="ton-nom"
                    className="bg-transparent outline-none placeholder:text-dark-200 text-dark-100 truncate w-full"
                    defaultValue=""
                  />
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  disabled
                  className="!w-full lg:w-auto lg:max-w-max rounded-xl py-3 px-5 whitespace-nowrap text-sm relative z-1 overflow-hidden bg-button-primary bg-button-primary-disabled"
                >
                  <span className="text-dark-100 font-action font-bold relative z-[2]">
                    Create my project
                  </span>
                </Button>
                <div className="bg-gradient-to-r from-dark-700 to-[rgba(0,0,0,.5)] backdrop-blur-lg -z-1 absolute top-0 left-0 h-full w-full opacity-50"></div>
              </div>
              <div className="absolute w-full">
                <p className="text-white/70 font-action text-center mt-2.5 font-semibold hover:text-dark-100 cursor-pointer max-w-max mx-auto">
                  or connect me
                </p>
              </div>
            </div>
          </div>

          <footer className="relative">
            <div className="w-full h-[1px] bg-gradient-to-r from-transparent to-transparent via-dark-100 opacity-20"></div>
            <div className="flex flex-col-reverse md:grid md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-6 container mx-auto py-14">
              <div className="text-center md:text-left">
                <p className="text-white font-action text-lg font-semibold">
                  © hubmify.com
                </p>
                <p className="text-white/60 text-sm font-medium font-action mt-1">
                  Copyright © 2025 hubmify.com, Inc
                </p>
              </div>
              <div className=""></div>
              <div className="flex flex-col gap-3 text-center md:text-right">
                <p className="text-white text-xs font-semibold font-action uppercase">
                  Légales
                </p>
                <ul className="flex flex-col gap-2">
                  <a
                    target="_blank"
                    className="text-white/70 text-base font-medium font-action hover:text-white"
                    href="/maintenance/terms-of-use"
                  >
                    Terms of Use
                  </a>
                  <a
                    target="_blank"
                    className="text-white/70 text-base font-medium font-action hover:text-white"
                    href="/maintenance/privacy-policy"
                  >
                    Privacy Policy
                  </a>
                  <a
                    target="_blank"
                    className="text-white/70 text-base font-medium font-action hover:text-white"
                    href="/maintenance/politique-des-cookies"
                  >
                    Cookies
                  </a>
                </ul>
              </div>
              <div className="flex flex-col gap-3 text-center md:text-right">
                <p className="text-white text-xs font-semibold font-action uppercase">
                  Information
                </p>
                <ul className="flex flex-col gap-2">
                  <li className="text-premium-default text-base font-medium font-action hover:text-premium-hover flex items-center justify-center md:justify-end gap-3">
                    <span className="bg-premium-default rounded-full text-xs text-premium-default px-2 py-0.5 bg-opacity-30">
                      Coming Soon
                    </span>
                    <span
                      className="relative"
                      style={{ filter: "drop-shadow(0px 1px 5px #5865F2)" }}
                    >
                      Premium
                      <Image
                        alt="Premium"
                        loading="lazy"
                        width={12}
                        height={12}
                        src="/images/media/sparkle.svg"
                        className="absolute top-0 -right-2 object-cover pointer-events-none"
                        style={{ color: "transparent" }}
                      />
                      <Image
                        alt="Premium"
                        loading="lazy"
                        width={12}
                        height={12}
                        src="/images/media/sparkle.svg"
                        className="absolute bottom-0 -left-3 object-cover pointer-events-none"
                        style={{ color: "transparent" }}
                      />
                    </span>
                  </li>
                  <a
                    target="_blank"
                    className="text-white/70 text-base font-medium font-action hover:text-white"
                    href="https://discord.gg/SSPXJ6T96N"
                  >
                    Contact
                  </a>
                </ul>
              </div>
            </div>
            <div className="rounded-full absolute w-screen 2xl:max-w-[100rem] left-1/2 -translate-x-1/2 h-[200%] bottom-0 left-0 bg-gradient-public blur-3xl sm:blur-[120px] lg:blur-[211px] -z-2"></div>
          </footer>

          <div
            className="fixed backdrop-blur-sm hover:!opacity-100 bottom-8 transition-all duration-200 hidden lg:block right-8 w-full max-w-md rounded-xl bg-gradient-public__next overflow-hidden p-[2px] z-[5]"
            style={{
              opacity: 0,
              transform: "translateY(5px) scale(0.9) translateZ(0)",
            }}
          >
            <div className="w-full h-full relative z-1 p-3 lg:py-4 lg:pl-5 lg:pr-4 bg-dark-700 rounded-xl bg-opacity-80 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-dark-100 font-semibold text-base">
                  Any questions?
                </p>
                <a
                  target="_blank"
                  className="inline-block bg-dark-100 rounded-lg px-4 py-2 text-dark-900 outline-none text-sm hover:bg-dark-100/90 transition-all duration-200"
                  href="https://discord.gg/SSPXJ6T96N"
                >
                  Join us on Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
