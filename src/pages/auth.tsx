import { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const loginDatabase: { [name: string]: string } = {};
    // const loginDatabase: Record<string, string> = {};
    loginDatabase.u = 'p';

    const inputsAreValid = () => {
      if (!userName) {
        console.log('invalidUsername');
        return false;
      }
      if (!password) {
        console.log('invalidPassword');
        return false;
      } 
      return true;
    }

    const confirmLogin = (u, p) => {
      if (!(loginDatabase.u === p)) {
        console.log('invalidCombination');
        return false;
      }
      console.log('validCombination');
      return true;
    }

    const resetInputs = () => {
      setUserName("");
      setPassword("");
    }

    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (!inputsAreValid()) return;
          if (!confirmLogin(userName, password)) return;
          // if (!confirmLogin()) return;
          resetInputs();
          // validateUser();
        }}
        className={styles.addTodo}
      >
        <input
          className={styles.input}
          placeholder="Username"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button className={styles.loginButton}>Login</button>
        {/* <button className={styles.loginButton}>New User</button> */}
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
