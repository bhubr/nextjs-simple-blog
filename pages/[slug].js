import Head from 'next/head'
import { useRouter } from 'next/router'
import DefaultErrorPage from 'next/error'
import db from '../static/db.json';

function BlogPostDetailsContainer() {
  // on ferait un appel API vers le backend pour récupérer un article via son slug
  const router = useRouter()
  const { slug } = router.query
  // récupérer le bon post dans le tableau
  const post = db.posts.find((p) => p.slug === slug);
  console.log(slug, post)
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

export default BlogPostDetailsContainer;
