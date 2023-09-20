import useSWR, { mutate } from "swr";
import { Person } from "./types";
import { Event } from "./types"

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const personPath = "/api/persons";
const eventPath = "/api/events"

export const usePersons = () => useSWR<Person[]>(personPath, fetcher);
export const useEvents = () => useSWR<Event[]>(eventPath, fetcher);

// create and display a new person or event
export const createPerson = async (person: Person) => {
  mutate(
    personPath,
    persons => [person, ...persons],
    false,
  );
  await fetch(personPath, {
    method: "POST",
    body: JSON.stringify(person),
  });
  mutate(personPath);
};

export const createEvent = async (event: Event) => {
  mutate(
    eventPath,
    events => [event, ...events],
    false,
  );
  await fetch(eventPath, {
    method: "POST",
    body: JSON.stringify(event),
  });
  mutate(eventPath);
};


// update existing person or event on the display
export const updatePerson = async (person: Person) => {
  mutate(
    personPath,
    persons =>
      persons.map(p =>
        p.id === person.id ? { ...person } : p,
      ),
    false,
  );
  await fetch(`${personPath}?personId=${person.id}`, {
    method: "PUT",
    body: JSON.stringify(person),
  });
  mutate(personPath);
};

export const updateEvent = async (event: Event) => {
  mutate(
    eventPath,
    events =>
      events.map(e =>
        e.id === event.id ? { ...event } : e,
      ),
    false,
  );
  await fetch(`${eventPath}?eventId=${event.id}`, {
    method: "PUT",
    body: JSON.stringify(event),
  });
  mutate(eventPath);
};

// remove a person or event from the display
export const deletePerson = async (id: string) => {
  mutate(personPath, persons => persons.filter(p => p.id !== id), false);
  await fetch(`${personPath}?personId=${id}`, { method: "DELETE" });
  mutate(personPath);
};

export const deleteEvent = async (id: string) => {
  mutate(eventPath, events => events.filter(e => e.id !== id), false);
  await fetch(`${eventPath}?eventId=${id}`, { method: "DELETE" });
  mutate(eventPath);
};