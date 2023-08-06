import React from "react";

const MenuShare = () => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer.php?u=${window.location.href}`,
      "facebook-share-dialog",
      "width=800,height=600",
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${window.location.href}`,
      "twitter-share-dialog",
      "width=800,height=600",
    );
  };

  const shareToLinkedin = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
      "linkedin-share-dialog",
      "width=800,height=600",
    );
  };

  return (
    <div className="absolute top-0 w-[250px] bg-ctp-surface1 left-10 z-10 p-3 rounded-lg flex flex-col">
      <span
        className="p-2 hover:bg-ctp-green rounded-md hover:text-ctp-base"
        onClick={() => copyLink()}
      >
        Copy link
      </span>
      <span
        className="p-2 hover:bg-ctp-green rounded-md hover:text-ctp-base"
        onClick={() => shareToFacebook()}
      >
        Share to Facebook
      </span>
      <span
        className="p-2 hover:bg-ctp-green rounded-md hover:text-ctp-base"
        onClick={() => shareToTwitter()}
      >
        Share to X
      </span>
      <span
        className="p-2 hover:bg-ctp-green rounded-md hover:text-ctp-base"
        onClick={() => shareToLinkedin()}
      >
        Share to Linkedin
      </span>
      <span className="p-2 hover:bg-ctp-red rounded-md hover:text-ctp-base">
        Report
      </span>
    </div>
  );
};

export default MenuShare;
