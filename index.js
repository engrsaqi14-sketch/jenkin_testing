const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static HTML UI
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DevOps Dashboard</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f0f2f5;
            margin: 0;
            padding: 0;
          }
          .header {
            background: #1f2937;
            color: white;
            padding: 20px;
            text-align: center;
          }
          .container {
            padding: 20px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          .card {
            background: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          }
          .card h3 {
            margin-top: 0;
          }
          .btn {
            padding: 10px 15px;
            background: #1f2937;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .btn:hover {
            opacity: 0.9;
          }
          .status {
            font-size: 18px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DevOps Dashboard</h1>
          <p>Simple UI for CI/CD demo</p>
        </div>

        <div class="container">
          <div class="card">
            <h3>App Status</h3>
            <p class="status" id="appStatus">Checking...</p>
            <button class="btn" onclick="checkStatus()">Refresh</button>
          </div>

          <div class="card">
            <h3>Build</h3>
            <p>Simulate a build step</p>
            <button class="btn" onclick="simulate('build')">Run Build</button>
            <p id="buildResult"></p>
          </div>

          <div class="card">
            <h3>Deploy</h3>
            <p>Simulate deploy step</p>
            <button class="btn" onclick="simulate('deploy')">Run Deploy</button>
            <p id="deployResult"></p>
          </div>
        </div>

        <script>
          async function checkStatus() {
            const res = await fetch('/api/status');
            const data = await res.json();
            document.getElementById('appStatus').innerText = data.status;
          }

          async function simulate(type) {
            const res = await fetch('/api/simulate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type })
            });
            const data = await res.json();

            if (type === 'build') {
              document.getElementById('buildResult').innerText = data.message;
            } else {
              document.getElementById('deployResult').innerText = data.message;
            }
          }

          checkStatus();
        </script>
      </body>
    </html>
  `);
});

// API for status
app.get('/api/status', (req, res) => {
  res.json({ status: "Running ✅", time: new Date().toISOString() });
});

// Simulate build/deploy
app.post('/api/simulate', (req, res) => {
  const { type } = req.body;
  if (type === 'build') {
    return res.json({ message: "Build simulated successfully 🚀" });
  }
  if (type === 'deploy') {
    return res.json({ message: "Deploy simulated successfully 🟢" });
  }
  res.status(400).json({ message: "Invalid action" });
});

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});


app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
