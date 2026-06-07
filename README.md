# Aegis Site

Public brand and launch site for Aegis, the HaloForgeAI chief-of-staff product.

- Production domain target: `https://aegis.haloforge.dev`
- Cloudflare Pages project: `aegis-site`
- Output directory: `public`
- Source repository target: `HaloForgeAI/aegis-site`
- Public release repository: `HaloForgeAI/aegis-release`

## Local Preview

```bash
npm run dev
```

## Validate

```bash
npm run check
```

## Deploy

```bash
npm run deploy
```

The deployment command uses Cloudflare Pages direct upload:

```bash
wrangler pages deploy public --project-name aegis-site
```

The GitHub Actions workflow validates every push and pull request. Cloudflare
deploy is manual through `workflow_dispatch` with `deploy=true`, so a missing
Cloudflare secret cannot break normal content pushes.

## Domain

The Pages project has the custom domain `aegis.haloforge.dev` attached through
Cloudflare's Pages Domains API. If it stays `pending`, DNS still needs this
record in the `haloforge.dev` zone:

```text
Type: CNAME
Name: aegis
Target: aegis-site-8ib.pages.dev
Proxy: enabled
```

Verify after DNS changes:

```bash
curl -I https://aegis.haloforge.dev
```

## Public Distribution Notes

The Aegis source repository can stay private, but public onboarding needs public
artifacts:

1. Keep `ghcr.io/haloforgeai/aegis` public in GitHub Container Registry package
   settings. This is the official full self-host image path.
2. Mirror CLI release assets and `SHA256SUMS` into
   `HaloForgeAI/aegis-release` public GitHub Releases. The Docker archive can
   stay attached as a recovery asset, but it is not the normal install path.
3. Verify the anonymous public path:
   - `docker pull ghcr.io/haloforgeai/aegis:v0.1.2`
   - `curl -I https://github.com/HaloForgeAI/aegis-release/releases/download/v0.1.2/aegis-cli-v0.1.2-aarch64-apple-darwin.tar.gz`
   - `curl -I https://github.com/HaloForgeAI/aegis-release/releases/download/v0.1.2/aegis-cli-v0.1.2-x86_64-pc-windows-msvc.zip`

Keep the homepage quickstart aligned with those public checks.
