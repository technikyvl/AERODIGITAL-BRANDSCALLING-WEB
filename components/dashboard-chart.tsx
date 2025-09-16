"use client"

import { useEffect, useState } from "react"

export function DashboardChart() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const chartData = [
    { height: 60, delay: 100 },
    { height: 80, delay: 200 },
    { height: 45, delay: 300 },
    { height: 90, delay: 400 },
    { height: 70, delay: 500 },
    { height: 95, delay: 600 },
    { height: 55, delay: 700 },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-black">Analytics Dashboard</h3>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="text-2xl font-bold text-black">$24,780</div>
        <div className="text-sm text-green-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
          </svg>
          +12.5% from last month
        </div>
      </div>

      <div className="flex items-end justify-between h-32 space-x-2">
        {chartData.map((bar, index) => (
          <div
            key={index}
            className={`bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-sm flex-1 ${
              isVisible ? "animate-chart-grow" : "opacity-0 scale-y-0"
            }`}
            style={{
              height: `${bar.height}%`,
              animationDelay: `${bar.delay}ms`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>

      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  )
}
