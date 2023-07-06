const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const path = require("path");

const businessRoutes = require("./routes/businessRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/businesses", businessRoutes);
app.use("/user", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 3000;

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.error(error);
  }
};

connectToMongo();

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Registration endpoint
app.post("/register", async (req, res) => {
  const { name, phone, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dbUser = new User({ email, phone, password: hashedPassword, name });

    // Generate the JWT token
    const token = jwt.sign(
      { _id: dbUser._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Save the token to the user's document in the database (optional)
    dbUser.tokens = dbUser.tokens.concat({ token });

    await dbUser.save();

    const user = await User.findOne({ email }).select('_id email name profilePhoto phone twoFAQRCode'); 



    res.status(201).json({ message: "User created successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
// Login endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbUser = await User.findOne({ email });

    if (!dbUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, dbUser.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate the JWT token
    const token = jwt.sign(
      { _id: dbUser._id.toString() },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Save the token to the user's document in the database (optional)
    dbUser.tokens = dbUser.tokens.concat({ token });
    await dbUser.save();

    const user = await User.findOne({ email }).select('_id email name profilePhoto phone twoFAQRCode'); 

    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
