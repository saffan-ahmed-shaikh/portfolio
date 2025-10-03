"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Icon from "../Icon";

export default function Sidebar() {
  const [active, setActive] = useState(false);
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    // don't assume window at build time
    function updateSize() {
      const large = typeof window !== "undefined" && window.innerWidth >= 1240;
      setIsLarge(large);
      // If large, force active; otherwise keep previous state
      if (large) setActive(true);
    }

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <aside className={`sidebar ${active ? "active" : ""}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <Image
            src="/assets/images/my-avatar.png"
            alt="Safwan Ahmed"
            fill
            className="avatar-img"
            priority
          />
        </figure>

        <div className="info-content">
          <h1 className="name">Safwan Ahmed</h1>
          <p className="title">Software Engineer</p>
        </div>

        {/* only allow toggle on small screens; on large screens sidebar is always active */}
        <button
          className="info_more-btn"
          onClick={() => {
            if (!isLarge) setActive(!active);
          }}
          data-sidebar-btn
          aria-expanded={isLarge ? true : active}
          aria-hidden={isLarge}
        >
          <span>{active ? "Hide Contacts" : "Show Contacts"}</span>
        </button>
      </div>

      <div className="sidebar-info_more">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <Icon name="mail-outline" />
            </div>

            <div className="contact-info">
              <p className="contact-title">Email</p>

              <a href="mailto:saffan840@gmail.com" className="contact-link">
                saffan840@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Icon name="phone-portrait-outline" />
            </div>

            <div className="contact-info">
              <p className="contact-title">Phone</p>

              <a href="tel:+12133522795" className="contact-link">
                +91 8108360326
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Icon name="calendar-outline" />
            </div>

            <div className="contact-info">
              <p className="contact-title">Birthday</p>

              <time dateTime="1982-06-23">April 05, 2003</time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Icon name="location-outline" />
            </div>

            <div className="contact-info">
              <p className="contact-title">Location</p>

              <address>Mumbai, Maharashtra, India</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a
              href="https://www.linkedin.com/in/safwan-ahmed-shaikh/"
              target="_blank"
              className="social-link"
            >
              <Icon name="logo-linkedin" />
            </a>
          </li>

          <li className="social-item">
            <a
              href="https://wa.me/8108360326"
              target="_blank"
              className="social-link"
            >
              <Icon name="logo-whatsapp" />
            </a>
          </li>

          <li className="social-item">
            <a
              href="https://www.instagram.com/ig_safwan/"
              target="_blank"
              className="social-link"
            >
              <Icon name="logo-instagram" />
            </a>
          </li>
          <li className="social-item">
            <a
              href="https://leetcode.com/u/_safwan_ahmed/"
              target="_blank"
              className="social-link"
            >
              <span style={{ height: 24 }}>
                <Image
                  src="/assets/images/leetcode.svg"
                  alt="leetcode"
                  width={20}
                  height={20}
                />
              </span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
