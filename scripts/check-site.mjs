import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const required = [
  "public/index.html",
  "public/styles.css",
  "public/robots.txt",
  "public/sitemap.xml",
  "public/_redirects",
  "public/assets/aegis-icon.svg",
  "public/assets/aegis-icon-white.svg",
  "public/assets/aegis-mascot.png",
];

for (const file of required) {
  if (!existsSync(join(root, file))) {
    throw new Error(`Missing required file: ${file}`);
  }
}

const html = readFileSync(join(root, "public/index.html"), "utf8");
const checks = [
  ["title", /<title>Aegis/],
  ["canonical", /rel="canonical" href="https:\/\/aegis\.haloforge\.dev\/"/],
  ["description", /name="description"/],
  ["og image", /property="og:image"/],
  ["install section", /id="install"/],
  ["architecture section", /id="architecture"/],
  ["talents section", /id="talents"/],
  ["brand term", /personal AI assistant hub/],
  ["docs link", /https:\/\/docs\.aegis\.haloforge\.dev\//],
  ["release link", /HaloForgeAI\/aegis-release/],
  ["current release", /Aegis v0\.1\.2 installs from public GHCR and GitHub Releases/],
  ["official image", /ghcr\.io\/haloforgeai\/aegis:v0\.1\.2/],
  ["agent plugins link", /HaloForgeAI\/aegis-agent-plugins/],
  ["talent center link", /HaloForgeAI\/aegis-talent-center/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(html)) {
    throw new Error(`Site check failed: ${name}`);
  }
}

console.log("Aegis site static checks passed.");
