"use client";

import { useState } from "react";
import { SvgTextWhiteW5H5TransitionAllDuration200 } from "./SVGs";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
  description?: string;
  defaultOpenIndex?: number | null;
}

export default function FAQSection({
  faqs,
  description = "Find answers to the most frequently asked questions about Hubmify here.",
  defaultOpenIndex = null,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  return (
    <section className="container mx-auto relative pb-32 pt-64 z-1">
      <div className="flex flex-col items-center gap-4 lg:gap-6 w-full">
        <div className="undefined p-[3px] bg-white/20 border border-white/20 inline-block min-w-min text-sm rounded-full whitespace-nowrap relative z-1 overflow-hidden transition-all duration-200 cursor-pointer">
          <p className="font-sans uppercase text-xs font-semibold px-4 py-1.5 inline-block rounded-full z-1 bg-white text-black relative">
            FAQ
            <span className="absolute right-0 top-0 h-full w-[40px] blur-lg -z-1 bg-[#C6E5FF]"></span>
          </p>
        </div>
        <h2 className="font-title font-bold text-white text-3xl lg:text-5xl text-center">
          Answers to all your{" "}
          <span className="italic font-italic font-extralight">
            questions...
          </span>
          <br />
          and more.
        </h2>
        <p className="font-sans text-lg lg:text-xl font-regular text-white/80 text-center max-w-lg mx-auto">
          {description}
        </p>
        <div className="w-full mt-14">
          <div className="grid grid-cols-1 gap-6 w-full mx-auto max-w-5xl">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`max-lg:max-w-lg max-lg:mx-auto w-full bg-white/10 rounded-2xl p-7 border border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/10 ${
                  openIndex === index ? "!bg-white/20" : ""
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="w-full items-center justify-between flex gap-4">
                  <h3 className="font-title font-medium text-white text-lg">
                    {faq.question}
                  </h3>
                  <SvgTextWhiteW5H5TransitionAllDuration200
                    className={`text-white w-5 h-5 transition-all duration-200 transform ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {openIndex === index && faq.answer && (
                  <p className="text-white/80 font-sans font-medium text-base mt-3 whitespace-pre-line">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
