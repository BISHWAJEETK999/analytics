const express = require('express');
const _ = require('lodash');

const app = express();
const port = process.env.PORT || 33000;

// Serve static files (CSS, JavaScript, images, etc.) from the "public" directory
app.use(express.static(__dirname + '/public'));

// Sample blog data (replace with your actual data)
const sampleBlogData = [
  { id: 1, title: 'Privacy Matters', content: 'Privacy is important.' },
  { id: 2, title: 'Technology Trends', content: 'Latest tech trends.' },
  { id: 3, title: 'Security Tips', content: 'Tips for online security.' },
];

// Middleware to fetch blog data
app.get('/api/blog-stats', (req, res) => {
  try {
    const totalBlogs = sampleBlogData.length;
    const longestTitleBlog = _.maxBy(sampleBlogData, (blog) => blog.title.length);
    const blogsWithPrivacy = _.filter(sampleBlogData, (blog) =>
      blog.title.toLowerCase().includes('privacy')
    );
    const uniqueTitles = _.uniqBy(sampleBlogData, 'title');

    const stats = {
      totalBlogs,
      longestBlogTitle: longestTitleBlog.title,
      blogsWithPrivacy: blogsWithPrivacy.length,
      uniqueBlogTitles: uniqueTitles.map((blog) => blog.title),
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Blog search endpoint
app.get('/api/blog-search', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "query" is required.' });
  }

  // Perform a mock search (replace with actual search logic)
  const searchResults = sampleBlogData.filter((blog) =>
    blog.title.toLowerCase().includes(query.toLowerCase())
  );

  res.json(searchResults);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
