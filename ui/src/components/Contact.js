import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact QueueHero</h1>
      <div className="contact-content">
        <section className="contact-details">
          <h2>Contact Details</h2>
          <p>Email: support@queuehero.com</p>
          <p>Phone: (555) 123-4567</p>
          <p>Address: 123 QueueHero St., San Francisco, CA 94123</p>
        </section>
        <section className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" required />

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
