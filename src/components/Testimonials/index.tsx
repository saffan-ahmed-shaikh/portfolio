"use client";
import Image from "next/image";
import { useState } from "react";

const data = [
  {
    name: "Mohammed Moiz",
    role: "Project Manager at Deloitte",
    avatar: "/assets/images/avatar-1.png",
    text: "Safwan consistently delivered high-quality code and innovative solutions that impressed both the team and our clients.",
  },
  {
    name: "Madhushalini",
    role: "Tech Lead at Deloitte",
    avatar: "/assets/images/avatar-2.png",
    text: "His ability to debug complex issues quickly made him a go-to team member during critical project phases.",
  },
];

export default function Testimonials() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <ul className="testimonials-list has-scrollbar">
        {data.map((item, i) => (
          <li
            key={i}
            className="testimonials-item"
            onClick={() => setSelected(i)}
          >
            <div className="content-card">
              <figure className="testimonials-avatar-box">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={80}
                  height={80}
                />
              </figure>
              <h4 className="h4 testimonials-item-title">{item.name}</h4>
              <p className="testimonials-text">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Modal */}
      {selected !== null && (
        <div className="modal-container active">
          <div
            className={`overlay ${selected !== null ? "active" : ""}`}
            onClick={() => setSelected(null)}
          ></div>
          <section className="testimonials-modal">
            <button
              className="modal-close-btn"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>
            <figure
              className="modal-avatar-box"
              style={{ height: 80, width: 80 }}
            >
              <Image
                src={data[selected].avatar}
                alt={data[selected].name}
                width={80}
                height={80}
              />
            </figure>
            <div className="modal-content">
              <h4 className="h3 modal-title">{data[selected].name}</h4>
              <p>{data[selected].role}</p>
              <p className="modal-text">{data[selected].text}</p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
