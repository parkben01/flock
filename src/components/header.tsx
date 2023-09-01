import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status == "loading";
  return (
    <header className={styles.header}>
      {/* <div className={styles.contentContainer}> */}
        <Link href="/"><img className={styles.logo} src="/sheep-icon.png"></img></Link>
        <div className={styles.signedInStatus}>
          <p
            className={`nojs-show ${!session && loading ? styles.loading : styles.loaded
              }`}
          >
            {!session && (
              <>
                <Button
                  href={`/api/auth/signin`}
                  className={styles.buttonPrimary}
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault()
                    signIn('google')
                  }}
                >
                  Sign in
                </Button>
              </>
            )}
            {session?.user && (
              <>
                {session.user.image && (
                  <span
                    style={{ backgroundImage: `url('${session.user.image}')` }}
                    className={styles.avatar}
                  />
                )}
                <span className={styles.signedInText}>
                  <small>Signed in as </small>
                  <strong>{session.user.name}</strong>
                </span>
                <Button
                  href={`/api/auth/signout`}
                  className={styles.button}
                  variant="contained"
                  onClick={(e) => {
                    e.preventDefault()
                    signOut()
                  }}
                >
                  Sign out
                </Button>
              </>
            )}
          </p>
        </div>
      {/* </div> */}
    </header>
  );
}