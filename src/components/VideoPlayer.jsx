import { X } from "lucide-react";

const VideoPlayer = ({ videoId, onClose }) => {
  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=1`;

  return (
    <section id="video-player" className="py-12 sm:py-16 px-4 bg-muted/30 video-landscape">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Now Watching
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-secondary hover:bg-accent text-foreground hover:text-primary transition-all duration-300 hover:scale-105 close-button"
            aria-label="Close video"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Container */}
        <div className="relative group">
          {/* Gradient background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-hover/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10"></div>

          {/* Video iframe container */}
          <div className="relative bg-card rounded-2xl overflow-hidden shadow-2xl border border-border video-container">
            <div className="aspect-video">
              <iframe
                src={embedUrl}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Video info */}
        <div className="mt-6 sm:mt-8 text-center px-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            Enjoying distraction-free viewing? Share FocusAurayt with others!
          </p>
        </div>
      </div>
    </section>
  );
};

export default VideoPlayer;
