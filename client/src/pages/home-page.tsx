import { Link } from "wouter";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ArrowRight, Recycle, Timer, ChartLine, History, Earth, Biohazard, Trash2, Heart } from "lucide-react";

export default function HomePage() {
  return (
    <div className="bg-neutral-900 text-gray-200 min-h-screen flex flex-col">
      <Navbar />
      
      {/* Global Styles for Hover Effects */}
      <style>
        {`
          .glow-hover:hover {
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.7);
            transition: box-shadow 0.3s ease-in-out;
          }
          .glow-text-hover:hover {
            color: #00ff00;
            transition: color 0.3s ease-in-out;
          }
          .btn-glow:hover {
            background-color: #008000;
            box-shadow: 0 0 20px #00ff00;
            transition: all 0.3s ease-in-out;
          }
        `}
      </style>
      
      {/* Hero Section */}
      <section 
        id="home" 
        className="relative min-h-[80vh] flex items-center overflow-hidden"
        style={{
          backgroundColor: "#121212",
          backgroundImage: "radial-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight glow-text-hover">
                AI-Powered <span>E-Waste</span> Management
              </h1>
              <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                Revolutionizing the way we handle electronic waste through artificial intelligence. Upload, classify, and get insights on the lifespan of your electronic devices.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/sort">
                  <a className="px-6 py-3 bg-primary-700 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-primary-900/20 flex items-center gap-2 btn-glow">
                    <Recycle className="h-5 w-5" />
                    Start Sorting
                  </a>
                </Link>
                <a href="#impact" className="px-6 py-3 bg-neutral-800 hover:bg-green-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 btn-glow">
                  <Earth className="h-5 w-5" />
                  Learn Impact
                </a>
              </div>
            </div>
            <div className="hidden md:block relative">
              <img
                src="D:\EcoWasteAI\public\ewastecol.png"
                alt="E-Waste Sorting Illustration"
                className="w-full h-auto max-w-[500px] mx-auto transform hover:scale-105 transition-transform duration-300 rounded-lg shadow-2xl shadow-primary-900/20"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent rounded-lg"></div>
            </div>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[ 
              { icon: <Recycle className="h-8 w-8 text-primary-400 mb-3" />, title: "Smart Sorting", text: "AI-powered classification of e-waste materials" },
              { icon: <Timer className="h-8 w-8 text-primary-400 mb-3" />, title: "Lifespan Prediction", text: "Get accurate predictions for device lifespan" },
              { icon: <ChartLine className="h-8 w-8 text-primary-400 mb-3" />, title: "Trend Analysis", text: "Global e-waste management trends and insights" },
              { icon: <History className="h-8 w-8 text-primary-400 mb-3" />, title: "History Tracking", text: "Monitor your contributions to e-waste reduction" }
            ].map((feature, index) => (
              <div key={index} className="bg-neutral-850 border border-gray-800 p-6 rounded-xl glow-hover">
                {feature.icon}
                <h3 className="text-lg font-semibold text-white glow-text-hover">{feature.title}</h3>
                <p className="mt-2 text-gray-400 text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}