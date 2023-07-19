const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT;
const myIP = process.env.MYIP;
const cors = require("cors");
const app = express();

// Database connection
connectDB();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:4000",
    "http://skillmint.io",
  ],
};
app.use(cors(corsOptions));

// API routes
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/profiles", require("./routes/studentFormroutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// Error handling middleware
app.use(express.static("../../client/public"));
app.use(errorHandler);

// Serve static files and set default route
if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientBuildPath));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(clientBuildPath, "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Connected to backend" });
  });
}

app.listen(port, () => console.log(`Server @ ${port}`));
