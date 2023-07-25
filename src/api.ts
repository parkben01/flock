import useSWR, { mutate } from "swr";
import { Person } from "./types";

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const personPath = "/api/persons";

export const usePerson = () => useSWR<Person[]>(personPath, fetcher);

export const createPerson = async (firstName: string) => {
  mutate(
    personPath,
    persons => [{ firstName }, ...persons],
    false,
  );
  await fetch(personPath, {
    method: "POST",
    body: JSON.stringify({ firstName }),
  });

  mutate(personPath);
};

export const togglePerson = async (person: Person) => {
  mutate(
    personPath,
    persons =>
      persons.map(p =>
        p.id === person.id ? { ...person, completed: !p.completed } : p,
      ),
    false,
  );
  await fetch(`${personPath}?personId=${person.id}`, {
    method: "PUT",
    body: JSON.stringify({  }),
  });
  mutate(personPath);
};

export const deletePerson = async (id: string) => {
  mutate(personPath, persons => persons.filter(p => p.id !== id), false);
  await fetch(`${personPath}?personId=${id}`, { method: "DELETE" });
  mutate(personPath);
};
