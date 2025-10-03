"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";

type Project = {
  title: string;
  category: string;
  img: string;
  href?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const [loading, setLoading] = useState(true);

  const onLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const onError = useCallback(() => {
    setLoading(false);
    // image failed to load; keep showing a dim overlay but hide spinner
  }, []);

  const href = project.href ?? "#";

  return (
    <li
      className="project-item active"
      data-filter-item
      data-category={project.category}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        <figure className="project-img" style={{ position: "relative" }}>
          {/* loader overlay */}
          {loading && (
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 3,
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  border: "3px solid rgba(255,255,255,0.15)",
                  borderTopColor: "var(--orange-yellow-crayola)",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          )}

          {/* Use explicit width/height so Next/Image renders an img that fills the figure */}
          <Image
            src={project.img}
            alt={project.title}
            width={1200}
            height={600}
            className="project-image"
            onLoadingComplete={onLoad}
            onError={onError}
            priority
          />
        </figure>

        <h3 className="project-title">{project.title}</h3>

        <p className="project-category">{project.category}</p>
      </Link>

      <style jsx global>{`
        @keyframes spin {
          to {
            transform: rotate(1turn);
          }
        }
      `}</style>
    </li>
  );
}
