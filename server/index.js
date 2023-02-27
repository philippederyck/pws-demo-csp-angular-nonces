const express = require("express");
const { expressCspHeader, NONCE } = require('express-csp-header');

const app = express();
const port = 3000;

// Setup CSP
app.use(expressCspHeader({
  directives: {
      "script-src": [NONCE, "'strict-dynamic'"]
  }
}));

// Serve all EJS files from the client folder
app.set('views', './client');
app.set('view engine', 'ejs');

// serve / (or index.html)
app.get("/", (req, res) => {
  res.render(`index`, { nonce: req.nonce });
})

app.get("/index.html", (req, res) => {
  res.render(`index`, { nonce: req.nonce });
})

// Serve static files from the client folder
app.use("/", express.static("client"));

app.listen(port, () => {});
