import React from 'react';
import Link from 'next/link';

function BlogPost({ slug, title, content }) {
  return (
    <article className="BlogPost">
      <h2>{title}</h2>
      <div>{content.substr(0, 10)}</div>
      <Link
        href={{
          pathname: '/post/[slug]',
          query: { slug },
        }}
      >
        Read more
      </Link>
    </article>
  );
}

export default BlogPost;
