import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { createPerson, deletePerson, togglePerson, usePersons } from "../api";
import styles from "../styles/Home.module.css";
import { Person } from "../types";

export const PersonList: React.FC = () => {
  const { data: persons, error } = usePersons();

  if (error != null) return <div>Error loading persons...</div>;
  if (persons == null) return <div>Loading...</div>;

  if (persons.length === 0) {
    return <div className={styles.emptyState}>Try adding a person ☝️️</div>;
  }

  return (
    <ul className={styles.personList}>
      {persons.map(person => (
        <PersonItem person={person} />
      ))}
    </ul>
  );
};

const PersonItem: React.FC<{ person: Person }> = ({ person }) => (
  <li className={styles.todo}>
    <label
      className={`${styles.label} ${styles.checked}`}
    >
      <input
        type="checkbox"
        checked={!!person.firstName}
        className={`${styles.checkbox}`}
        onChange={() => togglePerson(person)}
      />
      {person.firstName}
    </label>

    <button className={styles.deleteButton} onClick={() => deletePerson(person.id)}>
      ✕
    </button>
  </li>
);

const AddPersonInput = () => {
  const [firstName, setFirstname] = useState("");

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        createPerson(firstName);
        setFirstname("");
      }}
      className={styles.addTodo}
    >
      <input
        className={styles.input}
        placeholder="Tony"
        value={firstName}
        onChange={e => setFirstname(e.target.value)}
      />
      <button className={styles.addButton}>Add</button>
    </form>
  );
};

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Railway NextJS Prisma</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <h1 className={styles.title}>Persons</h1>
        <h2 className={styles.desc}>
          NextJS app connected to Postgres using Prisma and hosted on{" "}
          <a href="https://railway.app">Railway</a>
        </h2>
      </header>

      <main className={styles.main}>
        <AddPersonInput />

        <PersonList />
      </main>
    </div>
  );
};

export default Home;
