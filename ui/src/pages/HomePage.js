import React from "react";

import "./HomePage.css"





const HomePage = () => {
 

  return (
    <main>
    <section className="hero">
      <div className="hero-text">
        <h1>Welcome to QueueHero</h1>
        <p>Your Queue Management Solution</p>
      </div>
      <div className="hero-buttons">
        <a href="/register" className="btn-primary">Sign Up</a>
        <a href="/login" className="btn-secondary">Log In</a>
      </div>
    </section>

    <section className="features">
      <div className="feature">
        <h3>Real-time Updates</h3>
        <p>Stay informed with live updates of your position in the queue.</p>
      </div>
      <div className="feature">
        <h3>Discover Local Businesses</h3>
        <p>Find and join waitlists of businesses around you.</p>
      </div>
      <div className="feature">
        <h3>Save Time</h3>
        <p>Join the waitlist remotely and avoid waiting in line.</p>
      </div>
    </section>

    <section className="testimonials">
      <h2>What Our Users Say</h2>
      <div className="testimonial">
        <p>"QueueHero has made managing my restaurant's waitlist so much easier!"</p>
        <p>- John, Restaurant Owner</p>
      </div>
      <div className="testimonial">
        <p>"I love being able to join the waitlist for my favorite cafe before I even leave home."</p>
        <p>- Sarah, Customer</p>
      </div>
    </section>
  </main>
  );
};

export default HomePage;
