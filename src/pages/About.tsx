import { Link } from "react-router";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <div className="flex justify-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-green-300 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-green-300 transition-colors font-bold"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white hover:text-green-300 transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 -mt-20">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mb-6 shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent mb-4">
              About Our Project
            </h1>

            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mx-auto mb-6"></div>

            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8">
              Learn more about this amazing React application
            </p>
          </div>

          {/* Features grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                🚀 Modern Tech Stack
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• React 19 with TypeScript</li>
                <li>• TailwindCSS v4 for styling</li>
                <li>• React Router for navigation</li>
                <li>• Vite for fast development</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                ✨ Beautiful Design
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• Glass morphism effects</li>
                <li>• Gradient backgrounds</li>
                <li>• Smooth animations</li>
                <li>• Responsive layout</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                ⚡ Performance
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• Fast Hot Module Replacement</li>
                <li>• Optimized build process</li>
                <li>• TypeScript type checking</li>
                <li>• Modern ES modules</li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">
                🛠️ Developer Experience
              </h3>
              <ul className="text-white/80 space-y-2">
                <li>• ESLint for code quality</li>
                <li>• Git version control</li>
                <li>• GitHub integration</li>
                <li>• Easy deployment</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="group bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-center"
            >
              <span className="flex items-center justify-center space-x-2">
                <svg
                  className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span>Back to Home</span>
              </span>
            </Link>

            <Link
              to="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
