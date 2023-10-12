const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();
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
    `http://${IP_ADDRESS}`, // Address w/o port URL
    `http://${IP_ADDRESS_FRONT}`, // Frontend URL
    `http://${IP_ADDRESS_BACK}`, // Backend URL
  ],
};

app.use(cors(corsOptions));
// Database connection
connectDB();

// API routes
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/profiles", require("./routes/studentFormroutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
// Payment
app.post("/payment", cors(), async (req, res) => {
  let { amount, id, description, return_url, allow_redirects } = req.body; // Include return_url in the request body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Skillmint Job Portal",
      payment_method: id,
      description: description,
      confirm: true,
      return_url, // Include the return_url
      setup_future_usage: allow_redirects ? "on_session" : "off_session",
    });

    console.log("PaymentIntent", paymentIntent.status);
    console.log("PaymentIntent", paymentIntent.description);

    // Send the client a client_secret to confirm the payment on the client side
    res.json({
      clientSecret: paymentIntent.client_secret,
      success: true,
    });
  } catch (error) {
    console.error("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});
// Error handling middleware
app.use(errorHandler);

// Serve static files and set default route
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientBuildPath));
  app.use(express.static(path.join(__dirname, "../client/public")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(clientBuildPath, "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    app.use(express.static("../client/public"));
    res.status(200).json({
      message: `Connected to backend`,
    });
  });
}
// Start the server
app.listen(port, () => console.log(`Server @ ${port} `));
