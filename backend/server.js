const express = require("express");
const colors = require("colors");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;
const cors = require("cors");
connectDB();
const app = express();

//middleware
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.json());

app.use(cors(corsOptions));
/* app.use(express.urlencoded({ extended: false })); */
// route
app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to backend" });
});
/* app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));
app.use("/api/profiles", require("./routes/studentFormroutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
 */
/* app.use(express.static("./public"));
app.use(errorHandler); */

app.listen(port, () => console.log(`Server @ ${port}`));
