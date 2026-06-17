import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { Button } from "./ui/button";

const socialLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/saffan-ahmed-shaikh",
    label: "GitHub",
    hover:
      "hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:text-white hover:border-gray-800",
  },
  {
    icon: FaLinkedinIn,
    href: "https://www.linkedin.com/in/safwan-ahmed-shaikh/",
    label: "LinkedIn",
    hover:
      "hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-700 hover:text-white hover:border-blue-600",
  },
  {
    icon: SiLeetcode,
    href: "https://leetcode.com/u/_safwan_ahmed/",
    label: "LeetCode",
    hover:
      "hover:bg-gradient-to-r hover:from-yellow-500 hover:to-amber-700 hover:text-white hover:border-amber-600",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/ig_safwan/",
    label: "Instagram",
    hover:
      "hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:text-white hover:border-pink-500",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {socialLinks.map((social, index) => {
        const Icon = social.icon;

        return (
          <Button
            key={index}
            variant="outline"
            size="icon"
            asChild
            className={`
              group relative h-12 w-12 overflow-hidden rounded-2xl
              border border-border/60
              bg-background/60 backdrop-blur-md
              shadow-md transition-all duration-300 ease-in-out
              hover:-translate-y-1.5 hover:scale-105
              active:scale-95
              hover:shadow-xl
              ${social.hover}
            `}
          >
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="flex items-center justify-center"
            >
              <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-125" />

              {/* Glow Effect */}
              <span className="absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-40 bg-white" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
