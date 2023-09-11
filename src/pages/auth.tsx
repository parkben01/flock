import { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const loginDatabase: { [name: string]: string } = {};
    // const loginDatabase: Record<string, string> = {};
    loginDatabase.email = 'password';

    const inputsAreValid = () => {
      if (!email) {
        console.log('invalidEmail')
        return false;
      }
      if (!password) {
        console.log('invalidPassword');
        return false;
      }
      return true;
    }
    
    const confirmLogin = (email, password) => {
      if (!(loginDatabase.email === password)) {
        console.log('invalidCombination');
        return false;
      }
      console.log('validCombination');
      return true;
    }

    const resetInputs = () => {
      setEmail("");
      setPassword("");
    }

    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (!inputsAreValid()) return;
          if (!confirmLogin(email, password)) return;
          resetInputs();
        }}
        className={styles.addTodo}
      >
        <input
          className={styles.input}
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className={styles.loginButton}>Login</button>
      </form>
    );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Login</h1>
      </header>
      <main className={styles.main}>
        { < Login /> }
      </main>
    </div>
  );
};

export default Home;