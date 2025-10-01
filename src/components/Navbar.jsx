import { Moon, Sun, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/Hooks/use-toast";

const Navbar = ({ currentVideoId, onNavigateToClassroom, onNavigateHome, currentPage, isClassroomMode }) => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleClassroomClick = (e) => {
    e.preventDefault();
    if (!currentVideoId) {
      toast({
        title: "Enter Video URL First",
        description: "Please enter a YouTube URL to get into the classroom mode for focused learning.",
        variant: "destructive",
      });
    } else {
      onNavigateToClassroom?.();
      toast({
        title: "Welcome to Classroom!",
        description: "Enjoy your distraction-free learning experience.",
      });
    }
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onNavigateHome?.();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border navbar-landscape">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-lg sm:text-2xl font-bold text-primary">
                FocusAura<span className="text-foreground">yt</span>
              </h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <button
                  onClick={handleHomeClick}
                  className={`transition-colors duration-300 font-medium ${
                    currentPage === 'home' || !currentPage
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={handleClassroomClick}
                  className={`transition-colors duration-300 font-medium ${
                    currentPage === 'classroom'
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  Classroom
                </button>
              </div>
            </div>

            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 rounded-lg bg-secondary hover:bg-accent transition-all duration-300 hover:scale-105"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-foreground" />
              )}
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-accent transition-all duration-300"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-card border-l border-border z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Menu</h2>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-secondary hover:bg-accent transition-all duration-300"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4">
            <div className="space-y-4">
              <button
                onClick={(e) => {
                  handleHomeClick(e);
                  closeMobileMenu();
                }}
                className={`block w-full text-left py-3 px-4 hover:bg-muted rounded-lg transition-all duration-300 font-medium ${
                  currentPage === 'home' || !currentPage
                    ? 'text-primary bg-muted/50'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Home
              </button>
              <button
                onClick={(e) => {
                  handleClassroomClick(e);
                  closeMobileMenu();
                }}
                className={`block w-full text-left py-3 px-4 hover:bg-muted rounded-lg transition-all duration-300 font-medium ${
                  currentPage === 'classroom'
                    ? 'text-primary bg-muted/50'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Classroom
              </button>

              {/* Theme Toggle in Mobile Menu */}
              <button
                onClick={() => {
                  toggleTheme();
                  closeMobileMenu();
                }}
                className="flex items-center justify-between w-full py-3 px-4 text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all duration-300 font-medium"
              >
                <span>Theme</span>
                {isDark ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;