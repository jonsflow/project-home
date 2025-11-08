// Static project data from GitHub repositories
const projects = [
    {
        name: "resume-creator",
        description: "A dynamic resume creation project with YAML-based configuration and modern web technologies",
        url: "https://github.com/jonsflow/resume-creator",
        homepageUrl: "https://jonsflow.github.io/resume-creator",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: true,
        category: "web",
        topics: ["resume", "yaml", "generator", "web"],
        updatedAt: "2025-11-08T18:14:14Z"
    },
    {
        name: "mtb-trivia",
        description: "Mountain Bike Trivia Game - Test your MTB knowledge with three difficulty levels",
        url: "https://github.com/jonsflow/mtb-trivia",
        homepageUrl: "https://jonsflow.github.io/mtb-trivia",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: true,
        category: "web",
        topics: ["game", "trivia", "mountain-biking", "javascript"],
        updatedAt: "2025-07-10T01:58:08Z"
    },
    {
        name: "YesChef",
        description: "Menu recipe prototype for back of the house reference - Restaurant kitchen management tool",
        url: "https://github.com/jonsflow/YesChef",
        homepageUrl: "https://jonsflow.github.io/YesChef",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: true,
        category: "web",
        topics: ["restaurant", "recipes", "management", "cooking"],
        updatedAt: "2025-07-17T23:23:29Z"
    },
    {
        name: "schwab-streaming",
        description: "Real-time financial market data streaming application using Schwab API",
        url: "https://github.com/jonsflow/schwab-streaming",
        homepageUrl: "",
        primaryLanguage: "Python",
        hasGitHubPages: false,
        featured: true,
        category: "financial",
        topics: ["trading", "market-data", "streaming", "schwab-api"],
        updatedAt: "2025-07-31T20:35:20Z"
    },
    {
        name: "bikecheck",
        description: "Swift mobile application for mountain bike maintenance tracking and community sharing",
        url: "https://github.com/jonsflow/bikecheck",
        homepageUrl: "",
        primaryLanguage: "Swift",
        hasGitHubPages: false,
        featured: true,
        category: "mobile",
        topics: ["ios", "swift", "mountain-biking", "maintenance"],
        updatedAt: "2025-10-06T00:00:32Z"
    },
    {
        name: "schwab_streaming_options",
        description: "Streaming options data and analysis using Schwab API",
        url: "https://github.com/jonsflow/schwab_streaming_options",
        homepageUrl: "",
        primaryLanguage: "Python",
        hasGitHubPages: false,
        featured: true,
        category: "financial",
        topics: ["trading", "options", "schwab-api"],
        updatedAt: "2025-11-02T01:14:07Z"
    },
    {
        name: "bikecheck-public",
        description: "Bikecheck-public documentation",
        url: "https://github.com/jonsflow/bikecheck-public",
        homepageUrl: "https://jonsflow.github.io/bikecheck-public",
        primaryLanguage: "HTML",
        hasGitHubPages: true,
        featured: false,
        category: "mobile",
        topics: ["bikecheck", "documentation"],
        updatedAt: "2025-10-28T02:40:53Z"
    },
    {
        name: "ansible-lint-fixer",
        description: "Automated tool for fixing Ansible linting issues",
        url: "https://github.com/jonsflow/ansible-lint-fixer",
        homepageUrl: "",
        primaryLanguage: "Python",
        hasGitHubPages: false,
        featured: false,
        category: "devops",
        topics: ["ansible", "lint", "automation"],
        updatedAt: "2025-09-14T07:59:24Z"
    },
    {
        name: "bragging-rights",
        description: "Platform for sharing achievements and accomplishments",
        url: "https://github.com/jonsflow/bragging-rights",
        homepageUrl: "",
        primaryLanguage: "PHP",
        hasGitHubPages: false,
        featured: false,
        category: "web",
        topics: ["php", "community", "social"],
        updatedAt: "2025-07-16T22:09:38Z"
    },
    {
        name: "rh_stocks",
        description: "A collection of Robin Stocks Python scripts and Jupyter notebooks for trading analysis",
        url: "https://github.com/jonsflow/rh_stocks",
        homepageUrl: "",
        primaryLanguage: "Jupyter Notebook",
        hasGitHubPages: false,
        featured: false,
        category: "financial",
        topics: ["python", "trading", "analysis", "jupyter"],
        updatedAt: "2025-08-16T21:33:14Z"
    },
    {
        name: "nplusone",
        description: "iOS app prototype to track your bike fleet - because N+1 bikes is always the right number for cycling enthusiasts",
        url: "https://github.com/jonsflow/nplusone",
        homepageUrl: "",
        primaryLanguage: "Swift",
        hasGitHubPages: false,
        featured: false,
        category: "mobile",
        topics: ["swift", "cycling", "bike-tracking", "ios", "fleet-management"],
        updatedAt: "2024-12-24T02:16:30Z"
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