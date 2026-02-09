require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${subject}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

/* ✅ SPA fallback (Express 4 supports this) */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});
