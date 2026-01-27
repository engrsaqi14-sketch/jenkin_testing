const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>DevOps Dashboard</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f0f2f5; }
          .header { background: #111827; color: white; padding: 20px; text-align: center; }
          .container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px; }
          .card { background: white; border-radius: 8px; padding: 20px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
          .btn { padding: 10px 15px; background: #111827; color: white; border: none; border-radius: 5px; cursor: pointer; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>DevOps Dashboard</h1>
          <p>CI/CD Demo App</p>
        </div>

        <div class="container">
          <div class="card">
            <h3>App Status</h3>
            <p id="status">Loading...</p>
            <button class="btn" onclick="refresh()">Refresh</button>
          </div>

          <div class="card">
            <h3>Build</h3>
            <p>Simulate build</p>
            <button class="btn" onclick="simulate('build')">Run Build</button>
            <p id="buildResult"></p>
          </div>

          <div class="card">
            <h3>Deploy</h3>
            <p>Simulate deploy</p>
            <button class="btn" onclick="simulate('deploy')">Run Deploy</button>
            <p id="deployResult"></p>
          </div>
        </div>

        <script>
          async function refresh() {
            const res = await fetch('/api/status');
            const data = await res.json();
            document.getElementById('status').innerText = data.status;
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

          refresh();
        </script>
      </body>
    </html>
  `);
});

app.get('/api/status', (req, res) => {
  res.json({ status: "Running ✅", time: new Date().toISOString() });
});

app.post('/api/simulate', (req, res) => {
  const { type } = req.body;
  if (type === 'build') return res.json({ message: "Build simulated 🚀" });
  if (type === 'deploy') return res.json({ message: "Deploy simulated 🟢" });
  res.status(400).json({ message: "Invalid action" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
