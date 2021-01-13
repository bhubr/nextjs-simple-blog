import Head from 'next/head'
import axios from 'axios'
import PostList from '../components/blog-post-list'
import styles from '../styles/Home.module.css'

function Home({ posts, error }) {
  // On aurait pu intégrer cela dans la partie ci-dessous,
  // avec un ternaire
  if (error) return (
    <p>Une erreur est survenue : {error.message}</p>
  );
  return (
    <div className={styles.container}>
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenue sur ce blog basé sur Next.js !
        </h1>

        <PostList posts={posts} />
      </main>
    </div>
  )
}

// Cette fonction permet de récupérer les données au moment du _build_
// pour pouvoir effectuer le pré-rendu des pages
export async function getStaticProps() {
  // On aurait pu utiliser async/await
  // Comme on ne l'a pas fait il faut return le axios.get
  return axios.get('https://my-json-server.typicode.com/bhubr/fake-blog-api/posts')
    .then(res => {
      return {
        // By returning { props: { posts } }, the Home component
        // will receive `posts` as a prop at build time
        // -> renvoie un objet contenant des props, passé au composant Home
        // lors du build
        props: {
          posts: res.data, // res.data => tableau d'articles
        },
      }
    })
    .catch(error => {
      return {
        props: {
          posts: [],
          error
        }
      }
    })


}

export default Home
