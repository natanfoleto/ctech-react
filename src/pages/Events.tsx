import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { findAllEvents, IEvent } from "../services/event";

import DefaultLayout from "../layouts/Default";

import styles from "./Events.module.css";

function Events() {
  const [events, setEvents] = useState<IEvent[]>();

  useEffect(() => {
    async function findSetAllEvents() {
      const { status, message, data } = await findAllEvents();

      if (status === "error") toast.error(message);
      if (status === "success") setEvents(data);
    }

    findSetAllEvents();
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.competitions}>
          <h2>Competições</h2>

          <div>
            {events?.map((event) => (
              <div key={event.id}>
                <strong>{event.name}</strong>
                <p>{event.notes}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.attractions}>
          <h2>Atrações</h2>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Events;
