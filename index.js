const express = require("express");
const os = require("os");

const app = express();
const PORT = 3000;

const VERSION = process.env.APP_VERSION || "v1.0";
const ENV = process.env.APP_ENV || "production";
const BUILD_TIME = process.env.BUILD_TIME || "unknown";

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DevOps CI/CD Dashboard</title>
        <style>
          body {
            font-family: Arial;
            background: linear-gradient(to right, #141E30, #243B55);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .card {
            background: rgba(0,0,0,0.4);
            padding: 30px;
            border-radius: 10px;
            width: 400px;
            text-align: center;
          }
          h1 { color: #00eaff; }
          p { font-size: 18px; }
          .footer {
            margin-top: 20px;
            font-size: 14px;
            opacity: 0.7;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>🚀 DevOps CI/CD App</h1>
          <p><b>Status:</b> Running ✅</p>
          <p><b>Version:</b> ${VERSION}</p>
          <p><b>Environment:</b> ${ENV}</p>
          <p><b>Build Time:</b> ${BUILD_TIME}</p>
          <p><b>Hostname:</b> ${os.hostname()}</p>
          <div class="footer">
            Deployed via Jenkins & Docker
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
