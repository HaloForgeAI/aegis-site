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

1. Make `ghcr.io/haloforgeai/aegis` public in GitHub Container Registry package
   settings.
2. Mirror CLI release assets into `HaloForgeAI/aegis-release` public GitHub
   Releases.
3. Verify anonymous installs:
   - `docker pull ghcr.io/haloforgeai/aegis:v0.1.2`
   - `curl -I https://github.com/HaloForgeAI/aegis-release/releases/download/...`

Keep the homepage quickstart aligned with those public checks.
