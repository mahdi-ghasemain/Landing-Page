// Publish only the static website; server.js is a local preview helper.
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist");
fs.mkdirSync(output, { recursive: true });
fs.copyFileSync(path.join(root, "index.html"), path.join(output, "index.html"));
fs.cpSync(path.join(root, "assets"), path.join(output, "assets"), {
  recursive: true,
  filter: (source) => path.basename(source) !== "landing-page-reference.png",
});
console.log("Static website ready in dist/");
