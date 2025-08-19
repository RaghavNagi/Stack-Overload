require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const passport = require("./config/passport");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Import routes
const userRoutes = require("./routes/userRoutes");
const threadRoutes = require("./routes/threadRoutes");
const replyRoutes = require("./routes/replyRoutes");
const voteRoutes = require("./routes/voteRoutes");
const tagRoutes = require("./routes/tagRoutes");

console.log("ENV MONGO_URI:", process.env.MONGO_URI);
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(passport.initialize());

//using  Routes
app.use("/api/users", userRoutes);
app.use("/api/threads", threadRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/tags", tagRoutes);


app.use(errorHandler);

module.exports = app;
