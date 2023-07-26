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
  const [lastName, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [street1, setStreet1] = useState("");
  const [street2, setStreet2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  //const is similar but better than var, constant value cannot change
  //let can be changed throughout
  //State
  
  const validateInputs = () => {
    // Check that firstName exists
    if (!firstName) return false;

    // Check that birthdate is in a valid Date format
    const date = new Date(birthdate.trim());
    if (date.toString() === "Invalid Date") return false;

    // Nothing wrong!
    return true;
  }

  const resetInputs = () => {
    setFirstname("");
    setLastname("");
    setGender("");
    setBirthdate("");
    setStreet1("");
    setStreet2("");
    setCity("");
    setState("");
    setZip("");
    setEmail("");
    setPhone("");
  }

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();

        if (!validateInputs()) return;

        createPerson({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          gender: gender.trim(),
          birthdate: new Date(birthdate.trim()),
          street1: street1.trim(),
          street2: street2.trim(),
          city: city.trim(),
          state: state.trim(),
          zip: zip.trim(),
          email: email.trim(),
          phone: phone.trim(),
        });

        resetInputs();
      }}
      className={styles.addTodo}
    >
      <input
        className={styles.input}
        placeholder="First name"
        value={firstName}
        onChange={e => setFirstname(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Last name"
        value={lastName}
        onChange={e => setLastname(e.target.value)}
      />
      <input // TODO: use <select> instead of <input>. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
        className={styles.input}
        placeholder="Gender"
        value={gender}  // we want them to enter only male or female or ""
        onChange={e => setGender(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Birthdate"
        value={birthdate}
        onChange={e => setBirthdate(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Street1"
        value={street1}
        onChange={e => setStreet1(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Street2"
        value={street2}
        onChange={e => setStreet2(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="City"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="State"
        value={state}
        onChange={e => setState(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Zip"
        value={zip}
        onChange={e => setZip(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        className={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
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
        <h1 className={styles.title}>People</h1>
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
