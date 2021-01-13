import Head from 'next/head'
import DefaultErrorPage from 'next/error'
import axios from 'axios'

function PostDetails({ post }) {
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
    <Head>
      <title>{post.title}</title>
      <meta name="description" content={post.description} />
    </Head>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}

async function fetchAllPosts() {
  const res = await axios.get('https://my-json-server.typicode.com/bhubr/fake-blog-api/posts')
  return res.data
}

async function fetchOnePost(slug) {
  const res = await axios.get(`https://my-json-server.typicode.com/bhubr/fake-blog-api/posts/${slug}`)
  return res.data
}

// Permet de pré-calculer les différents chemins relatifs
// menant vers cette page.
// Par exemple si j'ai 3 articles avec les slugs
// introduction-to-seo-with-react, another-article et another-test.
// Next.js a besoin de connaître leurs chemins relatifs :
//   /post/introduction-to-seo-with-react
//   /post/another-article
//   /post/another-test
export async function getStaticPaths() {
  // Je fais une requête pour récupérer *tous* les articles
  const posts = await fetchAllPosts()
  // puis un map pour récupérer leurs slugs (dans cette API j'ai mis
  // des slugs comme id)
  const paths = posts.map(p => `/post/${p.id}`)
  // Je renvoie ces chemins, de cette façon le "pre-renderer"
  // sait quelles pages il doit crawler pour les générer
  return {
    paths,
    fallback: true,
  }
}

// Cette fonction a le même nom que celle dans index.js
// Elle va chercher les données d'un seul article
// Elle récupère son slug via les paramètres d'URL
// (contenus dans params)
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

export default PostDetails;
