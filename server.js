const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
require('dotenv').config();

// Set up environment variables
const GHOST_API_URL = process.env.GHOST_API_URL;
const GHOST_CONTENT_KEY = process.env.GHOST_CONTENT_KEY;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to fetch blog posts
app.get('/api/blog-posts', async (req, res) => {
  try {
    const response = await axios.get(
      `${GHOST_API_URL}/posts/?key=${GHOST_CONTENT_KEY}&limit=3&include=tags,authors`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ error: 'Failed to fetch blog posts' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
