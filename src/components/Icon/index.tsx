"use client";
import React from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCalendar,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FaLinkedin, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FiBriefcase, FiBook, FiChevronDown } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { FiSend } from "react-icons/fi";

type IconProps = {
  name: string;
  className?: string;
  size?: number | string;
};

const iconMap: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "mail-outline": AiOutlineMail,
  "phone-portrait-outline": AiOutlinePhone,
  "calendar-outline": AiOutlineCalendar,
  "location-outline": HiOutlineLocationMarker,
  "logo-linkedin": FaLinkedin,
  "logo-whatsapp": FaWhatsapp,
  "logo-instagram": FaInstagram,
  "briefcase-outline": FiBriefcase,
  "book-outline": FiBook,
  "chevron-down": FiChevronDown,
  "eye-outline": FiEye,
  "paper-plane": FiSend,
};

export default function Icon({ name, className, size = 20 }: IconProps) {
  const Comp = iconMap[name] ?? AiOutlineQuestionCircle;
  return (
    <span className={className} aria-hidden="true">
      <Comp size={size} />
    </span>
  );
}
