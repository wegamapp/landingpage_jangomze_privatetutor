import logo from "@/assets/firma.jpeg";
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedin from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
        </nav>

        <div className="flex justify-center gap-6 mt-6">
          <SocialInsta />
          <SocialLinkedin />
          <SocialYoutube />
        </div>
        <p className="mt-6">&copy; 2025 jangomeze, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
};
