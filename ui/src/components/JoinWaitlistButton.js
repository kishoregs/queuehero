import { useContext, useState } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";

function JoinWaitlistButton({ businessId }) {
  const [joined, setJoined] = useState(false);
  const { user } = useContext(AuthContext); // Access the user object from the context

  const handleJoinWaitlist = async () => {
    try {
      // Make API call to join the waitlist
      await api.post(`/businesses/${businessId}/join-waitlist`, {
        customerId: user._id, // Use the user's ID from the context
        name: user.name, // Use the user's name from the context
        email: user.email, // Use the user's email from the context
        waitTime: 15, // Replace this with the actual wait time
      });
      setJoined(true);
    } catch (error) {
      console.error("Error joining waitlist:", error);
    }
  };

  return (
    <button
      className="join-waitlist-button"
      onClick={handleJoinWaitlist}
      disabled={joined}
    >
      {joined ? "Joined Waitlist" : "Join Waitlist"}
    </button>
  );
}

export default JoinWaitlistButton;
