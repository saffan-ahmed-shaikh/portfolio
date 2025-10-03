"use client";
import Image from "next/image";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <article className="about active" data-page="about">
      <h2 className="h2 article-title">About Me</h2>
      <section className="about-text">
        <p>
          Full-stack Software Engineer with expertise in React, Next.js, and
          Node.js. Experienced in building scalable web applications, optimizing
          backend systems, and implementing secure cloud-based solutions. AWS
          Certified Developer with proven impact in reducing operational
          overhead and improving user engagement.
        </p>
        <p>
          With experience at ILM UX and Deloitte, I’ve contributed to
          high-impact projects, led teams, and delivered production-ready
          solutions across diverse domains.
        </p>
      </section>

      {/* What I Do Section */}
      <section className="service">
        <h3 className="h3 service-title">What I&apos;m Doing</h3>
        <ul className="service-list">
          <li className="service-item">
            <div className="service-icon-box">
              <Image
                src="/assets/images/icon-dev.svg"
                alt="Frontend"
                width={40}
                height={40}
              />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">Frontend Development</h4>
              <p className="service-item-text">
                Building responsive, dynamic, and performant UIs using React.js,
                Next.js, and modern web technologies.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <Image
                src="/assets/images/icon-api.png"
                alt="Backend"
                width={40}
                height={40}
              />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">Backend Development</h4>
              <p className="service-item-text">
                Designing REST APIs, microservices, and real-time systems using
                Node.js, Express.js, and NestJS.
              </p>
            </div>
          </li>

          <li className="service-item">
            <div className="service-icon-box">
              <Image
                src="/assets/images/icon-design.svg"
                alt="Cloud"
                width={40}
                height={40}
              />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">Cloud & DevOps</h4>
              <p className="service-item-text">
                Deploying and scaling apps on AWS, Azure, and Docker/Kubernetes
                with CI/CD automation.
              </p>
            </div>
          </li>
          <li className="service-item">
            <div className="service-icon-box">
              <Image
                src="/assets/images/icon-database.png"
                alt="Database"
                width={40}
                height={40}
              />
            </div>
            <div className="service-content-box">
              <h4 className="h4 service-item-title">Database Management</h4>
              <p className="service-item-text">
                Designing, optimizing, and maintaining relational (MySQL,
                PostgreSQL) and NoSQL (MongoDB) databases for scalable
                applications.
              </p>
            </div>
          </li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h3 className="h3 testimonials-title">Testimonials</h3>
        <Testimonials />
      </section>
    </article>
  );
}
