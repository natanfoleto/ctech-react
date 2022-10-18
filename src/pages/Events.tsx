import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { findAll, IEvent } from "../services/event";

import DefaultLayout from "../layouts/Default";

import styles from "./Events.module.css";

function Events() {
  const [events, setEvents] = useState<IEvent[]>();

  useEffect(() => {
    async function findAllEvents() {
      const { status, message, data } = await findAll();

      if (status === "error") toast.error(message);
      if (status === "success") setEvents(data);
    }

    findAllEvents();
  }, []);

  return (
    <DefaultLayout>
      <div className={styles.event}>
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
