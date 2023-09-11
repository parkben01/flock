import { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      if (!firstName) {
        console.log('invalidFirstName');
        return false;
      }
      if (!lastName) {
        console.log('invalidLastName');
        return false;
      } 
      return true;
    }

    const confirmRegistration = (first, last, email, password) => {
      if (loginDatabase.email) {
        console.log('emailIsAlreadyInUse');
        return false;
      }
      console.log('validCombination');
      return true;
    }

    const resetInputs = () => {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
    }

    return (
      <form
        onSubmit={async e => {
          e.preventDefault();
          if (!inputsAreValid()) return;
          if (!confirmRegistration(firstName, lastName, email, password)) return;
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
        <input
          className={styles.input}
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          className={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <button className={styles.loginButton}>Register</button>
      </form>
    );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Sign Up</h1>
      </header>
      <main className={styles.main}>
        { < Register /> }
      </main>
    </div>
  );
};

export default Home;
