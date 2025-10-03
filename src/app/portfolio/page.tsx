"use client";
import { useState, useRef, useEffect } from "react";
import Icon from "../../components/Icon";
import ProjectCard from "../../components/ProjectCard";

const projects = [
  {
    title: "Tunnel",
    category: "Web Application",
    img: "/assets/images/tunnel.png",
    href: "https://tunnel-2-0-fe.vercel.app/",
  },
  {
    title: "Unika",
    category: "Website",
    img: "/assets/images/unika.svg",
    href: "https://saffan-ahmed-shaikh.github.io/MyUnikaWebsite/",
  },
  {
    title: "Taskblitz",
    category: "Web Application",
    img: "/assets/images/taskblitz.svg",
    href: "https://taskblitz.vercel.app/",
  },
  {
    title: "Pentwist",
    category: "Website",
    img: "/assets/images/pentwist.png",
    href: "https://saffan-ahmed-shaikh.github.io/bootstrap-portfolio-website",
  },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [selectOpen, setSelectOpen] = useState(false);
  const [selectLabel, setSelectLabel] = useState("Select category");
  const selectRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!selectRef.current) return;
      if (!(e.target instanceof Node)) return;
      if (!selectRef.current.contains(e.target)) setSelectOpen(false);
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  function handleSelectToggle() {
    setSelectOpen((s) => !s);
  }

  function handleSelectItem(label: string, value: string) {
    setSelectLabel(label);
    setFilter(value);
    setSelectOpen(false);
  }

  return (
    <article className="portfolio active" data-page="portfolio">
      <h2 className="h2 article-title">Portfolio</h2>
      <section>
        <ul className="filter-list">
          <li className="filter-item">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => {
                setFilter("all");
                setSelectLabel("All");
              }}
            >
              All
            </button>
          </li>

          <li className="filter-item">
            <button
              className={filter === "Website" ? "active" : ""}
              onClick={() => {
                setFilter("Website");
                setSelectLabel("Website");
              }}
            >
              Website
            </button>
          </li>

          <li className="filter-item">
            <button
              className={filter === "Web Application" ? "active" : ""}
              onClick={() => {
                setFilter("Web Application");
                setSelectLabel("Web Application");
              }}
            >
              Web Application
            </button>
          </li>
        </ul>
        <div className="filter-select-box" ref={selectRef}>
          <button
            className={`filter-select ${selectOpen ? "active" : ""}`}
            data-select
            onClick={(e) => {
              e.preventDefault();
              handleSelectToggle();
            }}
            aria-expanded={selectOpen}
          >
            <div className="select-value" data-selecct-value>
              {selectLabel}
            </div>

            <div className="select-icon">
              <Icon name="chevron-down" />
            </div>
          </button>

          <ul className={`select-list`}>
            <li className="select-item">
              <button
                data-select-item
                onClick={() => handleSelectItem("All", "all")}
              >
                All
              </button>
            </li>

            <li className="select-item">
              <button
                data-select-item
                onClick={() => handleSelectItem("Website", "Website")}
              >
                Website
              </button>
            </li>

            <li className="select-item">
              <button
                data-select-item
                onClick={() =>
                  handleSelectItem("Web Application", "Web Application")
                }
              >
                Web Application
              </button>
            </li>
          </ul>
        </div>
        <ul className="project-list">
          {filteredProjects.map((proj, i) => (
            <ProjectCard key={i} project={proj} />
          ))}
        </ul>
      </section>
    </article>
  );
}
