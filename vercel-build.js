const fs = require("fs");
const path = require("path");

const root = __dirname;
const sourceDir = path.join(root, "davies-mainfiles", "davies");
const outputDir = path.join(root, "public");

if (!fs.existsSync(sourceDir)) {
  throw new Error(`Source directory not found: ${sourceDir}`);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

const removeFromOutput = [
  "blog-single.html",
  "blog-standard.html",
  "blog-three-columns.html",
  "blog-two-columns.html",
  "landing.html",
  "version-2.html",
  "README.md",
  path.join("assets", "scss"),
  path.join("assets", "images", "video", "davies-video.mp4"),
  path.join("assets", "images", "video", "nexbot.mp4"),
  path.join("assets", "images", "video", "wave-bg.mp4"),
];

for (const item of removeFromOutput) {
  fs.rmSync(path.join(outputDir, item), { recursive: true, force: true });
}

console.log("Static site copied to public/");
