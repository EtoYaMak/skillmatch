const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const nodemailer = require("nodemailer");
const Contact = require("../models/contactModel");

const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

const myemail = process.env.EMAIL_USERNAME;
const mypassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: myemail,
    pass: mypassword,
  },
});

const sendEmail = async (req, res) => {
  let { name, email, message } = req.body;

  // Sanitize user input
  name = DOMPurify.sanitize(name);
  email = DOMPurify.sanitize(email);
  message = DOMPurify.sanitize(message);

  try {
    const newContact = new Contact({
      name,
      email,
      message,
    });
    await newContact.save();

    await transporter.sendMail({
      from: myemail,
      to: email,
      subject: `${name} Contact Form Submission`,
      html: `
        <h3>Contact Information</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
};

module.exports = { sendEmail };
