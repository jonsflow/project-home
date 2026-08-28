# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio landing page for Jonathan Crissey that showcases GitHub projects and serves as a professional marketing platform. The site is a client-side JavaScript application designed to be hosted on GitHub Pages with hardcoded project data.

## Architecture

Pure client-side web application optimized for GitHub Pages deployment:

- **Frontend Only**: No backend required - all logic runs in the browser
- **Static Project Data**: Projects hardcoded in JavaScript/JSON (no API calls)
- **Static Asset Hosting**: All images, CSS, and JavaScript served from GitHub Pages
- **Responsive Design**: Modern CSS Grid/Flexbox layouts
- **Photo Galleries**: Static image galleries organized by interests

## Development Workflow

### Project Data (Manually Curated)

`js/projects.js` is the live project list and is **maintained by hand**. Edit it
directly.

This file used to be generated. That tooling — `admin.html`, `server.py`,
`scripts/fetch_repos.py`, `scripts/merge_descriptions.py`, and `data/` — has been
**removed**, because its output was not precise enough: placeholder descriptions
(`"Project: <name>"`), private repos that 404 for visitors, and stale entries as
repos were renamed. Hand-written descriptions say what a project actually does
and why it matters, which is the entire point of the page.

Do not reintroduce a generator that writes `js/projects.js`. It would overwrite
the curated list with worse data. (The removed files remain in git history if
they are ever needed for reference.)

When adding a project, append an entry to the `projects` array in
`js/projects.js`:

- Link only to **public** repos — private ones 404 for visitors. Where a project
  is private, link its public counterpart instead (e.g. `bikecheck-public`
  stands in for the private `bikecheck`).
- `category` must match a `data-filter` button in `index.html`
  (`ai`, `web`, `mobile`, `financial`, `tools`), or the card is unreachable by filter.
- Add the language to `getLanguageColor()` or its dot renders default gray.
- Keep descriptions roughly **80–130 characters** so card heights stay even.
- Some repos live under the **`jf229`** GitHub account — an external account used
  for IBM public projects. Those links are correct as-is.

### Local Development
```bash
# Serve files locally for testing
python3 -m http.server 8000
# Open http://localhost:8000

# Alternative with Node.js
npx serve .
```

### GitHub Pages Deployment
```bash
# Enable GitHub Pages in repository settings
# Deploy from main branch root
# No build process required - direct static file serving
```

## Personal Context

### Technical Background
- 18+ years software engineering experience
- Cloud infrastructure, mobile development, hardware automation
- AI-assisted engineering: agent orchestration, multi-agent pipelines, RAG and
  retrieval evaluation, and validating AI-generated output with tests and CI.
  Every project since 2024 has been built with AI assistance to some degree.
- Current role: Cloud Hardware Platform Engineer at IBM

### Interests for Photo Galleries
- **Mountain Biking**: BMX, Downhill, Cross Country, Gravel
- **Photography**: Various subjects and outdoor scenes
- **Cooking**: Culinary projects and food photography
- **Outdoor Activities**: Hiking, camping adventures
- **Technology**: EV enthusiasm (Zero motorcycles, Tesla), AI development
- **Financial Markets**: Trading analysis and pattern recognition

## File Structure Strategy

```
/
├── index.html              # Main landing page
├── css/
│   ├── main.css           # Primary styles
│   └── responsive.css     # Mobile/tablet breakpoints
├── js/
│   ├── projects.js        # Hardcoded project data
│   ├── gallery.js         # Photo gallery functionality
│   └── main.js           # Application initialization
├── images/
│   ├── profile/          # Profile photos
│   ├── projects/         # Project screenshots
│   ├── biking/          # Mountain biking photos
│   ├── photography/     # Photography portfolio
│   ├── cooking/         # Food and cooking images
│   └── outdoor/         # Hiking/camping photos
└── galleries/           # Individual gallery pages (biking, photography, cooking, outdoor)
```

## Project Data Structure

### Entry Shape

```javascript
// js/projects.js
{
    "name": "agent-system",
    "description": "Deterministic orchestrator for AI coding agents \u2014 plain, testable code owns state and sequencing while agents handle only judgment.",
    "url": "https://github.com/jonsflow/agent-system",
    "homepageUrl": "",
    "primaryLanguage": "Python",
    "hasGitHubPages": false,
    "featured": true,
    "category": "ai",
    "topics": ["agents", "orchestration", "llm"],
    "updatedAt": "2026-07-21T17:03:04Z"
}
```

## Styling and Branding

### Design Consistency
- Use color scheme from resume project: dark slate sidebar with professional contrast
- Helvetica Neue font stack for consistency
- Professional photography and clean layouts
- Mobile-first responsive design

### Component Structure
- Modular CSS for reusable components
- Grid-based project showcase
- Lightbox modal for image galleries
- Smooth animations and transitions

## GitHub Pages Optimization

### Performance
- Minimize HTTP requests through CSS/JS concatenation
- Optimize images (WebP with fallbacks)
- Lazy loading for images and content sections
- No external API calls - all content loads immediately

### SEO and Accessibility
- Semantic HTML structure
- Alt text for all images
- Meta tags for social sharing
- Keyboard navigation support
- Screen reader compatibility

## Content Updates

When adding new projects:
1. Confirm the repo is public — private repos 404 for visitors
2. Add the entry to `js/projects.js` by hand (see Project Data above)
3. Check `category` matches a filter button and the language has a color
4. Add project screenshots to `images/projects/`
5. Update featured projects as needed