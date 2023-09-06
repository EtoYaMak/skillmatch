const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const { updatePaymentStatus } = require("./controllers/jobController");
const connectDB = require("./config/db");
const port = process.env.PORT;
const SERVER_IP = process.env.SERVER_IP;
const stripe = require("stripe")(process.env.STRIPE_SECTRET);

const cors = require("cors");
const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: [
    "http://18.169.159.127",
    "http://localhost:3000", // Frontend URL
    "http://localhost:4000", // Backend URL
  ],
};

app.use(cors(corsOptions));

// API routes
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/profiles", require("./routes/studentFormroutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
// Database connection
connectDB();
// Error handling middleware

app.use(errorHandler);

const endpointSecret = process.env.STRIPE_ENDPOINT_KEY;
/* 
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        try {
          await updatePaymentStatus(null, null, session);
        } catch (error) {
          console.log("Failed to update payment status: ", error);
        }
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    response.send();
  }
); */

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
    res.status(200).json({ message: "Connected to backend" });
  });
}

app.listen(port, () => console.log(`Server @ ${port}`));
