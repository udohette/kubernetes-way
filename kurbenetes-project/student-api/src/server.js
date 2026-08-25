const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "EI Technologies Student API",
    environment: process.env.APP_ENV || "local",
    version: "1.0.0"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime()
  });
});

app.post("/hello", (req, res) => {
  const name = req.body.name || "Student";

  res.json({
    message: `Hello, ${name}!`
  });
});

app.get("/info", (req, res) => {

  res.json({
    message: "EI Technologies Devops Course",
    message: "Week 7",
    message: "Student API"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Student API listening on port ${PORT}`);
});
