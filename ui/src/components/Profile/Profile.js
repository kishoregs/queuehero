import React, { useContext, useRef, useState } from "react";
import "./Profile.css";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api";
import QRCode from "qrcode.react";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const fileInputRef = useRef();
  const [twoFAQRCode, setTwoFAQRCode] = useState(null);

  const handleFileUpload = async () => {
    const file = fileInputRef.current.files[0];
    if (file) {
      console.log("calling uploadProfilePhoto");
      const updatedUser = await uploadProfilePhoto(file);
      if (updatedUser) {
        setUser(updatedUser);
      }
    }
  };

  const enableTwoFA = async () => {
    try {
      const response = await api.post("/user/2fa/enable");
      console.log(response.data.qrCode);

      setTwoFAQRCode(response.data.qrCode);
      

    } catch (error) {
      console.error("Error enabling 2FA:", error);
    }
  };

  const uploadProfilePhoto = async (file) => {
    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      const response = await api.post("/user/profile-photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.user; // make sure to return the response data
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  return (
    <div className="profile-container">
      <h3>User Profile</h3>
      <div className="profile-info">
        <div>
          <img
            className="profile-picture"
            src={
              user.profilePhoto
                ? `${process.env.REACT_APP_API_BASE_URL}/${user.profilePhoto}`
                : "/default-profile-picture.png"
            }
            alt="Profile"
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <button onClick={() => fileInputRef.current.click()}>
            Upload profile photo
          </button>
        </div>
        <div className="personal-info">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <button>Change Password</button>
          {twoFAQRCode ? (
            <div>
              <img src={twoFAQRCode} alt="Two-factor authentication QR code" />
              <p>Scan this QR code with your authenticator app.</p>
            </div>
          ) : (
            <button onClick={enableTwoFA}>Enable 2FA</button>
          )}
        </div>
      </div>
      <div className="joined-waitlists">
        <h3>Joined Waitlists</h3>
      </div>
    </div>
  );
};

export default Profile;
