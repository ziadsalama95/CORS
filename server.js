const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) {
      return res.status(400).json({ error: "Missing ?url=" });
    }
    const response = await fetch(targetUrl);
    const data = await response.text();

    res.set("Content-Type", response.headers.get("content-type") || "text/plain");
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CORS Proxy running on port ${PORT}`));
