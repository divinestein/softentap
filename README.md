# SoftenTap (static site)

First version of a fast, mobile-first affiliate/how-to site about home water treatment, published at [softentap.com](https://softentap.com).

## Status

- Ready to push to GitHub Pages later. **Do not publish yet.**
- The custom domain in `CNAME` is the apex, `softentap.com`. Canonical URLs use `https://softentap.com`.
- No tracking scripts, no analytics.
- Waterdrop product links use the live affiliate URL. Other product links still use placeholder hrefs such as `#affiliate-aquasana`.

## Local preview

```bash
cd /workspace/water-site
python3 -m http.server 8765
# open http://127.0.0.1:8765/
```

## GitHub Pages DNS records (set at WordPress.com)

The domain was bought at WordPress.com. When you are ready to go live, add `softentap.com` as the custom domain in the GitHub repository's Pages settings (this repo already has a `CNAME` file with that value), then create the records below in the WordPress.com DNS editor for SoftenTap.com.

These values are from GitHub's guide, [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) (verified November 18, 2026). DNS changes can take up to 24 hours. GitHub recommends adding the custom domain in the repository before pointing DNS at Pages, and warns against wildcard records such as `*.softentap.com`. Remove any default A, AAAA, or parking records WordPress.com has on `@` before adding these.

### Apex (`softentap.com`) — A records

Point `@` (the apex) at GitHub Pages IPv4 addresses, one record per address:

| Type | Name | Value              |
| ---- | ---- | ------------------ |
| A    | `@`  | `185.199.108.153`  |
| A    | `@`  | `185.199.109.153`  |
| A    | `@`  | `185.199.110.153`  |
| A    | `@`  | `185.199.111.153`  |

### Apex (`softentap.com`) — AAAA records

Point `@` at GitHub Pages IPv6 addresses:

| Type | Name | Value                   |
| ---- | ---- | ----------------------- |
| AAAA | `@`  | `2606:50c0:8000::153`   |
| AAAA | `@`  | `2606:50c0:8001::153`   |
| AAAA | `@`  | `2606:50c0:8002::153`   |
| AAAA | `@`  | `2606:50c0:8003::153`   |

### `www` subdomain — CNAME

| Type  | Name  | Value                         |
| ----- | ----- | ----------------------------- |
| CNAME | `www` | `<github-username>.github.io` |

Replace `<github-username>` with the GitHub user or organization that owns the Pages repo. The CNAME must point at `USERNAME.github.io` or `ORGANIZATION.github.io` only — not a repository path, and not a `*.pages.github.io` hostname.

Because this site's custom domain is the apex (`softentap.com` in `CNAME` and in Pages settings), GitHub will redirect `www.softentap.com` to `https://softentap.com` once both the apex and `www` records are in place.

After DNS has propagated, you can turn on **Enforce HTTPS** in the repository Pages settings. That option can take up to 24 hours to appear.

## Pages

- `index.html` — home
- `about.html`, `disclosure.html`, `privacy.html`, `contact.html` (contact is a placeholder)
- `articles/read-water-hardness-report.html`
- `articles/softener-vs-conditioner-vs-filter-vs-ro.html`
- `articles/do-you-need-a-softener-at-8-gpg.html`

Articles cite public sources. SoftenTap has not tested products.

A homepage screenshot is saved at `preview.png`.
