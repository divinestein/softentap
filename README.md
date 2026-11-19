# SoftenTap (static site)

A fast, mobile-first affiliate/how-to site about home water treatment, published at [softentap.com](https://softentap.com).

## Status

- Live on GitHub Pages from `main`. Design changes are staged on a branch and reviewed before merging.
- The custom domain in `CNAME` is the apex, `softentap.com`. Canonical URLs use `https://softentap.com`.
- No tracking scripts, no analytics, no third-party fonts or CDNs.
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

- `index.html` — home (hero with USGS hardness gauge, bento guide grid, steps, editorial standards band)
- `guides.html` — index of every guide (add each new guide here)
- `about.html` (has `#standards`), `disclosure.html`, `privacy.html`, `contact.html` (support@softentap.com), `404.html`
- `articles/read-water-hardness-report.html` (includes the ppm → gpg converter, `#converter`)
- `articles/softener-vs-conditioner-vs-filter-vs-ro.html`
- `articles/do-you-need-a-softener-at-8-gpg.html`
- `articles/what-size-water-softener.html`

Published topics are logged in `TOPICS.md`.

Articles cite public sources. SoftenTap has not tested products.

## Design system

Everything visual lives in **one stylesheet**, `css/styles.css`, plus one small script, `js/site.js` (~4 KB, no libraries). No frameworks, no build step, no third-party requests.

- **Fonts:** self-hosted variable fonts in `fonts/` — Fraunces (headings) and Inter (body), both SIL Open Font License (licenses in `fonts/`). Both are preloaded in every `<head>`.
- **Palette** (CSS variables at the top of `styles.css`): navy ink `--ink #0d1b2a`, body `--body`, muted `--muted`, warm paper `--paper #faf7f2`, sand `--sand`, link teal `--teal #0a6b69`, decorative aqua `--aqua #2bb3ad`, amber for cautions. Text colors meet WCAG AA on the paper background.
- **Spacing:** `--s1`…`--s9` (4 px base). Radii `--r-sm`, `--r`, `--r-lg`. Shadows `--shadow-1..3`.
- **Logo:** the drop-and-wave mark is inline SVG in each header/footer; `favicon.svg` is the same mark on navy. `og-image.png` (1200×630) is the social share card used by every page.
- **Motion:** fade/slide-up on scroll (`data-reveal` attribute; JS only hides elements that start below the fold), hero gauge animation, ripple drop, card hover lifts, animated nav underline, condensing glass header, reading-progress bar on articles, smooth TOC scrolling with active-section highlight. All of it is switched off for `prefers-reduced-motion`, and content is fully visible with JavaScript disabled.

### Building blocks (class names)

| Use | Markup |
| --- | --- |
| Methodology note | `<div class="note"><p class="note-label">[flask svg]How we sourced this</p><p>…</p></div>` |
| Key takeaways | `<aside class="takeaways" aria-label="Key takeaways"><p class="takeaways-label">[check svg]Key takeaways</p><ul>…</ul></aside>` |
| Caution | `<div class="warn"><p class="warn-label">[alert svg]Caution</p><p>…</p></div>` |
| Formula band | `<div class="formula"><p><strong>…</strong></p></div>` |
| Table | `<div class="table-wrap"><table><caption class="muted">…</caption>…</table></div>`; for 5+ columns use `class="table-wrap table-wide" tabindex="0" role="region" aria-label="…"` |
| Affiliate links | `<div class="affiliate-box">` with a short disclosure paragraph and a `<ul>` of links (see below) |
| Sources | `<h2 id="sources">Sources</h2><ul class="sources">…</ul>` (numbered automatically) |
| Card | `<a class="tile" href="…" data-reveal><span class="icon">[svg]</span><span class="tag">Category</span><h3>Title</h3><p>…</p><span class="go">Read the guide [arrow svg]</span></a>` |

Icons are inline 24×24 line SVGs (stroke `currentColor`, width 1.7). Copy them from existing pages rather than using emoji.

## Adding a new guide

1. Copy `_templates/article.html` to `articles/<slug>.html`. **Delete the `noindex` line** at the top of `<head>`.
2. Replace every `{{…}}` placeholder: title, meta description (also used for OG/Twitter and as the dek under the H1), canonical/OG URL, JSON-LD headline + dates, breadcrumb short title, category eyebrow, reviewed date.
3. Write the body between `<!-- ARTICLE BODY START -->` and `<!-- ARTICLE BODY END -->`. Give every `<h2>` an `id` and list the same ids in the "On this page" `<ol>` in the TOC. The last section is always `id="sources"`.
4. Set the meta line honestly: minutes = body word count ÷ 230 (rounded), and the number of items in `ul.sources`.
5. Affiliate links: only programs that have approved us get a live link. Live links use `rel="sponsored nofollow noopener" target="_blank"` and end with "(affiliate link)". Unapproved programs use `href="#affiliate-<name>" rel="sponsored nofollow"` and "(placeholder)". Keep the on-page disclosure paragraph in the `affiliate-box`. The footer Amazon sentence is already in the template; never remove it.
6. Update "Related guides" tiles (2–3 nearest guides), add a tile to `guides.html` (newest first) and, if it fits, to the footer "Guides" list.
7. Add the URL to `sitemap.xml` with today's `lastmod`.
8. Style rules for copy: plain sentences, no emoji bullets, no "unlock / dive in / in today's world" phrasing, no invented tests, stats, testimonials or awards. Every number needs a source in the list.

When the header/nav or footer changes, update it in every HTML file and in `_templates/article.html` (they are identical blocks; search for `<header class="site-header">` and `<footer class="site-footer">`).

Bump `?v=` on the `styles.css` / `site.js` links in all pages after editing either file so browsers pick up the change.

A homepage screenshot is saved at `preview.png`.
