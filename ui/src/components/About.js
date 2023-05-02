import React from "react";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <h2>About QueueHero</h2>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            QueueHero aims to revolutionize the way businesses and customers
            interact with waitlists. Our platform offers a seamless, efficient
            experience for users, allowing them to make informed decisions and
            save time.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, QueueHero was born out of the need to improve the
            waitlist experience for both customers and businesses. Our team of
            dedicated professionals works tirelessly to ensure that our platform
            remains cutting-edge and accessible to users around the globe.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Team</h2>
          <p>
            The QueueHero team consists of experienced professionals from
            various backgrounds, including software development, marketing, and
            customer support. We're passionate about creating a user-friendly
            platform that adds value to the lives of our users.
          </p>
        </section>
      </div>
    </div>
  );
}
