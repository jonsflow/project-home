// Static project data from GitHub repositories
const projects = [
    {
        name: "resume-creator",
        description: "A dynamic resume creation project with YAML-based configuration and modern web technologies",
        url: "https://github.com/jonathanalexander229/resume-creator",
        homepageUrl: "https://jonathanalexander229.github.io/resume-creator/",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: true,
        category: "web",
        topics: ["resume", "yaml", "generator", "web"],
        updatedAt: "2025-07-12T20:49:31Z"
    },
    {
        name: "mtb-trivia",
        description: "Mountain Bike Trivia Game - Test your MTB knowledge with three difficulty levels",
        url: "https://github.com/jonathanalexander229/mtb-trivia",
        homepageUrl: "https://jonathanalexander229.github.io/mtb-trivia/",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: true,
        category: "web",
        topics: ["game", "trivia", "mountain-biking", "javascript"],
        updatedAt: "2025-07-10T01:58:08Z"
    },
    {
        name: "CRU",
        description: "Menu recipe prototype for back of the house reference - Restaurant kitchen management tool",
        url: "https://github.com/jonathanalexander229/CRU",
        homepageUrl: "https://jonathanalexander229.github.io/CRU/",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: true,
        category: "web",
        topics: ["restaurant", "recipes", "management", "cooking"],
        updatedAt: "2025-07-12T16:28:43Z"
    },
    {
        name: "schwab-streaming",
        description: "Real-time financial market data streaming application using Schwab API",
        url: "https://github.com/jonathanalexander229/schwab-streaming",
        homepageUrl: "",
        primaryLanguage: "Python",
        hasGitHubPages: false,
        featured: true,
        category: "financial",
        topics: ["trading", "market-data", "streaming", "schwab-api"],
        updatedAt: "2025-07-01T23:18:17Z"
    },
    {
        name: "bikecheck",
        description: "Swift mobile application for mountain bike maintenance tracking and community sharing",
        url: "https://github.com/jonathanalexander229/bikecheck",
        homepageUrl: "",
        primaryLanguage: "Swift",
        hasGitHubPages: false,
        featured: true,
        category: "mobile",
        topics: ["ios", "swift", "mountain-biking", "maintenance"],
        updatedAt: "2025-06-30T20:20:21Z"
    },
    {
        name: "rh_web",
        description: "Web application for Robinhood trading integration and portfolio management",
        url: "https://github.com/jonathanalexander229/rh_web",
        homepageUrl: "",
        primaryLanguage: "JavaScript",
        hasGitHubPages: false,
        featured: false,
        category: "financial",
        topics: ["trading", "robinhood", "portfolio", "web-app"],
        updatedAt: "2025-04-06T00:19:40Z"
    },
    {
        name: "rh_stocks",
        description: "A collection of Robin Stocks Python scripts and Jupyter notebooks for trading analysis",
        url: "https://github.com/jonathanalexander229/rh_stocks",
        homepageUrl: "",
        primaryLanguage: "Jupyter Notebook",
        hasGitHubPages: false,
        featured: false,
        category: "financial",
        topics: ["python", "trading", "analysis", "jupyter"],
        updatedAt: "2025-03-04T01:58:38Z"
    },
    {
        name: "nplusone",
        description: "Swift application for advanced mathematical computations and algorithms",
        url: "https://github.com/jonathanalexander229/nplusone",
        homepageUrl: "",
        primaryLanguage: "Swift",
        hasGitHubPages: false,
        featured: false,
        category: "mobile",
        topics: ["swift", "algorithms", "mathematics", "ios"],
        updatedAt: "2024-12-24T02:16:30Z"
    },
    {
        name: "TOS",
        description: "This is a backup of my TOS workspace and studies for thinkorswim platform",
        url: "https://github.com/jonathanalexander229/TOS",
        homepageUrl: "",
        primaryLanguage: "TypeScript",
        hasGitHubPages: false,
        featured: false,
        category: "financial",
        topics: ["thinkorswim", "trading", "studies", "backup"],
        updatedAt: "2024-10-12T20:05:53Z"
    },
    {
        name: "TSXReactNativeApp",
        description: "Demo App to display Topstep X website natively on both Android and iOS",
        url: "https://github.com/jonathanalexander229/TSXReactNativeApp",
        homepageUrl: "",
        primaryLanguage: "TypeScript",
        hasGitHubPages: false,
        featured: false,
        category: "mobile",
        topics: ["react-native", "mobile", "trading", "demo"],
        updatedAt: "2024-08-18T21:26:57Z"
    }
];

// Function to get projects by category
function getProjectsByCategory(category) {
    if (category === 'all') {
        return projects;
    }
    return projects.filter(project => project.category === category);
}

// Function to get featured projects
function getFeaturedProjects() {
    return projects.filter(project => project.featured);
}

// Function to format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Function to get language color (for visual consistency)
function getLanguageColor(language) {
    const colors = {
        'HTML': '#e34c26',
        'Python': '#3776ab',
        'Swift': '#fa7343',
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Jupyter Notebook': '#da5b0b'
    };
    return colors[language] || '#6c757d';
}