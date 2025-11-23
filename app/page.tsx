"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex">
      {/* Left Side - Content */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-lg space-y-8">
          {/* Main Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
                HAWKEYE
              </h1>
              <h2 className="text-xl lg:text-2xl font-bold text-black">
                AI-Powered Incident Tracking & Predictive Analytics
              </h2>
              <p className="text-base lg:text-lg text-black leading-relaxed font-medium">
                Leverage data to anticipate equipment failures, optimize maintenance schedules, and minimize downtime with our intelligent system.
              </p>
            </div>

            {/* Action Buttons - Neobrutalism Style */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => router.push("/auth/login")}
                className="flex-1 bg-black text-white h-16 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-white hover:text-black transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
                }}
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push("/auth/register")} 
                className="flex-1 bg-white text-black h-16 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-yellow-300 transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
                }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* System Access Points - Neobrutalism Style */}
          <div className="pt-6 border-t-4 border-black">
            <h3 className="text-base font-black text-black mb-4 text-center uppercase tracking-wide">
              System Access Points:
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push("/admin/login")}
                className="flex-1 bg-purple-400 text-white h-14 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-purple-500 transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)',
                }}
              >
                Admin Access
              </button>
              <button
                onClick={() => router.push("/technician/login")}
                className="flex-1 bg-cyan-400 text-white h-14 text-base font-black uppercase tracking-wide border-4 border-black hover:border-transparent hover:bg-cyan-500 transition-all duration-150 active:translate-x-1 active:translate-y-1 active:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                style={{
                  boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)',
                }}
              >
                Technician Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50">
        <div className="relative w-full h-full max-w-2xl max-h-[90vh] border-4 border-black overflow-hidden"
          style={{
            boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <Image
            src="/Gemini_Generated_Image_jjsyf2jjsyf2jjsy.png"
            alt="Hawkeye System"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
      </div>

      {/* Mobile Image - Show below content on small screens */}
      <div className="lg:hidden w-full p-8 pt-0">
        <div className="relative w-full h-64 border-4 border-black overflow-hidden"
          style={{
            boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
          }}
        >
          <Image
            src="/Gemini_Generated_Image_jjsyf2jjsyf2jjsy.png"
            alt="Hawkeye System"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
      </div>
    </div>
  )
}
