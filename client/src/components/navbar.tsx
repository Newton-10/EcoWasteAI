import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Menu, User, LogOut, Recycle } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [location] = useLocation();
  const { user, isLoading, logoutMutation } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", active: location === "/" },
    { href: "/sort", label: "AI Sort", active: location === "/sort" },
    { href: "/predict", label: "Predictions", active: location === "/predict" },
    { href: "/history", label: "History", active: location === "/history" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className="bg-neutral-850 border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center shadow-lg shadow-primary-400/50 hover:scale-110 transition-transform">
            <Recycle className="h-5 w-5 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <Link href="/">
              <a className="text-2xl font-bold text-white transition-all duration-300 hover:text-primary-400 hover:drop-shadow-lg">
                Eco<span className="text-primary-400">Sort</span>
              </a>
            </Link>
            <Badge variant="secondary" className="bg-primary-700/20 text-primary-400 border-primary-700 animate-pulse">
              Beta
            </Badge>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <a className={`font-medium transition-all duration-300 hover:scale-105 hover:text-primary-400 hover:drop-shadow-md ${
                link.active ? "text-primary-400" : "text-white"
              }`}>
                {link.label}
              </a>
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          {isLoading ? (
            <Loader2 className="h-5 w-5 text-primary-400 animate-spin" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-primary-400 hover:text-primary-300 transition-transform hover:scale-110">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-neutral-800 border-gray-700 shadow-xl">
                <div className="px-2 py-1.5 text-sm text-primary-400 font-medium">{user.username}</div>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  className="text-white hover:bg-neutral-700 cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/auth">
              <Button variant="ghost" size="sm" className="text-primary-400 hover:text-primary-300 transition-all duration-300 hover:scale-105">
                Login
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="icon" className="md:hidden text-white hover:scale-110 transition-transform" onClick={toggleMobileMenu}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-3 border-t border-gray-800 bg-neutral-850 backdrop-blur-lg transition-all duration-300">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a 
                  className={`py-2 font-medium transition-all duration-300 hover:scale-105 hover:text-primary-400 hover:drop-shadow-md ${
                    link.active ? "text-primary-400" : "text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
