import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
     
      <main>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Real-time waitlist updates</li>
            <li>Online check-in</li>
            <li>Location-based search</li>
            <li>Time-slot selection</li>
            <li>Notifications and reminders</li>
            <li>Customer reviews and ratings</li>
          </ul>
        </section>
        <section className="benefits">
          <h2>Benefits</h2>
          <ul>
            <li>Save time by joining waitlists remotely</li>
            <li>Find the nearest service providers</li>
            <li>Make informed choices based on reviews and ratings</li>
            <li>Businesses can manage waitlists efficiently</li>
            <li>Improve customer satisfaction and experience</li>
          </ul>
        </section>
        <section className="pricing">
          <h2>Pricing</h2>
          <table>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free</td>
                <td>$0/month</td>
                <td>Basic waitlist management</td>
              </tr>
              <tr>
                <td>Pro</td>
                <td>$29.99/month</td>
                <td>All features, priority support</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
