"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQSection from "../components/FAQSection";

// Composant Check Icon
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm108.25 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z"></path>
    </svg>
  );
}

// Composant Cross Icon
function CrossIcon({ className }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 512 512"
      className={className}
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"></path>
    </svg>
  );
}

// Composant d'animation de nombre
function AnimatedNumber({
  value,
  duration = 500,
}: {
  value: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);
  const previousValueRef = useRef(value);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (previousValueRef.current !== value) {
      setIsAnimating(true);
      const startValue = previousValueRef.current;
      const endValue = value;
      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = startValue + (endValue - startValue) * easeOut;

        setDisplayValue(Math.round(currentValue * 100) / 100);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayValue(endValue);
          setIsAnimating(false);
          previousValueRef.current = value;
        }
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, duration]);

  return (
    <span className={isAnimating ? "transition-all duration-300" : ""}>
      {displayValue.toFixed(2)}
    </span>
  );
}

// Composant Pricing Plans
function PricingPlans() {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "6-months" | "3-months" | "1-month"
  >("6-months");

  // Configuration des prix selon la période
  const pricingData = {
    "6-months": {
      pricePerMonth: 2.49,
      totalPrice: 14.99,
      normalPrice: 17.94,
      interval: 6,
      intervalText: "billed every 6 months",
    },
    "3-months": {
      pricePerMonth: 2.66,
      totalPrice: 7.99,
      normalPrice: 8.97,
      interval: 3,
      intervalText: "billed every 3 months",
    },
    "1-month": {
      pricePerMonth: 2.99,
      totalPrice: 2.99,
      normalPrice: null,
      interval: 1,
      intervalText: "billed every month",
    },
  };

  const currentPricing = pricingData[selectedPeriod];

  return (
    <div className="max-w-4xl mx-auto w-full grid grid-cols-1 gap-20">
      {/* Sélecteur de période */}
      <div className="rounded-full p-1.5 bg-white/20 max-w-max mx-auto flex items-center gap-1">
        <button
          onClick={() => setSelectedPeriod("6-months")}
          className={`inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125 ${
            selectedPeriod === "6-months" ? "" : ""
          }`}
        >
          <p
            className={`font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-4 py-2.5 ${
              selectedPeriod === "6-months"
                ? "bg-white text-body"
                : "bg-transparent text-white hover:from-white/10 hover:to-white/5 bg-gradient-to-r"
            }`}
          >
            6-months
            <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1 bg-[#b3d9f7]"></span>
          </p>
        </button>
        <button
          onClick={() => setSelectedPeriod("3-months")}
          className="inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125"
        >
          <p
            className={`font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-4 py-2.5 ${
              selectedPeriod === "3-months"
                ? "bg-white text-body"
                : "bg-transparent text-white hover:from-white/10 hover:to-white/5 bg-gradient-to-r"
            }`}
          >
            3-months
            <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1"></span>
          </p>
        </button>
        <button
          onClick={() => setSelectedPeriod("1-month")}
          className="inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125"
        >
          <p
            className={`font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-4 py-2.5 ${
              selectedPeriod === "1-month"
                ? "bg-white text-body"
                : "bg-transparent text-white hover:from-white/10 hover:to-white/5 bg-gradient-to-r"
            }`}
          >
            1-month
            <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1"></span>
          </p>
        </button>
      </div>

      {/* Cartes de pricing */}
      <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10">
        {/* Plan Basic */}
        <div className="w-full rounded-xl border bg-body border-dark-400 p-10 bg-gradient-to-br from-dark-700/70 to-dark-700/10 max-w-md mx-auto">
          <header className="grid grid-cols-1 gap-4">
            <p className="font-semibold text-white text-3xl font-title">
              Basic
            </p>
            <p className="text-sm text-dark-200/50">
              This is the default plan. It includes all the basic features to
              start your portfolio.
            </p>
            <p className="capitalize font-bold font-title text-white text-5xl">
              0€ <span className="text-xs opacity-50 uppercase">/ month</span>
            </p>
          </header>
          <hr className="my-10 opacity-10" />
          <ul className="space-y-5">
            <li className="flex items-start justify-start gap-3 font-title text-sm text-dark-200/80">
              <CheckIcon className="inline min-w-[22px] min-h-[22px] text-dark-200/80" />
              Create your profil and publish it with a custom URL
            </li>
            <li className="flex items-start justify-start gap-3 font-title text-sm text-dark-200/80">
              <CheckIcon className="inline min-w-[22px] min-h-[22px] text-dark-200/80" />
              Create your modules from links, social networks, images and more
            </li>
            <li className="flex items-start justify-start gap-3 font-title text-sm text-dark-200/80">
              <CheckIcon className="inline min-w-[22px] min-h-[22px] text-dark-200/80" />
              Choose from a variety of themes and customize them to your liking
            </li>
            <li className="flex items-start justify-start gap-3 font-title text-sm text-dark-200/30">
              <CrossIcon className="inline min-w-[22px] min-h-[22px] opacity-70" />
              Unlocks more themes and customization options
            </li>
            <li className="flex items-start justify-start gap-3 font-title text-sm text-dark-200/30">
              <CrossIcon className="inline min-w-[22px] min-h-[22px] opacity-70" />
              Access to a lot of statistics about your portfolio: views, clicks,
              etc
            </li>
            <li className="flex items-start justify-start gap-3 font-title text-sm text-dark-200/30">
              <CrossIcon className="inline min-w-[22px] min-h-[22px] opacity-70" />
              Get the last posts from your social networks and display them in
              your portfolio
            </li>
          </ul>
        </div>

        {/* Plan Pro */}
        <div className="relative z-1 group transition-all duration-200 hover:brightness-110 cursor-pointer max-w-md mx-auto">
          <div className="w-full">
            <div className="rounded-xl ring-[6px] ring-white/5 p-10 bg-gradient-linear relative overflow-hidden">
              <header className="grid grid-cols-1 gap-4">
                <p className="font-semibold text-white text-3xl font-title gap-2 flex items-center">
                  Pro Membership
                  <Image
                    alt="Pro"
                    src="/images/badge_pro.png"
                    width={32}
                    height={32}
                    className="w-6"
                  />
                </p>
                <p className="text-sm text-dark-200/50">
                  Get access to all the features and take your portfolio to the
                  next level.
                </p>
                <div className="space-y-2.5">
                  <p className="capitalize font-bold font-title text-white text-5xl flex items-end gap-1 justify-start">
                    <AnimatedNumber value={currentPricing.pricePerMonth} />
                    <span className="text-xs opacity-50 uppercase">
                      € / month
                    </span>
                  </p>
                  <p className="text-white font-medium text-sm">
                    {currentPricing.normalPrice && (
                      <>
                        <span className="line-through opacity-60">
                          <AnimatedNumber value={currentPricing.normalPrice} />€
                        </span>{" "}
                      </>
                    )}
                    <span className="">
                      <AnimatedNumber value={currentPricing.totalPrice} />€
                    </span>{" "}
                    <span className="opacity-80">
                      {currentPricing.intervalText}
                    </span>
                  </p>
                </div>
              </header>
              <hr className="my-10 opacity-10" />
              <ul className="space-y-5">
                <li className="flex items-start justify-start gap-3 font-title text-sm text-white">
                  <CheckIcon className="inline min-w-[22px] min-h-[22px] text-white" />
                  Create your profil and publish it with a custom URL
                </li>
                <li className="flex items-start justify-start gap-3 font-title text-sm text-white">
                  <CheckIcon className="inline min-w-[22px] min-h-[22px] text-white" />
                  Create your modules from links, social networks, images and
                  more
                </li>
                <li className="flex items-start justify-start gap-3 font-title text-sm text-white">
                  <CheckIcon className="inline min-w-[22px] min-h-[22px] text-white" />
                  Choose from a variety of themes and customize them to your
                  liking
                </li>
                <li className="flex items-start justify-start gap-3 font-title text-sm text-white">
                  <CheckIcon className="inline min-w-[22px] min-h-[22px] text-white" />
                  Unlocks more themes and customization options
                </li>
                <li className="flex items-start justify-start gap-3 font-title text-sm text-white">
                  <CheckIcon className="inline min-w-[22px] min-h-[22px] text-white" />
                  Access to a lot of statistics about your portfolio: views,
                  clicks, etc
                </li>
                <li className="flex items-start justify-start gap-3 font-title text-sm text-white">
                  <CheckIcon className="inline min-w-[22px] min-h-[22px] text-white" />
                  Get the last posts from your social networks and display them
                  in your portfolio
                </li>
              </ul>
              <div className="!absolute !z-1 background__noisy opacity-30"></div>
              <button className="w-full mt-10 inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125 p-[4px] bg-white/20 border border-white/20">
                <p className="font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full bg-white text-body px-4 py-2.5">
                  Subscribe to Pro
                  <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1 bg-[#b3d9f7]"></span>
                </p>
              </button>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-linear scale-90 group-hover:scale-100 blur-3xl transition-all duration-200 -z-1"></div>
        </div>
      </div>
    </div>
  );
}

// Composant Pro Comparison
function ProComparison() {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro">("pro");

  const features = [
    { name: "Custom devart.bio URL", basic: true, pro: true },
    { name: "Modules and content synchronization", basic: true, pro: true },
    { name: "Subdomain slug.devart.bio", basic: false, pro: true },
    { name: "Custom domain name support", basic: false, pro: true },
    { name: "Cards limit on your portfolio", basic: "20", pro: "Unlimited" },
    { name: "Access to all services", basic: false, pro: true },
    { name: "Theme choices", basic: "5", pro: "Full access" },
    {
      name: "Analytics and statistics dashboard",
      basic: "Up to 1 hour",
      pro: "Up to 60 days",
    },
  ];

  return (
    <div className="w-full">
      {/* Version Desktop */}
      <div className="w-full max-lg:hidden relative">
        <div className="w-1/3 absolute right-0 top-0 h-full bg-gradient-linear -z-1 rounded-3xl pointer-events-none overflow-hidden">
          <div className="!absolute !z-1 background__noisy opacity-30"></div>
        </div>
        <header className="grid grid-cols-3 gap-0">
          <div></div>
          <p className="text-white font-title text-2xl font-bold text-center py-7">
            Basic
          </p>
          <p className="text-white font-title text-2xl font-bold text-center py-7">
            Pro membership{" "}
            <Image
              alt="Pro"
              src="/images/badge_pro.png"
              width={32}
              height={32}
              className="w-5 inline-block"
            />
          </p>
        </header>
        <main>
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-3 gap-0 border-t border-white/10 py-6"
            >
              <p className="col-span-1 text-white font-title text-base font-medium">
                {feature.name}
              </p>
              <p className="text-center flex items-center justify-center text-white font-title font-bold">
                {typeof feature.basic === "boolean" ? (
                  feature.basic ? (
                    <CheckIcon className="text-2xl text-white" />
                  ) : (
                    <CrossIcon className="opacity-20 text-2xl" />
                  )
                ) : (
                  feature.basic
                )}
              </p>
              <p className="text-center flex items-center justify-center text-white font-bold relative font-title">
                {typeof feature.pro === "boolean" ? (
                  feature.pro ? (
                    <CheckIcon className="text-2xl" />
                  ) : (
                    <CrossIcon className="opacity-20 text-2xl" />
                  )
                ) : (
                  feature.pro
                )}
              </p>
            </div>
          ))}
        </main>
      </div>

      {/* Version Mobile */}
      <div className="w-full lg:hidden relative">
        <div className="w-1/2 absolute right-0 top-0 h-full bg-gradient-linear -z-1 rounded-3xl pointer-events-none overflow-hidden">
          <div className="!absolute !z-1 background__noisy opacity-30"></div>
        </div>
        <header className="grid grid-cols-2">
          <div className="flex items-center justify-center">
            <div className="rounded-full p-1.5 bg-white/20 max-w-max mx-auto flex items-center gap-1">
              <button
                onClick={() => setSelectedPlan("basic")}
                className="inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125"
              >
                <p
                  className={`font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-4 py-2.5 ${
                    selectedPlan === "basic"
                      ? "bg-white text-body"
                      : "bg-transparent text-white hover:from-white/10 hover:to-white/5 bg-gradient-to-r"
                  }`}
                >
                  Basic
                  <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1"></span>
                </p>
              </button>
              <button
                onClick={() => setSelectedPlan("pro")}
                className="inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer hover:brightness-125"
              >
                <p
                  className={`font-sans font-semibold relative inline-block rounded-full z-1 transition-all duration-200 w-full px-4 py-2.5 ${
                    selectedPlan === "pro"
                      ? "bg-white text-body"
                      : "bg-transparent text-white hover:from-white/10 hover:to-white/5 bg-gradient-to-r"
                  }`}
                >
                  Pro
                  <span className="absolute right-0 top-0 h-full w-[40px] blur-xl -z-1 bg-[#b3d9f7]"></span>
                </p>
              </button>
            </div>
          </div>
          <p className="text-white font-title text-2xl font-bold text-center flex items-center justify-center gap-2 py-7 relative z-10">
            Pro{" "}
            <Image
              alt="Pro"
              src="/images/badge_pro.png"
              width={32}
              height={32}
              className="w-4 inline-block"
            />
          </p>
        </header>
        <main>
          {features.map((feature, index) => (
            <div
              key={index}
              className="grid grid-cols-2 lg:grid-cols-3 border-t border-white/10"
            >
              <p className="col-span-1 text-white font-title text-sm font-medium flex items-center justify-start pr-2.5">
                {feature.name}
              </p>
              <p className="text-center flex items-center justify-center text-white font-bold relative font-title w-full py-6">
                {selectedPlan === "basic" ? (
                  typeof feature.basic === "boolean" ? (
                    feature.basic ? (
                      <CheckIcon className="text-2xl text-white" />
                    ) : (
                      <CrossIcon className="opacity-20 text-2xl" />
                    )
                  ) : (
                    feature.basic
                  )
                ) : typeof feature.pro === "boolean" ? (
                  feature.pro ? (
                    <CheckIcon className="text-2xl text-white" />
                  ) : (
                    <CrossIcon className="opacity-20 text-2xl" />
                  )
                ) : (
                  feature.pro
                )}
              </p>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

// Composant Slug Input
function SlugInput() {
  const [slug, setSlug] = useState("");

  return (
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
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
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
  );
}

// Page principale
export default function PricingPage() {
  const user = undefined;

  return (
    <>
      <Navbar user={user} />
      <div className="py-4 px-6 lg:p-6">
        {/* Hero Section */}
        <section className="relative w-full z-1 py-32 h-full lg:pt-52 lg:pb-44 grid grid-cols-1 gap-6 lg:gap-8">
          <h1 className="text-white text-4xl lg:text-7xl font-bold text-center font-title mx-auto">
            Take your portfolio to the <br />
            <span className="font-italic italic font-extralight">
              next
            </span>{" "}
            level.
          </h1>
          <p className="font-sans text-white/80 text-lg lg:text-2xl text-center max-lg:max-w-sm mx-auto">
            Subscribe to our Pro Subscription and get access to all the
            features.
          </p>
          <PricingPlans />
          <div className="absolute w-screen -left-6 h-1/2 top-10 -z-1">
            {/* Grid background - vous pouvez ajouter une image de grid si nécessaire */}
            <div className="absolute w-2/5 h-full left-0 object-cover opacity-10 bg-grid-white/5"></div>
            <div className="absolute w-2/5 h-full right-0 object-cover opacity-20 bg-grid-white/5"></div>
            <div className="bg-gradient-to-b from-transparent to-body absolute w-full h-[100px] bottom-0"></div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mx-auto max-w-6xl gap-4 lg:gap-6 grid grid-cols-1">
          <ProComparison />
        </section>

        {/* FAQ Section */}
        <FAQSection
          faqs={[
            {
              question: "What is Hubmify?",
              answer:
                "Hubmify is a platform that allows you to create and share your own creative projects directly synchronized with external services (GitHub, Dribbble, Reddit, etc.).\nYou can customize your profile with many different themes and options.",
            },
            {
              question: "Is Hubmify Free?",
              answer:
                "Yes, Hubmify offers a free Basic plan with essential features. You can create your profile, add up to 20 cards, and choose from 5 themes. For unlimited cards, all themes, analytics, and more features, upgrade to Pro.",
            },
            {
              question: "How can I reach out to the support team?",
              answer:
                "You can contact our support team through the contact form on our website or by email. We typically respond within 24-48 hours during business days.",
            },
            {
              question: "Is it safe to connect my different accounts?",
              answer:
                "Yes, we use secure OAuth authentication protocols to connect your accounts. We never store your passwords and only request read-only access to display your content. Your data is encrypted and secure.",
            },
            {
              question: "Can I create my own theme?",
              answer:
                "Currently, you can choose from our collection of pre-made themes. Custom theme creation is a feature we're working on for future releases. Pro members get access to all available themes.",
            },
          ]}
          description="Here you can find the answers to the most frequently asked questions about Hubmify."
          defaultOpenIndex={0}
        />

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
              <SlugInput />
            </div>
            <div className="absolute bg-gradient-to-t to-transparent from-body w-full h-full bottom-0 left-0 z-1 pointer-events-none"></div>
          </section>
          <Footer />
        </section>
      </div>
    </>
  );
}
