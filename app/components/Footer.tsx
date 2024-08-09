import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter, FaTelegram } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-col mt-8 space-y-2">
      <hr className=" border-t-2 border-mainTextColor" />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:px-6">
        <div className="flex flex-row items-center justify-center space-x-2">
          <Image
            src={"/images/AmirKakavand.jpg"}
            width={"80"}
            height={"80"}
            alt="Photo of Amir Kakavand"
            className="rounded-full w-14 h-14 hidden sm:block"
          />
          <span className="text-xs sm:text-xl">
            Designed and developed by Amir Kakavand
          </span>
        </div>
        {/* Social Media */}
        <div className="flex flex-row items-center justify-center space-x-10 mt-2 sm:mt-0">
          <a
            href="https://github.com/AmirKakavand"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-3xl" />
          </a>
          <a
            href="https://x.com/Amirkkvnd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter className="text-3xl" />
          </a>
          <a
            href="https://t.me/Amirkkvnd"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTelegram className="text-3xl" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
