import { getGlobalData } from '../../utils/global-data';
import { getPost, getSlugs, getPrev, getNext } from '../../utils/wordpress';

import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
// import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';

export default function PostPage({ post, prevPost, nextPost, globalData }) {
  return (
    <Layout>
      <SEO title={`${post.title.rendered} - ${globalData.name}`} />
      <Header name={globalData.name} />
      <article className="px-6 md:px-0">
        <header>
          <h1 className="text-3xl md:text-5xl text-white text-center mb-12">
            {post.title.rendered}
          </h1>
        </header>
        <main>
          <article className="prose prose-dark">
            <div
              className="mt-3 text-lg opacity-60 console-dark"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </article>
        </main>
        <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`}>
              <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-black bg-opacity-30 hover:bg-opacity-50 transition border border-gray-800 border-white border-opacity-10 border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                <p className="uppercase mb-4 text-white opacity-60">Previous</p>
                <h4 className="text-2xl mb-6 text-white">
                  {prevPost.title.rendered}
                </h4>
                <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              </a>
            </Link>
          )}
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`}>
              <a className="py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-black bg-opacity-30 hover:bg-opacity-50 transition border border-gray-800 border-white border-opacity-10 border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                <p className="uppercase mb-4 text-white opacity-60">Next</p>
                <h4 className="text-2xl mb-6 text-white">
                  {nextPost.title.rendered}
                </h4>
                <ArrowIcon className="mt-auto mx-auto md:ml-0" />
              </a>
            </Link>
          )}
        </div>
      </article>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export async function getStaticPaths() {
  const slugs = await getSlugs('posts');

  return {
    paths: slugs,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const globalData = getGlobalData();
  const post = await getPost(params.slug);
  return {
    props: {
      globalData: globalData,
      post: post,
      prevPost: await getPrev(params.slug),
      nextPost: await getNext(params.slug),
    },
  };
}
