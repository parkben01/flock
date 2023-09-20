import { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log({session});
  return (
    <>
      <Head>
        <title>AYM Flock</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        {session && <Button
          className={styles.mainButton}
          variant="contained"
          onClick={() => {
            router.push('/directory');
          }}>
            Directory
        </Button>}
        {session && <Button
          className={styles.mainButton}
          variant="contained"
          onClick={() => {
            router.push('/events');
          }}>
            Events
        </Button>}
      </main>
    </>
  );
};

export default Home;
