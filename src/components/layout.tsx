import Head from 'next/head';
import Header from './header';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>AYM Flock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  )
}
