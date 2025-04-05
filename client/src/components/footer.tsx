import { Link } from "wouter";
import { Recycle, Github, Twitter, Linkedin, Mail, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Footer() {
  return (
    <footer className="bg-neutral-850 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center">
                <Recycle className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Eco<span className="text-primary-400">Sort</span>
              </h1>
            </div>
            <p className="text-gray-400 mb-6">
              Revolutionizing e-waste management through AI-powered classification and lifespan prediction.
              <Badge variant="secondary" className="ml-2 bg-primary-700/20 text-primary-400 border-primary-700">
                Beta
              </Badge>
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-gray-400 hover:text-primary-400 transition-colors">Home</a>
                </Link>
              </li>
              <li>
                <Link href="/sort">
                  <a className="text-gray-400 hover:text-primary-400 transition-colors">AI Sort</a>
                </Link>
              </li>
              <li>
                <Link href="/predict">
                  <a className="text-gray-400 hover:text-primary-400 transition-colors">Predictions</a>
                </Link>
              </li>
              <li>
                <Link href="/history">
                  <a className="text-gray-400 hover:text-primary-400 transition-colors">History</a>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">E-Waste Guide</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Recycling Centers</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">API Documentation</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Research Papers</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400">contact@ecosort.ai</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary-400 mt-0.5" />
                <span className="text-gray-400">123 Green Street, Eco City</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} EcoSort. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
