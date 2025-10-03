import Icon from "../../components/Icon";

type Skill = { name: string; percent: number };

export default function ResumePage() {
  const skills: Skill[] = [
    { name: "TypeScript", percent: 90 },
    { name: "JavaScript", percent: 90 },
    { name: "React.js / Next.js", percent: 90 },
    { name: "SQL", percent: 80 },
    { name: "Python", percent: 60 },
    { name: "Angular.js", percent: 70 },
    { name: "Node.js / Express.js", percent: 85 },
    { name: "NestJS", percent: 75 },
    { name: "MongoDB", percent: 80 },
    { name: "MySQL", percent: 80 },
    { name: "AWS", percent: 75 },
    { name: "Azure", percent: 65 },
    { name: "Docker", percent: 70 },
    { name: "Linux", percent: 70 },
  ];

  // sort descending by percent (highest first)
  const sortedSkills = [...skills].sort((a, b) => b.percent - a.percent);

  return (
    <article className="resume active" data-page="resume">
      <h2 className="h2 article-title">Resume</h2>
      {/* Education header with resume download button on the right */}
      <section style={{ marginTop: 16 }}>
        <div className="resume-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              width: "100%",
            }}
          >
            <div className="icon-box">
              <Icon name="book-outline" />
            </div>

            <h3 className="h3">Education</h3>
          </div>

          <div className="resume-controls">
            <a
              className="form-btn resume-download"
              href="/Safwan_Ahmed.pdf"
              download="Safwan_Ahmed.pdf"
              aria-label="Download resume as PDF"
            >
              Download Resume
            </a>
          </div>
        </div>
      </section>
      <section className="timeline">
        <div className="title-wrapper"></div>
        <ol className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">Mumbai University</h4>

            <span>Jun 2021 — May 2024</span>

            <p className="timeline-text">
              <span style={{ fontWeight: "bold", color: "white" }}>
                Bachelor of Science in Computer Science (CGPA: 7.93)
              </span>
              Relevant Coursework: Data Structures and Algorithms, Prob & Stat
              in CS (Python), Linear Algebra w/Computational Applications
              (Python)
            </p>
          </li>
        </ol>
      </section>
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <Icon name="briefcase-outline" />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ul className="timeline-list">
          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              Deloitte – Associate Analyst
            </h4>
            <span>Aug 2024 – Present</span>
            <ul className="experience-list timeline-text">
              <li>
                Engineered a full-stack Learning & Development portal using
                React.js, Node.js, Express.js, and MySQL, centralizing course
                listings and automating training compliance tracking, which
                improved audit readiness and streamlined professional
                development workflows.
              </li>
              <li>
                Developed and deployed automation solutions with Python and
                Flask, saving over 100 hours of manual work annually and
                reducing operational errors by 30%
              </li>
              <li>
                Optimized complex MySQL queries and indexing strategies,
                reducing page load times by 15% and improving system
                responsiveness for high-traffic applications.
              </li>
              <li>
                Developed a plug-and-play automation tool integrated with
                ServiceNow, automating shift handover reports and reducing
                manual reporting effort by 80%, while improving accuracy and
                knowledge transfer efficiency.
              </li>
              <li>
                Delivered L3 (Level 3) production support for critical Delivery
                and Information applications, including Postal Service,
                troubleshooting complex issues, ensuring 99.9% uptime, and
                minimizing downtime for business-critical operations.
              </li>
            </ul>
          </li>

          <li className="timeline-item">
            <h4 className="h4 timeline-item-title">
              ILM UX – Software Engineer
            </h4>
            <span>Jun 2022 – Aug 2024</span>
            <ul className="experience-list timeline-text">
              <li>
                Developed a high-performance website by integrating Storyblok
                with Next.js, improving page load speed by 30% and increasing
                organic traffic by 20% through enhanced SEO practices.
              </li>
              <li>
                Built and published a reusable UI component library with Chakra
                UI and Storybook as an NPM package, standardizing design and
                reducing development time for new projects by 25%.
              </li>
              <li>
                Engineered a comprehensive banking website leveraging Next.js,
                Chakra UI, SWR, and Zustand, resulting in a 40% reduction in bug
                reports and a 15% increase in user satisfaction scores
              </li>
              <li>
                Designed and implemented a secure Backend-for-Frontend (BFF)
                architecture, abstracting backend endpoints and reducing
                security vulnerabilities by 30%
              </li>
              <li>
                Established unit testing frameworks, applied SOLID principles,
                and conducted code reviews, increasing code coverage by 35% and
                decreasing post-release defects by 20%.
              </li>
              <li>
                Implemented secure authentication and authorization using
                Passport.js and JWT, achieving 100% compliance with internal
                security audits and improving data privacy.
              </li>
              <li>
                Developed a high-performance website by integrating Storyblok
                with Next.js, improving page load speed by 30% and increasing
                organic traffic by 20% through enhanced SEO practices.
              </li>
            </ul>
          </li>
        </ul>
      </section>
      {/* Skills */}
      <section className="skill">
        <h3 className="h3 skills-title">My Skills</h3>
        <div className="skills-grid">
          {sortedSkills.map((s) => (
            <div className="skills-item" key={s.name}>
              <div className="title-wrapper">
                <h5 className="h5">{s.name}</h5>
                <data value={String(s.percent)}>{s.percent}%</data>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{ width: `${s.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
