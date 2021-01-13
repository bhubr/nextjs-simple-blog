import Head from 'next/head'
import DefaultErrorPage from 'next/error'

function BlogPostDetailsContainer({ post }) {
  console.log(post)
  if(!post) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }
  return (
    <article className="BlogPostDetails">
      <h2>{post.title}</h2>
      <div>{post.content}</div>
    </article>
  );
}

async function fetchAllPosts() {
  const res = await fetch('https://my-json-server.typicode.com/bhubr/fake-blog-api/posts')
  return res.json()
}

async function fetchOnePost(slug) {
  const res = await fetch(`https://my-json-server.typicode.com/bhubr/fake-blog-api/posts/${slug}`)
  return res.json()
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts()
  const paths = posts.map(p => `/${p.id}`)
  return {
    paths,
    fallback: true,
  }
}

// // This function gets called at build time
export async function getStaticProps({ params }) {
  const { slug } = params
  const post = await fetchOnePost(slug)

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  }
}

export default BlogPostDetailsContainer;
