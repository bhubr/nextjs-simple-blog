import React from 'react';
import BlogPost from './blog-post';

function BlogPostList({ posts }) {
  return (
    <section>
    {posts.map((post) => (
      <BlogPost key={post.id} slug={post.slug} title={post.title} content={post.content} />
    ))}
    </section>
  );
}

export default BlogPostList;
