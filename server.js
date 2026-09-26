// Simple server — serves the JS Practice Lab static site.
// This is exactly the pattern from Slide 13 of the deck: const/let for setup,
// a function to handle each request, app.listen(...) to keep the server running.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/healthz", function (req, res) {
  res.send("ok");
});

app.listen(PORT, function () {
  console.log("JS Practice Lab running on port " + PORT);
});
