"use client";

import Image from "next/image";
import Button from "../components/Button";

export default function SubscriptionPage() {
  return (
    <>
      <div className="flex min-h-screen bg-gray-50">
        {/* Main content */}
        <main className="flex-1 overflow-y-auto relative font-[var(--font-inter)] flex flex-col min-h-screen">
          {/* Content */}
          <div className="p-6 flex items-center justify-center flex-1">
            {/* Modal */}
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
              {/* PRO Badge Icon */}
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/icon_pro.svg"
                  alt="Pro badge"
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>

              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
                  This feature is{" "}
                  <Image
                    src="/images/badge_pro.png"
                    alt="Pro badge"
                    width={100}
                    height={100}
                    className="h-24 w-auto"
                  />
                </h2>
                <p className="text-sm text-gray-600">
                  Some features require a Pro subscription, so subscribe now to
                  get the full power of Hubmify!
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Unlocks more themes and customization options.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Access to a lot of statistics about your portfolio: views,
                    clicks, etc
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Get the last posts from your social networks and display
                    them in your portfolio.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Get an unlimited number of modules on your profile.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-700">
                    Access to all the modules available on the platform:
                    behance, dribbble, etc
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="!bg-blue-500 hover:!bg-blue-600 rounded-xl"
              >
                Upgrade now
              </Button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
