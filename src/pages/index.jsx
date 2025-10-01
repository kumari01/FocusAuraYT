import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import Classroom from "./Classroom";

const Index = () => {
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // "home" or "classroom"

  const handleVideoSubmit = (videoId) => {
    setCurrentVideoId(videoId);
  };

  const handleCloseVideo = () => {
    setCurrentVideoId(null);
  };

  const handleNavigateToClassroom = () => {
    if (currentVideoId) {
      setCurrentPage("classroom");
    }
  };

  const handleNavigateToHome = () => {
    setCurrentPage("home");
  };

  // Render classroom page
  if (currentPage === "classroom" && currentVideoId) {
    return (
      <Classroom
        videoId={currentVideoId}
        onNavigateHome={handleNavigateToHome}
      />
    );
  }

  // Render home page
  return (
    <div className="min-h-screen bg-background font-poppins">
      <Navbar
        currentVideoId={currentVideoId}
        onNavigateToClassroom={handleNavigateToClassroom}
        onNavigateHome={handleNavigateToHome}
        currentPage={currentPage}
      />
      <main>
        <HeroSection onVideoSubmit={handleVideoSubmit} />
        <VideoPlayer videoId={currentVideoId} onClose={handleCloseVideo} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
