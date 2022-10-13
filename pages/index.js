import Link from 'next/link';
import { getPosts } from '../utils/wordpress';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Layout, { GradientBackground } from '../components/Layout';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';

export default function Index({ posts, globalData }) {
  return (
    <Layout>
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full text-white">
        <h1 className="text-3xl lg:text-5xl text-center mb-12">
          {globalData.blogTitle}
        </h1>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.id}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-black bg-opacity-30 hover:bg-opacity-50 transition border border-gray-800 border-white border-opacity-10 border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  {post.date && (
                    <p className="uppercase mb-3 font-bold opacity-60">
                      {post.date}
                    </p>
                  )}
                  <h2 className="text-2xl md:text-3xl">
                    {post.title.rendered}
                  </h2>
                  {post.excerpt.rendered && (
                    <div
                      className="mt-3 text-lg opacity-60 console"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered,
                      }}
                    />
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer copyrightText={globalData.footerText} />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
