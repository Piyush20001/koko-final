import React from 'react';

export function AppStoreButtons() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href="#"
        className="transition-transform hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
          alt="Download on the App Store"
          className="h-10"
        />
      </a>
      <a
        href="#"
        className="transition-transform hover:scale-105"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
          alt="Get it on Google Play"
          className="h-10"
        />
      </a>
    </div>
  );
}