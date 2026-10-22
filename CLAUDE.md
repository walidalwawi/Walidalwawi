# Walid Al Wawi · CLAUDE.md

## What this is
Static site for walidalwawi.com on Cloudflare Workers (static assets, free plan). Pushing to `main` deploys.
Source of truth is `content/site.json`; the back office at /admin renders and publishes it.

## Back office (site/admin.html + site/admin/grid.*)
Walid's Site Grid editor for walidalwawi.com. Since Oct 2026 samt.co has its OWN back office (samt.co/admin, layer site, in the Samt repo) and is no longer in BD_SITES; it's listed in BD_ELSEWHERE, which the site menu shows as a link. BD_SITES in admin.html lists the sites this editor can switch between; the switcher stores the choice in localStorage bd-site-current. GitHub key in bd-gh-key.
- Blocks: text, image, gallery, library, link, notes, list, video, html, rule, quote, fold-out list (toggle), product; site blocks menu (list or button + overlay, with brand text beside it), page title, page arrows (arrows or "Next, title" words; pages or blog scope); blog blocks posts (cards grid/columns/list, featured, card look) and post info (back link, words ~ minutes).
- Blogs: a page with `blog: true`; posts are pages with `parent: <blog id>`, plus `date`, `excerpt`, `featured`. Posts are skipped by the menu and by site-scope page arrows. Cards use the post's h1 || title, first image, and word count.
- Prefer a real block over an html block; html blocks are for genuine one-offs.
- Inspect: picks any element in the canvas; design bar writes rules into site.css or page.css via cssSplit/ruleSet; on Phone into the single @media (max-width: 760px) block, which Publish merges into bd.css's one mobile block.
- Code drawer is CodeMirror 5 (cdnjs). Files tab edits any non-generated repo file and uploads to site/files/ or site/images/; both ride in the publish commit.
- Loads content/site.json from GitHub with Walid's fine-grained token (kept in his browser only).
- Draft autosaves to localStorage (bd-draft-<repo>) until Publish.
- Publish = one commit: content/site.json, content/manifest.json, every page .html, site/404.html, site/assets/bd.css (stamped "PUBLISHED <id>"), site/assets/bd.js, new images (uploaded earlier as git blobs). Pages in the old manifest but not the new one are deleted. Then polls /assets/bd.css for the stamp.
- Image props: assetId "live" (in site/images), "sha:<blob>" (uploaded, not yet published), "remote" (still hot-linked from an old URL; Publish tries to copy it in).

## Delivery format — non-negotiable
- Complete file replacements only. Never partial diffs.
- Output as inline code blocks, never file downloads (Walid works on mobile)

## CSS conventions ("Brutalist Architecture")
- Zero indentation, flush left · one property per line · /* SECTION */ comments
- bd- namespace · is- / has- state classes
- Desktop-first; ALL mobile styles in ONE media block at the end

## When unsure
Ask before assuming.
