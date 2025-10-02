import { useState } from "react";
import { Play, Search, Moon } from "lucide-react";
import { useToast } from "@/Hooks/use-toast";

const HeroSection = ({ onVideoSubmit }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const extractVideoId = (url) => {
    // Clean the URL and handle various formats
    const cleanUrl = url.trim();

    // More comprehensive patterns for YouTube URLs
    const patterns = [
      // Standard watch URLs
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      // Short URLs
      /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
      // Embed URLs
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      // YouTube Shorts
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      // Mobile URLs
      /(?:https?:\/\/)?(?:www\.)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      // Live URLs
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/,
      // Just the video ID (11 characters)
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = cleanUrl.match(pattern);
      if (match && match[1]) {
        // Validate that the extracted ID is exactly 11 characters
        const videoId = match[1];
        if (videoId.length === 11) {
          return videoId;
        }
      }
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUrl = videoUrl.trim();

    if (!trimmedUrl) {
      toast({
        title: "Missing URL",
        description: "Please enter a YouTube URL or video ID",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const videoId = extractVideoId(trimmedUrl);

    if (videoId) {
      console.log("Extracted video ID:", videoId); // Debug log
      onVideoSubmit(videoId);
      toast({
        title: "Video Loaded!",
        description: "Video is ready! Use 'Classroom' for focused learning or scroll down to watch here.",
      });
      setIsLoading(false);
    } else {
      console.log("Failed to extract video ID from:", trimmedUrl); // Debug log
      toast({
        title: "Invalid URL Format",
        description: "Please use a valid YouTube URL format like: https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4 hero-landscape">
      <div className="max-w-4xl mx-auto text-center hero-content mt-8 md:mt-0">
        {/* Hero Heading */}
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Watch YouTube Videos
            <br />
            <span className="bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent">
              Without Distractions
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            Clean, minimal video viewing experience. No recommendations, no comments,
            just pure focus on what matters.
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-6 sm:mb-8 search-landscape">
          <div className="max-w-2xl mx-auto px-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-hover rounded-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-lg"></div>
              <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-card border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center flex-1">
                  <Search className="h-5 w-5 text-muted-foreground ml-4" />
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Paste YouTube URL (e.g., https://youtu.be/dQw4w9WgXcQ) or video ID"
                    className="flex-1 px-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base sm:text-lg search-landscape"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="m-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-primary to-primary-hover text-primary-foreground rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span className="hidden sm:inline">Loading...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      <span className="hidden sm:inline">Watch Video</span>
                      <span className="sm:hidden">Watch</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto px-4">
          <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Play className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-center">No Distractions</h3>
            <p className="text-muted-foreground text-sm text-center">
              Clean player without recommendations or comments
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-center">Simple Interface</h3>
            <p className="text-muted-foreground text-sm text-center">
              Just paste the URL and start watching
            </p>
          </div>

          <div className="p-4 sm:p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 sm:col-span-2 md:col-span-1">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <Moon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-center">Dark & Light Mode</h3>
            <p className="text-muted-foreground text-sm text-center">
              Comfortable viewing in any lighting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
