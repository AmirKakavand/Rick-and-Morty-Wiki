import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 mt-10 mb-8">
      <div className="w-full bg-[#F9F4DA] text-black border-4 border-black shadow-[7px_7px_0px_#000000] p-5 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center justify-center gap-3.5 text-left">
          <Image
            src="/images/AmirKakavand.jpg"
            width={56}
            height={56}
            alt="Photo of Amir Kakavand"
            className="rounded-full w-12 h-12 sm:w-14 sm:h-14 shrink-0 border-2 border-black shadow-[2px_2px_0px_#000000] object-cover block"
          />
          <span className="text-sm sm:text-lg leading-snug tracking-wide">
            Designed and developed by Amir Kakavand
          </span>
        </div>

        {/* Social Media */}
        <div className="flex flex-row items-center justify-center gap-5 sm:gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t-2 border-dashed border-black/20 sm:border-none">
          <a
            href="https://github.com/AmirKakavand"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2.5 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FF6B00] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://x.com/Amirkkvnd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="p-2.5 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FF6B00] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <FaXTwitter className="text-2xl" />
          </a>
          <a
            href="https://t.me/Amirkkvnd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="p-2.5 bg-white text-black border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FF6B00] hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
          >
            <FaTelegram className="text-2xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;