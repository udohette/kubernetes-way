const express = require("express");
const fs = require("fs");
const path = require("path");
const DATA_DIR = process.env.DATA_DIR || "/data";
const COUNTER_FILE = path.join(DATA_DIR, "counter.txt");

const app = express();
const PORT = process.env.PORT || 3000;
const APP_ENV = process.env.APP_ENV || "local";
const APP_MESSAGE = process.env.APP_MESSAGE || "Default student API";
const API_KEY = process.env.API_KEY || "not-configured";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: APP_MESSAGE,
    environment: APP_ENV,
    apiKeyConfigured: API_KEY !== "not-configured",
    status: "success",
    version: "5.0.0",
    release: "multi-environment-promotion"
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
    message: "Week 15",
    message: "Student API"
  });
});


app.get("/counter", (req, res) => {
fs.mkdirSync(DATA_DIR, { recursive: true });
let count = 0;
if (fs.existsSync(COUNTER_FILE)) {
count = Number(fs.readFileSync(COUNTER_FILE, "utf8")) || 0;
}
res.json({ count });
});

app.post("/counter", (req, res) => {
fs.mkdirSync(DATA_DIR, { recursive: true });
let count = 0;
if (fs.existsSync(COUNTER_FILE)) {
count = Number(fs.readFileSync(COUNTER_FILE, "utf8")) || 0;
}
count += 1;
fs.writeFileSync(COUNTER_FILE, String(count));
res.json({ count, persisted: true });
});


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Student API listening on port ${PORT}`);
});
