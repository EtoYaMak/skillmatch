const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const cron = require("node-cron");
const {
  moveExpiredJobsToArchive,
} = require("./controllers/expiredjobController");
const app = express();
const NODE_ENV = process.env.NODE_ENV;
const port = process.env.PORT;
const IP_ADDRESS = process.env.SERVER_MAIN_ADDRESS;
const IP_ADDRESS_BACK = process.env.SERVER_ADDRESS;
const IP_ADDRESS_FRONT = process.env.SERVER_ADDRESS_FRONT;
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const corsOptions = {
  origin: [
    `${IP_ADDRESS}`, // Address w/o port URL
    `${IP_ADDRESS_FRONT}`, // Frontend URL
    `${IP_ADDRESS_BACK}`, // Backend URL
  ],
};

app.use(cors(corsOptions));
// Database connection
connectDB();
// Midnight Cron job for moving expired jobs
cron.schedule(
  "0 0 */25 * *",
  () => {
    console.log("Running a check for expired jobs every 25 days...");
    moveExpiredJobsToArchive();
  },
  {
    scheduled: true,
    timezone: "Europe/London", // Replace with your server's timezone
  }
);

// API routes
app.use("/api/jobs", require("./routes/jobRoutes")); //job listings
app.use("/api/expiredJobs", require("./routes/expiredjobRoutes")); //expiredJob listings
app.use("/api/users", require("./routes/userRoutes")); //user collection
app.use("/api/students", require("./routes/studentRoutes")); // student collection
app.use("/api/profiles", require("./routes/studentFormroutes")); // student profiles
app.use("/api/contact", require("./routes/contactRoutes")); // contact form
app.use("/api/superusers", require("./routes/superusers")); // admin collection
// Payment
app.post("/payment", cors(), async (req, res) => {
  const { amount, id, description, return_url } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount should be in cents
      currency: "USD",
      description,
      payment_method: id,
      confirm: true,
      return_url,
    });

    res.json({ clientSecret: paymentIntent.client_secret, success: true });
  } catch (error) {
    console.error("Payment error:", error);
    res
      .status(500)
      .json({ message: "Payment processing failed", success: false });
  }
});

// Error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    app.use(express.static("../client/public"));
    res.status(200).json({
      message: `Connected to backend`,
    });
  });
}
// Start the server
app.listen(port, () => console.log(`Server @ ${port} NODE_ENV:${NODE_ENV}`));
