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

### Repository Discovery (Development Only)
Use `gh` CLI during development to gather current repositories, then hardcode the results:

```bash
# List all repositories with details
gh repo list --limit 100 --json name,description,url,homepageUrl,primaryLanguage,updatedAt

# Check specific repo for GitHub Pages
gh api repos/jonathanalexander229/{repo-name}/pages

# Get repository topics/tags
gh repo view {repo-name} --json topics
```

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
└── data/
    └── projects.json     # Static project metadata
```

## Project Data Structure

### Static Project Configuration
```javascript
// js/projects.js
const projects = [
  {
    name: "resume-creator",
    description: "YAML-based resume generation system",
    url: "https://github.com/jonathanalexander229/resume-creator",
    homepageUrl: "https://jonathanalexander229.github.io/resume-creator",
    primaryLanguage: "Python",
    hasGitHubPages: true,
    featured: true,
    topics: ["resume", "yaml", "generator"]
  }
  // Add more projects as discovered via gh CLI
];
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
1. Use `gh repo list` to discover new repositories
2. Use `gh api repos/{owner}/{repo}/pages` to check GitHub Pages status
3. Manually add project data to `js/projects.js` or `data/projects.json`
4. Add project screenshots to `images/projects/`
5. Update featured projects as needed