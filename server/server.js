require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
      subject: subject,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || 3000));
});

