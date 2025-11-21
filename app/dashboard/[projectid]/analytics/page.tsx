"use client";

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import Header from "../../../components/dashboard/Header";
import Sidebar from "../../../components/dashboard/Sidebar";
import Footer from "../../../components/dashboard/Footer";
import { useSidebar } from "../../../contexts/SidebarContext";

const data = [
  { time: "18:50", value: 0 },
  { time: "19:00", value: 0 },
  { time: "19:10", value: 0 },
  { time: "19:15", value: 0 },
  { time: "19:20", value: 4 },
  { time: "19:30", value: 6 },
  { time: "19:40", value: 8 },
];

export default function AnalyticsPage() {
  const { isMobile, isOpen, toggleCollapse } = useSidebar();

  return (
    <>
      {/* Bouton hamburger sur mobile quand le menu est fermé */}
      {isMobile && !isOpen && (
        <button
          onClick={toggleCollapse}
          className="fixed top-4 left-4 z-[100] w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded shadow-lg hover:bg-gray-50 transition-all cursor-pointer md:hidden"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
      <div className="flex min-h-screen bg-gray-50">
        {!isMobile && <Sidebar />}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto relative flex flex-col min-h-screen">
          <Header
            title="Analytics"
            subtitle="View your profile statistics and analytics."
            url="www.hubmify.com/matyeu"
          />

          {/* Content */}
          <div className="p-6 flex-1">
            {/* Metrics cards */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  USERS
                </p>
                <p className="text-4xl font-bold text-gray-900">11</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  CLICKS
                </p>
                <p className="text-4xl font-bold text-gray-900">0</p>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 relative">
              <div className="absolute top-6 right-6 flex items-center gap-2 z-10">
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#14b8a6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#14b8a6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="time"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <YAxis
                      domain={[0, 8]}
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#14b8a6"
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom cards */}
            <div className="grid grid-cols-3 gap-6">
              {/* Countries */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Countries
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Which countries your users are from
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇫🇷</span>
                    <span className="text-sm font-medium text-gray-900">
                      France
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    11
                  </span>
                </div>
              </div>

              {/* Referrers */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Referrers
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Where your users are coming from
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 truncate flex-1 mr-2">
                      https://devart.bio/profile/analytics
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      8
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 truncate flex-1 mr-2">
                      https://devart.bio/profile
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      3
                    </span>
                  </div>
                </div>
              </div>

              {/* Operating Systems */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Operating Systems
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Which OS your users are using
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    Windows 10.0
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    11
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
      {isMobile && <Sidebar />}
    </>
  );
}
