# Aegis Site

Public brand and launch site for Aegis, the HaloForgeAI personal AI assistant hub.

- Production domain target: `https://aegis.haloforge.dev`
- Cloudflare Pages project: `aegis-site`
- Output directory: `public`
- Source repository target: `HaloForgeAI/aegis-site`
- Public release repository: `HaloForgeAI/aegis-release`
- User documentation repository: `HaloForgeAI/aegis-docs`
- Documentation domain target: `https://docs.aegis.haloforge.dev`

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

## Documentation

The formal user manual lives in `HaloForgeAI/aegis-docs`, an Astro Starlight
site deployed at `https://docs.aegis.haloforge.dev`. The public docs currently
avoid product imagery; future visual captures should be reviewed app-only
material before they are added. This brand site links to the docs homepage and
redirects legacy `/docs` and `/docs/*` requests there.

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

1. Mirror native app release assets and `SHA256SUMS` into
   `HaloForgeAI/aegis-release` public GitHub Releases.
2. Keep the homepage and docs centered on user-installable native assets:
   macOS DMG, signed Windows MSIX, iOS/TestFlight or IPA, and Android APK/AAB.
3. Verify the anonymous public release path for the native assets:
   - `Aegis-<version>-macos-arm64.dmg`
   - `Aegis-<version>-windows-x64.msix`
   - `Aegis-<version>-android.apk`
   - `Aegis-<version>-android.aab`
   - `SHA256SUMS`

Keep the homepage quickstart aligned with those public checks.
