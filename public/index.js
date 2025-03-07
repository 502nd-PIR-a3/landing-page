// Site data
const siteData = {
    heroDescription: '502nd PIR is an authentic WW2 Realism unit for ArmA 3 that has a relaxed atmosphere.',
    prerequisites: [
        {
            title: "Microphone",
            description: "We require that you have a functional Microphone."
        },
        {
            title: "Legal Copy",
            description: "A legal copy of Arma 3 from a seller."
        },
        {
            title: "English",
            description: "You must speak fluent English."
        },
        {
            title: "First Person",
            description: "Abillity and willingness to play Arma 3 in First Person."
        },
        {
            title: "Attendance",
            description: "Being able to attend one of our operations on any of the operation days a week"
        },
        {
            title: "Teamspeak",
            description: "Willingness to download and use Teamspeak 3 and TFAR plugin (Task Force Arrowhead Radio)."
        }
    ]
};


// Handle mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('show');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('show');
    const section = document.getElementById(sectionId);
    section.scrollIntoView({
        behavior: 'smooth'
    });
}

// Format date for blog posts
function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Truncate text to a certain number of words
function truncateText(text, wordCount) {
    if (!text) return '';
    const words = text.split(' ');
    if (words.length <= wordCount) return text;
    return words.slice(0, wordCount).join(' ') + '...';
}

// Fetch blog posts from our secure backend API
async function fetchBlogPosts() {
    try {
        const response = await fetch('/api/blog-posts');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return null;
    }
}

// Populate blog posts from backend API
async function populateBlogPosts() {
    const blogContainer = document.getElementById('blogContainer');

    try {
        const posts = await fetchBlogPosts();

        // Clear loading message
        blogContainer.innerHTML = '';

        if (!posts || posts.length === 0) {
            blogContainer.innerHTML = '<div class="loading">No blog posts found.</div>';
            return;
        }

        posts.forEach(post => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';

            // Get featured image or use placeholder
            const imageUrl = post.feature_image || '/api/placeholder/400/200';

            blogCard.innerHTML = `
            <div class="blog-image" style="background-image: url('${imageUrl}')"></div>
            <div class="blog-content">
            <div class="blog-meta">${formatDate(post.published_at)}</div>
            <h3>${post.title}</h3>
            <p>${truncateText(post.excerpt || post.custom_excerpt || 'Read this blog post on our website.', 20)}</p>
            <a href="${post.url}" class="read-more" target="_blank">Read More</a>
            </div>
        `;

            blogContainer.appendChild(blogCard);
        });
    } catch (error) {
        console.error('Error populating blog posts:', error);
        blogContainer.innerHTML = '<div class="loading">Failed to load blog posts. Please try again later.</div>';

        // Add fallback blog posts if the API fails
        addFallbackBlogPosts();
    }
}

// Add fallback blog posts if the API call fails
function addFallbackBlogPosts() {
    const blogContainer = document.getElementById('blogContainer');

    // Clear any previous content
    blogContainer.innerHTML = '';

    const fallbackPosts = [{
        title: '📖',
        excerpt: 'Failed to load latest blog posts.'
    }];

    fallbackPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
        <div class="blog-image"></div>
        <div class="blog-content">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <a href="#" class="read-more">Read More</a>
        </div>
        `;
        blogContainer.appendChild(blogCard);
    });
}

// Function to create a simple card from a requirement object
function createCard(requirement) {
    const card = document.createElement('div');
    card.className = 'card';

    const title = document.createElement('div');
    title.className = 'card-title';
    title.textContent = requirement.title;
    card.appendChild(title);

    const description = document.createElement('div');
    description.className = 'card-description';
    description.textContent = requirement.description;
    card.appendChild(description);

    return card;
}

// Add default cards to the container
function addDefaultCards() {
    // DOM elements
    const cardContainer = document.getElementById('card-container');

    siteData.prerequisites.forEach(req => {
        const card = createCard(req);
        cardContainer.appendChild(card);
    });
}

// Initialize the page
function initPage() {
    document.getElementById('heroDescription').textContent = siteData.heroDescription;
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    populateBlogPosts();
    addDefaultCards();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);