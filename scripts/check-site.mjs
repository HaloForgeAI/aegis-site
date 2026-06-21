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
  ["release link", /HaloForgeAI\/aegis-release/],
  ["native release", /Native app assets are the public install target/],
  ["macOS DMG", /Aegis-&lt;version&gt;-macos-arm64\.dmg/],
  ["Windows MSIX", /Aegis-&lt;version&gt;-windows-x64\.msix/],
  ["Android", /Android APK\/AAB/],
  ["Cloudflare Tunnel", /Cloudflare Tunnel/],
  ["Tailscale Serve", /Tailscale Serve/],
  ["agent plugins link", /HaloForgeAI\/aegis-agent-plugins/],
  ["talent center link", /HaloForgeAI\/aegis-talent-center/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(html)) {
    throw new Error(`Site check failed: ${name}`);
  }
}

console.log("Aegis site static checks passed.");
