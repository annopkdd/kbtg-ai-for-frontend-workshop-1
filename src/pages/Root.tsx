import { Link } from "react-router";

function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 relative overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-web-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-web-green-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-web-green-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto p-8">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 shadow-lg">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-web-green-500 to-web-green-400 rounded-full mb-8 shadow-lg">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Main heading */}
          <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-white via-web-green-100 to-web-green-200 bg-clip-text text-transparent mb-6">
            PayWise
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-web-green-500 to-web-green-400 rounded-full mx-auto mb-8"></div>

          <p className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-12">
            ระบบโอนเงินที่ทันสมัย
          </p>

          {/* Navigation buttons */}
          <div className="flex justify-center mb-8">
            <Link
              to="/home"
              className="group bg-gradient-to-r from-web-green-600 to-web-green-500 hover:from-web-green-700 hover:to-web-green-600 text-white font-semibold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="flex flex-col items-center space-y-3">
                <svg
                  className="w-8 h-8 group-hover:scale-110 transition-transform"
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
                <span className="text-lg">เริ่มต้นใช้งาน</span>
                <span className="text-sm opacity-80">PayWise Dashboard</span>
              </div>
            </Link>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-white/10">
            <p className="text-white/50 text-sm">
              React + TypeScript + TailwindCSS v4 + React Router
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Root;
