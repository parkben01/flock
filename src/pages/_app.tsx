import { SessionProvider } from "next-auth/react"
import Layout from '../components/layout'
import '../styles/globals.css'
import type { AppProps } from "next/app"
import type { Session } from "next-auth"

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
