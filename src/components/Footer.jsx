const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 sm:py-8 footer-landscape">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-primary">
              FocusAura<span className="text-foreground">yt</span>
            </h3>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            © 2025 FocusAurayt. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Distraction-free YouTube viewing for better focus and productivity.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;