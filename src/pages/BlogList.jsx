import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogList = () => {
  const blogs = [
    {
      id: 1,
      title: 'Web Development Best Practices',
      excerpt: 'Learn about the latest web development trends and best practices for building modern applications.',
      date: '2025-08-13',
      link: '/blog1'
    },
    {
      id: 2,
      title: 'Digital Marketing Strategies',
      excerpt: 'Discover effective digital marketing strategies that can help grow your business online.',
      date: '2025-08-12',
      link: '/blog2'
    },
    {
      id: 3,
      title: 'Technology Innovation Trends',
      excerpt: 'Stay updated with the latest technology innovations and trends shaping the future.',
      date: '2025-08-11',
      link: '/blog3'
    }
  ];

  return (
    <motion.div
      className="blog-list-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Our Blog</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Stay updated with the latest insights, trends, and tips from our experts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              className="blog-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{blog.date}</span>
                  <Link
                    to={blog.link}
                    className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark transition-colors duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-block bg-secondary text-white px-8 py-3 rounded-lg hover:bg-secondary-dark transition-colors duration-300"
          >
            View All Blog Posts
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogList;
