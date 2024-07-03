const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const connectDB = require("./utils/db");

const loginRouter = require("./router/login-router");
const slipRouter = require("./router/slip-router");

const port = process.env.PORT || 3000;

const app = express();

// Define a regular expression to match any subdomain of netlify.app
const allowedOrigins = [
  'http://localhost:5173',
  /^https:\/\/.*\.netlify\.app$/
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-origin requests (e.g., curl, Postman)
    if (allowedOrigins.some(pattern => pattern instanceof RegExp ? pattern.test(origin) : pattern === origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/auth",loginRouter);
app.use("/api/auth/slip",slipRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
});
